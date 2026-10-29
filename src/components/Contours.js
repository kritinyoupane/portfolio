import React, { useMemo } from 'react';

export const GW = 64;
export const GH = 40;

const peaks = [
  [14, 12, 9, 1.0], [44, 10, 11, 1.25], [30, 26, 12, 0.9],
  [54, 30, 8, 0.8], [8, 32, 8, 0.7], [36, 4, 6, 0.5],
];

export function field(x, y) {
  let v = 0;
  for (const [px, py, r, h] of peaks) {
    const d = ((x - px) ** 2 + (y - py) ** 2) / (r * r);
    v += h * Math.exp(-d);
  }
  return v + 0.06 * Math.sin(x * 0.45 + y * 0.3) + 0.04 * Math.sin(y * 0.9 - x * 0.2);
}

const LEVELS = 22;
const SEGS = {
  1: [['l', 'b']], 2: [['b', 'r']], 3: [['l', 'r']], 4: [['t', 'r']],
  5: [['t', 'l'], ['b', 'r']], 6: [['t', 'b']], 7: [['t', 'l']], 8: [['t', 'l']],
  9: [['t', 'b']], 10: [['t', 'r'], ['l', 'b']], 11: [['t', 'r']], 12: [['l', 'r']],
  13: [['b', 'r']], 14: [['l', 'b']],
};

export function fieldRange() {
  let lo = Infinity; let hi = -Infinity;
  for (let j = 0; j <= GH; j++) for (let i = 0; i <= GW; i++) {
    const f = field(i, j); lo = Math.min(lo, f); hi = Math.max(hi, f);
  }
  return [lo, hi];
}

function buildPaths() {
  const [lo, hi] = fieldRange();
  const grid = [];
  for (let j = 0; j <= GH; j++) { grid[j] = []; for (let i = 0; i <= GW; i++) grid[j][i] = field(i, j); }
  const minor = []; const major = [];
  for (let k = 1; k < LEVELS; k++) {
    const t = lo + ((hi - lo) * k) / LEVELS;
    let d = '';
    for (let j = 0; j < GH; j++) for (let i = 0; i < GW; i++) {
      const a = grid[j][i]; const b = grid[j][i + 1]; const c = grid[j + 1][i + 1]; const dd = grid[j + 1][i];
      const idx = (a > t ? 8 : 0) | (b > t ? 4 : 0) | (c > t ? 2 : 0) | (dd > t ? 1 : 0);
      const segs = SEGS[idx];
      if (!segs) continue;
      const pt = (e) => {
        if (e === 't') return [i + (t - a) / (b - a), j];
        if (e === 'r') return [i + 1, j + (t - b) / (c - b)];
        if (e === 'b') return [i + (t - dd) / (c - dd), j + 1];
        return [i, j + (t - a) / (dd - a)];
      };
      for (const [e1, e2] of segs) {
        const [x1, y1] = pt(e1); const [x2, y2] = pt(e2);
        d += `M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}`;
      }
    }
    (k % 4 === 0 ? major : minor).push(d);
  }
  return { minor: minor.join(''), major: major.join('') };
}

export default function Contours({ className = '', stroke = '#1c1b22' }) {
  const { minor, major } = useMemo(buildPaths, []);
  return (
    <svg className={className} viewBox={`0 0 ${GW} ${GH}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path d={minor} fill="none" stroke={stroke} strokeOpacity="0.2" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path d={major} fill="none" stroke={stroke} strokeOpacity="0.45" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
