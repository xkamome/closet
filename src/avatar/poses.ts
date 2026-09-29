// Pose presets built on top of the baked BVH poses. Sitting is authored procedurally by aiming
// bones at world-space directions, so it works for any body shape and stays on a stool.

import { Matrix4, Quaternion, Vector3 } from "three";
import type { Body, PoseQuats } from "./body";

export type PoseName = "stand" | "sit" | "half" | "rest" | "tpose";

export const POSE_LABELS: Record<PoseName, string> = {
  stand: "站姿", sit: "坐姿", half: "半身", rest: "A 字", tpose: "T 字",
};

/** Rotate bone `name` (in the current pose) so its head->tail axis points along `dir` (world). */
export function aimBone(body: Body, pose: PoseQuats, name: string, dir: Vector3, twistKeep = true): void {
  const i = body.boneIndex.get(name);
  if (i === undefined) return;
  body.setPose(pose);
  const g = body.poseGlobal[i];
  const cur = new Vector3().setFromMatrixColumn(g, 1).normalize();
  const want = dir.clone().normalize();
  const delta = new Quaternion().setFromUnitVectors(cur, want);
  const gRot = new Quaternion().setFromRotationMatrix(new Matrix4().extractRotation(g));
  // pose' = pose * G^-1 * delta * G   (rotation parts only)
  const local = new Quaternion().fromArray(pose[name] ?? [0, 0, 0, 1]);
  const conj = gRot.clone().invert().multiply(delta).multiply(gRot);
  local.multiply(conj);
  if (!twistKeep) local.normalize();
  pose[name] = [local.x, local.y, local.z, local.w];
}

/**
 * stance: how far apart the feet are when standing. 1 = the captured pose (feet a little apart),
 * 0 = feet together (legs aimed so the ankles almost touch, like a catalogue pose).
 */
export function buildPose(body: Body, name: PoseName, stance = 1): PoseQuats {
  const P = body.data.poses;
  if (name === "rest") return {};
  if (name === "tpose") return { ...P.tpose };
  const pose: PoseQuats = { ...(P.standing02 ?? {}) };
  if (name !== "sit" && stance < 0.999) {
    const together: PoseQuats = { ...pose };
    for (const s of ["L", "R"] as const) {
      const x = s === "L" ? 1 : -1;
      body.setPose(together);
      const hip = body.bonePosed(`upperleg01.${s}`);
      const ankle = body.bonePosed(`foot.${s}`);
      const len = hip.distanceTo(ankle) || 0.8;
      // straight leg from the hip joint to an ankle 4.5 cm off the centre line
      const dx = (x * 0.045 - hip.x) / len;
      aimBone(body, together, `upperleg01.${s}`, new Vector3(dx, -1, 0.01));
      aimBone(body, together, `upperleg02.${s}`, new Vector3(dx, -1, 0.01));
      aimBone(body, together, `lowerleg01.${s}`, new Vector3(dx * 0.4, -1, -0.01));
      aimBone(body, together, `lowerleg02.${s}`, new Vector3(dx * 0.4, -1, -0.01));
      aimBone(body, together, `foot.${s}`, new Vector3(0.12 * x, -0.5, 1));
    }
    const qa = new Quaternion(), qb = new Quaternion();
    for (const k of Object.keys(together)) {
      if (!/^(upperleg|lowerleg|foot|toe)/.test(k)) continue;
      qa.fromArray(pose[k] ?? [0, 0, 0, 1]);
      qb.fromArray(together[k]);
      qa.slerp(qb, 1 - Math.max(0, stance));
      pose[k] = [qa.x, qa.y, qa.z, qa.w];
    }
  }
  if (name === "sit") {
    for (const s of ["L", "R"] as const) {
      const x = s === "L" ? 1 : -1; // MakeHuman: +x is the figure's left
      aimBone(body, pose, `upperleg01.${s}`, new Vector3(0.1 * x, -0.12, 1));
      aimBone(body, pose, `upperleg02.${s}`, new Vector3(0.1 * x, -0.12, 1));
      aimBone(body, pose, `lowerleg01.${s}`, new Vector3(0.03 * x, -1, 0.08));
      aimBone(body, pose, `lowerleg02.${s}`, new Vector3(0.03 * x, -1, 0.08));
      aimBone(body, pose, `foot.${s}`, new Vector3(0.05 * x, -0.45, 1));
      aimBone(body, pose, `upperarm01.${s}`, new Vector3(0.1 * x, -1, 0.12));
      aimBone(body, pose, `upperarm02.${s}`, new Vector3(0.1 * x, -1, 0.12));
      aimBone(body, pose, `lowerarm01.${s}`, new Vector3(-0.04 * x, -0.62, 1));
      aimBone(body, pose, `lowerarm02.${s}`, new Vector3(-0.04 * x, -0.62, 1));
    }
  }
  body.setPose(pose);
  return pose;
}

/** Spherical blend of two poses (for smooth transitions). */
export function blendPoses(a: PoseQuats, b: PoseQuats, t: number): PoseQuats {
  const out: PoseQuats = {};
  const qa = new Quaternion(), qb = new Quaternion();
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
    qa.fromArray(a[k] ?? [0, 0, 0, 1]);
    qb.fromArray(b[k] ?? [0, 0, 0, 1]);
    qa.slerp(qb, t);
    out[k] = [qa.x, qa.y, qa.z, qa.w];
  }
  return out;
}
