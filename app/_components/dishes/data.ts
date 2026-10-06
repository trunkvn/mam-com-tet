export type DishArtKey =
  | "chung"
  | "log"
  | "chicken"
  | "roll"
  | "soup"
  | "noodle"
  | "balls"
  | "puff"
  | "xoi"
  | "jar"
  | "pork"
  | "sweet"
  | "bundle"
  | "shrimp";

export type Dish = {
  id: string;
  vi: string;
  /** Approximate English respelling, northern accent, tones not shown. */
  say: string;
  en: string;
  art: DishArtKey;
  /** A real picture of the dish, shown as a preview when its plate on the tray is hovered or tapped. */
  photo?: { src: string; alt: string };
  /** Northern mâm cỗ is counted in plates (đĩa) and bowls (bát). Left out where no such count is claimed. */
  vessel?: "dia" | "bat";
  /** The page's own line, shown in italics. It is our telling, not tradition. */
  quote: string;
  body: string;
  /**
   * [label, value]. The label "Often read as" marks a meaning people commonly give;
   * it is an interpretation and varies by family. Leave it out when there is no sourced reading.
   */
  facts: [string, string][];
};

/** A dish that sits beside the tray rather than on it. */
export type BesideItem = {
  vi: string;
  say: string;
  en: string;
  art: DishArtKey;
  note: string;
};

export type RegionId = "bac" | "trung" | "nam";

export type Region = {
  id: RegionId;
  label: string;
  /** Shown next to the picker: how this tray is counted, and what is only our drawing of it. */
  note: string;
  /** Exactly eight dishes: the first goes in the centre, the other seven around the ring. */
  dishes: Dish[];
  beside: BesideItem[];
};

