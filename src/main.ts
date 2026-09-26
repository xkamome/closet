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
