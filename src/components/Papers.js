import React from 'react';
import { papers, awards, community } from '../data';
import { SectionHead, Reveal } from '../hooks';

export default function Papers() {
  return (
    <section id="papers" className="max-w-6xl mx-auto px-5 pb-24">
      <SectionHead n="05" kicker="Papers & marks" title="Two first-author papers, and a few things along the way." />
      <ol className="space-y-px bg-ink/15 border border-ink/15 rounded-2xl overflow-hidden mb-16">
        {papers.map((p, n) => (
          <Reveal as="li" key={p.title} delay={n * 100} className="bg-paper p-6 md:p-8 grid md:grid-cols-[9rem_1fr] gap-3 md:gap-8">
            <span className="label text-clay md:pt-1">{p.tag}</span>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-semibold leading-snug">{p.title}</h3>
              <p className="text-ink/70 mt-2">{p.venue}</p>
              <p className="font-mono text-xs text-ink/50 mt-2">{p.authors}</p>
            </div>
          </Reveal>
        ))}
      </ol>
      <div className="grid md:grid-cols-2 gap-12">
        <Reveal>
          <h3 className="label text-moss mb-4">Awards & scholarships</h3>
          <ul className="divide-y divide-ink/15">
            {awards.map(([y, t]) => (
              <li key={t} className="py-3 flex gap-5"><span className="font-mono text-sm text-clay w-10 shrink-0">{y}</span><span>{t}</span></li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <h3 className="label text-moss mb-4">Leadership & community</h3>
          <ul className="divide-y divide-ink/15">
            {community.map((t) => <li key={t} className="py-3">{t}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
