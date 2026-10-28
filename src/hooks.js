import React, { useEffect, useRef, useState } from 'react';

export function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function useCountUp(target, active, duration = 1600, decimals = 0) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return undefined;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const [ref, inView] = useInView(0.15);
  return (
    <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${inView ? 'in' : ''} ${className}`}>
      {children}
    </Tag>
  );
}

export function SectionHead({ n, kicker, title }) {
  return (
    <Reveal className="mb-12">
      <p className="label text-clay mb-3">{n} — {kicker}</p>
      <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight max-w-3xl">{title}</h2>
    </Reveal>
  );
}
