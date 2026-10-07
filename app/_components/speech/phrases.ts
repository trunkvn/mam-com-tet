// Shared by the speaker button (in the browser) and by scripts/generate-audio.mjs (in Node), so it
// has no imports and no framework code: just strings in, strings out.

/** Phrases that appear on the page as literals rather than in a data file. */
export const PHRASES = {
  newYear: "Chúc mừng năm mới",
  welcome: "Lời chào cao hơn mâm cỗ.",
  gratitude: "Uống nước nhớ nguồn.",
  rites: ["Cúng", "Hạ lễ", "Thụ lộc"],
} as const;

/**
 * What is actually said. A middle dot or a comma is a pause, "&" is read as "và", a closing full
 * stop is dropped, and the text is put in composed form so the same words always give the same
 * file name.
 */
export const spokenOf = (text: string) =>
  text
    .normalize("NFC")
    .replace(/\s*·\s*/g, ", ")
    .replace(/\s*&\s*/g, " và ")
    .replace(/\.+$/, "")
    .replace(/\s+/g, " ")
    .trim();

/** FNV-1a (32 bit) as hex: the same in the browser and in Node, so no two phrases share a file. */
const hash = (s: string) => {
  let h = 0x811c9dc5;
  for (const ch of s) {
    h ^= ch.codePointAt(0) ?? 0;
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
};

/** The file name for a phrase: readable without the tone marks, and unique with the hash. */
export const fileOf = (text: string) => {
  const t = spokenOf(text);
  const base = t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base.slice(0, 40)}-${hash(t)}`;
};

/** Where the recording of a phrase lives. A human recording dropped in under this name wins. */
export const audioUrl = (text: string) => `/audio/vi/${fileOf(text)}.m4a`;
