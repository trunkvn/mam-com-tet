"use client";

import { useEffect, useRef, useState } from "react";
import DayIcon from "./DayIcon";
import type { Day } from "./data";
import styles from "./Days.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/** Mouse moves smaller than this (px) still count as a click, not a drag. */
const DRAG_THRESHOLD = 5;
/** How long the snap stays off after a drag is released (ms), while the row glides to a card. */
const SETTLE_MS = 700;
/** While the row glides to a card the user picked, scroll events must not change the active card.
 *  The lock starts at LOCK_MS and is renewed by every scroll event, so it ends shortly after the
 *  glide does, however long that takes. */
const LOCK_MS = 300;
const LOCK_RENEW_MS = 150;

/**
 * Sideways row of day cards. You can drag it with the mouse, swipe it, use the arrows or the
 * arrow keys, or click a card to bring it forward. One card is "active" at a time.
 */
export default function Days({ days }: { days: Day[] }) {
  const rowRef = useRef<HTMLOListElement>(null);
  const [pct, setPct] = useState(20);
  const [active, setActive] = useState(() => Math.max(0, days.findIndex((d) => d.hot)));
  // idle: normal · holding: mouse is down and dragging · settling: gliding to a card after a drag
  const [drag, setDrag] = useState<"idle" | "holding" | "settling">("idle");
  const lockUntil = useRef(0);
  const suppressClick = useRef(false);

  /**
   * How far from the row's left edge a card sits when it is "in place". The row's padding and
   * scroll-padding are the same (see the CSS), so this is the first card's offset at scrollLeft 0.
   * Measured rather than read from getComputedStyle: scroll-padding is written with max()/calc()
   * and some browsers hand that back as text instead of pixels.
   */
  const padLeft = () => {
    const row = rowRef.current;
    const first = row?.firstElementChild as HTMLElement | null | undefined;
    if (!row || !first) return 0;
    return row.scrollLeft + first.getBoundingClientRect().left - row.getBoundingClientRect().left;
  };

  const cards = () => Array.from(rowRef.current?.children ?? []) as HTMLElement[];

  const scrollTarget = (i: number) => {
    const row = rowRef.current;
    const card = cards()[i];
    if (!row || !card) return 0;
    const left = row.scrollLeft + (card.getBoundingClientRect().left - row.getBoundingClientRect().left) - padLeft();
    return Math.min(Math.max(left, 0), row.scrollWidth - row.clientWidth);
  };

  const nearestCard = () => {
    const row = rowRef.current;
    if (!row) return 0;
    const edge = row.getBoundingClientRect().left + padLeft();
    let best = 0;
    let bestDist = Infinity;
    cards().forEach((c, i) => {
      const dist = Math.abs(c.getBoundingClientRect().left - edge);
      if (dist < bestDist) {
        best = i;
        bestDist = dist;
      }
    });
    return best;
  };

  const focusCard = (i: number) => {
    const row = rowRef.current;
    if (!row) return;
    const index = Math.min(Math.max(i, 0), days.length - 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lockUntil.current = Date.now() + LOCK_MS;
    setActive(index);
    row.scrollTo({ left: scrollTarget(index), behavior: reduce ? "auto" : "smooth" });
  };

  const onScroll = () => {
    const row = rowRef.current;
    if (!row) return;
    const max = row.scrollWidth - row.clientWidth;
    setPct(max > 0 ? 20 + 80 * (row.scrollLeft / max) : 100);
    const now = Date.now();
    if (now <= lockUntil.current) {
      lockUntil.current = now + LOCK_RENEW_MS; // still gliding to the picked card
      return;
    }
    // Swiping or trackpad scrolling moves the active card along with the row.
    if (drag === "idle") setActive(nearestCard());
  };

  // ResizeObserver reports once on observe(), which also sets the initial progress.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const ro = new ResizeObserver(() => {
      const max = row.scrollWidth - row.clientWidth;
      setPct(max > 0 ? 20 + 80 * (row.scrollLeft / max) : 100);
    });
    ro.observe(row);
    return () => ro.disconnect();
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLOListElement>) => {
    // Touch and pen already scroll natively; only the mouse needs help.
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const row = rowRef.current;
    if (!row) return;
    const startX = e.clientX;
    const startLeft = row.scrollLeft;
    let moved = false;
    setDrag("holding");

    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      if (Math.abs(dx) > DRAG_THRESHOLD) moved = true;
      row.scrollLeft = startLeft - dx;
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      if (moved) {
        // the click that follows a drag must not also pick the card under the cursor
        suppressClick.current = true;
        setTimeout(() => (suppressClick.current = false), 0);
        setDrag("settling");
        focusCard(nearestCard());
        setTimeout(() => setDrag("idle"), SETTLE_MS);
      } else {
        setDrag("idle");
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  return (
    <>
      <div className={`wrap ${styles.controls}`}>
        <div className={styles.arrows} role="group" aria-label="Choose a day">
          <button type="button" onClick={() => focusCard(active - 1)} disabled={active === 0} aria-label="Previous day">
            <svg viewBox="0 0 16 16"><path d="M10 2 4 8l6 6" /></svg>
          </button>
          <button type="button" onClick={() => focusCard(active + 1)} disabled={active === days.length - 1} aria-label="Next day">
            <svg viewBox="0 0 16 16"><path d="M6 2l6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      <ol
        className={`${styles.hs} ${drag === "holding" ? styles.holding : ""} ${drag === "settling" ? styles.settling : ""}`}
        ref={rowRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onDragStart={(e) => e.preventDefault()}
        tabIndex={0}
        aria-label="Five days of Tết. Drag, or use the arrow keys, to move between them"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { focusCard(active + 1); e.preventDefault(); }
          if (e.key === "ArrowLeft") { focusCard(active - 1); e.preventDefault(); }
        }}
      >
        {days.map((d, i) => (
          <li
            key={d.n}
            onClick={() => {
              if (!suppressClick.current) focusCard(i);
            }}
          >
            <article className={`${styles.day} ${i === active ? styles.active : ""}`} aria-current={i === active}>
              <p className={styles.m}>
                <span>{d.month}</span>
                <span>{pad(i + 1)} / {pad(days.length)}</span>
              </p>
              <div className={styles.n}>{d.n}</div>
              <div className={styles.ic}><DayIcon name={d.icon} /></div>
              {d.varies && <p className={styles.tag} lang="en">Date varies</p>}
              <h3 lang="vi">{d.vi}</h3>
              <p className={styles.say} lang="en">say “{d.say}”</p>
              <p className={styles.en} lang="en">{d.en}</p>
              <p className={styles.body} lang="en">{d.body}</p>
              <ul className={styles.chips} lang="en" aria-label="On the tray">
                {d.chips.map((c) => <li key={c}>{c}</li>)}
              </ul>
              {d.note && <p className={styles.note} lang="en">{d.note}</p>}
            </article>
          </li>
        ))}
      </ol>

      <div className="wrap">
        <div className={styles.bar} aria-hidden="true">
          <i style={{ width: `${pct}%` }} />
        </div>
      </div>
    </>
  );
}
