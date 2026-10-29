import React from 'react';

const make = (paths) => function Icon({ size = 24, filled = false, strokeWidth = 1.8, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={filled ? 'currentColor' : 'none'} stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {paths}
    </svg>
  );
};

export const Home = make(<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />);
export const Journey = make(<><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>);
export const Reel = make(<><circle cx="12" cy="12" r="9" /><path d="m10 8.5 5.5 3.5-5.5 3.5z" /></>);
export const Briefcase = make(<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 13h18" /></>);
export const Flask = make(<path d="M9 3h6M10 3v6l-5.6 9.6A1.6 1.6 0 0 0 5.8 21h12.4a1.6 1.6 0 0 0 1.4-2.4L14 9V3M7.2 15h9.6" />);
export const Venn = make(<><circle cx="9" cy="12" r="6" /><circle cx="15" cy="12" r="6" /></>);
export const Paper = make(<><path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z" /><path d="M14 3v5h5M8.5 13h7M8.5 17h5" /></>);
export const Mail = make(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></>);
export const Heart = make(<path d="M12 20.5s-7.5-4.4-9.3-9.1C1.4 7.9 3.6 4.5 7.1 4.5c2.1 0 3.6 1.1 4.9 2.9 1.3-1.8 2.8-2.9 4.9-2.9 3.5 0 5.7 3.4 4.4 6.9-1.8 4.7-9.3 9.1-9.3 9.1z" />);
export const Comment = make(<path d="M20.5 11.5a8.5 8.5 0 0 1-12.4 7.5L3.5 20.5l1.4-4.4A8.5 8.5 0 1 1 20.5 11.5z" />);
export const Send = make(<path d="M21.5 2.5 2.5 9.8l7.6 3.3 3.3 7.6zM21.5 2.5 10.1 13.1" />);
export const Bookmark = make(<path d="M6 3.5h12v17l-6-4.6-6 4.6z" />);
export const Pin = make(<path d="M9 3h6l-1 6 3 3v2H7v-2l3-3zM12 14v7" />);
export const Close = make(<path d="M6 6l12 12M18 6 6 18" />);
export const ChevronLeft = make(<path d="m15 5-7 7 7 7" />);
export const ChevronRight = make(<path d="m9 5 7 7-7 7" />);
export const Play = make(<path d="M7 4.5v15l12-7.5z" />);
export const Pause = make(<path d="M8 5v14M16 5v14" />);
export const Check = make(<path d="m5 12.5 4.5 4.5L19 7.5" />);
export const Code = make(<path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />);
export const Person = make(<><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>);

const Book = make(<path d="M3 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H3zM21 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7z" />);
const Cap = make(<path d="M2 9.5 12 5l10 4.5-10 4.5zM6 11.3V16c3.5 2.3 8.5 2.3 12 0v-4.7M22 9.5V15" />);
const Sprout = make(<path d="M12 21v-9M12 12c0-4-3-6.5-7.5-6.5 0 4 3 6.5 7.5 6.5zM12 10c0-3.2 2.3-5.5 6.5-5.5 0 3.2-2.3 5.5-6.5 5.5z" />);
const Shield = make(<path d="M12 3l8 3v6c0 4.8-3.4 8-8 9-4.6-1-8-4.2-8-9V6z" />);
const Laptop = make(<path d="M5 5h14v10H5zM2.5 19h19" />);
const Bars = make(<path d="M4 20v-9M10 20V5M16 20v-6M2.5 20h19" />);
const Summit = make(<path d="M2.5 20 9.5 8l4 6.5 2-3 6 8.5zM9.5 8V3.5l4 1.5-4 1.5" />);

export const glyphs = { book: Book, cap: Cap, sprout: Sprout, shield: Shield, laptop: Laptop, bars: Bars, summit: Summit };
