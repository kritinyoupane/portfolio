import React, { useEffect, useRef, useState } from 'react';
import Avatar from './Avatar';
import Carousel from './Carousel';
import { Heart, Comment, Send, Bookmark, Pin } from './Icons';
import { useStored, toast } from '../hooks';
import { profile, mailto } from '../data';

export default function Post({ id, title, place, when, pinned, aspect = 'aspect-square', media, slides, caption, tags = [], details, onAvatar }) {
  const [liked, setLiked] = useStored(`liked:${id}`, false);
  const [saved, setSaved] = useStored(`saved:${id}`, false);
  const [burst, setBurst] = useState(0);
  const [slide, setSlide] = useState(0);
  const [more, setMore] = useState(false);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const input = useRef(null);
  const lastTap = useRef(0);

  useEffect(() => {
    if (!burst) return undefined;
    const t = setTimeout(() => setBurst(0), 900);
    return () => clearTimeout(t);
  }, [burst]);

  const onMediaClick = () => {
    const now = Date.now();
    if (now - lastTap.current < 320) {
      setLiked(true);
      setBurst(now);
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  };

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      if (navigator.share && window.matchMedia('(pointer: coarse)').matches) {
        await navigator.share({ title: `${title} · Kriti Nyoupane`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast('Link copied');
    } catch (e) { /* share sheet closed */ }
  };

  const send = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    window.location.href = mailto(`About: ${title}`, note.trim());
    setNote('');
  };

  const clipped = caption.length > 125 && !more;
  const text = clipped ? `${caption.slice(0, caption.lastIndexOf(' ', 115))}…` : caption;

  return (
    <article id={id} aria-label={title} className="mb-5 scroll-mt-16 border-b border-ink/10 pb-5 md:scroll-mt-6">
      <header className="flex items-center gap-3 px-3 pb-3 md:px-0">
        <button onClick={onAvatar} aria-label="Open Kriti's journey stories" className="shrink-0 rounded-full"><Avatar size={32} ring /></button>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-sm">
            <span className="font-semibold">{profile.handle}</span>
            {when && <span className="text-ink/50"> • {when}</span>}
          </p>
          {place && <p className="truncate text-xs text-ink/70">{place}</p>}
        </div>
        {pinned && <span className="flex items-center gap-1 text-xs text-ink/60"><Pin size={16} />Pinned</span>}
      </header>

      <div onClick={onMediaClick} className={`relative overflow-hidden bg-paper2 md:rounded md:border md:border-ink/10 ${slides ? '' : aspect}`}>
        {slides ? <Carousel slides={slides} aspect={aspect} label={title} onIndex={setSlide} /> : media}
        {burst > 0 && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-accent" aria-hidden="true">
            <span className="burst" style={{ filter: 'drop-shadow(0 0 1.5px #fbfbfa) drop-shadow(0 6px 16px rgba(28,27,34,.25))' }}>
              <Heart size={96} filled strokeWidth={0} />
            </span>
          </span>
        )}
      </div>

      <div className="px-3 md:px-0">
        <div className="relative flex items-center gap-4 pt-3 pb-1.5">
          <button onClick={() => setLiked(!liked)} aria-pressed={liked} aria-label={liked ? 'Unlike' : 'Like'}
            className={`transition-opacity hover:opacity-60 ${liked ? 'text-accent' : ''}`}>
            <Heart key={liked ? 'on' : 'off'} filled={liked} className={liked ? 'pop' : ''} />
          </button>
          <button onClick={() => input.current && input.current.focus()} aria-label="Ask Kriti about this post" className="hover:opacity-60"><Comment /></button>
          <button onClick={share} aria-label="Share this post" className="hover:opacity-60"><Send /></button>
          {slides && (
            <span className="absolute left-1/2 flex -translate-x-1/2 gap-1" aria-hidden="true">
              {slides.map((_, n) => <span key={n} className={`h-1.5 w-1.5 rounded-full transition-colors ${n === slide ? 'bg-accent' : 'bg-ink/20'}`} />)}
            </span>
          )}
          <button onClick={() => setSaved(!saved)} aria-pressed={saved} aria-label={saved ? 'Remove from saved' : 'Save'} className="ml-auto hover:opacity-60">
            <Bookmark filled={saved} />
          </button>
        </div>

        {liked && <p className="text-sm font-semibold">Liked by you</p>}
        <p className="mt-1 text-sm leading-relaxed">
          <span className="mr-1.5 font-semibold">{profile.handle}</span>
          {text}
          {clipped && <button onClick={() => setMore(true)} className="ml-1 text-ink/50">more</button>}
        </p>
        {tags.length > 0 && <p className="mt-1 text-sm text-accent">{tags.map((t) => `#${t}`).join(' ')}</p>}

        {details && (
          <>
            <button onClick={() => setOpen(!open)} aria-expanded={open} className="mt-1.5 text-sm text-ink/50">
              {open ? 'Hide details' : `View all ${details.length} details`}
            </button>
            {open && (
              <ul className="mt-2 space-y-1.5 text-sm text-ink/80">
                {details.map((d) => <li key={d} className="flex gap-2"><span className="text-accent">•</span><span>{d}</span></li>)}
              </ul>
            )}
          </>
        )}

        <form onSubmit={send} className="mt-2 flex items-center gap-2">
          <input ref={input} value={note} onChange={(e) => setNote(e.target.value)}
            placeholder="Ask me about this…" aria-label={`Ask Kriti about ${title} by email`}
            className="flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-ink/40" />
          {note.trim() && <button type="submit" className="text-sm font-semibold text-accent hover:text-ink">Send</button>}
        </form>
      </div>
    </article>
  );
}
