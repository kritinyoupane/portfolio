import React, { useEffect, useRef } from 'react';

export default function AltMeter() {
  const txt = useRef(null);
  const bar = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      const alt = Math.round(1400 + p * (8849 - 1400));
      if (txt.current) txt.current.textContent = `${alt.toLocaleString('en-US')} m`;
      if (bar.current) bar.current.style.height = `${p * 100}%`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="hidden 2xl:flex fixed left-4 bottom-6 z-30 items-end gap-2 pointer-events-none" aria-hidden="true">
      <div className="w-[3px] h-28 bg-ink/15 rounded relative overflow-hidden">
        <div ref={bar} className="absolute bottom-0 inset-x-0 bg-clay rounded" style={{ height: 0 }} />
      </div>
      <div className="label text-ink/60 leading-tight">
        <div>alt.</div>
        <div ref={txt} className="text-ink">1,400 m</div>
      </div>
    </div>
  );
}
