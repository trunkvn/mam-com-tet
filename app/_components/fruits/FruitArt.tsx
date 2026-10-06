import type { ReactNode } from "react";
import type { FruitId } from "./data";

// Fruit drawings on a unit circle (scaled up by the caller). Gold-cream outline, flat colour
// fills, like enamel inlay. Colours are fixed on purpose: they are the point of the north's rule.
const ST = "#f7d9a0";
const LEAF = "#7fb8a2";

const banana = (
  <path
    d="M-1 -.5C-.85 .6.15 1 1 .1C1.1 -.05.95 -.1.85 0C.2 .6 -.55 .35 -.7 -.55Z"
    fill="#8fb36a"
    stroke={ST}
    strokeWidth="2"
    strokeLinejoin="round"
  />
);

const ART: Record<FruitId, ReactNode> = {
  thanhlong: (
    <>
      <ellipse rx=".8" ry="1" fill="#e0457b" stroke={ST} strokeWidth="2" />
      <path d="M-.8 -.2c-.35-.1-.5-.3-.55-.55M.8 -.2c.35-.1.5-.3.55-.55M-.75 .3c-.4 0-.6-.2-.7-.5M.75 .3c.4 0 .6-.2.7-.5M-.4 -.85c-.1-.3-.3-.45-.55-.5M.4 -.85c.1-.3.3-.45.55-.5" fill="none" stroke="#8fb36a" strokeWidth="3" strokeLinecap="round" />
      <path d="M-.15 .1q.15-.2.3 0q-.15.25-.3 0Z" fill="#fff0bf" />
    </>
  ),
  duahau: (
    <>
      <path d="M-1 -.25A1 1 0 0 0 1 -.25Z" fill="#e04a4a" stroke={ST} strokeWidth="2" strokeLinejoin="round" />
      <path d="M-.9 -.12A.9 .9 0 0 0 .9 -.12" fill="none" stroke="#6fa356" strokeWidth="5" strokeLinecap="round" />
      {[[-0.5, 0.05], [-0.1, 0.18], [0.3, 0.05], [-0.25, 0.42], [0.2, 0.4]].map(([x, y]) => (
        <ellipse key={`${x}${y}`} cx={x} cy={y} rx=".07" ry=".11" fill="#2f1a1a" />
      ))}
    </>
  ),
  chuoi: (
    <>
      <g transform="translate(-.25 .15)">{banana}</g>
      <g transform="translate(.05 -.1)">{banana}</g>
      <g transform="translate(.35 -.35)">{banana}</g>
    </>
  ),
  le: (
    <>
      <path
        d="M0 -.95C.25 -.95 .35 -.7 .38 -.45C.4 -.2 .95 .05 .95 .55C.95 .95 .5 1.05 0 1.05C-.5 1.05 -.95 .95 -.95 .55C-.95 .05 -.4 -.2 -.38 -.45C-.35 -.7 -.25 -.95 0 -.95Z"
        fill="#efe6c8"
        stroke={ST}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M-.55 .3q.05 .4 .4 .6" fill="none" stroke="#fffaf0" strokeWidth="3" strokeLinecap="round" />
      <path d="M0 -.95q.05 -.2 .2 -.3" fill="none" stroke="#8a6a3a" strokeWidth="3" strokeLinecap="round" />
      <path d="M.1 -1.05c.25 -.2.5 -.2.7 -.05c-.2 .2 -.5 .2 -.7 .05Z" fill={LEAF} stroke={ST} strokeWidth="1.8" strokeLinejoin="round" />
    </>
  ),
  phatthu: (
    <>
      {[-2, -1, 0, 1, 2].map((i) => (
        <ellipse
          key={i}
          cx={i * 0.36}
          cy=".5"
          rx=".17"
          ry=".62"
          transform={`rotate(${i * 14} ${i * 0.36} -.1)`}
          fill="#e8b830"
          stroke={ST}
          strokeWidth="2"
        />
      ))}
      <ellipse cy="-.35" rx=".6" ry=".5" fill="#f0c845" stroke={ST} strokeWidth="2" />
      <path d="M0 -.85v.15" stroke={ST} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  hong: (
    <>
      <ellipse rx="1.05" ry=".85" fill="#e4691f" stroke={ST} strokeWidth="2" />
      <path d="M-.5 -.3q.4 -.3.8 -.1" fill="none" stroke="#ffb27a" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M0 -.85l.5 -.1l-.15 .35l.4 .2l-.5 .1l-.1 .25l-.25 -.25l-.35 .1l.15 -.3l-.3 -.2l.4 -.05Z"
        fill={LEAF}
        stroke={ST}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </>
  ),
  nho: (
    <>
      {[
        [-0.55, -0.55], [-0.18, -0.6], [0.18, -0.6], [0.55, -0.55],
        [-0.36, -0.15], [0, -0.2], [0.36, -0.15],
        [-0.18, 0.28], [0.18, 0.28],
        [0, 0.72],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r=".3" fill="#4d3470" stroke={ST} strokeWidth="1.8" />
      ))}
      <path d="M0 -.85v-.25" stroke={ST} strokeWidth="3" strokeLinecap="round" />
      <path d="M0 -1.05c.25 -.25.55 -.25.75 -.1c-.2 .25 -.5 .3 -.75 .1Z" fill={LEAF} stroke={ST} strokeWidth="1.8" strokeLinejoin="round" />
    </>
  ),
  mangcau: (
    <>
      <circle r="1" fill="#8fb36a" stroke={ST} strokeWidth="2" />
      {[
        [-0.4, -0.3], [0.2, -0.4], [0.5, 0.05], [-0.1, 0.1], [-0.55, 0.3], [0.1, 0.55],
      ].map(([x, y]) => (
        <path key={`${x}${y}`} d={`M${x - 0.22} ${y}q.22 -.22 .44 0`} fill="none" stroke="#5f8346" strokeWidth="2.2" strokeLinecap="round" />
      ))}
    </>
  ),
  sung: (
    <>
      <path
        d="M0 -.9C.5 -.9 .95 -.3 .95 .2C.95 .8 .5 1 0 1C-.5 1 -.95 .8 -.95 .2C-.95 -.3 -.5 -.9 0 -.9Z"
        fill="#9a4a6c"
        stroke={ST}
        strokeWidth="2"
      />
      <path d="M-.4 -.1q.1 .5 .15 .7M.2 -.2q.1 .4 .05 .7" fill="none" stroke="#c47a98" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M0 -.9v-.2" stroke={ST} strokeWidth="3.5" strokeLinecap="round" />
    </>
  ),
  dua: (
    <>
      <circle r="1" fill="#a8864f" stroke={ST} strokeWidth="2" />
      <circle cx="-.25" cy="-.35" r=".13" fill="#430509" />
      <circle cx=".25" cy="-.35" r=".13" fill="#430509" />
      <circle cy="-.05" r=".13" fill="#430509" />
      <path d="M-.8 .3q.8 .6 1.6 0M-.6 .6q.6 .3 1.2 0" fill="none" stroke="#7a5c30" strokeWidth="2" />
    </>
  ),
  dudu: (
    <>
      <ellipse rx=".72" ry="1.05" transform="rotate(24)" fill="#ee9a3a" stroke={ST} strokeWidth="2" />
      <path d="M-.25 -.5q.1 .5 .15 .9" fill="none" stroke="#ffc57a" strokeWidth="3" strokeLinecap="round" />
      <path d="M.35 -1l.15 -.2" stroke={LEAF} strokeWidth="3.5" strokeLinecap="round" />
    </>
  ),
  xoai: (
    <>
      <path
        d="M-.9 .1C-.9 -.7 -.2 -1 .45 -.8C1.1 -.55 1.15 .35 .5 .8C-.1 1.15 -.9 .85 -.9 .1Z"
        fill="#f1c232"
        stroke={ST}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M.5 .8C1.1 .35 1.1 -.5 .45 -.8C.8 -.1 .6 .5 .5 .8Z" fill="#e0602c" />
      <path d="M.1 -.85c.2 -.3.55 -.35.8 -.2c-.2 .25 -.5 .3 -.8 .2Z" fill={LEAF} stroke={ST} strokeWidth="1.8" strokeLinejoin="round" />
    </>
  ),
};

export default function FruitArt({ id, scale }: { id: FruitId; scale: number }) {
  return (
    <svg viewBox="-110 -110 220 220" aria-hidden="true">
      <g transform={`scale(${(76 * scale).toFixed(1)})`}>{ART[id]}</g>
    </svg>
  );
}
