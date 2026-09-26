import { loadAvatar } from "./avatar/data";
import { Body } from "./avatar/body";
import { AvatarView } from "./viewer/avatarView";
import { Stage } from "./viewer/scene";
import { buildPose, type PoseName } from "./avatar/poses";

const app = document.getElementById("app")!;
app.style.cssText = "position:fixed;inset:0";
const stage = new Stage(app);
const data = await loadAvatar();
const body = new Body(data);
const view = new AvatarView(body);
stage.turntable.add(view.group);
const params = new URLSearchParams(location.search);
const pose = params.get("pose");
if (pose) { body.setPose(data.poses[pose]); view.update(); }
const preset = params.get("preset") as PoseName | null;
if (preset) { body.setPose(buildPose(body, preset)); view.update(); }
if (params.get("side")) view.group.rotation.y = Math.PI / 2 * Number(params.get("side"));
if (params.get("hair")) view.setHair(params.get("hair"));
if (params.get("half")) stage.setFraming("half");
(window as any).__closet = { body, view, stage, data };
(window as any).__ready = true;
// --- dev: garment preview (?garment=top|dress|skirt|pants)
import { BodyMeasurer } from "./avatar/measure";
import { defaultSpec, type GarmentType } from "./garment/spec";
import { buildGarment } from "./garment/build";
import { buildAtlas } from "./garment/photo";
import { GarmentView } from "./viewer/garmentView";
const gt = params.get("garment") as GarmentType | null;
if (gt) {
  const measurer = new BodyMeasurer(data);
  const pose = body.pose;
  const t0 = performance.now();
  const meas = measurer.measure(body);
  const spec = defaultSpec(gt, meas);
  if (params.get("sleeve")) spec.sleeve = params.get("sleeve") as any;
  if (params.get("neck")) spec.neckline = params.get("neck") as any;
  const gm = buildGarment(spec, { body, measurer, m: meas });
  console.log("garment build ms", performance.now() - t0, gm.vertexCount);
  body.setPose(pose);
  const atlas = buildAtlas(null, { bbox: gm.bbox, torsoHalfWidth: gm.torsoHalfWidth }, "#7a93b8");
  const gv = new GarmentView(view, spec, gm, atlas);
  if (params.get("heat")) gv.setHeatmap(true);
  (window as any).__closet.garment = gv;
}
