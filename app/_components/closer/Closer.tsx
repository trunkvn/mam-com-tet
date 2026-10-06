import { SOURCES, WISHES } from "./data";
import styles from "./Closer.module.css";

// Twinkling four-point stars around the greeting. Positions are percentages of the title box.
const SPARKS = [
  { x: "7%", y: "14%", size: 26, delay: 0 },
  { x: "93%", y: "8%", size: 20, delay: 1.1 },
  { x: "88%", y: "86%", size: 28, delay: 2.2 },
  { x: "12%", y: "80%", size: 18, delay: 0.6 },
  { x: "50%", y: "-6%", size: 16, delay: 1.7 },
  { x: "73%", y: "46%", size: 14, delay: 2.9 },
];

export default function Closer() {
  return (
    <footer className={styles.closer} id="wishes" aria-labelledby="close-title">
      <div className="wrap">
        <div className={styles.title}>
          <div className={styles.glow} aria-hidden="true" />
          {SPARKS.map((p, i) => (
            <svg
              key={i}
              className={styles.spark}
              viewBox="-12 -12 24 24"
              aria-hidden="true"
              style={
                {
                  left: p.x,
                  top: p.y,
                  width: p.size,
                  height: p.size,
                  animationDelay: `${p.delay}s`,
                } as React.CSSProperties
              }
            >
              <path d="M0-10C1-3 3-1 10 0C3 1 1 3 0 10C-1 3-3 1-10 0C-3-1-1-3 0-10Z" />
            </svg>
          ))}
          <h2 id="close-title" className={styles.h2} lang="vi">
            <span className={styles.outline} data-text="Chúc mừng">
              Chúc mừng
            </span>
            <span className={styles.fill}>Năm mới</span>
          </h2>
        </div>
        <p className={styles.enline} lang="en">
          “Happy New Year”
        </p>
        <p className={styles.lead} lang="en">
          There is always room for one more bowl. Come in, sit down, and eat
          once the ancestors have been offered theirs.
        </p>

        <ul className={styles.wishes} aria-label="Four wishes for the new year">
          {WISHES.map((w) => (
            <li key={w.vi}>
              <b lang="vi">{w.vi}</b>
              <i lang="en">say “{w.say}”</i>
              <span lang="en">{w.en}</span>
            </li>
          ))}
        </ul>

        <details className={styles.sources} lang="en">
          <summary>Where this comes from</summary>
          <p className={styles.sourcesNote}>
            Mostly Vietnamese press, plus a few English travel guides for the
            guest courtesies. This page is a sketch, not a rulebook: customs
            differ by family and region, and the italic lines are our own
            telling. If something does not match your home, trust your home.
          </p>
          <div className={styles.groups}>
            {SOURCES.map((g) => (
              <section key={g.topic}>
                <h3>{g.topic}</h3>
                <ul>
                  {g.items.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </details>

        <div className={styles.foot}>
          <span lang="en">
            Mâm Cơm Tết · An illustrated guide to the Vietnamese new-year tray
          </span>
          <span lang="en">
            Design & built by <strong>Gnoud</strong>
          </span>
          <a href="#top" lang="en">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
