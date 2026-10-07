import type { DishArtKey } from "../dishes/data";

export type RecipeId = "nem" | "ga" | "kho";

export type Ingredient = {
  item: string;
  /** What to buy or use instead, for a kitchen far from a Vietnamese market. */
  swap?: string;
};

export type Recipe = {
  id: RecipeId;
  /** The tab label. */
  label: string;
  vi: string;
  /** Approximate English respelling, northern accent, tones not shown. */
  say: string;
  en: string;
  art: DishArtKey;
  /** `focus` is the CSS object-position, for a photo whose subject the tall arch would otherwise cut. */
  photo?: { src: string; alt: string; focus?: string };
  /** Where this dish sits on the tray above. */
  onTray: string;
  /** [label, value] */
  meta: [string, string][];
  intro: string;
  ingredients: Ingredient[];
  /** A second, smaller list: the dip, the brine. */
  also?: { title: string; items: Ingredient[] };
  steps: string[];
  tips: string[];
  /** An honest note on how this version differs from the traditional one. */
  note?: string;
};

// Adapted, in our own words, from the cooks listed under "Try it at home" at the foot of the page.
// Where they differ we picked one version. None of it has been cooked in our own kitchen.
export const RECIPES: Recipe[] = [
  {
    id: "nem",
    label: "Nem rán",
    vi: "Nem rán",
    say: "nem zahn",
    en: "Fried spring rolls",
    art: "roll",
    photo: {
      src: "/img/north/nem.jpg",
      alt: "A plate of golden fried nem rán spring rolls with one cut open to show the filling, beside lettuce",
    },
    onTray: "Plate on the northern tray",
    meta: [
      ["Time", "About 1 hour"],
      ["Makes", "20 to 24 rolls"],
      ["Effort", "Patience: it is mostly rolling"],
    ],
    intro:
      "Crackling rolls of pork, wood-ear and glass noodles. The one thing to find is proper rice paper; the rest is a short trip to an Asian grocer, and most of it keeps in the cupboard.",
    ingredients: [
      { item: "200 g minced pork" },
      {
        item: "200 g raw prawns, chopped fine",
        swap: "Optional. One of the recipes we read leaves them out and uses pork only.",
      },
      {
        item: "5 dried wood-ear mushrooms",
        swap: "Sold dried at Asian grocers, and keeps for months.",
      },
      {
        item: "50 g dried glass (bean-thread) noodles",
        swap: "Also called cellophane noodles.",
      },
      {
        item: "1 small jicama, cut into thin matchsticks",
        swap: "Carrot or kohlrabi are used too.",
      },
      {
        item: "3 small shallots, finely chopped",
        swap: "Half an ordinary onion will do.",
      },
      { item: "1 egg" },
      { item: "1 tbsp fish sauce, 1 tsp salt, 1 tsp pepper" },
      {
        item: "About 24 sheets of round rice paper, 22 cm, labelled bánh tráng",
        swap: "Rice paper sold for fresh rolls works too. Dip it only briefly.",
      },
      { item: "Oil for deep frying" },
    ],
    also: {
      title: "Dipping sauce (nước chấm)",
      items: [
        { item: "3 tbsp fish sauce, 3 tbsp sugar, 3 tbsp lime juice" },
        { item: "150 ml water" },
        { item: "2 to 3 cloves garlic, chopped, and a chilli to taste", swap: "Taste it and adjust: it should be sweet, sour and salty at once." },
      ],
    },
    steps: [
      "Soak the wood-ear in hot water until soft, rinse and chop it fine. Soak the glass noodles until just soft, drain, and snip them into short lengths with scissors.",
      "Mix the pork, prawns, wood-ear, noodles, jicama, shallots, egg, fish sauce, salt and pepper. Leave it for about 15 minutes.",
      "Dip one sheet of rice paper in water for no more than a second and lay it on your work surface.",
      "Put about 2 tablespoons of filling near the bottom edge and shape it into a short sausage. Fold in the sides and roll tightly, squeezing out any air. Set it seam-side down.",
      "Heat the oil to about 180°C. Fry in small batches of 3 or 4 until crisp and golden, which takes a few minutes. Do not crowd the pan.",
      "Drain, and serve hot with the dip, lettuce and fresh herbs.",
    ],
    tips: [
      "Fry them, don't bake them. A cook who tried baking reported poor results.",
      "Hot oil and wet rice paper do not mix: keep a lid to hand, and never leave the pan.",
    ],
  },
  {
    id: "ga",
    label: "Gà luộc",
    vi: "Gà luộc",
    say: "gah lwuhk",
    en: "Boiled whole chicken",
    art: "chicken",
    photo: {
      src: "/img/north/ga.jpg",
      alt: "Boiled whole rooster, golden-skinned, posed head-up on a bed of herbs and shredded vegetables",
      focus: "33% 50%",
    },
    onTray: "The centre plate of the northern tray",
    meta: [
      ["Time", "About 50 minutes"],
      ["Serves", "About 5"],
      ["Effort", "Easy: mostly watching a pot"],
    ],
    intro:
      "The dish that sits in the middle of the northern tray: one whole bird, simmered gently until the skin turns gold, then cooled in ice water. The only skill is patience, and the shopping is a chicken, some ginger and a lime.",
    ingredients: [
      {
        item: "1 whole chicken, about 1.4 kg",
        swap: "A free-range bird if you can find one.",
      },
      {
        item: "1 tbsp coarse sea salt, plus more for scrubbing",
        swap: "Any coarse salt.",
      },
      {
        item: "1 shallot",
        swap: "Half a small onion will do.",
      },
      { item: "5 cm fresh ginger, smashed" },
      { item: "2 spring onions" },
      {
        item: "1 tsp turmeric powder",
        swap: "Only for the golden colour. Leave it out for a paler bird.",
      },
      {
        item: "Lime leaves or coriander, to garnish",
        swap: "Optional.",
      },
      { item: "A big bowl of ice water" },
    ],
    also: {
      title: "Dipping salt (muối tiêu chanh)",
      items: [
        {
          item: "Salt, black pepper and the juice of half a lime, stirred together",
          swap: "Taste it and adjust: it should bite first, then turn sour.",
        },
      ],
    },
    steps: [
      "Scrub the chicken inside and out with coarse salt, rinse it and pat it dry.",
      "Stuff the cavity with the shallot, the ginger and the spring onions.",
      "Bring a large pot of water, enough to cover the chicken, to the boil. Holding the chicken by the neck, dip it slowly into the water and lift it out, three times. This tightens the skin.",
      "Lower the chicken in, turn the heat down to a gentle simmer, cover, and cook for about 20 minutes on the lowest heat.",
      "Turn the heat off and leave it covered for another 10 minutes. Pierce the thigh: the juices should run clear. If they do not, put the bird back into the hot water for a few minutes.",
      "Lift it into a bowl of ice water for about 15 minutes, to stop the cooking and tighten the skin. Pat it dry.",
      "For the gold: melt a little of the chicken's fat, stir in the turmeric and brush it over the skin.",
      "Serve it upright on a platter, whole, as on the tray, with the dipping salt and the herbs. Cut it up at the table.",
    ],
    tips: [
      "Once the chicken is in, keep the water at a gentle simmer. A hard boil can split the skin.",
      "It goes well with plain or sticky rice.",
    ],
  },
  {
    id: "kho",
    label: "Thịt kho",
    vi: "Thịt kho hột vịt",
    say: "tit kaw hoht vit",
    en: "Pork and eggs in coconut water",
    art: "pork",
    photo: {
      src: "/img/south/kho.jpg",
      alt: "Chunks of braised pork belly and glossy brown duck eggs in a cream bowl, with a sprig of coriander",
    },
    onTray: "Dish on the southern tray",
    meta: [
      ["Time", "About 1 hour 15"],
      ["Serves", "4, with rice"],
      ["Effort", "Easy: mostly waiting"],
    ],
    intro:
      "Pork belly and whole eggs braised in caramel and coconut water until the sauce turns amber. Almost all of the work is a hot pot left alone, which makes it the friendliest of the three.",
    ingredients: [
      {
        item: "800 g pork belly",
        swap: "Pork shoulder if you would like it leaner.",
      },
      {
        item: "8 to 10 hard-boiled eggs, peeled",
        swap: "Duck eggs are the real thing; chicken eggs work, and so do quail eggs.",
      },
      { item: "6 tbsp sugar and 60 ml water, for the caramel" },
      {
        item: "1 litre coconut water",
        swap: "Any carton from a supermarket, as long as it has no added sugar.",
      },
      { item: "4 cloves garlic, minced" },
      { item: "60 ml fish sauce" },
    ],
    steps: [
      "Boil the pork belly for 5 to 10 minutes until it stops throwing off scum. Drain, rinse in cold water, pat dry and cut into pieces about 2.5 cm across.",
      "Make the caramel: melt the sugar over low heat without stirring, only tilting the pot, until it is deep golden brown. Add the water carefully, because it spits, and stir.",
      "Add the pork and sear each side in the caramel. Add the garlic and cook for a minute or two.",
      "Pour in the coconut water and fish sauce. Bring to the boil, skim, then turn it down, cover, and simmer for 45 minutes to an hour, until the pork is tender.",
      "Add the eggs and simmer for another 15 minutes, turning them now and then so they take the colour of the sauce.",
    ],
    tips: [
      "Don't skip the first boil: it is what keeps the sauce clear.",
      "Serve with plain rice. Something sharp beside it, like pickled onions (dưa hành), cuts through the fat.",
    ],
  },
];
