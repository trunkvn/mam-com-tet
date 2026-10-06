import type { RegionId } from "../dishes/data";

export type FruitId =
  | "chuoi"
  | "le"
  | "phatthu"
  | "hong"
  | "nho"
  | "mangcau"
  | "sung"
  | "dua"
  | "dudu"
  | "xoai"
  | "thanhlong"
  | "duahau";

export type Fruit = {
  id: FruitId;
  vi: string;
  /** Approximate English respelling, northern accent, tones not shown. */
  say: string;
  en: string;
  /** Size of the drawing inside its window. */
  scale: number;
  /** The small line under the name: the element it stands for, or the word it plays on. */
  tag: string;
  body: string;
};

export type FruitRegion = {
  id: RegionId;
  label: string;
  /** How this region chooses its fruit. */
  how: string;
  /** The line under the windows. */
  lead: string;
  leadNote: string;
  fruits: Fruit[];
};

// North: chosen by colour so that the five elements (ngũ hành) are all there.
// South: chosen for what the names sound like. The centre often just offers what it has.
export const FRUIT_REGIONS: FruitRegion[] = [
  {
    id: "bac",
    label: "Miền Bắc",
    how: "The north chooses by colour, so that the five elements are all on the stand.",
    lead: "Xanh, trắng, vàng, đỏ, đen.",
    leadNote: "“Green, white, yellow, red, black”: wood, metal, earth, fire, water. Families mix and match; this is one set that covers all five colours.",
    fruits: [
      {
        id: "chuoi",
        vi: "Chuối",
        say: "chwoy",
        en: "Banana",
        scale: 1.2,
        tag: "Mộc · wood · green",
        body: "Green bananas, a whole hand of them. Often read as the family gathered close, and a hand that shelters.",
      },
      {
        id: "le",
        vi: "Lê",
        say: "leh",
        en: "Pear",
        scale: 1.1,
        tag: "Kim · metal · white",
        body: "A pale fruit for the white of metal. Pears and apples are both common in the north.",
      },
      {
        id: "phatthu",
        vi: "Phật thủ · Bưởi",
        say: "fuht too · buh-ee",
        en: "Buddha's hand · pomelo",
        scale: 1.1,
        tag: "Thổ · earth · yellow",
        body: "Yellow fruit for the earth, at the centre. The pomelo is read as fullness. Buddha's hand is a citron whose segments spread like fingers, which gave it its name.",
      },
      {
        id: "hong",
        vi: "Hồng",
        say: "hawng",
        en: "Persimmon",
        scale: 1,
        tag: "Hỏa · fire · red",
        body: "Red-orange fruit for fire. Persimmons, kumquats and other red fruit are often read as luck.",
      },
      {
        id: "nho",
        vi: "Nho",
        say: "nyaw",
        en: "Grapes",
        scale: 1,
        tag: "Thủy · water · black",
        body: "Dark fruit for water. Black or deep purple grapes are a common choice.",
      },
    ],
  },
  {
    id: "trung",
    label: "Miền Trung",
    how: "The centre has no fixed rule: families offer what the land gives, and sincerity matters more than the set.",
    lead: "Có gì cúng nấy.",
    leadNote: "“Offer what you have.” Storms and thin soil leave the centre with less fruit, so this stand is simple. Banana, dragon fruit, watermelon, papaya and pomelo or Buddha's hand are common, but not fixed.",
    fruits: [
      {
        id: "chuoi",
        vi: "Chuối",
        say: "chwoy",
        en: "Banana",
        scale: 1.2,
        tag: "A hand that shelters",
        body: "A whole hand of bananas, common on stands everywhere, is often read as shelter and protection.",
      },
      {
        id: "thanhlong",
        vi: "Thanh long",
        say: "tahn lawng",
        en: "Dragon fruit",
        scale: 1.1,
        tag: "Red, like luck",
        body: "Bright pink skin with green scales. Its red is welcome at Tết.",
      },
      {
        id: "duahau",
        vi: "Dưa hấu",
        say: "zuh-ah how",
        en: "Watermelon",
        scale: 1.25,
        tag: "Round and red inside",
        body: "Often set in the middle. A round, red-fleshed melon is read as luck and hope for the year.",
      },
      {
        id: "dudu",
        vi: "Đu đủ",
        say: "doo doo",
        en: "Papaya",
        scale: 1.1,
        tag: "Đủ · enough",
        body: "Shares its last syllable with đủ, “enough”, the same pun the south uses.",
      },
      {
        id: "phatthu",
        vi: "Phật thủ · Bưởi",
        say: "fuht too · buh-ee",
        en: "Buddha's hand · pomelo",
        scale: 1.1,
        tag: "Gold and full",
        body: "Yellow citrus, a pomelo or a Buddha's hand, rounds off the stand. The pomelo is read as fullness.",
      },
    ],
  },
  {
    id: "nam",
    label: "Miền Nam",
    how: "The south chooses by sound: five names that play on a wish. In the centre, families often offer what they have.",
    lead: "Cầu sung vừa đủ xài.",
    leadNote: "“Wishing for just enough to spend.” Some say “cầu dừa đủ xài” instead.",
    fruits: [
      {
        id: "mangcau",
        vi: "Mãng cầu",
        say: "mahng kuh-oo",
        en: "Custard apple",
        scale: 1.15,
        tag: "Cầu · to wish",
        body: "Cầu also means to pray or to wish, so this fruit opens the phrase.",
      },
      {
        id: "sung",
        vi: "Sung",
        say: "soong",
        en: "Fig",
        scale: 1,
        tag: "Sung · well-off",
        body: "Sung túc means comfortable and well-off.",
      },
      {
        id: "dua",
        vi: "Dừa",
        say: "zuh-ah",
        en: "Coconut",
        scale: 1.25,
        tag: "Vừa · just right",
        body: "In the southern accent dừa sounds like vừa, “just right”.",
      },
      {
        id: "dudu",
        vi: "Đu đủ",
        say: "doo doo",
        en: "Papaya",
        scale: 1.1,
        tag: "Đủ · enough",
        body: "Đu đủ shares its last syllable with đủ, “enough”.",
      },
      {
        id: "xoai",
        vi: "Xoài",
        say: "swy",
        en: "Mango",
        scale: 1,
        tag: "Xài · to spend",
        body: "Xoài sounds like xài, “to spend”.",
      },
    ],
  },
];
