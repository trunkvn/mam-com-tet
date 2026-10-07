"use client";

import { useEffect, useState, type CSSProperties } from "react";
import styles from "./Preloader.module.css";

/** The screen stays at least this long (ms since the page began loading): long enough to read the
 *  accuracy note on it, and so it never just flashes. */
const MIN_MS = 3500;
/** If the page or fonts are very slow, open anyway after this long. */
const MAX_MS = 5000;
/** How long the fade-out takes; the overlay is removed after it. */
const LEAVE_MS = 900;

// The eight rays, clockwise from the top. Each is drawn from the inner end outwards, so that when
// they are drawn one after another they open out like a clock hand sweeping round.
const RAYS = [
  "M16 9V3",
  "M21 11l4.2-4.2",
  "M23 16h6",
  "M21 21l4.2 4.2",
  "M16 23v6",
  "M11 21l-4.2 4.2",
  "M9 16H3",
  "M11 11L6.8 6.8",
];

/**
 * Full-screen splash. It is in the server HTML, so it shows from the first paint. Once fonts and
 * the page have loaded (and MIN_MS has passed) the whole screen fades out and the overlay goes.
 * A CSS timer in the stylesheet hides it too, in case this script never runs.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "gone">("loading");

  useEffect(() => {
    let alive = true;
    const timers: number[] = [];
    const root = document.documentElement;
    root.style.overflow = "hidden"; // no scrolling behind the splash

    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    const ready = Promise.all([document.fonts?.ready, loaded]);
    const cap = new Promise<void>((resolve) => {
      timers.push(window.setTimeout(resolve, Math.max(0, MAX_MS - performance.now())));
    });

    Promise.race([ready, cap]).then(() => {
      if (!alive) return;
      const wait = Math.max(0, MIN_MS - performance.now());
      timers.push(
        window.setTimeout(() => {
          if (!alive) return;
          setPhase("leaving");
          root.style.overflow = "";
          timers.push(window.setTimeout(() => alive && setPhase("gone"), LEAVE_MS));
        }, wait),
      );
    });

    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      root.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={styles.pre}
      data-phase={phase}
      role="status"
      aria-live="polite"
      aria-label="Loading Mâm Cơm Tết"
    >
      <div className={styles.content}>
        <svg
          className={styles.sun}
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {/* the ring is drawn first, starting at the top */}
          <circle
            className={styles.draw}
            cx="16"
            cy="16"
            r="13"
            pathLength="1"
            transform="rotate(-90 16 16)"
            style={{ "--d": "0s", "--t": "1.2s" } as CSSProperties}
          />
          {/* then the rays, one after another */}
          {RAYS.map((d, i) => (
            <path
              key={d}
              className={styles.draw}
              pathLength="1"
              d={d}
              style={{ "--d": `${(0.5 + i * 0.1).toFixed(1)}s`, "--t": "0.5s" } as CSSProperties}
            />
          ))}
          {/* and the middle pops in last, with a little overshoot */}
          <circle className={styles.core} cx="16" cy="16" r="5" />
        </svg>
        <p className={styles.title}>Mâm Cơm Tết</p>
        <p className={styles.sub}>
          <span lang="vi">Đang dọn mâm</span>
          <span aria-hidden="true"> · </span>
          <span lang="en">Setting the tray</span>
        </p>
        <div className={styles.bar} aria-hidden="true">
          <i />
        </div>
        <p className={styles.note}>
          <span lang="vi">Lưu ý: thông tin có thể chưa chính xác.</span>
          <span lang="en">Please note: this page may contain inaccuracies. Customs differ from home to home.</span>
        </p>
      </div>
    </div>
  );
}
