import React from 'react';

const photo = `${process.env.PUBLIC_URL}/kriti.jpg`;

export default function Avatar({ size = 32, ring = false, label }) {
  const face = (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className="block rounded-full bg-paper2 bg-no-repeat"
      style={{ width: size, height: size, backgroundImage: `url(${photo})`, backgroundSize: '280%', backgroundPosition: '48% 34%' }}
    />
  );
  if (!ring) return face;
  return (
    <span className="block rounded-full p-[2px] bg-accent">
      <span className="block rounded-full p-[2px] bg-paper">{face}</span>
    </span>
  );
}
