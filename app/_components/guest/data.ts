export type Tip = {
  /** The Vietnamese word on the front of the envelope. */
  vi: string;
  /** Approximate English respelling, northern accent, tones not shown. */
  say: string;
  /** What the note inside is about, in plain English. */
  title: string;
  body: string;
  /** Tilt of the envelope in degrees, so the set does not look stamped out. */
  tilt: number;
};

// Common courtesies for a guest at Tết. They differ between families and regions, and most of
// the English-language sources are travel guides: worth a Vietnamese reader's check.
export const TIPS: Tip[] = [
  {
    vi: "Xông đất",
    say: "soong duht",
    title: "Wait to be asked",
    body: "The first person through the door in the new year is thought to set the family's luck. Don't turn up on the morning of the 1st unless you're invited: hosts often ask someone cheerful and healthy on purpose. A visitor who arrives by accident is still welcomed.",
    tilt: -2,
  },
  {
    vi: "Quà biếu",
    say: "kwah bee-oo",
    title: "What to bring",
    body: "Fruit, tea, sweets, or red or yellow flowers, wrapped in red or yellow. Skip knives and scissors, handkerchiefs, clocks, and black or white wrapping. Many also avoid pears as a gift: lê sounds like li, as in parting.",
    tilt: 1.5,
  },
  {
    vi: "Vào nhà",
    say: "vow nyah",
    title: "At the door",
    body: "Take your shoes off at the threshold. Greet the oldest people first, with a slight bow or a smile. Bright clothes suit the day; black and white are linked with mourning.",
    tilt: -1,
  },
  {
    vi: "Lời chúc",
    say: "luh-ee chook",
    title: "Say it",
    body: "Chúc mừng năm mới: happy new year. An khang thịnh vượng: peace and prosperity. Sức khỏe dồi dào: plenty of health. Keep the talk cheerful and leave last year's troubles out.",
    tilt: 2,
  },
  {
    vi: "Lì xì",
    say: "lee see",
    title: "If you are handed one",
    body: "Take it with both hands, a slight bow, and a thank-you with a wish. Don't open it in front of the giver. If you give one: a red envelope and crisp new notes. Many families avoid amounts with a 4.",
    tilt: -1.5,
  },
  {
    vi: "Ăn Tết",
    say: "un tet",
    title: "At the table",
    body: "You will be offered food and sweets; accepting graciously matters more than finishing. You may see food set on the altar first: just watch respectfully. You are not expected to take part in the ritual unless invited.",
    tilt: 1,
  },
];
