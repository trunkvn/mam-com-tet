"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { todayLocal } from "./format";
import { FIRST_YEAR, LAST_YEAR, focusYear, tetDays, type TetDays, type YMD } from "./lunar";

/**
 * Which Tết the page is showing, shared by the countdown and by the day cards, so that stepping to
 * another year in one changes the dates in the other.
 *
 * Today's date is the reader's, which the server cannot know, so until the page is in the browser
 * everything here is empty and the components draw a placeholder.
 */
type Value = {
  /** The reader's calendar date today, or null before the page has loaded. */
  today: YMD | null;
  /** The year of the Tết being shown, or null before the page has loaded. */
  year: number | null;
  /** The Tết that is next (or still going on): where "back to now" returns to. */
  nowYear: number | null;
  /** The dates of the Tết season being shown. */
  days: TetDays | null;
  setYear: (year: number) => void;
  reset: () => void;
};

const Ctx = createContext<Value>({
  today: null,
  year: null,
  nowYear: null,
  days: null,
  setYear: () => {},
  reset: () => {},
});

export const useTetYear = () => useContext(Ctx);

// Today's date as a short string, so React can tell when it has changed. When the reader comes
// back to the tab after midnight the date is read again.
const key = ({ y, m, d }: YMD) => `${y}-${m}-${d}`;
const subscribe = (notify: () => void) => {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
};
const snapshot = () => key(todayLocal());
const serverSnapshot = () => null;

export function TetYearProvider({ children }: { children: ReactNode }) {
  const stamp = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [picked, setPicked] = useState<number | null>(null);

  const today = useMemo<YMD | null>(() => {
    if (!stamp) return null;
    const [y, m, d] = stamp.split("-").map(Number);
    return { y, m, d };
  }, [stamp]);

  const nowYear = today ? focusYear(today) : null;
  const year = picked ?? nowYear;
  const days = useMemo(() => (year === null ? null : tetDays(year)), [year]);

  const value = useMemo<Value>(
    () => ({
      today,
      year,
      nowYear,
      days,
      setYear: (y) => setPicked(Math.min(Math.max(y, FIRST_YEAR), LAST_YEAR)),
      reset: () => setPicked(null),
    }),
    [today, year, nowYear, days],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
