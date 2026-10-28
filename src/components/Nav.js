import React from 'react';

const links = [['Trail', '#trail'], ['Dataset', '#data'], ['Projects', '#projects'], ['Experiences', '#experiences'], ['Papers', '#papers'], ['Contact', '#contact']];

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-paper/80 backdrop-blur border-b border-ink/10">
      <nav className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <a href="#top" className="font-display font-semibold text-lg tracking-tight">
          <span className="inline-block border border-ink rounded-full w-8 h-8 leading-[30px] text-center text-sm mr-2">KN</span>
          <span className="hidden sm:inline">Field Notes</span>
        </a>
        <ul className="flex gap-4 sm:gap-6">
          {links.map(([name, href]) => (
            <li key={href} className={['Dataset', 'Projects'].includes(name) ? 'hidden md:block' : ''}>
              <a href={href} className="label text-ink/70 hover:text-clay transition-colors">{name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
