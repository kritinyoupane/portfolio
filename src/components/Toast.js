import React, { useEffect, useState } from 'react';

export default function Toast() {
  const [msg, setMsg] = useState('');
  useEffect(() => {
    let timer;
    const show = (e) => {
      setMsg(e.detail);
      clearTimeout(timer);
      timer = setTimeout(() => setMsg(''), 2000);
    };
    window.addEventListener('toast', show);
    return () => { window.removeEventListener('toast', show); clearTimeout(timer); };
  }, []);
  return (
    <div role="status" aria-live="polite"
      className={`fixed left-1/2 bottom-20 md:bottom-8 z-50 -translate-x-1/2 transition-opacity ${msg ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
      {msg && <span className="block rounded-lg bg-ink px-4 py-2.5 text-sm text-paper">{msg}</span>}
    </div>
  );
}
