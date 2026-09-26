"""Bake CC0 MakeHuman assets into a compact web format: public/avatar/avatar.json + avatar.bin.

Run tools/fetch_assets.py first. All geometry is exported in metres (MakeHuman uses decimetres).
Runtime (src/avatar/*) applies morphs, rebuilds the skeleton from joint helper vertices,
fits proxies (hair, eyes, brows, lashes) via their mhclo bindings and skins everything on the CPU.
"""
import json
import math
import os
import sys

import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MH = os.path.join(ROOT, "_vendor", "mh")
OUT = os.path.join(ROOT, "public", "avatar")
TEX = os.path.join(OUT, "tex")
SCALE = 0.1  # dm -> m
BODY_VERTS = 13380


# ---------------------------------------------------------------- OBJ / targets
def read_obj(path, groups=None):
    """Return (v, vt, faces) where faces = list of (group, [(vi, ti), ...])."""
    v, vt, faces, g = [], [], [], None
    with open(path, encoding="utf-8", errors="replace") as f:
        for line in f:
            if line.startswith("v "):
                v.append([float(x) for x in line.split()[1:4]])
            elif line.startswith("vt "):
                vt.append([float(x) for x in line.split()[1:3]])
            elif line.startswith("g "):
                g = line[2:].strip()
            elif line.startswith("f "):
                if groups is not None and g not in groups:
                    continue
                corners = []
                for p in line.split()[1:]:
                    parts = p.split("/")
                    corners.append((int(parts[0]) - 1, int(parts[1]) - 1 if len(parts) > 1 and parts[1] else -1))
                faces.append((g, corners))
    return np.array(v, dtype=np.float64), np.array(vt, dtype=np.float64), faces


def read_target(rel, n):
    d = np.zeros((n, 3), dtype=np.float64)
    with open(os.path.join(MH, "targets", rel), encoding="utf-8", errors="replace") as f:
        for line in f:
            if line[:1].isdigit():
                p = line.split()
                d[int(p[0])] = [float(p[1]), float(p[2]), float(p[3])]
    return d


def render_mesh(faces, uv_count):
    """Split vertices on UV seams; triangulate quads. Returns (src, uvidx, index)."""
    key_to_rv, src, uvi, index = {}, [], [], []
    for _, corners in faces:
        rv = []
        for vi, ti in corners:
            k = (vi, ti)
            if k not in key_to_rv:
                key_to_rv[k] = len(src)
                src.append(vi)
                uvi.append(ti)
            rv.append(key_to_rv[k])
        for i in range(1, len(rv) - 1):
            index += [rv[0], rv[i], rv[i + 1]]
    return np.array(src, np.uint32), np.array(uvi, np.int64), np.array(index, np.uint32)


# ---------------------------------------------------------------- binary writer
class Bin:
    def __init__(self):
        self.chunks, self.size, self.meta = [], 0, {}

    def add(self, name, arr):
        arr = np.ascontiguousarray(arr)
        types = {np.float32: "f32", np.uint32: "u32", np.uint16: "u16", np.uint8: "u8", np.int32: "i32"}
        t = types[arr.dtype.type]
        pad = (-self.size) % 4
        if pad:
            self.chunks.append(b"\0" * pad)
            self.size += pad
        b = arr.tobytes()
        self.meta[name] = {"offset": self.size, "length": int(arr.size), "type": t}
        self.chunks.append(b)
        self.size += len(b)
        return name

    def write(self, path):
        with open(path, "wb") as f:
            for c in self.chunks:
                f.write(c)


# ---------------------------------------------------------------- weights
def load_weights(n):
    with open(os.path.join(MH, "rigs", "default_weights.mhw"), encoding="utf-8") as f:
        data = json.load(f)["weights"]
    per_vert = [dict() for _ in range(n)]
    for bone, pairs in data.items():
        for vi, w in pairs:
            if vi < n:
                per_vert[vi][bone] = per_vert[vi].get(bone, 0.0) + w
    return per_vert


def top4(wdict, bone_index, fallback):
    items = sorted(((w, b) for b, w in wdict.items() if b in bone_index and w > 0), reverse=True)[:4]
    if not items:
        items = [(1.0, fallback)]
    s = sum(w for w, _ in items)
    idx = [bone_index[b] for _, b in items] + [0] * (4 - len(items))
    wts = [w / s for w, _ in items] + [0.0] * (4 - len(items))
    return idx, wts