// Northern mâm cỗ: the basic set is 4 plates + 4 bowls (some families go to 6 + 6 or 8 + 8).
// Sources agree on 4 + 4 but differ on which four plates, so this is one version of it.
const NORTH_DISHES: Dish[] = [
  {
    id: "ga",
    vi: "Gà luộc",
    say: "gah lwuhk",
    en: "Boiled whole chicken",
    art: "chicken",
    photo: { src: "/img/north/ga.jpg", alt: "Boiled whole rooster, golden-skinned, posed head-up on a bed of herbs and shredded vegetables" },
    vessel: "dia",
    quote: "One whole bird, one whole year.",
    body: "A whole rooster boiled just until the skin turns gold, then posed head-up on the plate, often with a flower in its beak. It is offered whole and cut up only afterwards.",
    facts: [
      ["Ingredients", "Whole rooster, ginger, salt"],
      ["Where", "Nationwide; the flower-in-beak pose is a northern habit"],
      ["The craft", "Simmered, then plunged in cold water to keep the skin taut"],
      ["Often read as", "Completeness for the family. The rooster is also said to stand for five virtues: văn, võ, dũng, nhân, tín"],
    ],
  },
  {
    id: "chung",
    vi: "Bánh chưng",
    say: "bahn chuhng",
    en: "Square sticky-rice cake",
    art: "chung",
    photo: { src: "/img/north/chung.jpg", alt: "Two square bánh chưng wrapped in green dong leaves and tied with bamboo strips, on a woven tray" },
    vessel: "dia",
    quote: "A square of earth, wrapped in green.",
    body: "Glutinous rice, split mung beans and pork belly wrapped in dong leaves and boiled through the night. A legend tells of Lang Liêu, a son of the Hùng king, who made it square for the Earth and won his father's favour.",
    facts: [
      ["Ingredients", "Sticky rice, mung bean, pork belly, dong leaf"],
      ["Where", "The north; bánh tét is the cylinder-shaped version in the south"],
      ["The craft", "Boiled for many hours, usually overnight"],
      ["Often read as", "The square stands for the Earth, and for gratitude to the ancestors"],
    ],
  },
  {
    id: "gio",
    vi: "Giò lụa",
    say: "zaw luh-ah",
    en: "Silk pork roll",
    art: "log",
    photo: { src: "/img/north/gio.jpg", alt: "A pale giò lụa pork roll, cut into thick slices on a banana leaf with herbs and dipping sauce" },
    vessel: "dia",
    quote: "Pounded until it turns to silk.",
    body: "Lean pork pounded by hand with fish sauce until it becomes a pale, springy paste, then rolled tight in banana leaf and cooked. A good one is smooth and cuts in clean, bouncy slices.",
    facts: [
      ["Ingredients", "Lean pork, fish sauce, banana leaf"],
      ["Where", "Everywhere; chả lụa in the south"],
      ["The craft", "Pounded by hand, wrapped, then boiled or steamed"],
      ["Often read as", "Prosperity and abundance"],
    ],
  },
  {
    id: "nem",
    vi: "Nem rán",
    say: "nem zahn",
    en: "Fried spring rolls",
    art: "roll",
    photo: { src: "/img/north/nem.jpg", alt: "A plate of golden fried nem rán spring rolls with one cut open to show the filling, beside lettuce" },
    vessel: "dia",
    quote: "Crackle first. Conversation after.",
    body: "Minced pork, wood-ear mushroom and glass noodles rolled in rice paper and fried until blistered gold. In the north they are nem rán, in the south chả giò: the same crackle under a different name.",
    facts: [
      ["Ingredients", "Minced pork, wood-ear, vermicelli, rice paper"],
      ["Where", "North: nem rán · South: chả giò"],
      ["The craft", "Fried slowly so the wrapper blisters, not burns"],
      ["Often read as", "Prosperity"],
    ],
  },
  {
    id: "mang",
    vi: "Măng hầm chân giò",
    say: "mahng hum chuhn zaw",
    en: "Bamboo shoots stewed with pork trotter",
    art: "soup",
    photo: { src: "/img/north/mang.jpg", alt: "A bowl of bamboo-shoot soup with pig's trotters, rice vermicelli and sliced red chilli" },
    vessel: "bat",
    quote: "Old bamboo ages, new shoots rise.",
    body: "Dried bamboo shoots, soaked and rinsed for days, then stewed for hours with pork trotter until the broth turns clear and sweet.",
    facts: [
      ["Ingredients", "Dried bamboo shoots, pork trotter"],
      ["Where", "The north"],
      ["The craft", "Soaked for several days to lose the bitterness"],
      ["Often read as", "Through the saying tre già măng mọc (old bamboo, new shoots): the family carries on"],
    ],
  },
  {
    id: "mien",
    vi: "Miến",
    say: "mee-en",
    en: "Glass-noodle soup",
    art: "noodle",
    photo: { src: "/img/north/mien.jpg", alt: "Glass noodles with beef, sesame seeds and coriander lifted on chopsticks" },
    vessel: "bat",
    quote: "The light bowl among the rich plates.",
    body: "Thin glass noodles in a clear chicken broth, traditionally cooked with the chicken's giblets.",
    facts: [
      ["Ingredients", "Glass noodles, chicken (often the giblets)"],
      ["Where", "The north"],
      ["The craft", "Noodles soaked soft, then simmered briefly in the broth"],
    ],
  },
  {
    id: "bong",
    vi: "Bóng thả",
    say: "bawng tah",
    en: "Pork-skin soup",
    art: "puff",
    photo: { src: "/img/north/bong.jpg", alt: "A bowl of pork-skin soup with quail eggs, meatballs, dried shrimp, cauliflower, broccoli and snow peas" },
    vessel: "bat",
    quote: "Small pieces floating in a clear broth.",
    body: "Pork skin (bóng bì) is soaked, kneaded with rice wine and ginger to lose its smell, cut into bite-sized pieces and dropped into a clear broth with mushrooms and vegetables. It is called thả, “dropped”, because the pieces float in the bowl.",
    facts: [
      ["Ingredients", "Pork skin, clear chicken or bone broth, mushrooms, vegetables"],
      ["Where", "The north"],
      ["The craft", "Soaked for hours, then kneaded with wine and ginger before it goes in the broth"],
      ["Often read as", "One of the “four pillars” (tứ trụ) of the tray in some tellings: bóng, vây, măng, miến"],
    ],
  },
  {
    id: "moc",
    vi: "Bát mọc",
    say: "baht mawk",
    en: "Pork-ball and mushroom soup",
    art: "balls",
    photo: { src: "/img/north/moc.jpg", alt: "A bowl of clear soup with pork meatballs, wood-ear mushroom, broccoli, carrot flowers and spring onion" },
    vessel: "bat",
    quote: "Small, round, plain. A bowl made to share.",
    body: "Pork pounded until it holds together, shaped into small balls and dropped into a clear broth with mushrooms. Mọc is the name of the balls themselves.",
    facts: [
      ["Ingredients", "Pounded lean pork, mushrooms, clear broth"],
      ["Where", "The north"],
      ["The craft", "The pork is pounded smooth, then shaped by hand"],
    ],
  },
];

