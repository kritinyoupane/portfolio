import React from 'react';
import Avatar from './Avatar';
import { Home, Journey, Briefcase, Reel, Flask, Venn, Paper, Mail } from './Icons';
import { mailto } from '../data';

const hello = mailto('Hello from your portfolio');

const items = [
  { label: 'Home', icon: Home, href: '#top' },
  { label: 'Journey', icon: Journey, journey: true },
  { label: 'Projects', icon: Briefcase, href: '#derm' },
  { label: 'Reels', icon: Reel, href: '#nerf' },
  { label: 'Research', icon: Flask, href: '#thesis' },
  { label: 'Experience', icon: Venn, href: '#experience' },
  { label: 'Papers', icon: Paper, href: '#ieee' },
  { label: 'Message', icon: Mail, href: hello },
];

const Wordmark = ({ className = '' }) => (
  <span className={`font-display italic font-semibold tracking-tight ${className}`}>Kriti Nyoupane</span>
);

export function SideNav({ onJourney }) {
  const row = 'group flex w-full items-center gap-4 rounded-lg p-3 transition-colors hover:bg-ink/5';
  return (
    <nav aria-label="Main" className="hidden md:flex fixed inset-y-0 left-0 z-40 w-[72px] xl:w-[244px] flex-col border-r border-ink/10 bg-paper px-3 pt-7 pb-5">
      <a href="#top" className="mb-8 flex h-10 items-center px-3" aria-label="Kriti Nyoupane, back to top">
        <span className="xl:hidden font-display italic font-semibold text-[26px]">K</span>
        <Wordmark className="hidden xl:inline text-[26px]" />
      </a>
      <ul className="flex flex-1 flex-col gap-1">
        {items.map(({ label, icon: Icon, href, journey }) => {
          const inner = (
            <>
              <Icon strokeWidth={label === 'Home' ? 2.3 : 1.8} className="shrink-0 transition-transform group-hover:scale-105" />
              <span className={`hidden xl:inline text-[15px] ${label === 'Home' ? 'font-semibold' : ''}`}>{label}</span>
            </>
          );
          return (
            <li key={label}>
              {journey
                ? <button onClick={onJourney} aria-label={label} className={row}>{inner}</button>
                : <a href={href} aria-label={label} className={row}>{inner}</a>}
            </li>
          );
        })}
      </ul>
      <a href="#intro" aria-label="Profile" className={row}>
        <Avatar size={24} />
        <span className="hidden xl:inline text-[15px]">Profile</span>
      </a>
    </nav>
  );
}

export function TopBar() {
  return (
    <header className="md:hidden fixed top-0 inset-x-0 z-40 flex h-14 items-center justify-between border-b border-ink/10 bg-paper/95 px-4 backdrop-blur">
      <a href="#top"><Wordmark className="text-[24px]" /></a>
      <a href={hello} aria-label="Email Kriti" className="p-1"><Mail /></a>
    </header>
  );
}

export function BottomBar({ onJourney }) {
  const cell = 'flex h-12 flex-1 items-center justify-center';
  return (
    <nav aria-label="Main" className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-ink/10 bg-paper pb-[env(safe-area-inset-bottom)]">
      <div className="flex">
        <a href="#top" aria-label="Home" className={cell}><Home strokeWidth={2.3} /></a>
        <a href="#derm" aria-label="Projects" className={cell}><Briefcase /></a>
        <button onClick={onJourney} aria-label="Journey stories" className={cell}><Journey /></button>
        <a href="#nerf" aria-label="Reels" className={cell}><Reel /></a>
        <a href="#intro" aria-label="Profile" className={cell}><Avatar size={26} /></a>
      </div>
    </nav>
  );
}
