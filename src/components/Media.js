import React from 'react';
import Contours from './Contours';
import { art } from './Illustrations';
import { Reel } from './Icons';
import { useInView, useCountUp } from '../hooks';
import { disciplines } from '../data';

const photo = `${process.env.PUBLIC_URL}/kriti.jpg`;
const LILAC = '#d3a6c6';

export function Portrait() {
  return <img src={photo} alt="Portrait of Kriti Nyoupane" draggable="false" className="h-full w-full object-cover object-[50%_32%]" />;
}

const Dark = ({ className = '', children }) => (
  <div className={`relative h-full w-full overflow-hidden bg-ink text-paper ${className}`}>{children}</div>
);

export function ThesisCover() {
  return (
    <Dark className="flex flex-col justify-end p-7 md:p-9">
      <Contours className="absolute inset-0 h-full w-full opacity-50" stroke={LILAC} />
      <div className="relative">
        <p className="label text-accentl">MSc thesis · 2026</p>
        <p className="mt-3 text-[32px] font-semibold leading-[1.05] tracking-tight md:text-[40px]">Every field in Nepal has a different appetite.</p>
        <p className="mt-4 text-sm text-paper/70">Swipe for the numbers →</p>
      </div>
    </Dark>
  );
}

export function DistrictsSlide() {
  const [ref, inView] = useInView(0.5);
  return (
    <Dark className="flex flex-col items-center justify-center p-8">
      <div ref={ref} role="img" aria-label="77 dots, one for each district of Nepal" className="grid w-full max-w-[300px] grid-cols-11 gap-2">
        {Array.from({ length: 77 }, (_, n) => (
          <span key={n} style={{ transitionDelay: `${n * 18}ms` }}
            className={`aspect-square rounded-full transition-all duration-500 ${inView ? 'scale-100 bg-accentl' : 'scale-75 bg-paper/10'}`} />
        ))}
      </div>
      <p className="mt-8 text-5xl font-semibold tabular-nums">77</p>
      <p className="label mt-2 text-paper/60">districts covered, one dot each</p>
    </Dark>
  );
}

export function StatSlide({ value, decimals = 0, suffix = '', label, note }) {
  const [ref, inView] = useInView(0.5);
  const v = useCountUp(value, inView, 1600, decimals);
  return (
    <Dark className="flex flex-col justify-center p-8 md:p-10">
      <Contours className="absolute inset-0 h-full w-full opacity-20" stroke={LILAC} />
      <div ref={ref} className="relative">
        <p className="text-[64px] font-semibold leading-none tracking-tight tabular-nums text-accentl md:text-[80px]">{v}{suffix}</p>
        <p className="mt-4 text-xl font-semibold">{label}</p>
        {note && <p className="mt-2 max-w-xs text-sm leading-relaxed text-paper/70">{note}</p>}
      </div>
    </Dark>
  );
}

const circles = {
  ai: { cx: 158, cy: 122, r: 92, lx: 106, ly: 100 },
  se: { cx: 242, cy: 122, r: 92, lx: 296, ly: 100 },
  pm: { cx: 200, cy: 200, r: 100, lx: 200, ly: 268 },
};

export function VennSlide({ sel, onSelect }) {
  return (
    <div className="flex h-full w-full flex-col justify-center bg-paper2 p-6 md:p-8">
      <p className="label text-accent">Three disciplines, one niche</p>
      <svg viewBox="0 0 400 330" className="mt-4 h-auto w-full" role="group" aria-label="Venn diagram of AI/ML, Software Engineering and Project Management">
        {disciplines.map((x) => {
          const c = circles[x.id]; const on = sel === x.id;
          return (
            <g key={x.id} tabIndex={0} role="button" aria-pressed={on} aria-label={x.name}
              onClick={(e) => { e.stopPropagation(); onSelect(x.id); }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(x.id); } }}
              className="group cursor-pointer outline-none">
              <circle cx={c.cx} cy={c.cy} r={c.r} fill={x.color} fillOpacity={on ? 0.36 : 0.14}
                stroke={x.color} strokeWidth={on ? 3 : 1.5} style={{ mixBlendMode: 'multiply', transition: 'all .3s' }}
                className="group-focus-visible:stroke-ink" />
            </g>
          );
        })}
        <circle cx="200" cy="200" r="112" fill="none" stroke="#6b2d5c" strokeWidth="2" strokeDasharray="5 6" />
        <g pointerEvents="none" fontFamily="DM Sans" fontSize="11" fontWeight="500" fill="#1c1b22" textAnchor="middle">
          <text x={circles.ai.lx} y={circles.ai.ly}>AI / ML</text>
          <text x={circles.se.lx} y={circles.se.ly}>Software</text>
          <text x={circles.se.lx} y={circles.se.ly + 13}>Eng.</text>
          <text x={circles.pm.lx} y={circles.pm.ly}>Project Mgmt</text>
          <text x="200" y="141" fontSize="7.5">Projects with</text>
          <text x="200" y="151" fontSize="7.5">close-knit AI</text>
          <text x="200" y="161" fontSize="7.5">integration</text>
        </g>
        <g pointerEvents="none">
          <rect x="276" y="270" width="62" height="20" rx="10" fill="#6b2d5c" />
          <text x="307" y="284" textAnchor="middle" fontFamily="DM Sans" fontSize="10" fontWeight="700" fill="#fbfbfa">★ NICHE</text>
          <path d="M276 282 Q 258 286 250 270" stroke="#6b2d5c" strokeWidth="1.5" fill="none" />
        </g>
      </svg>
    </div>
  );
}