const NORTH_BESIDE: BesideItem[] = [
  {
    vi: "Xôi gấc",
    say: "soy guhk",
    en: "Red gấc sticky rice",
    art: "xoi",
    note: "Sticky rice steamed with gấc fruit, which turns it red. Red is the colour of luck and joy.",
  },
  {
    vi: "Dưa hành",
    say: "zuh-ah hine",
    en: "Pickled onions",
    art: "jar",
    note: "Pickled onions that cut the richness of the meat. Old belief says having them on the table invites wealth.",
  },
];

// A southern tray is not counted in plates and bowls here: this is one typical spread.
const SOUTH_DISHES: Dish[] = [
  {
    id: "kho",
    vi: "Thịt kho hột vịt",
    say: "tit kaw hoht vit",
    en: "Pork and eggs in coconut water",
    art: "pork",
    photo: { src: "/img/south/kho.jpg", alt: "Chunks of braised pork belly and glossy brown duck eggs in a cream bowl, with a sprig of coriander" },
    quote: "Square meat, round eggs: a pot that balances itself.",
    body: "Pork belly and whole duck eggs braised slowly in coconut water until the sauce turns amber and the eggs take on its colour.",
    facts: [
      ["Ingredients", "Pork belly, duck eggs, coconut water, fish sauce"],
      ["Where", "The south and the centre"],
      ["The craft", "Braised low and slow until the sauce turns glossy"],
      ["Often read as", "Square pieces of meat and round eggs balancing each other, like yin and yang"],
    ],
  },
  {
    id: "khoqua",
    vi: "Canh khổ qua",
    say: "kine kaw kwah",
    en: "Stuffed bitter-melon soup",
    art: "soup",
    photo: { src: "/img/south/khoqua.jpg", alt: "A clay pot of clear soup with stuffed bitter melons, coriander and a red chilli flower" },
    quote: "Bitter now, so that the hard times pass.",
    body: "Bitter melons hollowed out and stuffed with ground pork, fish and mushrooms, then simmered in a clear broth.",
    facts: [
      ["Ingredients", "Bitter melon, ground pork, fish, mushrooms"],
      ["Where", "The south"],
      ["The craft", "Stuffed whole and simmered gently to soften the bitterness"],
      ["Often read as", "A pun: khổ qua can be heard as “hardship passes”"],
    ],
  },
  {
    id: "tet",
    vi: "Bánh tét",
    say: "bahn tet",
    en: "Cylinder sticky-rice cake",
    art: "log",
    photo: { src: "/img/central/tet.jpg", alt: "Two bánh tét cylinders wrapped in banana leaf and tied with bamboo strips, among Tết decorations" },
    quote: "Rolled long, sliced round.",
    body: "Sticky rice, mung bean and pork belly rolled into a long cylinder in banana leaf, tied tight and boiled for hours. It is cut into rounds to serve.",
    facts: [
      ["Ingredients", "Sticky rice, mung bean, pork belly, banana leaf"],
      ["Where", "The south and the centre; bánh chưng in the north"],
      ["The craft", "Rolled tight, tied, and boiled for many hours"],
      ["Often read as", "The round shape stands for fullness and prosperity"],
    ],
  },
  {
    id: "chagio",
    vi: "Chả giò",
    say: "chah zaw",
    en: "Southern spring rolls",
    art: "roll",
    photo: { src: "/img/south/chagio.jpg", alt: "Golden fried chả giò rolls around a bowl of orange dipping sauce, with cucumber and coriander" },
    quote: "A thicker wrapper, a bolder crunch.",
    body: "The southern take on nem rán: a heartier filling of pork, shrimp and vegetables in a thicker rice-paper wrapper, fried until crisp.",
    facts: [
      ["Ingredients", "Pork, shrimp, vegetables, rice paper"],
      ["Where", "South: chả giò · North: nem rán"],
      ["The craft", "Fried until golden and crisp through"],
      ["Often read as", "Prosperity"],
    ],
  },
  {
    id: "ga",
    vi: "Gà luộc",
    say: "gah lwuhk",
    en: "Boiled whole chicken",
    art: "chicken",
    photo: { src: "/img/north/ga.jpg", alt: "Boiled whole rooster, golden-skinned, posed head-up on a bed of herbs and shredded vegetables" },
    quote: "One whole bird, one whole year.",
    body: "A whole chicken boiled until the skin turns gold and offered whole. It is found on Tết altars across the country.",
    facts: [
      ["Ingredients", "Whole chicken, ginger, salt"],
      ["Where", "Nationwide"],
      ["The craft", "Simmered, then plunged in cold water to keep the skin taut"],
      ["Often read as", "Completeness for the family"],
    ],
  },
  {
    id: "kieu",
    vi: "Củ kiệu",
    say: "koo kyew",
    en: "Pickled scallion bulbs",
    art: "jar",
    photo: { src: "/img/south/kieu.jpg", alt: "A black plate of pickled scallion bulbs, white and glossy, with strips of red carrot" },
    quote: "Sour and sharp, to meet the rich braise.",
    body: "Slender scallion bulbs pickled until crisp, mildly sour and a little spicy. They sit beside the braised pork to refresh the palate.",
    facts: [
      ["Ingredients", "Scallion bulbs, vinegar, sugar, salt"],
      ["Where", "The south; dưa hành in the north"],
      ["The craft", "Pickled for several days in the jar"],
      ["Often read as", "Old belief says having them on the table invites wealth"],
    ],
  },
  {
    id: "mutdua",
    vi: "Mứt dừa",
    say: "muht zuh-ah",
    en: "Coconut candy",
    art: "sweet",
    photo: { src: "/img/south/mutdua.jpg", alt: "A wooden tray of white candied coconut strips, with tea cups behind" },
    quote: "Something sweet to open the year.",
    body: "Ribbons of young coconut cooked in sugar syrup until they dry to a pale, sugary frost. Mứt, candied fruit and roots, is a Tết staple across the country.",
    facts: [
      ["Ingredients", "Young coconut, sugar"],
      ["Where", "The south"],
      ["The craft", "Cooked down in syrup, then tossed until it frosts"],
    ],
  },
  {
    id: "gung",
    vi: "Mứt gừng",
    say: "muht guhng",
    en: "Candied ginger",
    art: "sweet",
    photo: { src: "/img/central/gung.jpg", alt: "A heap of sugar-frosted candied ginger slices on a white plate" },
    quote: "A little heat inside the sweet.",
    body: "Thin slices of ginger simmered in sugar until they turn translucent and crystallise. Warming and slightly sharp.",
    facts: [
      ["Ingredients", "Fresh ginger, sugar"],
      ["Where", "The south, among other regions"],
      ["The craft", "Slow-cooked in syrup, then dried to a sugary crust"],
    ],
  },
];

