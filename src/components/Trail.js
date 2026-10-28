import React, { useState } from 'react';
import { waypoints } from '../data';
import { SectionHead, Reveal } from '../hooks';

const W = 900; const H = 260; const PAD = 40;
const t0 = 2014.6; const t1 = 2027.3;
const px = (t) => PAD + ((t - t0) / (t1 - t0)) * (W - PAD * 2);
const py = (a) => H - 34 - (a / 100) * (H - 90);
const pts = waypoints.map((w) => [px(w.t), py(w.alt)]);

function spline(p) {
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i]; const p1 = p[i]; const p2 = p[i + 1]; const p3 = p[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

const line = spline(pts);
const area = `${line} L${pts[pts.length - 1][0]} ${H - 34} L${pts[0][0]} ${H - 34} Z`;

export default function Trail() {
  const [i, setI] = useState(4);
  const w = waypoints[i];
  const go = (n) => setI((n + waypoints.length) % waypoints.length);

  return (
    <section id="trail" className="max-w-6xl mx-auto px-5 py-24">
      <SectionHead n="01" kicker="The trail" title="A route from a +2 classroom in Kathmandu to a conference stage in Japan." />
      <Reveal>
        <div className="border border-ink/15 rounded-2xl bg-paper2/50 p-3 md:p-6">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="group" aria-label="Elevation profile of career and education">
            <defs>
              <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="7" stroke="#4f6f3a" strokeOpacity="0.22" strokeWidth="1.5" />
              </pattern>
            </defs>
            {[0, 1, 2, 3].map((g) => (
              <line key={g} x1={PAD} x2={W - PAD} y1={py(g * 33.3)} y2={py(g * 33.3)} stroke="#1b2a22" strokeOpacity="0.1" strokeDasharray="3 5" />
            ))}
            <path d={area} fill="url(#hatch)" />
            <path d={line} fill="none" stroke="#1b2a22" strokeWidth="2.2" strokeLinejoin="round" />
            {[2015, 2018, 2021, 2024, 2026].map((y) => (
              <text key={y} x={px(y)} y={H - 10} textAnchor="middle" className="fill-ink/50" fontSize="11" fontFamily="IBM Plex Mono">{y}</text>
            ))}
            {waypoints.map((p, n) => {
              const [x, y] = pts[n]; const on = n === i;
              return (
                <g key={p.id} tabIndex={0} role="button" aria-label={`${p.period}: ${p.title}`} aria-pressed={on}
                  onClick={() => setI(n)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setI(n); } }}
                  className="cursor-pointer outline-none group">
                  <circle cx={x} cy={y} r="26" fill="transparent" />
                  <line x1={x} x2={x} y1={y} y2={H - 34} stroke="#c0532b" strokeOpacity={on ? 0.9 : 0.25} strokeWidth="1.5" />
                  <circle cx={x} cy={y} r={on ? 11 : 7} fill={on ? '#c0532b' : '#f2ebdb'} stroke="#c0532b" strokeWidth="2.5" className="transition-all group-focus-visible:stroke-ink" />
                  <text x={x} y={y + 4} textAnchor="middle" fontSize={on ? 11 : 9} fontFamily="IBM Plex Mono" className={on ? 'fill-paper' : 'fill-clay'} fontWeight="500">{n + 1}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </Reveal>

      <div className="mt-6 grid md:grid-cols-[1fr_2fr] gap-6 items-start" aria-live="polite">
        <div>
          <p className="label text-clay">{`Waypoint ${i + 1} / ${waypoints.length} · ${w.kicker}`}</p>
          <p className="font-mono text-sm mt-2 text-ink/60">{w.period}</p>
          <div className="mt-5 flex gap-3">
            <button onClick={() => go(i - 1)} className="w-11 h-11 rounded-full border border-ink hover:bg-ink hover:text-paper transition-colors" aria-label="Previous waypoint">←</button>
            <button onClick={() => go(i + 1)} className="w-11 h-11 rounded-full border border-ink hover:bg-ink hover:text-paper transition-colors" aria-label="Next waypoint">→</button>
          </div>
        </div>
        <div key={w.id} className="border-l-2 border-clay pl-6 animate-[fadein_.4s_ease]">
          <h3 className="font-display text-2xl md:text-3xl font-semibold">{w.title}</h3>
          <p className="text-moss font-medium mt-1">{w.place}</p>
          <ul className="mt-4 space-y-2 text-ink/80 leading-relaxed">
            {w.points.map((p) => <li key={p} className="flex gap-3"><span className="text-clay mt-2 text-[8px]">▲</span><span>{p}</span></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
