export type DayIcon = "carp" | "tray" | "bowl" | "ingot" | "pole";

export type Day = {
  /** Lunar month the day falls in. */
  month: string;
  /** The big numeral on the card. */
  n: string;
  vi: string;
  /** Approximate English respelling, northern accent, tones not shown. */
  say: string;
  en: string;
  icon: DayIcon;
  body: string;
  /** What is on the tray that day, in short. */
  chips: string[];
  /** Where families or regions differ. */
  note?: string;
  /** The date itself moves from family to family. */
  varies?: boolean;
  /** Highlighted card: midnight. */
  hot?: boolean;
  /** Which day of the Tết season this is, so the page can show its date on the Gregorian calendar. */
  when: "kitchenGods" | "eve" | "tet" | "day3" | "day7";
};

// Dates are lunar. Where sources disagree the card says so instead of picking one.
export const DAYS: Day[] = [
  {
    month: "Tháng Chạp",
    n: "23",
    when: "kitchenGods",
    vi: "Ông Công, Ông Táo",
    say: "ohng kohng, ohng tow",
    en: "Seeing off the Kitchen Gods",
    icon: "carp",
    body: "A small offering for the gods of the hearth, who are said to ride a carp up to heaven to report on the household before the new year. Many families set a live carp free afterwards; a paper one will do.",
    chips: ["Boiled rooster", "Soup", "Xôi gấc", "Carp", "Paper hats and clothes"],
    note: "Varies: a carp in the north, a paper horse in the centre, paper hats and clothes in the south.",
  },
  {
    month: "Tháng Chạp",
    n: "30",
    when: "eve",
    vi: "Tất niên & Giao thừa",
    say: "tuht nee-en · zow tuh-ah",
    en: "The last night of the year",
    icon: "tray",
    body: "The tray you have just set. In the evening the family gathers for tất niên to thank heaven, earth and the household gods for the year. At midnight, giao thừa, the tray is offered for the new one. In the north that means a whole boiled rooster, often with a flower.",
    chips: ["Everything on the tray above"],
    note: "Varies: in the south the ancestors are often welcomed home a few days earlier, around the 25th; in the north this is usually done on the 30th.",
    hot: true,
  },
  {
    month: "Tháng Giêng",
    n: "1",
    when: "tet",
    vi: "Mùng một",
    say: "moong moht",
    en: "The first morning",
    icon: "bowl",
    body: "A family tray again, with the same festive dishes cooked beforehand. Many families avoid sweeping, cutting hair, breaking dishes and killing animals on the first day, which is why the cooking is done ahead.",
    chips: ["The Tết dishes", "Five-fruit tray", "Incense and flowers"],
    note: "Varies: southern trays often add lạp xưởng, braised pork with eggs and bitter-melon soup.",
  },
  {
    month: "Tháng Giêng",
    n: "3",
    when: "day3",
    vi: "Tiễn ông bà · Hóa vàng",
    say: "tee-en ohng bah · hwah vahng",
    en: "Seeing the ancestors off",
    icon: "ingot",
    body: "The tray is laid once more to thank the ancestors and send them back, and votive paper is burned (hóa vàng). The 3rd is the most common day, but families differ.",
    chips: ["Whole boiled chicken", "White sticky rice", "Bánh chưng", "Boiled pork", "Stir-fried greens"],
    note: "Date varies: some families do it on the 2nd or 4th, others on the 7th or even the 10th. In the Mekong delta it is often done in the small hours of the 3rd.",
    varies: true,
  },
  {
    month: "Tháng Giêng",
    n: "7",
    when: "day7",
    vi: "Khai hạ · Hạ nêu",
    say: "kye hah · hah nay-oo",
    en: "Lowering the pole",
    icon: "pole",
    body: "The new-year pole (cây nêu), raised between the 23rd and the 30th to keep bad spirits away, comes down. Families make a last offering, and for many this is when the ancestors are seen off. Tết is over and work begins again.",
    chips: ["A last offering"],
    varies: true,
  },
];
