// 3D wireframe shape floating above the hero, rendered on a plain canvas.
// NOTE: agar space.ts asli-ye site-e khodet ro dari, mituni in file ro
// ba hamun jaygozin koni — Background.astro daghighan hamun import ro dare.
//
// This version: a slowly rotating icosahedron wireframe with glowing
// vertices, gentle mouse parallax, and a soft pulse. No dependencies.

export function initSpaceBackground(container: HTMLElement) {
  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.inset = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let W = 0, H = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = container.clientWidth;
    H = container.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  // ---- icosahedron geometry ----
  const t = (1 + Math.sqrt(5)) / 2;
  const raw: [number, number, number][] = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ];
  const norm = Math.sqrt(1 + t * t);
  const verts = raw.map(([x, y, z]) => [x / norm, y / norm, z / norm] as [number, number, number]);

  const edges: [number, number][] = [];
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const [ax, ay, az] = verts[i];
      const [bx, by, bz] = verts[j];
      const d = Math.hypot(ax - bx, ay - by, az - bz);
      if (d < 1.1) edges.push([i, j]); // edge length of unit icosahedron ~1.05
    }
  }

  // mouse parallax
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  window.addEventListener("mousemove", (e) => {
    tmx = (e.clientX / window.innerWidth - 0.5) * 2;
    tmy = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let start = performance.now();
  function frame(now: number) {
    const time = (now - start) / 1000;
    ctx.clearRect(0, 0, W, H);

    mx += (tmx - mx) * 0.04;
    my += (tmy - my) * 0.04;

    // shape sits above where the hero text starts
    const cx = W / 2 + mx * 20;
    const cy = Math.min(H * 0.32, 320) + my * 14;
    const R = Math.min(W, H) * 0.22 + Math.sin(time * 0.8) * 6;

    const ry = reduced ? 0.6 : time * 0.25 + mx * 0.4;
    const rx = reduced ? 0.4 : Math.sin(time * 0.18) * 0.5 + my * 0.3;

    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    const cosX = Math.cos(rx), sinX = Math.sin(rx);

    const proj: [number, number, number][] = verts.map(([x, y, z]) => {
      // rotate Y then X
      let px = x * cosY + z * sinY;
      let pz = -x * sinY + z * cosY;
      let py = y * cosX - pz * sinX;
      pz = y * sinX + pz * cosX;
      const persp = 2.6 / (2.6 + pz);
      return [cx + px * R * persp, cy + py * R * persp, pz];
    });

    // edges
    for (const [i, j] of edges) {
      const [x1, y1, z1] = proj[i];
      const [x2, y2, z2] = proj[j];
      const depth = (z1 + z2) / 2; // -1 (front) .. 1 (back)
      const alpha = 0.35 - depth * 0.22;
      const grad = ctx.createLinearGradient(x1, y1, x2, y2);
      grad.addColorStop(0, `rgba(96,165,250,${alpha})`);   // blue-400
      grad.addColorStop(1, `rgba(192,132,252,${alpha})`);  // purple-400
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.2 - depth * 0.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // glowing vertices
    for (const [x, y, z] of proj) {
      const alpha = 0.9 - z * 0.4;
      const r = 2.4 - z * 1.1;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
      g.addColorStop(0, `rgba(147,197,253,${alpha})`);
      g.addColorStop(1, "rgba(147,197,253,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
