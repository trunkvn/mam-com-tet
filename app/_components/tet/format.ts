import type { YMD } from "./lunar";

// A date is only ever a calendar date here, never a moment, so it is read as UTC and formatted as
// UTC: that way the reader's own time zone cannot shift it by a day.
const at = ({ y, m, d }: YMD) => new Date(Date.UTC(y, m - 1, d));

const long = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const short = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

const shortYear = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "Saturday 6 February 2027" */
export const longDate = (d: YMD) => long.format(at(d)).replace(",", "");

/** "Sat 6 Feb" */
export const shortDate = (d: YMD) => short.format(at(d)).replace(",", "");

/** "Sat 6 Feb 2027" */
export const shortDateYear = (d: YMD) => shortYear.format(at(d)).replace(",", "");

const WEEKDAY_VI = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

/** "Thứ Bảy" */
export const weekdayVi = (d: YMD) => WEEKDAY_VI[at(d).getUTCDay()];

/** "Saturday" */
export const weekdayEn = (d: YMD) =>
  new Intl.DateTimeFormat("en-GB", { weekday: "long", timeZone: "UTC" }).format(at(d));

/** The reader's own calendar date today, as a plain date. */
export const todayLocal = (): YMD => {
  const n = new Date();
  return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() };
};
