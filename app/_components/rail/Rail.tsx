"use client";

import { useEffect, useState } from "react";
import styles from "./Rail.module.css";

// One dot per section, in page order. `id` is the section's anchor.
const SECTIONS = [
  { id: "top", vi: "Mâm cơm Tết", en: "Top" },
  { id: "tet", vi: "Tết là gì", en: "What is Tết?" },
  { id: "tray", vi: "Dọn mâm", en: "Setting the tray" },
  { id: "days", vi: "Mâm theo ngày", en: "Day by day" },
  { id: "fruits", vi: "Mâm ngũ quả", en: "The five fruits" },
  { id: "invited", vi: "Nếu bạn được mời", en: "If you are invited" },
  { id: "wishes", vi: "Lời chúc", en: "Wishes" },
];

/**
 * Fixed rail on the left of wide screens, a sticky bar across the top of narrow ones.
 * The dot of the section crossing the middle of the viewport is lit.
 */
export default function Rail() {
  const [current, setCurrent] = useState("top");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    // A thin band just above the middle of the viewport: whichever section crosses it is "current".
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return (
    <aside className={styles.rail} aria-label="Sections">
      <a href="#top" className={styles.brand} aria-label="Mâm Cơm Tết, back to top">
        <svg className={styles.logo} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
          <circle cx="16" cy="16" r="13" />
          <circle cx="16" cy="16" r="5" />
          <path d="M16 3v6M16 23v6M3 16h6M23 16h6M6.8 6.8l4.2 4.2M21 21l4.2 4.2M6.8 25.2L11 21M21 11l4.2-4.2" />
        </svg>
        <span className={styles.brandName}>Mâm Cơm Tết</span>
      </a>

      <ul className={styles.nav}>
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={current === s.id ? styles.on : ""}
              aria-current={current === s.id ? "location" : undefined}
            >
              <span className={styles.tip}>
                <b lang="vi">{s.vi}</b>
                <small lang="en">{s.en}</small>
              </span>
              <span className={styles.sr}>{s.vi}</span>
            </a>
          </li>
        ))}
      </ul>

      <span className={styles.tag} lang="vi" aria-hidden="true">Tết Nguyên Đán</span>
    </aside>
  );
}
