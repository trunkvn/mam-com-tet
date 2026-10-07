"use client";

import { shortDate, weekdayEn, weekdayVi } from "./format";
import { FIRST_YEAR, LAST_YEAR, daysBetween, yearName, type YMD } from "./lunar";
import { useTetYear } from "./TetYear";
import styles from "./TetCountdown.module.css";

const pad = (n: number) => String(n).padStart(2, "0");
const iso = ({ y, m, d }: YMD) => `${y}-${pad(m)}-${pad(d)}`;

/**
 * When is Tết this year? A small tear-off calendar sheet shows the day on the Gregorian calendar,
 * and beside it go the days left, the year's name, and the days around Tết. The year can be
 * stepped to look up any other.
 */
export default function TetCountdown() {
  const { today, year, nowYear, days, setYear, reset } = useTetYear();

  // Nothing here is known until the page is in the browser: the date it is today is the reader's.
  const ready = today !== null && year !== null && nowYear !== null && days !== null;

  let big = "—";
  let label = "";
  let word = false;
  if (ready) {
    const left = daysBetween(today, days.tet);
    if (year !== nowYear) {
      // looking at another year: the year itself is the thing to read
      big = String(year);
      label = year > nowYear ? "a Tết to come" : "a Tết gone by";
    } else if (left > 1) {
      big = String(left);
      label = "days to go";
    } else if (left === 1) {
      big = "1";
      label = "day to go: tomorrow";
    } else {
      // Tết itself, up to the 7th day, when the new-year pole comes down
      big = `Mùng ${1 - left}`;
      label = left === 0 ? "Chúc mừng năm mới!" : "Tết is on now";
      word = true;
    }
  }

  const name = ready ? yearName(year) : null;
  const note =
    name?.animal === "Cat"
      ? "The Vietnamese zodiac has a cat where the Chinese one has a rabbit."
      : name?.animal === "Buffalo"
        ? "The Vietnamese zodiac has a buffalo where the Chinese one has an ox."
        : null;

  const marks: { vi: string; date: YMD; key: string; strong?: boolean }[] = ready
    ? [
        { key: "gods", vi: "23 tháng Chạp", date: days.kitchenGods },
        { key: "eve", vi: `Giao thừa · ${days.eveDay} Chạp`, date: days.eve },
        { key: "tet", vi: "Mùng 1", date: days.tet, strong: true },
        { key: "d3", vi: "Mùng 3", date: days.day3 },
        { key: "d7", vi: "Mùng 7", date: days.day7 },
      ]
    : [];

  return (
    <section className={styles.when} aria-label="When Tết falls, and how long to wait">
      <div className="wrap">
        <div className={styles.row} aria-busy={!ready}>
          {/* a tear-off wall calendar sheet: the day Tết begins, on the Gregorian calendar */}
          <div className={styles.sheet} role="img" aria-label={ready ? `Calendar page: ${weekdayEn(days.tet)} ${days.tet.d}/${days.tet.m}/${days.tet.y}` : "Calendar page"}>
            <div className={styles.page} aria-hidden="true">
              <div className={styles.band}>
                <span lang="vi">Tháng {ready ? days.tet.m : "·"}</span>
                <span>{ready ? days.tet.y : "····"}</span>
              </div>
              <div className={styles.numeral}>{ready ? days.tet.d : "—"}</div>
              <p className={styles.weekday} lang="vi">{ready ? weekdayVi(days.tet) : " "}</p>
              <p className={styles.weekdayEn} lang="en">{ready ? weekdayEn(days.tet) : " "}</p>
              <div className={styles.lunar} lang="vi">
                <span>Mùng 1 tháng Giêng</span>
                <b>{name ? name.vi : " "}</b>
              </div>
            </div>
          </div>

          <div className={styles.side}>
            <p className={styles.eyebrow} lang="en">
              <span lang="vi">Tết {ready ? year : ""}</span>
              {ready && year === nowYear && <span className={styles.next}>this year</span>}
            </p>

            <p className={styles.count} aria-live="polite" lang="en">
              <b className={word ? styles.word : ""}>{big}</b>
              <span>{label}</span>
            </p>

            <p className={styles.animal} lang="en">
              {name ? `The year of the ${name.animal}.` : " "} {note}
            </p>

            <ol className={styles.marks}>
              {ready
                ? marks.map((k) => {
                    const away = year === nowYear ? daysBetween(today, k.date) : null;
                    return (
                      <li
                        key={k.key}
                        className={`${k.strong ? styles.strong : ""} ${away !== null && away < 0 ? styles.past : ""}`}
                      >
                        <span className={styles.mvi} lang="vi">{k.vi}</span>
                        <time dateTime={iso(k.date)} lang="en">{shortDate(k.date)}</time>
                      </li>
                    );
                  })
                : Array.from({ length: 5 }, (_, i) => <li key={i} aria-hidden="true" />)}
            </ol>

            <div className={styles.foot}>
              <div className={styles.step} role="group" aria-label="Look up the Tết of another year">
                <button
                  type="button"
                  onClick={() => ready && setYear(year - 1)}
                  disabled={!ready || year <= FIRST_YEAR}
                  aria-label={ready ? `Show the Tết of ${year - 1}` : "Previous year"}
                >
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 2 4 8l6 6" /></svg>
                </button>
                <span className={styles.yearNo} lang="en">{ready ? year : "····"}</span>
                <button
                  type="button"
                  onClick={() => ready && setYear(year + 1)}
                  disabled={!ready || year >= LAST_YEAR}
                  aria-label={ready ? `Show the Tết of ${year + 1}` : "Next year"}
                >
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 2l6 6-6 6" /></svg>
                </button>
                {ready && year !== nowYear && (
                  <button type="button" className={styles.back} onClick={reset} lang="en">
                    Back to the next Tết
                  </button>
                )}
              </div>
              <p className={styles.fine} lang="en">
                Dates in Vietnam (UTC+7): giao thừa may fall a day earlier where you are.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
