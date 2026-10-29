import React, { useEffect, useRef } from 'react';

const INK = '#1c1b22'; const MOSS = '#7a7880'; const ACCENT = '#6b2d5c'; const SUN = '#d3a6c6'; const RIVER = '#1c1b22';

const Frame = ({ children, label }) => (
  <svg viewBox="0 0 320 180" className="w-full h-auto" role="img" aria-label={label}>
    {children}
  </svg>
);

const Node = ({ x, y, r = 6, fill = MOSS, delay = 0, pulse = true }) => (
  <circle cx={x} cy={y} r={r} fill={fill} className={pulse ? 'node-pulse' : ''} style={{ animationDelay: `${delay}s`, transformOrigin: `${x}px ${y}px`, transformBox: 'fill-box' }} />
);
const Edge = ({ a, b, flow = true, color = INK, o = 0.35 }) => (
  <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={color} strokeOpacity={o} strokeWidth="1.2" className={flow ? 'edge-flow' : ''} strokeDasharray={flow ? '3 4' : undefined} />
);

function MyOS() {
  const bars = [22, 30, 26, 40, 48, 58, 74];
  const circ = 2 * Math.PI * 24;
  return (
    <Frame label="Self-improvement app dashboard: goal progress ring, weekly growth and a habit streak">
      <rect x="28" y="14" width="264" height="152" rx="14" fill="#fbfbfa" stroke={INK} strokeWidth="2.2" />
      <line x1="28" x2="292" y1="38" y2="38" stroke={INK} strokeOpacity="0.2" />
      {[ACCENT, SUN, MOSS].map((c, i) => <circle key={c} cx={44 + i * 12} cy="26" r="3.5" fill={c} />)}
      <text x="276" y="30" textAnchor="end" fontFamily="DM Sans" fontSize="8" fill={INK} fillOpacity="0.6">LVL 7</text>

      <circle cx="78" cy="84" r="24" fill="none" stroke={INK} strokeOpacity="0.12" strokeWidth="9" />
      <circle cx="78" cy="84" r="24" fill="none" stroke={ACCENT} strokeWidth="9" strokeLinecap="round"
        strokeDasharray={`${circ * 0.72} ${circ}`} transform="rotate(-90 78 84)" />
      <text x="78" y="88" textAnchor="middle" fontFamily="DM Sans" fontWeight="700" fontSize="13" fill={INK}>72%</text>
      <text x="78" y="124" textAnchor="middle" fontFamily="DM Sans" fontSize="8" fill={INK} fillOpacity="0.6">GOALS</text>

      {bars.map((h, i) => (
        <rect key={i} x={132 + i * 20} y={118 - h} width="12" height={h} rx="3" fill={i === 6 ? SUN : MOSS} fillOpacity={i === 6 ? 1 : 0.35 + i * 0.08} className="node-pulse" style={{ animationDelay: `${i * 0.2}s`, transformBox: 'fill-box', transformOrigin: 'bottom' }} />
      ))}
      <path d="M138 96 L158 90 L178 94 L198 78 L218 70 L238 56 L258 40" stroke={ACCENT} strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 4" />
      <path d="M254 34 l8 3 l-5 7z" fill={ACCENT} />

      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
        <g key={i}>
          <circle cx={48 + i * 33} cy="146" r="7" fill={i < 5 ? MOSS : 'none'} stroke={MOSS} strokeWidth="1.6" />
          {i < 5 && <path d={`M${44.5 + i * 33} 146 l2.5 2.5 l4.5 -5`} stroke="#fbfbfa" strokeWidth="1.8" fill="none" strokeLinecap="round" />}
          <text x={48 + i * 33} y="162" textAnchor="middle" fontFamily="DM Sans" fontSize="6.5" fill={INK} fillOpacity="0.5">{d}</text>
        </g>
      ))}
    </Frame>
  );
}