export function DisciplineSlide({ d }) {
  return (
    <div className="flex h-full w-full flex-col justify-center bg-paper2 p-6 md:p-8">
      <p className="label" style={{ color: d.color }}>{d.name}{d.id === 'pm' ? ' · ★ niche' : ''}</p>
      <p className="mt-2 text-[22px] font-semibold leading-snug tracking-tight md:text-2xl">{d.line}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink/75">{d.text}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {d.chips.map((c) => (
          <li key={c} className="rounded-full border px-2.5 py-1 text-xs" style={{ borderColor: `${d.color}55`, color: d.color }}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

export function PathSlide() {
  const steps = [['2021', 'ML research'], ['2023', 'Software engineer'], ['Now', 'Project manager']];
  return (
    <div className="flex h-full w-full flex-col justify-center bg-paper2 p-6 md:p-8">
      <p className="label text-accent">How I got here</p>
      <ol className="mt-4 space-y-2">
        {steps.map(([y, t], n) => (
          <li key={t} className={`rounded-xl px-4 py-3 ${n === 2 ? 'bg-ink text-paper' : 'border border-ink/10 bg-paper'}`}>
            <span className={`text-xs ${n === 2 ? 'text-accentl' : 'text-ink/50'}`}>{y}</span>
            <span className="block text-lg font-semibold">{t}{n === 2 && <span className="text-accentl"> ★</span>}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm leading-relaxed text-ink/70">
        Having built AI systems myself, I know what the team is up against. Now I work out what the client needs, plan how to get there, and keep everyone moving.
      </p>
    </div>
  );
}

export function ProjectCard({ p }) {
  const Art = art[p.art];
  return (
    <div className="flex h-full w-full flex-col justify-between bg-paper2 p-6 md:p-8">
      <div>
        <p className="label text-accent">{p.kind}</p>
        <p className="mt-1.5 text-2xl font-semibold tracking-tight md:text-[28px]">{p.title}</p>
      </div>
      <div className="-mx-2"><Art /></div>
    </div>
  );
}

export function ReelMedia({ p }) {
  const Scene = art.nerf;
  return (
    <div className="relative h-full w-full bg-paper2">
      <Scene className="absolute inset-0 block h-full w-full" style={{}} />
      <div className="pointer-events-none absolute inset-x-0 top-0 p-6 md:p-8">
        <p className="label text-accent">{p.kind} · Reel</p>
        <p className="mt-1.5 text-2xl font-semibold tracking-tight md:text-[28px]">{p.title}</p>
      </div>
      <span className="pointer-events-none absolute bottom-3 right-3 text-ink/60" aria-hidden="true"><Reel size={22} /></span>
    </div>
  );
}

export function PaperCard({ paper, dark = false }) {
  return (
    <div className={`flex h-full w-full flex-col justify-between p-7 md:p-9 ${dark ? 'bg-ink text-paper' : 'bg-paper2'}`}>
      <p className={`label ${dark ? 'text-accentl' : 'text-accent'}`}>{paper.tag}</p>
      <p className="text-[22px] font-semibold leading-snug tracking-tight md:text-[26px]">{paper.title}</p>
      <div>
        <p className={`text-sm ${dark ? 'text-paper/75' : 'text-ink/75'}`}>{paper.venue}</p>
        <p className={`mt-2 text-xs ${dark ? 'text-paper/50' : 'text-ink/50'}`}>{paper.authors}</p>
      </div>
    </div>
  );
}

export function ListCard({ kicker, title, rows }) {
  return (
    <div className="flex h-full w-full flex-col justify-center bg-paper2 p-7 md:p-9">
      <p className="label text-accent">{kicker}</p>
      <p className="mt-1.5 text-2xl font-semibold tracking-tight">{title}</p>
      <ul className="mt-5 divide-y divide-ink/10">
        {rows.map(([a, b]) => (
          <li key={b} className="flex gap-4 py-2.5 text-sm"><span className="w-10 shrink-0 font-medium text-accent">{a}</span><span>{b}</span></li>
        ))}
      </ul>
    </div>
  );
}
