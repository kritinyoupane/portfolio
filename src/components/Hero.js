import React, { useRef } from 'react';
import Contours, { GW, GH, field, fieldRange } from './Contours';

const [LO, HI] = fieldRange();

export default function Hero() {
  const wrap = useRef(null);
  const layer = useRef(null);
  const pin = useRef(null);
  const read = useRef(null);

  const onMove = (e) => {
    const r = wrap.current.getBoundingClientRect();
    const x = e.clientX - r.left; const y = e.clientY - r.top;
    const s = Math.max(r.width / GW, r.height / GH);
    const gx = (x - (r.width - GW * s) / 2) / s;
    const gy = (y - (r.height - GH * s) / 2) / s;
    const f = field(Math.min(GW, Math.max(0, gx)), Math.min(GH, Math.max(0, gy)));
    const elev = Math.round(800 + ((f - LO) / (HI - LO)) * 7200);
    layer.current.style.transform = `translate(${(0.5 - x / r.width) * 18}px, ${(0.5 - y / r.height) * 12}px)`;
    pin.current.style.opacity = 1;
    pin.current.style.transform = `translate(${x}px, ${y}px)`;
    read.current.textContent = `${elev.toLocaleString('en-US')} m`;
  };

  return (
    <section
      id="top"
      ref={wrap}
      onMouseMove={onMove}
      onMouseLeave={() => { if (pin.current) pin.current.style.opacity = 0; }}
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-14"
    >
      <div ref={layer} className="absolute -inset-6 transition-transform duration-300 ease-out">
        <Contours className="w-full h-full drift" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/85 to-transparent md:to-paper/10 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 w-full py-16 grid md:grid-cols-[1.25fr_0.75fr] gap-12 items-center">
        <div>
        <p className="label text-clay mb-6">Portfolio · Originally from Gulmi · Based in Kathmandu</p>
        <h1 className="font-display font-semibold tracking-tight leading-[0.95] text-[clamp(3.2rem,10vw,8rem)]">
          Kriti<br />
          <span className="italic text-moss">Nyoupane</span>
          <svg className="mt-2 w-48 md:w-72 h-3" viewBox="0 0 200 10" fill="none" aria-hidden="true">
            <path d="M2 6 Q 14 0 26 6 T 50 6 T 74 6 T 98 6 T 122 6 T 146 6 T 170 6 T 198 6" stroke="#e3a72f" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </h1>
        <p className="mt-8 max-w-xl text-lg md:text-xl text-ink/80 leading-relaxed">
          Project manager, systems analyst and software developer. Lately I've been teaching{' '}
          <strong className="font-semibold text-ink">384,077 soil records</strong> to recommend fertilizer across all{' '}
          <strong className="font-semibold text-ink">77 districts</strong> of Nepal.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#trail" className="px-6 py-3 bg-ink text-paper rounded-full font-medium hover:bg-clay transition-colors">Follow the trail ↓</a>
          <a href="#contact" className="px-6 py-3 border border-ink rounded-full font-medium hover:bg-ink hover:text-paper transition-colors">Say hello</a>
        </div>
        <p className="label text-ink/50 mt-12 hidden md:block">Move your cursor across the map</p>
        </div>

        <figure className="relative w-full max-w-[320px] md:max-w-none mx-auto md:ml-auto">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full border-2 border-clay" aria-hidden="true" />
          <div className="relative aspect-[3/4] rounded-t-full overflow-hidden bg-paper2 border-2 border-ink">
            <img src={`${process.env.PUBLIC_URL}/kriti.jpg`} alt="Portrait of Kriti Nyoupane" className="w-full h-full object-cover object-[50%_32%]" />
          </div>
          <figcaption className="label text-ink/60 mt-9 text-center">Kriti · Kathmandu, Nepal</figcaption>
        </figure>
      </div>

      <div ref={pin} className="absolute top-0 left-0 pointer-events-none opacity-0 transition-opacity z-10" aria-hidden="true">
        <div className="-translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-clay ring-4 ring-clay/25" />
        <div ref={read} className="label ml-3 -mt-5 bg-ink text-paper px-2 py-1 rounded whitespace-nowrap w-fit" />
      </div>
    </section>
  );
}
