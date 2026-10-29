import React, { useCallback, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from './Icons';

export default function Carousel({ slides, aspect, label, onIndex }) {
  const track = useRef(null);
  const [index, setIndex] = useState(0);

  const go = useCallback((n) => {
    const el = track.current;
    if (el) el.scrollTo({ left: n * el.clientWidth, behavior: 'smooth' });
  }, []);

  const onScroll = () => {
    const el = track.current;
    const n = Math.round(el.scrollLeft / el.clientWidth);
    if (n !== index) {
      setIndex(n);
      if (onIndex) onIndex(n);
    }
  };

  const step = (dir) => (e) => { e.stopPropagation(); go(index + dir); };
  const arrow = 'hidden md:flex absolute top-1/2 h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink shadow';

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={track} onScroll={onScroll} className={`no-scrollbar flex snap-x snap-mandatory overflow-x-auto ${aspect}`}>
        {slides.map((s, n) => (
          <div key={n} role="group" aria-roledescription="slide" aria-label={`${n + 1} of ${slides.length}`}
            className="relative h-full w-full shrink-0 snap-center">
            {typeof s === 'function' ? s({ go, index }) : s}
          </div>
        ))}
      </div>
      {index > 0 && <button onClick={step(-1)} aria-label="Previous slide" className={`${arrow} left-2`}><ChevronLeft size={16} strokeWidth={2.4} /></button>}
      {index < slides.length - 1 && <button onClick={step(1)} aria-label="Next slide" className={`${arrow} right-2`}><ChevronRight size={16} strokeWidth={2.4} /></button>}
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ink/70 px-2 py-0.5 text-xs tabular-nums text-paper">
        {index + 1}/{slides.length}
      </span>
    </div>
  );
}
