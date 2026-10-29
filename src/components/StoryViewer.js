import React, { useCallback, useEffect, useRef, useState } from 'react';
import Avatar from './Avatar';
import Contours from './Contours';
import { Close, Pause, Play, ChevronLeft, ChevronRight } from './Icons';
import { stories, waypoints, profile, mailto } from '../data';

const DURATION = 6500;

function trailShape(W, H, pad = 8) {
  const t0 = waypoints[0].t - 0.4; const t1 = waypoints[waypoints.length - 1].t + 0.4;
  const pts = waypoints.map((w) => [pad + ((w.t - t0) / (t1 - t0)) * (W - pad * 2), H - pad - (w.alt / 100) * (H - pad * 2)]);
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]; const p1 = pts[i]; const p2 = pts[i + 1]; const p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return { pts, d };
}

const trail = trailShape(300, 70);

function MiniTrail({ current }) {
  return (
    <svg viewBox="0 0 300 70" className="mt-8 w-full" aria-hidden="true">
      <path d={trail.d} fill="none" stroke="#fbfbfa" strokeOpacity="0.45" strokeWidth="1.5" />
      {trail.pts.map(([x, y], n) => (
        <circle key={n} cx={x} cy={y} r={n === current ? 5.5 : 3} fill={n === current ? '#d3a6c6' : '#fbfbfa'} fillOpacity={n <= current ? 1 : 0.35} />
      ))}
    </svg>
  );
}

function Intro() {
  return (
    <div>
      <Avatar size={88} label="Kriti Nyoupane" />
      <p className="mt-5 text-[28px] font-semibold leading-tight tracking-tight">Hi, I'm Kriti.</p>
      <p className="label mt-3 text-accentl">{profile.roles}</p>
      <p className="mt-4 leading-relaxed text-paper/85">{profile.bio}</p>
      <p className="mt-3 text-sm text-paper/60">{profile.from}</p>
      <p className="mt-10 text-sm text-paper/60">Tap to walk my trail →</p>
    </div>
  );
}

function Waypoint({ w, k }) {
  return (
    <div>
      <p className="label text-accentl">{`${k + 1} of ${waypoints.length} · ${w.kicker}`}</p>
      <p className="mt-3 text-[26px] font-semibold leading-tight tracking-tight">{w.title}</p>
      <p className="mt-1 text-paper/70">{w.place}</p>
      <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-paper/90">
        {w.points.map((p) => <li key={p} className="flex gap-2.5"><span className="text-accentl">•</span><span>{p}</span></li>)}
      </ul>
      <MiniTrail current={k} />
    </div>
  );
}

export default function StoryViewer({ start, onClose, onSeen }) {
  const [i, setI] = useState(start);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reply, setReply] = useState('');
  const [reduce] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const elapsed = useRef(0);
  const downAt = useRef(0);
  const closeBtn = useRef(null);
  const s = stories[i];

  const go = useCallback((n) => {
    if (n < 0) return;
    if (n >= stories.length) onClose(); else setI(n);
  }, [onClose]);

  useEffect(() => {
    elapsed.current = 0;
    setProgress(0);
    onSeen(stories[i].id);
  }, [i, onSeen]);

  useEffect(() => {
    if (paused || held || reduce) return undefined;
    let raf;
    let last = performance.now();
    const tick = (t) => {
      elapsed.current += t - last;
      last = t;
      const p = Math.min(1, elapsed.current / DURATION);
      setProgress(p);
      if (p >= 1) go(i + 1); else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [i, paused, held, reduce, go]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight') go(i + 1);
      else if (e.key === 'ArrowLeft') go(i - 1);
      else if (e.key === ' ') { e.preventDefault(); setPaused((p) => !p); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i, go, onClose]);

  useEffect(() => {
    const before = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    if (closeBtn.current) closeBtn.current.focus();
    return () => {
      document.body.style.overflow = overflow;
      if (before && before.focus) before.focus();
    };
  }, []);

  const press = () => { downAt.current = Date.now(); setHeld(true); };
  const release = (dir) => () => {
    if (!downAt.current) return;
    const tap = Date.now() - downAt.current < 250;
    downAt.current = 0;
    setHeld(false);
    if (tap) go(i + dir);
  };
  const cancel = () => { downAt.current = 0; setHeld(false); };

  const sendReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    window.location.href = mailto(`Re: your story, ${s.title || 'hello'}`, reply.trim());
    setReply('');
  };

  const side = 'hidden md:flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper/90 text-ink';

  return (
    <div role="dialog" aria-modal="true" aria-label="Kriti's journey, told as stories"
      className="fixed inset-0 z-50 flex items-center justify-center gap-5 bg-[#111014]/95">
      {i > 0 ? <button onClick={() => go(i - 1)} aria-label="Previous story" className={side}><ChevronLeft size={18} strokeWidth={2.4} /></button> : <span className="hidden md:block w-9" />}

      <div className="relative flex h-full w-full select-none flex-col overflow-hidden bg-ink text-paper md:aspect-[9/16] md:h-[min(88vh,820px)] md:w-auto md:rounded-xl">
        <Contours className="absolute inset-0 h-full w-full opacity-40" stroke="#d3a6c6" />

        <div className="relative flex gap-1 px-3 pt-3" aria-hidden="true">
          {stories.map((x, n) => {
            let width = 0;
            if (n < i) width = 100;
            else if (n === i) width = reduce ? 100 : progress * 100;
            return (
              <span key={x.id} className="h-[2px] flex-1 overflow-hidden rounded-full bg-paper/30">
                <span className="block h-full bg-paper" style={{ width: `${width}%` }} />
              </span>
            );
          })}
        </div>

        <div className="relative flex items-center gap-2.5 px-3 pt-3">
          <Avatar size={32} />
          <p className="text-sm"><span className="font-semibold">{profile.handle}</span> <span className="text-paper/60">{s.period || 'Hello'}</span></p>
          <button onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play stories' : 'Pause stories'} className="ml-auto p-1.5">
            {paused ? <Play size={20} filled /> : <Pause size={20} strokeWidth={2.4} />}
          </button>
          <button ref={closeBtn} onClick={onClose} aria-label="Close stories" className="p-1.5"><Close size={22} /></button>
        </div>

        <div className="relative min-h-0 flex-1">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 z-10 w-1/3"
            onPointerDown={press} onPointerUp={release(-1)} onPointerLeave={cancel} />
          <div aria-hidden="true" className="absolute inset-y-0 right-0 z-10 w-2/3"
            onPointerDown={press} onPointerUp={release(1)} onPointerLeave={cancel} />
          <div key={s.id} aria-live="polite" className="flex h-full animate-[fadein_.35s_ease] flex-col justify-center overflow-y-auto px-6">
            {s.id === 'hi' ? <Intro /> : <Waypoint w={s} k={i - 1} />}
          </div>
        </div>

        <form onSubmit={sendReply} className="relative flex items-center gap-2 px-3 pt-2 pb-4">
          <input value={reply} onChange={(e) => setReply(e.target.value)}
            onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
            placeholder={`Reply to ${profile.handle}…`} aria-label="Reply to Kriti by email"
            className="flex-1 rounded-full border border-paper/40 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-paper/60 focus:border-paper" />
          {reply.trim() && <button type="submit" className="text-sm font-semibold">Send</button>}
        </form>
      </div>

      {i < stories.length - 1 ? <button onClick={() => go(i + 1)} aria-label="Next story" className={side}><ChevronRight size={18} strokeWidth={2.4} /></button> : <span className="hidden md:block w-9" />}
    </div>
  );
}
