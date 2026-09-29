// Pose for the look images: the app's standing pose with relaxed, softly curled hands
// (the BVH pose spreads the fingers like claws, which is the first thing the eye catches).

import { Quaternion, Vector3 } from "three";
import type { Body, PoseQuats } from "../avatar/body";
import { buildPose } from "../avatar/poses";

export function lookPose(body: Body, curl = 0.22, stance = 1): PoseQuats {
  const pose = buildPose(body, "stand", stance);
  const q = new Quaternion();
  const axis = new Vector3(1, 0, 0);
  for (const b of body.data.bones) {
    const m = /^finger(\d)-(\d)\.[LR]$/.exec(b.name);
    if (m) {
      const finger = Number(m[1]), joint = Number(m[2]);
      // straight rest fingers, then a gentle curl growing toward the tips; thumb barely
      const k = finger === 1 ? 0.25 : 1 + (finger - 2) * 0.18;
      q.setFromAxisAngle(axis, curl * k * (joint === 1 ? 0.6 : 1.0));
      pose[b.name] = [q.x, q.y, q.z, q.w];
    }
    // hands hang in line with the forearm (the BVH turns them outward)
    if (/^(metacarpal|wrist\.|lowerarm02\.)/.test(b.name)) delete pose[b.name];
  }
  body.setPose(pose);
  return pose;
}
