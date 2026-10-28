import React from 'react';
import { useInView, useCountUp, SectionHead } from '../hooks';

function Stat({ value, decimals = 0, suffix = '', label, active }) {
  const v = useCountUp(value, active, 1800, decimals);
  return (
    <div>
      <div className="font-display text-5xl md:text-6xl font-semibold text-sun tabular-nums">{v}{suffix}</div>
      <div className="label text-paper/60 mt-2">{label}</div>
    </div>
  );
}

export default function Dataset() {
  const [ref, inView] = useInView(0.3);
  return (
    <section id="data" className="bg-ink text-paper">
      <div ref={ref} className="max-w-6xl mx-auto px-5 py-24">
        <div className="[&_h2]:text-paper [&_p]:text-sun">
          <SectionHead n="02" kicker="The dataset" title="Every field in Nepal has a different appetite." />
        </div>
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <p className="text-paper/80 text-lg leading-relaxed max-w-xl">
              For my MSc thesis I taught a model to read Nepal's soil. A pipeline pulls from the NARC/NSSRC Soil Information API and GeoTIFF
              raster layers and turns maps into a nationwide table. Multi-output models then predict 40 fertilizer quantities at once. Data
              ages, though, so I checked the API's historic readings against 2026 field measurements and wrote down where they had drifted and
              needed fresh local data.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
              <Stat active={inView} value={384077} label="records" />
              <Stat active={inView} value={77} label="districts covered" />
              <Stat active={inView} value={0.983} decimals={3} label="R² · Random Forest" />
              <Stat active={inView} value={7.4} decimals={1} suffix="×" label="XGBoost, GPU vs CPU" />
            </div>
          </div>
          <div aria-label="77 dots, one for each district of Nepal" role="img">
            <div className="grid grid-cols-11 gap-2 md:gap-3 max-w-md mx-auto">
              {Array.from({ length: 77 }, (_, n) => (
                <span
                  key={n}
                  style={{ transitionDelay: `${n * 22}ms` }}
                  className={`aspect-square rounded-full transition-all duration-500 ${inView ? 'bg-sun scale-100' : 'bg-paper/10 scale-75'}`}
                />
              ))}
            </div>
            <p className="label text-paper/50 text-center mt-5">one dot per district</p>
          </div>
        </div>
      </div>
    </section>
  );
}