// Central trays (Huế above all) lean on food that keeps: cured, pickled and fermented. Like the
// south, they are not counted in plates and bowls here. This is one typical spread.
const CENTRAL_DISHES: Dish[] = [
  {
    id: "tet",
    vi: "Bánh tét",
    say: "bahn tet",
    en: "Cylinder sticky-rice cake",
    art: "log",
    photo: { src: "/img/central/tet.jpg", alt: "Two bánh tét cylinders wrapped in banana leaf and tied with bamboo strips, among Tết decorations" },
    quote: "Rolled long, sliced round.",
    body: "Sticky rice, mung bean and pork rolled into a long cylinder in banana leaf and boiled for hours. It is sliced into rounds and eaten with the other dishes.",
    facts: [
      ["Ingredients", "Sticky rice, mung bean, pork, banana leaf"],
      ["Where", "The centre and the south; bánh chưng in the north"],
      ["The craft", "Rolled tight, tied, and boiled for many hours"],
      ["Often read as", "Reunion, and a warm, well-fed new year"],
    ],
  },
  {
    id: "ngam",
    vi: "Thịt heo ngâm mắm",
    say: "tit hay-oh ngahm mum",
    en: "Pork cured in fish sauce",
    art: "pork",
    photo: { src: "/img/central/ngam.jpg", alt: "Thin slices of pork belly cured in fish sauce, fanned out on a black plate with a pink radish flower" },
    quote: "Made ahead, so the kitchen can rest.",
    body: "Pork is boiled, tied into a log, sliced and left in a jar of fish sauce, vinegar and sugar for about three days. It keeps through the first days of the year and is eaten with pickles or wrapped in rice paper.",
    facts: [
      ["Ingredients", "Pork belly or leg, fish sauce, vinegar, sugar"],
      ["Where", "Central Vietnam"],
      ["The craft", "Boiled, then steeped in the jar for about three days"],
      ["Often read as", "A practical dish: it is said to have come from the need to keep food for a long time"],
    ],
  },
  {
    id: "tre",
    vi: "Tré",
    say: "treh",
    en: "Fermented pork bundles",
    art: "bundle",
    photo: { src: "/img/central/tre.jpg", alt: "Tré bundles tied in straw with red ribbon, beside a plate of sliced tré, cucumber and rice crackers" },
    quote: "Small, tied, sour and spicy.",
    body: "Pork mixed with ginger, garlic and roasted rice, then wrapped in guava leaves in small bundles and left to ferment. It tastes slightly sour and spicy, and is an old Huế dish.",
    facts: [
      ["Ingredients", "Pork, ginger, garlic, roasted rice, guava leaf"],
      ["Where", "Huế and the centre"],
      ["The craft", "Wrapped tight in leaves and fermented"],
    ],
  },
  {
    id: "giobo",
    vi: "Giò bò",
    say: "zaw baw",
    en: "Beef roll",
    art: "log",
    photo: { src: "/img/central/giobo.jpg", alt: "Triangles of giò bò beef roll with lime, chillies, garlic and herbs on a white plate" },
    quote: "Salty, sweet, crisp and chewy at once.",
    body: "The centre's own giò: a beef roll with a bouncy, crunchy bite and a hot note of pepper.",
    facts: [
      ["Ingredients", "Beef, pepper, spices"],
      ["Where", "Central Vietnam"],
      ["The craft", "Pounded, wrapped and cooked, then sliced"],
    ],
  },
  {
    id: "ga",
    vi: "Gà luộc",
    say: "gah lwuhk",
    en: "Boiled whole chicken",
    art: "chicken",
    photo: { src: "/img/north/ga.jpg", alt: "Boiled whole rooster, golden-skinned, posed head-up on a bed of herbs and shredded vegetables" },
    quote: "One whole bird, one whole year.",
    body: "A whole chicken boiled until the skin turns gold and offered whole. Central families often lay one tray indoors for the ancestors and another outside, and the chicken goes on the altar.",
    facts: [
      ["Ingredients", "Whole chicken, ginger, salt"],
      ["Where", "Nationwide"],
      ["The craft", "Simmered, then plunged in cold water to keep the skin taut"],
      ["Often read as", "Completeness for the family"],
    ],
  },
  {
    id: "tomchua",
    vi: "Tôm chua",
    say: "tome chwah",
    en: "Sour shrimp",
    art: "shrimp",
    photo: { src: "/img/central/tomchua.jpg", alt: "Pink-orange sour shrimp pickled with strips of green fruit, on a flowered plate with a basil leaf" },
    quote: "A whole jar of flavour, opened for Tết.",
    body: "A Huế speciality of shrimp pickled with galangal, garlic, chilli, star fruit, a wild fig and herbs. It is sharp, salty and sour, and is eaten with the rich meat dishes.",
    facts: [
      ["Ingredients", "Shrimp, galangal, garlic, chilli, star fruit, herbs"],
      ["Where", "Huế"],
      ["The craft", "Packed into a jar and left to pickle"],
    ],
  },
  {
    id: "duamon",
    vi: "Dưa món",
    say: "zuh-ah mon",
    en: "Mixed sweet-sour pickles",
    art: "jar",
    photo: { src: "/img/central/duamon.jpg", alt: "A white bowl of dưa món, mixed pickles of red chilli, cucumber and onion" },
    quote: "The centre's answer to dưa hành.",
    body: "Turnip, carrot, cucumber, papaya and radish pickled together until sour and salty. It is eaten with bánh tét; where the north has pickled onions, the centre has this.",
    facts: [
      ["Ingredients", "Turnip, carrot, cucumber, papaya, radish"],
      ["Where", "Central Vietnam"],
      ["The craft", "Salted and fermented in the jar"],
    ],
  },
  {
    id: "gung",
    vi: "Mứt gừng",
    say: "muht guhng",
    en: "Candied ginger",
    art: "sweet",
    photo: { src: "/img/central/gung.jpg", alt: "A heap of sugar-frosted candied ginger slices on a white plate" },
    quote: "A little heat inside the sweet.",
    body: "Thin slices of ginger simmered in sugar until they turn translucent and crystallise. Warming and slightly sharp, it goes on the tea tray.",
    facts: [
      ["Ingredients", "Fresh ginger, sugar"],
      ["Where", "The centre, among other regions"],
      ["The craft", "Slow-cooked in syrup, then dried to a sugary crust"],
    ],
  },
];

export const TRAY_REGIONS: Region[] = [
  {
    id: "bac",
    label: "Miền Bắc",
    note: "Northern feast is counted in plates (đĩa) and bowls (bát). The basic set is four of each; some families go to six or eight. Sources differ on exactly which plates and bowls: some name the four bowls “bóng, vây, măng, miến” (tứ trụ), so the (bát mọc) here may be another bowl in your family. This is one version.",
    dishes: NORTH_DISHES,
    beside: NORTH_BESIDE,
  },
  {
    id: "trung",
    label: "Miền Trung",
    note: "Central trays, Huế above all, are small, salty and preserved. Families often lay two: one indoors for the ancestors and one outside. This is one typical spread, not a count.",
    dishes: CENTRAL_DISHES,
    beside: [],
  },
  {
    id: "nam",
    label: "Miền Nam",
    note: "Southern trays are not counted this way. This is one typical spread: braised, bitter and sweet.",
    dishes: SOUTH_DISHES,
    beside: [],
  },
];
