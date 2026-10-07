import styles from "./Cooking.module.css";

// A pot simmering on a low flame, drawn in the page's gold line. Beside the heading of "Try it at
// home". Steam climbs from the lid, the lid rattles now and then, bubbles rise inside, the flame
// flickers, and a ring of dots turns slowly behind it all.

// One wavering line of steam each, drawn from the lid upwards. [path, which sway it uses]
const STEAM: [string, string][] = [
  ["M148 96C134 80 160 70 150 52C142 38 160 30 152 14", styles.s0],
  ["M180 90C166 72 194 60 182 40C172 24 192 14 184 -2", styles.s1],
  ["M212 96C198 80 224 70 214 52C206 38 224 30 216 16", styles.s2],
];

// Bubbles inside the pot: [x, y, radius, delay in seconds]
const BUBBLES: [number, number, number, number][] = [
  [150, 214, 3, 0],
  [178, 222, 2.5, 1.1],
  [206, 216, 3.5, 2.2],
  [228, 224, 2, 0.6],
  [164, 226, 2, 1.8],
];

// Flames, from the middle outwards: [path, delay in seconds]
const FLAMES: [string, number][] = [
  ["M180 298C163 283 163 266 180 250C197 266 197 283 180 298Z", 0],
  ["M152 298C142 288 143 275 153 265C163 275 163 289 152 298Z", 0.25],
  ["M208 298C198 289 198 275 207 265C217 275 218 288 208 298Z", 0.5],
];

// Little four-point stars that twinkle: [x, y, size, delay]
const SPARKS: [number, number, number, number][] = [
  [62, 74, 1, 0],
  [304, 112, 0.8, 1.3],
  [78, 248, 0.7, 2.1],
  [296, 252, 0.9, 0.7],
];

export default function Cooking() {
  return (
    <svg
      className={styles.cooking}
      viewBox="0 0 360 320"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <defs>
        {/* the steam is strongest at the lid and thins out as it climbs */}
        <linearGradient id="cook-steam" gradientUnits="userSpaceOnUse" x1="0" y1="96" x2="0" y2="-2">
          <stop offset="0" stopColor="#f0be6b" stopOpacity=".95" />
          <stop offset="1" stopColor="#f0be6b" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* a slow-turning ring of dots behind the pot */}
      <g className={styles.halo} strokeWidth="1.2">
        <circle cx="180" cy="172" r="152" strokeDasharray="2 9" strokeOpacity=".4" />
        <circle cx="180" cy="172" r="120" strokeOpacity=".14" />
      </g>

      {/* steam: a faint line, and dashes that travel up it */}
      {STEAM.map(([d, sway], i) => (
        <g key={i} className={`${styles.steam} ${sway}`}>
          <path d={d} stroke="url(#cook-steam)" strokeWidth="1.2" strokeOpacity=".3" />
          <path className={styles.flow} d={d} stroke="url(#cook-steam)" strokeWidth="1.8" />
        </g>
      ))}

      {/* the pot */}
      <g strokeWidth="1.6">
        <path d="M104 150H256V196C256 226 226 246 180 246C134 246 104 226 104 196Z" fill="currentColor" fillOpacity=".07" />
        <path d="M98 150H262" strokeWidth="2" />
        <path d="M104 172H256" strokeOpacity=".45" />
        <path d="M180 188l10 10-10 10-10-10z" strokeOpacity=".7" />
        {/* a handle on each side */}
        <path d="M104 164C82 164 78 190 104 190" />
        <path d="M256 164C278 164 282 190 256 190" />
      </g>

      {/* bubbles rising inside */}
      {BUBBLES.map(([x, y, r, delay], i) => (
        <circle
          key={i}
          className={styles.bubble}
          cx={x}
          cy={y}
          r={r}
          strokeWidth="1.2"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      {/* the lid rattles now and then */}
      <g className={styles.lid} strokeWidth="1.6">
        <path d="M110 150C116 126 144 114 180 114C216 114 244 126 250 150" fill="currentColor" fillOpacity=".07" />
        <circle cx="180" cy="104" r="7" />
        <path d="M180 111V114" />
      </g>

      {/* the burner and the flame under it */}
      <path d="M118 302H242" strokeWidth="1.4" strokeOpacity=".5" />
      {FLAMES.map(([d, delay], i) => (
        <path
          key={i}
          className={styles.flame}
          d={d}
          strokeWidth="1.4"
          fill="currentColor"
          fillOpacity=".14"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      {/* sparks */}
      {SPARKS.map(([x, y, s, delay], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path
            className={styles.spark}
            d="M0-8C1-2 2-1 8 0C2 1 1 2 0 8C-1 2-2 1-8 0C-2-1-1-2 0-8Z"
            fill="currentColor"
            stroke="none"
            style={{ animationDelay: `${delay}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
