import React from 'react';
import Avatar from './Avatar';
import { Code, Person, Mail } from './Icons';
import { profile, projects, papers, awards, mailto } from '../data';

const elsewhere = [
  { icon: Code, name: 'GitHub', sub: `@${profile.handle}`, action: 'Follow', href: profile.github },
  { icon: Person, name: 'LinkedIn', sub: 'kriti-nyoupane', action: 'Connect', href: profile.linkedin },
  { icon: Mail, name: 'Email', sub: profile.email, action: 'Write', href: mailto('Hello from your portfolio') },
];

export default function Sidebar() {
  return (
    <aside className="hidden xl:block w-[320px] shrink-0 pt-8">
      <div className="sticky top-8">
        <div className="flex items-center gap-3">
          <a href="#intro" aria-label="Go to Kriti's pinned post"><Avatar size={44} /></a>
          <div className="min-w-0 flex-1 leading-tight">
            <a href="#intro" className="text-sm font-semibold">{profile.handle}</a>
            <p className="text-sm text-ink/60">{profile.name}</p>
          </div>
          <a href={mailto('Hello from your portfolio')} className="text-xs font-semibold text-accent hover:text-ink">Message</a>
        </div>

        <ul className="mt-5 flex gap-5 text-sm">
          <li><span className="font-semibold">{projects.length}</span> projects</li>
          <li><span className="font-semibold">{papers.length}</span> papers</li>
          <li><span className="font-semibold">{awards.length}</span> awards</li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed">{profile.bio}</p>
        <p className="mt-1 text-sm text-ink/60">{profile.from}</p>

        <p className="mt-7 mb-3 text-sm font-semibold text-ink/60">Find me elsewhere</p>
        <ul className="space-y-3">
          {elsewhere.map(({ icon: Icon, name, sub, action, href }) => (
            <li key={name} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper2"><Icon size={18} /></span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-sm font-semibold">{name}</span>
                <span className="block truncate text-xs text-ink/60">{sub}</span>
              </span>
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                className="text-xs font-semibold text-accent hover:text-ink" aria-label={`${action} on ${name}`}>{action}</a>
            </li>
          ))}
        </ul>

        <p className="mt-9 text-xs leading-relaxed text-ink/40">
          © {new Date().getFullYear()} Kriti Nyoupane · Kathmandu, Nepal
        </p>
      </div>
    </aside>
  );
}
