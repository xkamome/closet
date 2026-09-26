// Renderer, studio lighting, floor, camera framing and auto-rotate.

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export type Framing = "full" | "half";

export class Stage {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly controls: OrbitControls;
  readonly turntable = new THREE.Group();
  private readonly container: HTMLElement;
  private framing: Framing = "full";
  private bodyHeight = 1.6;
  private seatHeight = 0;
  private readonly chair: THREE.Group;
  private tween: { from: THREE.Vector3; to: THREE.Vector3; tFrom: THREE.Vector3; tTo: THREE.Vector3; t: number } | null = null;
  private readonly timer = new THREE.Timer();
  onFrame: ((dt: number) => void) | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(this.renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 0.55;
    this.scene.background = new THREE.Color(0xeeeae4);

    this.camera = new THREE.PerspectiveCamera(30, 1, 0.05, 50);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.minDistance = 0.6;
    this.controls.maxDistance = 8;
    this.controls.autoRotateSpeed = 2.0;

    const key = new THREE.DirectionalLight(0xfff4e8, 2.2);
    key.position.set(1.8, 3.2, 2.4);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -1.2; key.shadow.camera.right = 1.2;
    key.shadow.camera.top = 2.2; key.shadow.camera.bottom = -0.2;
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.02;
    key.shadow.radius = 4;
    const fill = new THREE.DirectionalLight(0xe8f0ff, 0.6);
    fill.position.set(-2.5, 1.6, 1.2);
    const rim = new THREE.DirectionalLight(0xffffff, 1.1);
    rim.position.set(-0.6, 2.4, -2.8);
    this.scene.add(key, fill, rim, new THREE.HemisphereLight(0xffffff, 0xd8cfc4, 0.35));

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(3, 64),
      new THREE.MeshStandardMaterial({ color: 0xe4ded6, roughness: 0.9 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    this.chair = makeStool();
    this.chair.visible = false;
    this.turntable.add(this.chair);
    this.scene.add(this.turntable);

    new ResizeObserver(() => this.resize()).observe(container);
    this.resize();
    this.frame(true);
    this.renderer.setAnimationLoop(() => this.loop());
  }

  private resize(): void {
    const w = this.container.clientWidth || 1, h = this.container.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  setAutoRotate(on: boolean): void { this.controls.autoRotate = on; }
  get autoRotate(): boolean { return this.controls.autoRotate; }

  /** Tell the stage about the current figure so framing & stool fit. */
  setFigure(height: number, seatHeight: number | null, seatPos?: THREE.Vector3): void {
    this.bodyHeight = height;
    this.chair.visible = seatHeight !== null;
    if (seatHeight !== null) {
      this.seatHeight = seatHeight;
      this.chair.scale.set(1, seatHeight / 0.45, 1);
      if (seatPos) this.chair.position.set(seatPos.x, 0, seatPos.z);
    }
    this.frame(false);
  }

  setFraming(f: Framing): void { this.framing = f; this.frame(false); }

  private frame(instant: boolean): void {
    const h = this.chair.visible ? Math.max(this.bodyHeight, 1.0) : this.bodyHeight;
    const aspect = this.camera.aspect || 1;
    let target: THREE.Vector3, pos: THREE.Vector3;
    const fov = THREE.MathUtils.degToRad(this.camera.fov);
    if (this.framing === "half") {
      const top = h * 1.02, bottom = h * 0.5;
      const span = (top - bottom) * 1.15;
      const dist = Math.max(span / 2 / Math.tan(fov / 2), (span * 0.8) / aspect / 2 / Math.tan(fov / 2));
      target = new THREE.Vector3(0, (top + bottom) / 2, 0);
      pos = new THREE.Vector3(0, target.y + 0.05, dist + 0.2);
    } else {
      const span = h * 1.12;
      const dist = Math.max(span / 2 / Math.tan(fov / 2), (span * 0.55) / aspect / 2 / Math.tan(fov / 2));
      target = new THREE.Vector3(0, h * 0.52, 0);
      pos = new THREE.Vector3(0, h * 0.58, dist + 0.25);
    }
    // keep the current viewing direction if the user orbited
    const dir = this.camera.position.clone().sub(this.controls.target);
    if (!instant && dir.lengthSq() > 1e-6) {
      dir.y = 0;
      if (dir.lengthSq() > 1e-6) {
        dir.normalize();
        const d = pos.z;
        pos = new THREE.Vector3(dir.x * d, pos.y, dir.z * d);
      }
    }
    if (instant) {
      this.camera.position.copy(pos);
      this.controls.target.copy(target);
      this.controls.update();
    } else {
      this.tween = { from: this.camera.position.clone(), to: pos, tFrom: this.controls.target.clone(), tTo: target, t: 0 };
    }
  }

  private loop(): void {
    this.timer.update();
    const dt = Math.min(this.timer.getDelta(), 0.1);
    if (this.tween) {
      const tw = this.tween;
      tw.t = Math.min(1, tw.t + dt / 0.6);
      const k = tw.t * tw.t * (3 - 2 * tw.t);
      this.camera.position.lerpVectors(tw.from, tw.to, k);
      this.controls.target.lerpVectors(tw.tFrom, tw.tTo, k);
      if (tw.t >= 1) this.tween = null;
    }
    this.onFrame?.(dt);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  get seat(): number { return this.seatHeight; }
}

function makeStool(): THREE.Group {
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: 0x8a6a4f, roughness: 0.55 });
  const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.04, 40), wood);
  seat.position.y = 0.43;
  seat.castShadow = seat.receiveShadow = true;
  g.add(seat);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.018, 0.42, 12), wood);
    leg.position.set(Math.cos(a) * 0.14, 0.21, Math.sin(a) * 0.14);
    leg.castShadow = true;
    g.add(leg);
  }
  g.name = "stool";
  return g;
}