# ---------------------------------------------------------------- mhclo proxies
def read_mhclo(path):
    meta, refs, in_verts = {}, [], False
    with open(path, encoding="utf-8", errors="replace") as f:
        for line in f:
            s = line.strip()
            if not s or s.startswith("#"):
                continue
            p = s.split()
            if in_verts:
                if p[0][0].isdigit() or p[0][0] == "-":
                    if len(p) == 1:
                        refs.append(([int(p[0])] * 3, [1.0, 0.0, 0.0], [0.0, 0.0, 0.0]))
                    else:
                        refs.append(([int(x) for x in p[0:3]], [float(x) for x in p[3:6]], [float(x) for x in p[6:9]]))
                    continue
                if refs:  # a keyword after the vertex block ends it (some files put keywords before it)
                    in_verts = False
            if p[0] == "verts":
                in_verts = True
            elif p[0] in ("x_scale", "y_scale", "z_scale"):
                meta[p[0]] = [int(p[1]), int(p[2]), float(p[3])]
            elif p[0] in ("obj_file", "material", "name"):
                meta[p[0]] = p[1]
    return meta, refs


def read_mhmat(path):
    out = {}
    with open(path, encoding="utf-8", errors="replace") as f:
        for line in f:
            p = line.split()
            if len(p) >= 2 and not p[0].startswith("#"):
                out[p[0]] = " ".join(p[1:])
    return out


def save_texture(src, name, size, alpha):
    os.makedirs(TEX, exist_ok=True)
    img = Image.open(src)
    img = img.convert("RGBA" if alpha else "RGB")
    if max(img.size) > size:
        img = img.resize((size, size), Image.LANCZOS)
    if alpha:
        out = name + ".png"
        img.save(os.path.join(TEX, out), optimize=True)
    else:
        out = name + ".jpg"
        img.save(os.path.join(TEX, out), quality=88)
    return "tex/" + out


def build_proxy(b, key, folder, label, per_vert_w, bone_index, tex_size, alpha, fallback_bone):
    mhclo = [f for f in os.listdir(folder) if f.endswith(".mhclo")][0]
    meta, refs = read_mhclo(os.path.join(folder, mhclo))
    v, vt, faces = read_obj(os.path.join(folder, meta["obj_file"]))
    if len(refs) != len(v):
        raise RuntimeError("%s: %d refs vs %d verts" % (key, len(refs), len(v)))
    src, uvi, index = render_mesh(faces, len(vt))
    ref_idx = np.array([refs[s][0] for s in src], np.uint32)
    ref_w = np.array([refs[s][1] for s in src], np.float32)
    ref_off = np.array([refs[s][2] for s in src], np.float32) * SCALE
    uv = vt[uvi].astype(np.float32)
    widx, ww = [], []
    for s in src:
        acc = {}
        for r, w in zip(refs[s][0], refs[s][1]):
            for bn, bw in per_vert_w[r].items():
                acc[bn] = acc.get(bn, 0.0) + bw * max(w, 0.0)
        i4, w4 = top4(acc, bone_index, fallback_bone)
        widx.append(i4)
        ww.append(w4)
    mat_path = os.path.normpath(os.path.join(folder, meta["material"])) if "material" in meta else None
    mat = read_mhmat(mat_path) if mat_path else {}
    tex_file = mat.get("diffuseTexture")
    texture = None
    if tex_file:
        tex_path = os.path.join(os.path.dirname(mat_path), os.path.basename(tex_file))
        texture = save_texture(tex_path, key, tex_size, alpha)
    return {
        "name": key, "label": label, "texture": texture,
        "scale": {k: [meta[k][0], meta[k][1], meta[k][2] * SCALE] for k in ("x_scale", "y_scale", "z_scale")},
        "refIdx": b.add(key + ".refIdx", ref_idx.ravel()),
        "refW": b.add(key + ".refW", ref_w.ravel()),
        "refOff": b.add(key + ".refOff", ref_off.ravel()),
        "uv": b.add(key + ".uv", uv.ravel()),
        "index": b.add(key + ".index", index),
        "skinIdx": b.add(key + ".skinIdx", np.array(widx, np.uint16).ravel()),
        "skinW": b.add(key + ".skinW", np.array(ww, np.float32).ravel()),
    }


# ---------------------------------------------------------------- BVH poses
def axis_rot(axis, a):
    c, s = math.cos(a), math.sin(a)
    if axis == "x":
        return np.array([[1, 0, 0], [0, c, -s], [0, s, c]])
    if axis == "y":
        return np.array([[c, 0, s], [0, 1, 0], [-s, 0, c]])
    return np.array([[c, -s, 0], [s, c, 0], [0, 0, 1]])


