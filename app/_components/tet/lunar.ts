// The Vietnamese lunar calendar, worked out from the sun and the moon.
//
// Why not the browser's own Chinese calendar (Intl)? Vietnam keeps UTC+7 and China UTC+8, so when a
// new moon falls close to midnight the two calendars can start a month on different days, and
// occasionally put a leap month in different places. In 1985 Tết fell on 21 January in Vietnam and
// 20 February in China. The sums here are done for UTC+7, and they agree with the dates Vietnamese
// sources publish where the browser's Chinese calendar does not (2027 is one).
//
// The method is the one set out by Hồ Ngọc Đức for the Vietnamese calendar: find the day of each
// new moon (Jean Meeus's formulas), find which new moon starts the 11th month (the one with the
// winter solstice in it), and count from there, adding a leap month in a 13-month year. Nothing in
// this file touches the page or the clock, so it can be tested on its own.

const PI = Math.PI;
const TIME_ZONE = 7;

/** A calendar date in the Gregorian calendar. */
export type YMD = { y: number; m: number; d: number };

const int = (x: number) => Math.floor(x);

/** Julian day number of a Gregorian date: a count of days, handy for adding and subtracting. */
export const jdOf = ({ y, m, d }: YMD) => {
  const a = int((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  let jd = d + int((153 * mm + 2) / 5) + 365 * yy + int(yy / 4) - int(yy / 100) + int(yy / 400) - 32045;
  if (jd < 2299161) jd = d + int((153 * mm + 2) / 5) + 365 * yy + int(yy / 4) - 32083;
  return jd;
};

/** The Gregorian date of a Julian day number. */
export const ymdOf = (jd: number): YMD => {
  let b: number;
  let c: number;
  if (jd > 2299160) {
    const a = jd + 32044;
    b = int((4 * a + 3) / 146097);
    c = a - int((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  const d = int((4 * c + 3) / 1461);
  const e = c - int((1461 * d) / 4);
  const m = int((5 * e + 2) / 153);
  return { d: e - int((153 * m + 2) / 5) + 1, m: m + 3 - 12 * int(m / 10), y: b * 100 + d - 4800 + int(m / 10) };
};

/** The Julian day (with a fraction) of the k-th new moon since 1900. */
const newMoon = (k: number) => {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = PI / 180;
  let jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let c1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  c1 -= 0.4068 * Math.sin(Mpr * dr) - 0.0161 * Math.sin(dr * 2 * Mpr);
  c1 -= 0.0004 * Math.sin(dr * 3 * Mpr);
  c1 += 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  c1 -= 0.0074 * Math.sin(dr * (M - Mpr)) - 0.0004 * Math.sin(dr * (2 * F + M));
  c1 -= 0.0004 * Math.sin(dr * (2 * F - M)) + 0.0006 * Math.sin(dr * (2 * F + Mpr));
  c1 += 0.001 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  const deltat =
    T < -11
      ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
      : -0.000278 + 0.000265 * T + 0.000262 * T2;
  return jd1 + c1 - deltat;
};

/** Where the sun is on its path, in 30-degree steps (0 to 11), at a given day in Vietnam. */
const sunLongitude = (jdn: number) => {
  const T = (jdn - 2451545.0 - 0.5 - TIME_ZONE / 24) / 36525;
  const T2 = T * T;
  const dr = PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let dl = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  dl += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
  let L = (L0 + dl) * dr;
  L -= PI * 2 * int(L / (PI * 2));
  return int((L / PI) * 6);
};

/** The day (Julian day number, in Vietnam) on which the k-th new moon falls. */
const newMoonDay = (k: number) => int(newMoon(k) + 0.5 + TIME_ZONE / 24);

/** The first day of the 11th lunar month of the lunar year that starts in the given Gregorian year. */
const lunarMonth11 = (year: number) => {
  const off = jdOf({ y: year, m: 12, d: 31 }) - 2415021;
  const k = int(off / 29.530588853);
  let nm = newMoonDay(k);
  if (sunLongitude(nm) >= 9) nm = newMoonDay(k - 1);
  return nm;
};

/** In a 13-month year, which month (counted from the 11th) is the leap one. */
const leapMonthOffset = (a11: number) => {
  const k = int((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let i = 1;
  let arc = sunLongitude(newMoonDay(k + i));
  let last: number;
  do {
    last = arc;
    i++;
    arc = sunLongitude(newMoonDay(k + i));
  } while (arc !== last && i < 14);
  return i - 1;
};

/** A lunar date: day, month, lunar year, and whether the month is a leap month. */
export type Lunar = { day: number; month: number; year: number; leap: boolean };

/** The lunar date of a Gregorian date. */
export const toLunar = ({ y, m, d }: YMD): Lunar => {
  const dayNumber = jdOf({ y, m, d });
  const k = int((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = newMoonDay(k + 1);
  if (monthStart > dayNumber) monthStart = newMoonDay(k);
  let a11 = lunarMonth11(y);
  let b11 = a11;
  let lunarYear: number;
  if (a11 >= monthStart) {
    lunarYear = y;
    a11 = lunarMonth11(y - 1);
  } else {
    lunarYear = y + 1;
    b11 = lunarMonth11(y + 1);
  }
  const day = dayNumber - monthStart + 1;
  const diff = int((monthStart - a11) / 29);
  let leap = false;
  let month = diff + 11;
  if (b11 - a11 > 365) {
    const leapDiff = leapMonthOffset(a11);
    if (diff >= leapDiff) {
      month = diff + 10;
      if (diff === leapDiff) leap = true;
    }
  }
  if (month > 12) month -= 12;
  if (month >= 11 && diff < 4) lunarYear -= 1;
  return { day, month, year: lunarYear, leap };
};

/** The Gregorian date of a lunar date, or null if there is no such date (a leap month that year does not exist). */
export const fromLunar = (day: number, month: number, year: number, leap = false): YMD | null => {
  let a11: number;
  let b11: number;
  if (month < 11) {
    a11 = lunarMonth11(year - 1);
    b11 = lunarMonth11(year);
  } else {
    a11 = lunarMonth11(year);
    b11 = lunarMonth11(year + 1);
  }
  const k = int(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  let off = month - 11;
  if (off < 0) off += 12;
  if (b11 - a11 > 365) {
    const leapOff = leapMonthOffset(a11);
    let leapMonth = leapOff - 2;
    if (leapMonth < 0) leapMonth += 12;
    if (leap && month !== leapMonth) return null;
    if (leap || off >= leapOff) off += 1;
  }
  return ymdOf(newMoonDay(k + off) + day - 1);
};

// ---------------------------------------------------------------------------------------------
// Tết and the days around it
// ---------------------------------------------------------------------------------------------

/**
 * The years the page will look up. Vietnam has kept UTC+7 throughout since 1975 (the north changed
 * to it in 1967, the south in 1975), and the sums stay accurate for a long way ahead.
 */
export const FIRST_YEAR = 1976;
export const LAST_YEAR = 2100;

/**
 * Which Tết to show on a given day: this calendar year's, until the 7th day of it has gone by,
 * and after that next year's.
 */
export const focusYear = (today: YMD) => {
  const thisYear = tetDays(today.y);
  return daysBetween(today, thisYear.day7) >= 0 ? today.y : today.y + 1;
};

/** The days of the Tết season that the page cares about, for the lunar year that starts in `year`. */
export type TetDays = {
  /** The 23rd of the 12th month of the year before: seeing off the Kitchen Gods. */
  kitchenGods: YMD;
  /** The last day of the old year. Giao thừa is its night. */
  eve: YMD;
  /** The last day of the 12th month is the 29th or the 30th, depending on the year. */
  eveDay: number;
  /** The first day of the first month. */
  tet: YMD;
  /** The 3rd day. */
  day3: YMD;
  /** The 7th day, when the new-year pole comes down. */
  day7: YMD;
};

export const tetDays = (year: number): TetDays => {
  const tet = fromLunar(1, 1, year);
  const kitchenGods = fromLunar(23, 12, year - 1);
  if (!tet || !kitchenGods) throw new Error(`No Tết found for ${year}`);
  const tetJd = jdOf(tet);
  const eve = ymdOf(tetJd - 1);
  return {
    kitchenGods,
    eve,
    eveDay: toLunar(eve).day,
    tet,
    day3: ymdOf(tetJd + 2),
    day7: ymdOf(tetJd + 6),
  };
};

/** Whole days from one calendar date to another (negative if `to` is earlier). */
export const daysBetween = (from: YMD, to: YMD) => jdOf(to) - jdOf(from);

// ---------------------------------------------------------------------------------------------
// The year's name: a heavenly stem and an earthly branch, and the animal that goes with it
// ---------------------------------------------------------------------------------------------

const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

// The Vietnamese twelve: the cat takes the place of the rabbit, and the buffalo of the ox.
const ANIMAL = [
  "Rat",
  "Buffalo",
  "Tiger",
  "Cat",
  "Dragon",
  "Snake",
  "Horse",
  "Goat",
  "Monkey",
  "Rooster",
  "Dog",
  "Pig",
];

export type YearName = { vi: string; animal: string; chi: string };

export const yearName = (year: number): YearName => {
  const can = CAN[(((year + 6) % 10) + 10) % 10];
  const i = (((year + 8) % 12) + 12) % 12;
  return { vi: `${can} ${CHI[i]}`, animal: ANIMAL[i], chi: CHI[i] };
};
