import React, { useCallback, useEffect, useRef, useState } from 'react';
import Avatar from './Avatar';
import { glyphs, ChevronLeft, ChevronRight } from './Icons';
import { stories } from '../data';

export default function Stories({ seen, onOpen }) {
  const row = useRef(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  const measure = useCallback(() => {
    const el = row.current;
    if (el) setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const nudge = (dir) => row.current.scrollBy({ left: dir * 260, behavior: 'smooth' });
  const arrow = 'hidden md:flex absolute top-[34px] h-7 w-7 items-center justify-center rounded-full border border-ink/10 bg-paper shadow';

  return (
    <nav aria-label="Stories" className="relative border-b border-ink/10 md:mb-4 md:border-0">
      <ul ref={row} onScroll={measure} className="no-scrollbar flex gap-3 overflow-x-auto px-3 py-3 md:px-1">
        {stories.map((s, n) => {
          const Glyph = s.glyph && glyphs[s.glyph];
          const isSeen = seen.includes(s.id);
          return (
            <li key={s.id} className="shrink-0">
              <button onClick={() => onOpen(n)} className="flex w-[70px] flex-col items-center gap-1"
                aria-label={`${s.short} story${isSeen ? ', seen' : ''}`}>
                <span className={`rounded-full p-[2.5px] ${isSeen ? 'bg-ink/15' : 'bg-accent'}`}>
                  <span className="block rounded-full bg-paper p-[2.5px]">
                    {Glyph
                      ? <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper2"><Glyph size={26} strokeWidth={1.6} /></span>
                      : <Avatar size={56} />}
                  </span>
                </span>
                <span className="w-full truncate text-center text-xs text-ink/80">{s.short}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {edges.left && <button onClick={() => nudge(-1)} aria-label="Scroll stories left" className={`${arrow} left-0`}><ChevronLeft size={16} strokeWidth={2.4} /></button>}
      {edges.right && <button onClick={() => nudge(1)} aria-label="Scroll stories right" className={`${arrow} right-0`}><ChevronRight size={16} strokeWidth={2.4} /></button>}
    </nav>
  );
}
