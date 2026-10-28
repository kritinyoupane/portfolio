import React, { useState } from 'react';
import { disciplines } from '../data';
import { SectionHead, Reveal } from '../hooks';

const circles = {
  ai: { cx: 158, cy: 122, r: 92, lx: 106, ly: 100 },
  se: { cx: 242, cy: 122, r: 92, lx: 296, ly: 100 },
  pm: { cx: 200, cy: 200, r: 100, lx: 200, ly: 268 },
};

const path = [['ML research', '2021'], ['Software engineer', '2023'], ['Project manager', 'now']];

export default function Experiences() {
  const [sel, setSel] = useState('pm');
  const d = disciplines.find((x) => x.id === sel);

  return (
    <section id="experiences" className="max-w-6xl mx-auto px-5 pt-24 pb-24">
      <SectionHead n="04" kicker="Experiences" title="Three disciplines, one overlap, and the part I've chosen to lead." />

      <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 items-center">
        <Reveal>
          <svg viewBox="0 0 400 330" className="w-full h-auto max-w-md mx-auto" role="group" aria-label="Venn diagram of AI/ML, Software Engineering and Project Management">
            {disciplines.map((x) => {
              const c = circles[x.id]; const on = sel === x.id;
              return (
                <g key={x.id} tabIndex={0} role="button" aria-pressed={on} aria-label={x.name}
                  onClick={() => setSel(x.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(x.id); } }}
                  className="cursor-pointer outline-none group">
                  <circle cx={c.cx} cy={c.cy} r={c.r} fill={x.color} fillOpacity={on ? 0.42 : 0.2}
                    stroke={x.color} strokeWidth={on ? 3 : 1.5} style={{ mixBlendMode: 'multiply', transition: 'all .3s' }}
                    className="group-focus-visible:stroke-ink" />
                </g>
              );
            })}
            <circle cx="200" cy="200" r="112" fill="none" stroke="#e3a72f" strokeWidth="2" strokeDasharray="5 6" className="node-pulse" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            <g pointerEvents="none" fontFamily="IBM Plex Mono" fontSize="11" fill="#1b2a22" textAnchor="middle">
              <text x={circles.ai.lx} y={circles.ai.ly} fontWeight="500">AI / ML</text>
              <text x={circles.se.lx} y={circles.se.ly} fontWeight="500">Software</text>
              <text x={circles.se.lx} y={circles.se.ly + 13} fontWeight="500">Eng.</text>
              <text x={circles.pm.lx} y={circles.pm.ly} fontWeight="500">Project Mgmt</text>
              <text x="200" y="141" fontSize="7.5" fontWeight="500">Projects with</text>
              <text x="200" y="151" fontSize="7.5" fontWeight="500">close-knit AI</text>
              <text x="200" y="161" fontSize="7.5" fontWeight="500">integration</text>
            </g>
            <g pointerEvents="none">
              <rect x="276" y="270" width="62" height="20" rx="10" fill="#e3a72f" />
              <text x="307" y="284" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="10" fontWeight="500" fill="#1b2a22">★ NICHE</text>
              <path d="M276 282 Q 258 286 250 270" stroke="#e3a72f" strokeWidth="1.5" fill="none" />
            </g>
          </svg>
          <p className="label text-ink/50 text-center mt-2">Tap a circle</p>
        </Reveal>

        <div>
          <div role="tablist" className="flex flex-wrap gap-2 mb-6">
            {disciplines.map((x) => (
              <button key={x.id} role="tab" aria-selected={sel === x.id} onClick={() => setSel(x.id)}
                className={`px-4 py-2 rounded-full border font-medium transition-colors ${sel === x.id ? 'bg-ink text-paper border-ink' : 'border-ink/30 hover:border-ink'}`}>
                {x.name}{x.id === 'pm' && <span className="ml-2 text-sun">★</span>}
              </button>
            ))}
          </div>
          <div key={d.id} className="animate-[fadein_.4s_ease]">
            <p className="font-display italic text-2xl" style={{ color: d.color }}>{d.line}</p>
            <p className="mt-4 text-ink/80 leading-relaxed">{d.text}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {d.chips.map((c) => (
                <li key={c} className="font-mono text-xs px-2.5 py-1 rounded-full border" style={{ borderColor: `${d.color}88`, color: d.color }}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Reveal className="mt-16 border-t border-ink/15 pt-8">
        <p className="label text-clay mb-5">How I got here</p>
        <ol className="flex flex-col md:flex-row md:items-center gap-4 md:gap-3">
          {path.map(([t, y], n) => (
            <React.Fragment key={t}>
              <li className={`rounded-2xl px-5 py-4 border ${n === 2 ? 'bg-ink text-paper border-ink' : 'border-ink/25'}`}>
                <span className={`font-mono text-xs ${n === 2 ? 'text-sun' : 'text-ink/50'}`}>{y}</span>
                <span className="block font-display text-xl font-semibold">{t}{n === 2 && <span className="text-sun"> ★</span>}</span>
              </li>
              {n < 2 && <li aria-hidden="true" className="text-clay md:text-2xl rotate-90 md:rotate-0 self-start md:self-auto ml-6 md:ml-0">→</li>}
            </React.Fragment>
          ))}
        </ol>
        <p className="mt-6 max-w-2xl text-ink/70 leading-relaxed">
          Having built AI systems myself, I know what the team is up against. Now I work out what the client needs, plan how to get there, and keep everyone moving.
        </p>
      </Reveal>
    </section>
  );
}
