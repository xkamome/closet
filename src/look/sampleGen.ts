// Synthetic product flat-lay photos for the Look Lab (so every mapping case can be tested offline):
// printed tee, striped long-sleeve, floral dress, plaid skirt, denim trousers, knit tank.
// Each is drawn like a studio flat-lay: light grey background, soft shadow, fabric shading, seams.

export type SampleId = "graphicTee" | "stripeLong" | "floralDress" | "plaidSkirt" | "denim" | "ribTank" | "gridTee";

const W = 900, H = 1000;

function canvas(): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, H);
  // a light grey studio sweep (white garments on white paper are a separate, harder case)
  g.addColorStop(0, "#d9d7d3"); g.addColorStop(1, "#cfccc7");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  return [c, ctx];
}

/** Fill `path` with a pattern painter, then fabric shading + soft drop shadow + stitch lines. */
function garment(ctx: CanvasRenderingContext2D, path: Path2D, paint: (ctx: CanvasRenderingContext2D) => void, seams: Path2D[] = []): void {
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.18)"; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6;
  ctx.fillStyle = "#888";
  ctx.fill(path);
  ctx.restore();
  ctx.save();
  ctx.clip(path);
  paint(ctx);
  // gentle flat-lay folds: a few long soft light/dark bands
  for (let i = 0; i < 7; i++) {
    const x = 120 + i * 110 + Math.sin(i * 7.3) * 40;
    const g = ctx.createLinearGradient(x - 60, 0, x + 60, 0);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(0.5, i % 2 ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - 60, 0, 120, H);
  }
  // edge shading: fabric curls slightly at the outline
  ctx.lineWidth = 10;
  ctx.strokeStyle = "rgba(0,0,0,0.05)";
  ctx.stroke(path);
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 5]);
  ctx.strokeStyle = "rgba(0,0,0,0.18)";
  for (const s of seams) ctx.stroke(s);
  ctx.restore();
}

function teePath(sleeve: "short" | "long" | "none", w = 380, len = 600, top = 150): Path2D {
  const cx = W / 2, hw = w / 2, p = new Path2D();
  const neckW = 70, neckD = 55, sh = sleeve === "none" ? neckW + 45 : hw + 8, shY = top + (sleeve === "none" ? 8 : 28), armY = top + 170;
  p.moveTo(cx - neckW, top);
  p.quadraticCurveTo(cx, top + neckD * 2, cx + neckW, top);
  p.lineTo(cx + sh, shY);
  if (sleeve === "short") { p.lineTo(cx + sh + 120, shY + 150); p.lineTo(cx + hw + 60, armY + 40); p.lineTo(cx + hw, armY + 30); }
  else if (sleeve === "long") { p.lineTo(cx + sh + 150, shY + 480); p.lineTo(cx + hw + 95, shY + 505); p.lineTo(cx + hw + 4, armY + 30); }
  else { p.quadraticCurveTo(cx + sh + 10, armY, cx + hw, armY + 10); }
  p.lineTo(cx + hw, top + len);
  p.lineTo(cx - hw, top + len);
  p.lineTo(cx - hw, sleeve === "none" ? armY + 10 : armY + 30);
  if (sleeve === "short") { p.lineTo(cx - hw - 60, armY + 40); p.lineTo(cx - sh - 120, shY + 150); }
  else if (sleeve === "long") { p.lineTo(cx - hw - 95, shY + 505); p.lineTo(cx - sh - 150, shY + 480); }
  else { p.quadraticCurveTo(cx - sh - 10, armY, cx - sh, shY); }
  p.lineTo(cx - sh, shY);
  p.closePath();
  return p;
}

