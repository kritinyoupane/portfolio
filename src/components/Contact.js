import React from 'react';
import Contours from './Contours';
import { Reveal } from '../hooks';

const links = [
  ['Email', 'kritineupane544@gmail.com', 'mailto:kritineupane544@gmail.com'],
  ['LinkedIn', 'kriti-nyoupane', 'https://linkedin.com/in/kriti-nyoupane-3b89811b4'],
  ['GitHub', 'kritinyoupane', 'https://github.com/kritinyoupane'],
];

export default function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-ink/20">
      <Contours className="absolute inset-0 w-full h-full opacity-60" stroke="#c0532b" />
      <div className="absolute inset-0 bg-paper/80" />
      <div className="relative max-w-6xl mx-auto px-5 py-24">
        <Reveal>
          <p className="label text-clay mb-3">06 — Send a signal</p>
          <h2 className="font-display text-5xl md:text-7xl font-semibold leading-none max-w-3xl">
            Got a messy problem?<br /><span className="italic text-moss">Let's map it.</span>
          </h2>
        </Reveal>
        <ul className="mt-12 grid sm:grid-cols-3 gap-4">
          {links.map(([k, v, href]) => (
            <li key={k}>
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                className="block border border-ink p-5 rounded-2xl bg-paper hover:bg-ink hover:text-paper transition-colors group">
                <span className="label opacity-60">{k}</span>
                <span className="block mt-1 font-medium break-all">{v} <span className="inline-block group-hover:translate-x-1 transition-transform">→</span></span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-14 text-ink/70 max-w-xl">
          Off the trail: meeting people, dancing, reading novels, travelling. Languages: Nepali (native), English (professional), Hindi (proficient).
        </p>
        <p className="label text-ink/50 mt-10">© {new Date().getFullYear()} Kriti Nyoupane · Kathmandu, Nepal</p>
      </div>
    </footer>
  );
}