def mat_to_quat(m):
    t = m[0, 0] + m[1, 1] + m[2, 2]
    if t > 0:
        s = math.sqrt(t + 1.0) * 2
        return [(m[2, 1] - m[1, 2]) / s, (m[0, 2] - m[2, 0]) / s, (m[1, 0] - m[0, 1]) / s, 0.25 * s]
    if m[0, 0] > m[1, 1] and m[0, 0] > m[2, 2]:
        s = math.sqrt(1.0 + m[0, 0] - m[1, 1] - m[2, 2]) * 2
        return [0.25 * s, (m[0, 1] + m[1, 0]) / s, (m[0, 2] + m[2, 0]) / s, (m[2, 1] - m[1, 2]) / s]
    if m[1, 1] > m[2, 2]:
        s = math.sqrt(1.0 + m[1, 1] - m[0, 0] - m[2, 2]) * 2
        return [(m[0, 1] + m[1, 0]) / s, 0.25 * s, (m[1, 2] + m[2, 1]) / s, (m[0, 2] - m[2, 0]) / s]
    s = math.sqrt(1.0 + m[2, 2] - m[0, 0] - m[1, 1]) * 2
    return [(m[0, 2] + m[2, 0]) / s, (m[1, 2] + m[2, 1]) / s, 0.25 * s, (m[1, 0] - m[0, 1]) / s]


def read_bvh(path, frame=0):
    """Replicates MakeHuman 1.x bvh.py: channel rotations are bone-local pose matrices."""
    joints, stack, order, cur = {}, [], [], None
    with open(path, encoding="utf-8", errors="replace") as f:
        tokens = f.read().split()
    i = 0
    while tokens[i] != "MOTION":
        t = tokens[i]
        if t in ("ROOT", "JOINT"):
            cur = {"name": tokens[i + 1], "children": [], "channels": [], "offset": None,
                   "parent": stack[-1]["name"] if stack else None}
            if stack:
                stack[-1]["children"].append(cur["name"])
            joints[cur["name"]] = cur
            order.append(cur["name"])
            i += 2
        elif t == "End":
            cur = {"name": None, "children": [], "channels": [], "end": True}
            i += 2
        elif t == "{":
            stack.append(cur)
            i += 1
        elif t == "}":
            stack.pop()
            i += 1
        elif t == "OFFSET":
            cur["offset"] = [float(x) for x in tokens[i + 1:i + 4]]
            i += 4
        elif t == "CHANNELS":
            n = int(tokens[i + 1])
            cur["channels"] = tokens[i + 2:i + 2 + n]
            i += 2 + n
        else:
            i += 1
    i += 1  # MOTION
    n_frames = int(tokens[i + 1])
    i += 2 + 3  # "Frames: N Frame Time: x"
    values = [float(x) for x in tokens[i:]]
    per_frame = sum(len(joints[n]["channels"]) for n in order)
    frame = min(frame, n_frames - 1)
    data = values[frame * per_frame:(frame + 1) * per_frame]

    # auto-guess Z-up like MakeHuman: look at a spine joint's first child offset
    zup = False
    for ref in ["lowerleg02.L", "upperleg02.L", "spine01", "spine02", "spine03", "head"]:  # MH pops from the end
        j = joints.get(ref)
        if j and j["children"]:
            off = joints[j["children"][0]]["offset"]
            zup = abs(off[1]) <= abs(off[2])
            break

    D = math.pi / 180
    pose, k = {}, 0
    for name in order:
        j = joints[name]
        m = np.identity(3)
        for ch in j["channels"]:
            val = data[k]
            k += 1
            if ch == "Xrotation":
                m = m @ axis_rot("x", val * D)
            elif ch == "Yrotation":
                m = m @ (axis_rot("z", -val * D) if zup else axis_rot("y", val * D))
            elif ch == "Zrotation":
                m = m @ (axis_rot("y", val * D) if zup else axis_rot("z", val * D))
        if not np.allclose(m, np.identity(3), atol=1e-6):
            pose[name] = [round(x, 6) for x in mat_to_quat(m)]
    return pose


