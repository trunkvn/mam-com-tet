import Blossom from "../hero/Blossom";
import styles from "./Bridge.module.css";

// The steam in Bloom climbs from the tray up to the blossom. This is the same thread carried on:
// it leaves from under the tray and runs down into the greeting, so "say hello first" leads to
// the hello. Two drawings: wide screens start under the tray on the left (the same column the
// Bloom sits in) and curve to the centre; narrow screens have the Bloom centred, so the thread
// just wavers straight down.
const THREADS = [
  { cls: styles.wide, w: 1180, h: 160, d: "M210 0C210 90 590 70 590 160", endX: 590 },
  { cls: styles.narrow, w: 100, h: 190, d: "M50 0C50 55 66 70 50 105S34 150 50 190", endX: 50 },
];

// blossoms drifting along the thread: [delay (s), duration (s), scale]. Negative delays start them
// part-way along, so the thread is already alive when the page arrives.
const PETALS: [number, number, number][] = [
  [-1, 11, 0.9],
  [-4.6, 12, 0.72],
  [-8.2, 10, 0.62],
];

export default function Bridge() {
  return (
    <div className={styles.bridge} aria-hidden="true">
      {THREADS.map(({ cls, w, h, d, endX }, t) => (
        <svg
          key={cls}
          className={`${styles.thread} ${cls}`}
          viewBox={`0 0 ${w} ${h}`}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            {/* strong where it leaves the tray, thinner as it nears the greeting */}
            <linearGradient id={`bridge-thread-${t}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={h}>
              <stop offset="0" stopColor="#f0be6b" stopOpacity=".9" />
              <stop offset="1" stopColor="#f0be6b" stopOpacity=".3" />
            </linearGradient>
          </defs>

          {/* a faint line, and dashes travelling along it (46 + 26 = 72, so the loop is seamless) */}
          <path d={d} stroke={`url(#bridge-thread-${t})`} strokeOpacity=".35" strokeWidth="1.2" />
          <path className={styles.flow} d={d} stroke={`url(#bridge-thread-${t})`} strokeWidth="1.8" />

          {/* blossoms riding the same path */}
          {PETALS.map(([delay, dur, s]) => (
            <g
              key={delay}
              className={styles.petal}
              style={{
                offsetPath: `path("${d}")`,
                animationDelay: `${delay}s`,
                animationDuration: `${dur}s`,
              }}
            >
              {/* the turning is done here, on the inside: rotating the outer group would swing it
                  round the corner of the drawing instead of round its own centre */}
              <g className={styles.spin}>
                <g transform={`scale(${s})`} strokeWidth={1.3 / s} fill="currentColor" fillOpacity=".12">
                  <Blossom />
                </g>
              </g>
            </g>
          ))}

          {/* where the thread arrives: a star, like the ones around the greeting */}
          <g transform={`translate(${endX} ${h}) scale(1.3)`}>
            <path
              className={styles.star}
              d="M0-10C1-3 3-1 10 0C3 1 1 3 0 10C-1 3-3 1-10 0C-3-1-1-3 0-10Z"
              fill="currentColor"
              stroke="none"
            />
          </g>
        </svg>
      ))}
    </div>
  );
}
