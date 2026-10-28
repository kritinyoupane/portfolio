import React from 'react';
import { projects } from '../data';
import { SectionHead, Reveal } from '../hooks';
import { art } from './Illustrations';
import Contours from './Contours';

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-ink text-paper border-t border-paper/10 pt-24 pb-24">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Contours className="w-full h-full opacity-[0.12]" stroke="#f2ebdb" />
        <div className="absolute -top-10 left-[8%] w-72 h-72 rounded-full bg-sun/10 blur-3xl" />
        <div className="absolute top-[45%] right-[5%] w-80 h-80 rounded-full bg-moss/25 blur-3xl" />
        <div className="absolute bottom-0 left-[35%] w-72 h-72 rounded-full bg-river/20 blur-3xl" />
      </div>
      <div className="relative max-w-6xl mx-auto px-5">
        <div className="[&_h2]:text-paper [&_p]:text-sun">
          <SectionHead n="03" kicker="Projects" title="Things I've built and run." />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, n) => {
            const Art = art[p.art];
            return (
              <Reveal key={p.title} delay={(n % 3) * 100}>
                <article className="group h-full rounded-3xl overflow-hidden bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1] hover:border-white/25">
                  <div className="p-3 m-2 rounded-2xl bg-paper/90">
                    <Art />
                  </div>
                  <div className="p-5 pt-3">
                    <p className="label text-sun/80">{p.kind}</p>
                    <h3 className="font-display text-2xl font-semibold mt-2">{p.title}</h3>
                    <p className="mt-2 text-paper/70 leading-relaxed">{p.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
