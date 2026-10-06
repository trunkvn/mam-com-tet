import styles from "./Spring.module.css";

// "Drink the water, remember the spring": a stream runs from a small hill into a cup. Light dashes
// travel down the stream, a petal floats along it, and rings spread in the cup.

const STREAM = "M112 108C108 142 172 134 172 172C172 208 108 200 130 236C146 260 200 248 244 258";

export default function Spring() {
  return (
    <svg
      className={styles.spring}
      viewBox="0 0 400 320"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g className={styles.halo} strokeWidth="1.2">
        <circle cx="200" cy="170" r="150" strokeDasharray="2 9" strokeOpacity=".4" />
        <circle cx="200" cy="170" r="122" strokeOpacity=".14" />
      </g>

      {/* the hill the water comes from */}
      <path d="M60 116C80 74 100 56 120 50C140 56 160 78 176 116" fill="currentColor" fillOpacity=".08" />
      <path d="M86 100c14-16 28-24 36-26M112 76c10 6 20 18 26 32" strokeOpacity=".5" />
      <path className={styles.drip} d="M112 98c-3 5-5 8-5 11a5 5 0 0 0 10 0c0-3-2-6-5-11Z" fill="currentColor" stroke="none" />

      {/* the stream: a faint bed, and dashes running down it */}
      <path d={STREAM} strokeWidth="10" strokeOpacity=".07" />
      <path d={STREAM} strokeOpacity=".3" strokeWidth="1.2" />
      <path className={styles.flow} d={STREAM} strokeWidth="2" />
      <circle className={styles.petal} r="4.5" fill="currentColor" stroke="none" style={{ offsetPath: `path("${STREAM}")` }} />

      {/* the cup */}
      <path d="M244 244H324C324 276 304 292 284 292S244 276 244 244Z" fill="currentColor" fillOpacity=".14" />
      <path d="M268 292v8h32v-8" />
      <ellipse cx="284" cy="244" rx="40" ry="8" fill="currentColor" fillOpacity=".16" />
      <ellipse className={`${styles.ring} ${styles.r0}`} cx="284" cy="244" rx="14" ry="3.2" strokeWidth="1.2" />
      <ellipse className={`${styles.ring} ${styles.r1}`} cx="284" cy="244" rx="14" ry="3.2" strokeWidth="1.2" />
    </svg>
  );
}
