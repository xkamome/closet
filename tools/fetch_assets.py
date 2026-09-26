"""Download the CC0 MakeHuman source assets used by build_avatar.py into _vendor/.

Sources (all CC0):
  - base mesh, targets, default skeleton + weights: github.com/makehumancommunity/makehuman
  - skins / hair / eyebrows / eyelashes / eyes: MakeHuman system asset pack (mirror1.makehuman.net)
  - poses (bvh): MakeHuman2 additional asset pack
"""
import os
import sys
import urllib.request
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VENDOR = os.path.join(ROOT, "_vendor")
MH = os.path.join(VENDOR, "mh")
RAW = "https://raw.githubusercontent.com/makehumancommunity/makehuman/master/makehuman/data/"
PACKS = {
    "mh_system_assets_cc0.zip": "https://mirror1.makehuman.net/asset_packs/makehuman_system_assets/makehuman_system_assets_cc0.zip",
    "mh2_additional_cc0.zip": "https://mirror1.makehuman.net/functional/makehuman2_additional_assets/makehuman2_additional_assets_cc0.zip",
}

MEASURE = ["ankle-circ", "bust-circ", "calf-circ", "frontchest-dist", "hips-circ", "knee-circ",
           "lowerarm-length", "lowerleg-height", "napetowaist-dist", "neck-circ", "neck-height",
           "shoulder-dist", "thigh-circ", "underbust-circ", "upperarm-circ", "upperarm-length",
           "upperleg-height", "waist-circ", "waisttohip-dist", "wrist-circ"]

TARGETS = (
    ["macrodetails/universal-female-young-averagemuscle-%s.target" % w for w in ("averageweight", "maxweight", "minweight")]
    + ["macrodetails/universal-female-young-%s-averageweight.target" % m for m in ("maxmuscle", "minmuscle")]
    + ["macrodetails/%s-female-young.target" % r for r in ("asian", "caucasian", "african")]
    + ["macrodetails/height/female-young-averagemuscle-averageweight-%sheight.target" % h for h in ("max", "min")]
    + ["breast/female-young-averagemuscle-averageweight-%scup-averagefirmness.target" % c for c in ("max", "min")]
    + ["breast/female-young-averagemuscle-averageweight-averagecup-%sfirmness.target" % f for f in ("max", "min")]
    + ["measure/measure-%s-%s.target" % (m, d) for m in MEASURE for d in ("incr", "decr")]
    + ["torso/torso-vshape-%s.target" % d for d in ("incr", "decr")]
    + ["torso/torso-scale-depth-%s.target" % d for d in ("incr", "decr")]
    + ["hip/hip-scale-horiz-%s.target" % d for d in ("incr", "decr")]
    + ["hip/hip-scale-depth-%s.target" % d for d in ("incr", "decr")]
    + ["buttocks/buttocks-volume-%s.target" % d for d in ("incr", "decr")]
    + ["stomach/stomach-pregnant-%s.target" % d for d in ("incr", "decr")]
)
FILES = ["3dobjs/base.obj", "rigs/default.mhskel", "rigs/default_weights.mhw"] + ["targets/" + t for t in TARGETS]

PACK_PREFIXES = {
    "mh_system_assets_cc0.zip": ("skins/young_asian_female/", "skins/young_caucasian_female/",
                                 "skins/young_african_female/", "hair/bob01/", "hair/bob02/", "hair/long01/",
                                 "hair/ponytail01/", "hair/braid01/", "eyebrows/eyebrow001/",
                                 "eyelashes/eyelashes01/", "eyes/low-poly/", "eyes/materials/brown",
                                 "clothes/female_casualsuit01/", "clothes/female_casualsuit02/",
                                 "clothes/female_elegantsuit01/", "clothes/female_sportsuit01/"),
    "mh2_additional_cc0.zip": ("poses/",),
}


def fetch(url, dst):
    if os.path.exists(dst) and os.path.getsize(dst) > 0:
        return
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    print("GET", url)
    with urllib.request.urlopen(url) as r, open(dst + ".part", "wb") as f:
        f.write(r.read())
    os.replace(dst + ".part", dst)


def main():
    for rel in FILES:
        fetch(RAW + rel, os.path.join(MH, rel))
    for name, url in PACKS.items():
        zpath = os.path.join(VENDOR, name)
        fetch(url, zpath)
        with zipfile.ZipFile(zpath) as z:
            for n in z.namelist():
                if n.startswith(PACK_PREFIXES[name]) and not n.endswith("/") and not n.endswith(".thumb"):
                    out = os.path.join(MH, n)
                    if not os.path.exists(out):
                        os.makedirs(os.path.dirname(out), exist_ok=True)
                        with open(out, "wb") as f:
                            f.write(z.read(n))
    print("assets ready in", MH)


if __name__ == "__main__":
    sys.exit(main())