function Rag() {
  const g = [[170, 50], [220, 80], [195, 125], [150, 105], [245, 135]];
  return (
    <Frame label="Documents feed a knowledge graph that grounds an answer">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${22 + i * 5} ${42 + i * 10})`}>
          <rect width="52" height="64" rx="4" fill="#fbfbfa" stroke={INK} strokeWidth="1.4" />
          {[12, 22, 32, 42].map((y) => <line key={y} x1="8" x2={i === 2 ? 44 : 38} y1={y} y2={y} stroke={INK} strokeOpacity="0.35" />)}
        </g>
      ))}
      <path d="M84 100 H128" stroke={ACCENT} strokeWidth="2" markerEnd="url(#ah)" />
      <defs><marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8z" fill={ACCENT} /></marker></defs>
      {[[0, 1], [1, 2], [2, 3], [3, 0], [1, 4], [2, 4]].map(([a, b], i) => <Edge key={i} a={g[a]} b={g[b]} flow={false} o={0.5} />)}
      {g.map((n, i) => <Node key={i} x={n[0]} y={n[1]} r={i === 1 ? 9 : 7} fill={[MOSS, SUN, RIVER, MOSS, ACCENT][i]} delay={i * 0.3} />)}
      <rect x="258" y="62" width="48" height="34" rx="8" fill={INK} />
      <path d="M268 96 l-4 10 12 -10z" fill={INK} />
      {[72, 80, 88].map((y, i) => <line key={y} x1="266" x2={i === 2 ? 284 : 298} y1={y} y2={y} stroke="#fbfbfa" strokeWidth="2" strokeLinecap="round" />)}
    </Frame>
  );
}

function Derm() {
  return (
    <Frame label="Phone scanning a skin patch, with project milestones and a client-team link">
      <line x1="34" x2="34" y1="34" y2="148" stroke={INK} strokeOpacity="0.3" strokeWidth="1.5" />
      {[34, 70, 108, 146].map((y, i) => (
        <g key={y}>
          <circle cx="34" cy={y} r="8" fill={i < 3 ? MOSS : '#fbfbfa'} stroke={MOSS} strokeWidth="2" />
          {i < 3 && <path d={`M30 ${y} l3 3 l5 -6`} stroke="#fbfbfa" strokeWidth="2" fill="none" strokeLinecap="round" />}
          <line x1="50" x2={70 + (i % 2) * 14} y1={y} y2={y} stroke={INK} strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
      <rect x="118" y="12" width="84" height="156" rx="14" fill="#fbfbfa" stroke={INK} strokeWidth="2.4" />
      <rect x="128" y="32" width="64" height="104" rx="6" fill="#ecd3b4" />
      <circle cx="160" cy="82" r="22" fill="#e1b98f" />
      <circle cx="166" cy="76" r="5" fill={ACCENT} className="node-pulse" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
      {[[140, 54, 1, 1], [180, 54, -1, 1], [140, 110, 1, -1], [180, 110, -1, -1]].map(([x, y, dx, dy], i) => (
        <path key={i} d={`M${x} ${y + dy * 10} V${y} H${x + dx * 10}`} stroke={RIVER} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      ))}
      <rect x="132" y="120" width="56" height="5" rx="2.5" fill={INK} fillOpacity="0.15" />
      <rect x="132" y="120" width="38" height="5" rx="2.5" fill={RIVER} />
      <circle cx="270" cy="52" r="16" fill={SUN} /><circle cx="270" cy="128" r="16" fill={MOSS} />
      <Edge a={[270, 68]} b={[270, 112]} color={INK} o={0.5} />
      <Edge a={[205, 90]} b={[254, 54]} o={0.3} /><Edge a={[205, 90]} b={[254, 126]} o={0.3} />
      <text x="270" y="56" textAnchor="middle" fontFamily="DM Sans" fontSize="9" fill={INK}>client</text>
      <text x="270" y="132" textAnchor="middle" fontFamily="DM Sans" fontSize="9" fill="#fbfbfa">team</text>
    </Frame>
  );
}

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const unit = (v) => { const l = Math.hypot(...v) || 1; return v.map((x) => x / l); };

// Faces of a pagoda-style temple, built from stacked boxes and roof frustums (y is up).
function buildTemple() {
  const faces = [];
  const piece = (y0, h, a0, a1, col) => {
    const mid = [0, y0 + h / 2, 0];
    const bot = [[-a0, y0, -a0], [a0, y0, -a0], [a0, y0, a0], [-a0, y0, a0]];
    const top = [[-a1, y0 + h, -a1], [a1, y0 + h, -a1], [a1, y0 + h, a1], [-a1, y0 + h, a1]];
    const quads = [0, 1, 2, 3].map((i) => [bot[i], bot[(i + 1) % 4], top[(i + 1) % 4], top[i]]);
    if (a1 > 0.3) quads.push(top);
    quads.forEach((pts) => {
      const c = [0, 1, 2].map((k) => pts.reduce((t, p) => t + p[k], 0) / pts.length);
      let n = unit(cross(sub(pts[1], pts[0]), sub(pts[2], pts[0])));
      if (dot(n, sub(c, mid)) < 0) n = n.map((x) => -x);
      faces.push({ pts, n, col });
    });
  };
  const plinth = hex('#d6c7a8'); const wall = hex('#e3c694'); const roof = hex('#6b2d5c'); const gold = hex('#d3a6c6');
  piece(0, 2, 13, 13, plinth); piece(2, 2, 11, 11, plinth); piece(4, 2, 9, 9, plinth);
  piece(6, 7, 6, 6, wall);
  piece(13, 3.5, 11, 7, roof); piece(16.5, 5, 5, 5, wall);
  piece(21.5, 3, 9, 5.5, roof); piece(24.5, 4, 3.5, 3.5, wall);
  piece(28.5, 3, 7, 4, roof); piece(31.5, 3, 2.5, 2.5, wall);
  piece(34.5, 4, 5, 0.4, roof); piece(38.5, 5, 0.9, 0.2, gold);
  return faces;
}

function NerfScene({ className = 'w-full block', style = { aspectRatio: '16 / 9' } }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext('2d');
    const faces = buildTemple();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tilt = 0.36; const R = 36; const target = [0, 20, 0];
    let theta = 0.7; let raf = 0; let visible = true;

    const project = (p, w, h, th) => {
      const s = Math.min(h * 0.0185, w * 0.0135);
      const x1 = p[0] * Math.cos(th) + p[2] * Math.sin(th);
      const z1 = -p[0] * Math.sin(th) + p[2] * Math.cos(th);
      const y2 = p[1] * Math.cos(tilt) - z1 * Math.sin(tilt);
      const z2 = p[1] * Math.sin(tilt) + z1 * Math.cos(tilt);
      return [w / 2 + x1 * s, h / 2 + (19 - y2) * s, z2];
    };
    const rotN = (n, th) => {
      const x1 = n[0] * Math.cos(th) + n[2] * Math.sin(th);
      const z1 = -n[0] * Math.sin(th) + n[2] * Math.cos(th);
      return [x1, n[1] * Math.cos(tilt) - z1 * Math.sin(tilt), n[1] * Math.sin(tilt) + z1 * Math.cos(tilt)];
    };
    const light = unit([-0.5, 0.8, 0.6]);

    const draw = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = cv.getBoundingClientRect();
      if (cv.width !== Math.round(r.width * dpr)) { cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr); }
      const w = r.width; const h = r.height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(28,27,34,0.2)'; ctx.setLineDash([3, 5]); ctx.lineWidth = 1; ctx.beginPath();
      for (let i = 0; i <= 48; i++) {
        const a = (i / 48) * Math.PI * 2; const q = project([Math.cos(a) * R, 0, Math.sin(a) * R], w, h, 0);
        if (i) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]);
      }
      ctx.stroke(); ctx.setLineDash([]);

      const ops = [];
      faces.forEach((f) => {
        const n = rotN(f.n, theta);
        if (n[2] <= 0) return;
        const pp = f.pts.map((p) => project(p, w, h, theta));
        const z = pp.reduce((t, p) => t + p[2], 0) / pp.length;
        const shade = 0.55 + 0.45 * Math.max(0, dot(n, light));
        ops.push({ z, fn: () => {
          ctx.beginPath(); pp.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
          ctx.fillStyle = `rgb(${f.col.map((c) => Math.round(c * shade)).join(',')})`; ctx.fill();
          ctx.strokeStyle = 'rgba(28,27,34,0.5)'; ctx.lineWidth = 0.8; ctx.stroke();
        } });
      });
      const c0 = project(target, w, h, theta);
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 - theta * 0.6;
        const cp = project([Math.cos(a) * R, i % 2 ? 26 : 9, Math.sin(a) * R], w, h, 0);
        ops.push({ z: (cp[2] + c0[2]) / 2, fn: () => {
          ctx.strokeStyle = 'rgba(107,45,92,0.55)'; ctx.setLineDash([3, 4]); ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(cp[0], cp[1]); ctx.lineTo(c0[0], c0[1]); ctx.stroke(); ctx.setLineDash([]);
        } });
        ops.push({ z: cp[2] + 0.01, fn: () => {
          ctx.fillStyle = '#1c1b22'; ctx.beginPath(); ctx.roundRect(cp[0] - 7, cp[1] - 5, 14, 10, 2); ctx.fill();
          ctx.fillStyle = '#fbfbfa'; ctx.beginPath(); ctx.arc(cp[0], cp[1], 3, 0, 7); ctx.fill();
          ctx.fillStyle = '#1c1b22'; ctx.beginPath(); ctx.arc(cp[0], cp[1], 1.4, 0, 7); ctx.fill();
        } });
      }
      ops.sort((a, b) => a.z - b.z).forEach((o) => o.fn());
    };

    const loop = () => {
      if (visible) { theta += 0.012; draw(); }
      raf = requestAnimationFrame(loop);
    };
    draw();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(cv);
    if (!reduce) raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);
  return <canvas ref={ref} role="img" aria-label="A 3D temple model rotating, surrounded by orbiting cameras" className={className} style={style} />;
}

function Text() {
  const A = [[200, 40], [214, 54], [190, 58], [208, 70], [226, 44]];
  const B = [[90, 120], [106, 134], [80, 140], [100, 108], [118, 122]];
  const C = [[240, 130], [256, 118], [226, 142], [262, 140], [246, 150]];
  const q = [212, 58];
  return (
    <Frame label="Sentences embedded as points; a query links to its nearest neighbours">
      {[[A, MOSS], [B, RIVER], [C, ACCENT]].map(([pts, col], k) => pts.map((p, i) => <circle key={`${k}${i}`} cx={p[0]} cy={p[1]} r="5" fill={col} fillOpacity="0.8" />))}
      {[A[0], A[2], A[4]].map((p, i) => <line key={i} x1={q[0]} y1={q[1]} x2={p[0]} y2={p[1]} stroke={SUN} strokeWidth="2" className="edge-flow" strokeDasharray="3 3" />)}
      <circle cx={q[0]} cy={q[1]} r="9" fill={SUN} stroke={INK} strokeWidth="1.6" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="20" y={28 + i * 22} width={i === 0 ? 100 : 76 + i * 8} height="12" rx="6" fill={i === 0 ? SUN : '#fbfbfa'} stroke={INK} strokeWidth="1.2" />
          <line x1="28" x2={i === 0 ? 100 : 80} y1={34 + i * 22} y2={34 + i * 22} stroke={INK} strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      <path d="M124 34 C 150 34 160 50 192 56" stroke={SUN} strokeWidth="1.6" fill="none" strokeDasharray="2 4" />
    </Frame>
  );
}

function Saathi() {
  return (
    <Frame label="Soil layers with a sensor probe and a growing seedling">
      <rect x="0" y="108" width="320" height="22" fill="#c9a66b" />
      <rect x="0" y="130" width="320" height="26" fill="#a9794a" />
      <rect x="0" y="156" width="320" height="24" fill="#7a5233" />
      {[[40, 118], [90, 122], [200, 116], [270, 120], [60, 142], [150, 144], [240, 140], [120, 168], [210, 166], [290, 164]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" fill={INK} fillOpacity="0.3" />)}
      <path d="M110 108 V70" stroke={MOSS} strokeWidth="3" strokeLinecap="round" />
      <path d="M110 84 C 90 82 82 70 84 60 C 100 60 110 70 110 84z" fill={MOSS} />
      <path d="M110 74 C 128 72 136 60 134 50 C 118 50 108 60 110 74z" fill="#a7a5ad" />
      <rect x="226" y="52" width="10" height="82" rx="2" fill={INK} />
      <rect x="222" y="44" width="18" height="12" rx="3" fill={SUN} stroke={INK} strokeWidth="1.5" />
      {[10, 18, 26].map((r, i) => <path key={r} d={`M${231 - r} ${36 - r * 0.2} A${r} ${r} 0 0 1 ${231 + r} ${36 - r * 0.2}`} stroke={RIVER} strokeWidth="2" fill="none" strokeLinecap="round" className="node-pulse" style={{ animationDelay: `${i * 0.3}s` }} />)}
      <g fontFamily="DM Sans" fontSize="8" fill={INK} fillOpacity="0.8">
        <text x="250" y="76">temp</text><text x="250" y="88">humidity</text><text x="250" y="100">moisture</text>
      </g>
    </Frame>
  );
}

export const art = { myos: MyOS, rag: Rag, derm: Derm, nerf: NerfScene, text: Text, saathi: Saathi };
