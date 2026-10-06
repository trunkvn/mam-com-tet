"use client";

import Rich from "../ui/Rich";
import { useId, useState } from "react";
import type { Tip } from "./data";
import styles from "./Envelopes.module.css";

/** Six envelopes. Tap one and the note slides out; any number can be open at once. */
export default function Envelopes({ tips }: { tips: Tip[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(i)) next.add(i);
      return next;
    });

  return (
    <div className={styles.envs}>
      {tips.map((t, i) => {
        const isOpen = open.has(i);
        const noteId = `${baseId}-note-${i}`;
        return (
          <div
            key={t.vi}
            className={`${styles.env} ${isOpen ? styles.open : ""}`}
            style={{ "--r": `${t.tilt}deg` } as React.CSSProperties}
          >
            <span className={styles.back} aria-hidden="true" />

            {/* the note: hidden from screen readers until its envelope is opened */}
            <div
              id={noteId}
              className={styles.paper}
              role="region"
              aria-label={t.title}
              aria-hidden={!isOpen}
              onClick={() => toggle(i)}
              lang="en"
            >
              <b>{t.title}</b>
              <em><span lang="vi">{t.vi}</span> · say “{t.say}”</em>
              <span><Rich>{t.body}</Rich></span>
            </div>

            <span className={styles.front} aria-hidden="true" />
            <svg className={styles.vline} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <polyline points="0,0 50,68 100,0" fill="none" stroke="#f0be6b" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className={styles.flap} aria-hidden="true">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline points="0,0 50,100 100,0" fill="none" stroke="#f0be6b" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
              </svg>
            </span>
            <span className={styles.seal} aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <circle cx="16" cy="16" r="13" />
                <circle cx="16" cy="16" r="5" />
                <path d="M16 3v6M16 23v6M3 16h6M23 16h6M6.8 6.8l4.2 4.2M21 21l4.2 4.2M6.8 25.2L11 21M21 11l4.2-4.2" />
              </svg>
            </span>
            <span className={styles.label} aria-hidden="true">
              <span lang="vi">{t.vi}</span>
              <small>{isOpen ? "Tap to close" : "Tap to open"}</small>
            </span>

            {/* one real control over the whole envelope: keyboard, focus ring, screen readers */}
            <button
              type="button"
              className={styles.hit}
              aria-expanded={isOpen}
              aria-controls={noteId}
              aria-label={`${t.title}, ${t.vi}`}
              onClick={() => toggle(i)}
            />
          </div>
        );
      })}
    </div>
  );
}