export function makeSample(id: SampleId): HTMLCanvasElement {
  const [c, ctx] = canvas();
  const cx = W / 2;
  switch (id) {
    case "graphicTee": {
      garment(ctx, teePath("short"), (g) => {
        g.fillStyle = "#e7c35a"; g.fillRect(0, 0, W, H);
        // chest graphic: sun + mountains + text
        g.save();
        g.translate(cx, 390);
        g.fillStyle = "#e0703a"; g.beginPath(); g.arc(0, -30, 62, 0, Math.PI * 2); g.fill();
        g.fillStyle = "#2f5d62";
        g.beginPath(); g.moveTo(-120, 60); g.lineTo(-40, -30); g.lineTo(10, 20); g.lineTo(60, -40); g.lineTo(130, 60); g.closePath(); g.fill();
        g.fillStyle = "#1f2d3a"; g.font = "bold 38px Georgia, serif"; g.textAlign = "center"; g.fillText("SUNDAY", 0, 118);
        g.restore();
      }, [new Path2D(`M ${cx - 70} 158 Q ${cx} 272 ${cx + 70} 158`)]);
      break;
    }
    case "gridTee": {
      garment(ctx, teePath("short"), (g) => {
        g.fillStyle = "#cfe6f2"; g.fillRect(0, 0, W, H);
        g.strokeStyle = "#c33"; g.lineWidth = 3;
        for (let x = 0; x < W; x += 50) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
        g.strokeStyle = "#33c";
        for (let y = 0; y < H; y += 50) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
        g.fillStyle = "#222"; g.font = "bold 20px sans-serif";
        for (let y = 150; y < H; y += 100) g.fillText(String(y), cx + 6, y - 4);
      });
      break;
    }
    case "stripeLong": {
      garment(ctx, teePath("long", 360, 590, 140), (g) => {
        g.fillStyle = "#fbfaf6"; g.fillRect(0, 0, W, H);
        g.fillStyle = "#23395d";
        for (let y = 150; y < H; y += 34) g.fillRect(0, y, W, 13);
      });
      break;
    }
    case "ribTank": {
      garment(ctx, teePath("none", 330, 560, 150), (g) => {
        g.fillStyle = "#c9a9a0"; g.fillRect(0, 0, W, H);
        for (let x = 0; x < W; x += 7) { g.fillStyle = "rgba(0,0,0,0.07)"; g.fillRect(x, 0, 3, H); }
      });
      break;
    }
    case "floralDress": {
      const p = new Path2D();
      const top = 70, hw = 170;
      p.moveTo(cx - 62, top); p.quadraticCurveTo(cx, top + 110, cx + 62, top);
      p.lineTo(cx + hw + 6, top + 22); p.lineTo(cx + hw + 95, top + 150); p.lineTo(cx + hw + 30, top + 185);
      p.lineTo(cx + hw - 10, top + 330); p.quadraticCurveTo(cx + hw + 60, top + 600, cx + hw + 170, top + 860);
      p.lineTo(cx - hw - 170, top + 860); p.quadraticCurveTo(cx - hw - 60, top + 600, cx - hw + 10, top + 330);
      p.lineTo(cx - hw - 30, top + 185); p.lineTo(cx - hw - 95, top + 150); p.lineTo(cx - hw - 6, top + 22); p.closePath();
      garment(ctx, p, (g) => {
        g.fillStyle = "#1e2a44"; g.fillRect(0, 0, W, H);
        let seed = 3;
        const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
        for (let i = 0; i < 260; i++) {
          const x = rnd() * W, y = rnd() * H, r = 9 + rnd() * 12;
          const col = ["#f1d3dd", "#e98fa5", "#f6e7b0", "#b9d7ea"][Math.floor(rnd() * 4)];
          g.fillStyle = col;
          for (let k = 0; k < 5; k++) {
            const a = (k / 5) * Math.PI * 2 + rnd();
            g.beginPath(); g.ellipse(x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * 0.7, r * 0.55, r * 0.35, a, 0, Math.PI * 2); g.fill();
          }
          g.fillStyle = "#f5c24c"; g.beginPath(); g.arc(x, y, r * 0.25, 0, Math.PI * 2); g.fill();
          g.fillStyle = "#5f8b5a";
          g.beginPath(); g.ellipse(x + r * 1.2, y + r * 0.6, r * 0.6, r * 0.22, 0.6, 0, Math.PI * 2); g.fill();
        }
      }, [new Path2D(`M ${cx - hw + 10} ${top + 330} L ${cx + hw - 10} ${top + 330}`)]);
      break;
    }
    case "plaidSkirt": {
      const p = new Path2D();
      const top = 160, wHalf = 150, hemHalf = 300, len = 560;
      p.moveTo(cx - wHalf, top); p.lineTo(cx + wHalf, top); p.lineTo(cx + hemHalf, top + len);
      p.quadraticCurveTo(cx, top + len + 30, cx - hemHalf, top + len); p.closePath();
      garment(ctx, p, (g) => {
        g.fillStyle = "#b8a37a"; g.fillRect(0, 0, W, H);
        for (let x = 0; x < W; x += 64) { g.fillStyle = "rgba(90,40,30,0.35)"; g.fillRect(x, 0, 18, H); g.fillStyle = "rgba(40,60,50,0.25)"; g.fillRect(x + 30, 0, 6, H); }
        for (let y = 0; y < H; y += 64) { g.fillStyle = "rgba(90,40,30,0.35)"; g.fillRect(0, y, W, 18); g.fillStyle = "rgba(40,60,50,0.25)"; g.fillRect(0, y + 30, W, 6); }
        g.fillStyle = "rgba(60,40,20,0.5)"; g.fillRect(0, top, W, 34); // waistband
      }, [new Path2D(`M ${cx - wHalf} ${top + 34} L ${cx + wHalf} ${top + 34}`)]);
      break;
    }
    case "denim": {
      const p = new Path2D();
      const top = 60, wHalf = 175, crotch = 330, len = 880;
      p.moveTo(cx - wHalf, top); p.lineTo(cx + wHalf, top);
      p.lineTo(cx + wHalf + 20, top + 260); p.lineTo(cx + 150, top + len); p.lineTo(cx + 25, top + len);
      p.lineTo(cx + 8, top + crotch); p.lineTo(cx - 8, top + crotch);
      p.lineTo(cx - 25, top + len); p.lineTo(cx - 150, top + len); p.lineTo(cx - wHalf - 20, top + 260); p.closePath();
      garment(ctx, p, (g) => {
        g.fillStyle = "#3d5a80"; g.fillRect(0, 0, W, H);
        for (let i = 0; i < 4000; i++) { const x = (i * 97) % W, y = (i * 61) % H; g.fillStyle = i % 3 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"; g.fillRect(x, y, 14, 1); }
        // whiskers / fade on thighs
        for (const s of [-1, 1]) {
          const r = g.createRadialGradient(cx + s * 90, top + 380, 10, cx + s * 90, top + 380, 150);
          r.addColorStop(0, "rgba(255,255,255,0.18)"); r.addColorStop(1, "rgba(255,255,255,0)");
          g.fillStyle = r; g.fillRect(0, 0, W, H);
        }
        g.fillStyle = "rgba(0,0,0,0.15)"; g.fillRect(0, top, W, 40);
      }, [new Path2D(`M ${cx - wHalf} ${top + 40} L ${cx + wHalf} ${top + 40} M ${cx + 4} ${top + 40} Q ${cx + 30} ${top + 200} ${cx + 4} ${top + 250}`)]);
      break;
    }
  }
  return c;
}
