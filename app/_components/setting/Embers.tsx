import styles from "./Embers.module.css";

// A few specks of ash rising slowly, like the smoke over the incense above.
// Deterministic so the markup is identical on server and client.
const SPECKS = (() => {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: 18 }, () => ({
    left: Math.round(rnd() * 100),
    size: 2 + Math.round(rnd() * 2),
    dur: 16 + Math.round(rnd() * 16),
    delay: -Math.round(rnd() * 32),
    sway: Math.round((rnd() - 0.5) * 80),
    peak: (0.25 + rnd() * 0.3).toFixed(2),
  }));
})();

/**
 * Fills the whole section but is pinned to the viewport, so the specks keep rising however long
 * the scroll is.
 */
export default function Embers() {
  return (
    <div className={styles.layer} aria-hidden="true">
      <div className={styles.pin}>
        {SPECKS.map((s, i) => (
          <i
            key={i}
            style={
              {
                left: `${s.left}%`,
                width: s.size,
                height: s.size,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
                "--sway": `${s.sway}px`,
                "--peak": s.peak,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