# ---------------------------------------------------------------- main
def main():
    b = Bin()
    v, vt, faces = read_obj(os.path.join(MH, "3dobjs", "base.obj"))
    n = len(v)
    body_faces = [f for f in faces if f[0] == "body"]

    base = v + read_target("macrodetails/universal-female-young-averagemuscle-averageweight.target", n) \
        + read_target("macrodetails/asian-female-young.target", n)

    def T(rel):
        return read_target(rel, n)

    avg_w = T("macrodetails/universal-female-young-averagemuscle-averageweight.target")
    avg_m = avg_w
    asian = T("macrodetails/asian-female-young.target")
    morph_defs = [
        ("height+", "身高", T("macrodetails/height/female-young-averagemuscle-averageweight-maxheight.target")),
        ("height-", "身高", T("macrodetails/height/female-young-averagemuscle-averageweight-minheight.target")),
        ("weight+", "體重", T("macrodetails/universal-female-young-averagemuscle-maxweight.target") - avg_w),
        ("weight-", "體重", T("macrodetails/universal-female-young-averagemuscle-minweight.target") - avg_w),
        ("muscle+", "肌肉", T("macrodetails/universal-female-young-maxmuscle-averageweight.target") - avg_m),
        ("muscle-", "肌肉", T("macrodetails/universal-female-young-minmuscle-averageweight.target") - avg_m),
        ("cup+", "罩杯", T("breast/female-young-averagemuscle-averageweight-maxcup-averagefirmness.target")),
        ("cup-", "罩杯", T("breast/female-young-averagemuscle-averageweight-mincup-averagefirmness.target")),
        ("firmness+", "胸型挺度", T("breast/female-young-averagemuscle-averageweight-averagecup-maxfirmness.target")),
        ("firmness-", "胸型挺度", T("breast/female-young-averagemuscle-averageweight-averagecup-minfirmness.target")),
        ("race-caucasian", "臉型：高加索", T("macrodetails/caucasian-female-young.target") - asian),
        ("race-african", "臉型：非洲", T("macrodetails/african-female-young.target") - asian),
    ]
    measure_names = {
        "bust-circ": ("bust", "胸圍"), "underbust-circ": ("underbust", "下胸圍"), "waist-circ": ("waist", "腰圍"),
        "hips-circ": ("hips", "臀圍"), "shoulder-dist": ("shoulder", "肩寬"), "thigh-circ": ("thigh", "大腿圍"),
        "upperarm-circ": ("upperarm", "上臂圍"), "upperarm-length": ("upperarmlen", "上臂長"),
        "lowerarm-length": ("lowerarmlen", "前臂長"), "upperleg-height": ("upperleglen", "大腿長"),
        "lowerleg-height": ("lowerleglen", "小腿長"), "neck-circ": ("neck", "頸圍"), "calf-circ": ("calf", "小腿圍"),
        "napetowaist-dist": ("backlen", "背長"), "waisttohip-dist": ("waisttohip", "腰臀距"),
        "frontchest-dist": ("frontchest", "前胸寬"), "neck-height": ("neckheight", "脖子長"),
        "knee-circ": ("knee", "膝圍"), "ankle-circ": ("ankle", "腳踝圍"), "wrist-circ": ("wrist", "手腕圍"),
    }
    for mname, (key, label) in measure_names.items():
        morph_defs.append((key + "+", label, T("measure/measure-%s-incr.target" % mname)))
        morph_defs.append((key + "-", label, T("measure/measure-%s-decr.target" % mname)))
    for rel, key, label in [("torso/torso-vshape-%s", "vshape", "倒三角"), ("torso/torso-scale-depth-%s", "torsodepth", "軀幹厚度"),
                            ("hip/hip-scale-horiz-%s", "hipwidth", "骨盆寬"), ("hip/hip-scale-depth-%s", "hipdepth", "臀部厚度"),
                            ("buttocks/buttocks-volume-%s", "buttocks", "臀部豐滿"), ("stomach/stomach-pregnant-%s", "belly", "小腹")]:
        morph_defs.append((key + "+", label, T(rel % "incr" + ".target")))
        morph_defs.append((key + "-", label, T(rel % "decr" + ".target")))

    morphs = []
    for name, label, d in morph_defs:
        nz = np.nonzero(np.abs(d).sum(axis=1) > 1e-7)[0]
        morphs.append({
            "name": name, "label": label,
            "idx": b.add("m." + name + ".idx", nz.astype(np.uint32)),
            "delta": b.add("m." + name + ".d", (d[nz] * SCALE).astype(np.float32).ravel()),
        })

    # skeleton
    with open(os.path.join(MH, "rigs", "default.mhskel"), encoding="utf-8") as f:
        skel = json.load(f)
    names, pending = [], dict(skel["bones"])
    while pending:  # parents first
        for nm in sorted(pending):
            p = pending[nm]["parent"]
            if p is None or p in names:
                names.append(nm)
                del pending[nm]
                break
    bone_index = {nm: i for i, nm in enumerate(names)}
    joint_names = sorted(skel["joints"])
    joint_index = {nm: i for i, nm in enumerate(joint_names)}
    bones = []
    for nm in names:
        bd = skel["bones"][nm]
        plane = bd.get("rotation_plane")
        if isinstance(plane, list):
            plane = plane[0]
        bones.append({
            "name": nm, "parent": bone_index[bd["parent"]] if bd["parent"] else -1,
            "head": joint_index[bd["head"]], "tail": joint_index[bd["tail"]],
            "plane": [joint_index[j] for j in skel["planes"][plane]] if plane in skel.get("planes", {}) else None,
        })
    joints = [skel["joints"][j] for j in joint_names]

    per_vert_w = load_weights(n)
    body_src, body_uvi, body_index = render_mesh(body_faces, len(vt))
    sk_idx, sk_w = [], []
    for vi in range(BODY_VERTS):
        i4, w4 = top4(per_vert_w[vi], bone_index, bone_index["spine03"])
        sk_idx.append(i4)
        sk_w.append(w4)

    # proxies
    hair_defs = [("bob02", "短鮑伯"), ("bob01", "鮑伯"), ("long01", "長髮"), ("ponytail01", "馬尾"), ("braid01", "辮子")]
    hair = [build_proxy(b, "hair_" + k, os.path.join(MH, "hair", k), label, per_vert_w, bone_index, 1024, True,
                        bone_index["head"]) for k, label in hair_defs]
    extras = [
        build_proxy(b, "eyebrows", os.path.join(MH, "eyebrows", "eyebrow001"), "眉毛", per_vert_w, bone_index, 512, True, bone_index["head"]),
        build_proxy(b, "eyelashes", os.path.join(MH, "eyelashes", "eyelashes01"), "睫毛", per_vert_w, bone_index, 512, True, bone_index["head"]),
        build_proxy(b, "eyes", os.path.join(MH, "eyes", "low-poly"), "眼睛", per_vert_w, bone_index, 512, False, bone_index["head"]),
    ]

    skins = []
    for key, label in [("young_asian_female", "亞洲"), ("young_caucasian_female", "白皙"), ("young_african_female", "深膚")]:
        folder = os.path.join(MH, "skins", key)
        png = [f for f in os.listdir(folder) if f.endswith(".png")][0]
        skins.append({"name": key, "label": label, "texture": save_texture(os.path.join(folder, png), "skin_" + key, 2048, False)})

    poses = {"rest": {}}
    for key in ["standing01", "standing02", "standing03", "standing04", "standing05", "standing06", "sit01", "tpose", "idle1"]:
        poses[key] = read_bvh(os.path.join(MH, "poses", key + ".bvh"))

    meta = {
        "version": 1, "units": "m", "source": "MakeHuman 1.x hm08 (CC0)",
        "vertexCount": n, "bodyVertexCount": BODY_VERTS,
        "base": b.add("base", (base * SCALE).astype(np.float32).ravel()),
        "morphs": morphs,
        "body": {
            "src": b.add("body.src", body_src),
            "uv": b.add("body.uv", vt[body_uvi].astype(np.float32).ravel()),
            "index": b.add("body.index", body_index),
            "skinIdx": b.add("body.skinIdx", np.array(sk_idx, np.uint16).ravel()),
            "skinW": b.add("body.skinW", np.array(sk_w, np.float32).ravel()),
        },
        "skeleton": {"bones": bones, "joints": joints, "jointNames": joint_names},
        "hair": hair,
        "extras": extras,
        "skin": {"texture": skins[0]["texture"], "options": skins},
        "poses": poses,
    }
    meta["buffers"] = b.meta
    meta["byteLength"] = b.size
    os.makedirs(OUT, exist_ok=True)
    b.write(os.path.join(OUT, "avatar.bin"))
    with open(os.path.join(OUT, "avatar.json"), "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False, separators=(",", ":"))
    print("avatar: %d verts, %d body tris, %d morphs, %d bones, %.1f MB bin" % (
        n, len(body_index) // 3, len(morphs), len(bones), b.size / 1e6))


if __name__ == "__main__":
    sys.exit(main())
