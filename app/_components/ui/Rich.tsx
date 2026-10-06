import type { ReactNode } from "react";

// Letters that only Vietnamese uses: a word containing one is Vietnamese.
const VI_CHAR = /[ăâđêôơưĂÂĐÊÔƠƯàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵÀÁẢÃẠẰẮẲẴẶẦẤẨẪẬÈÉẺẼẸỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌỒỐỔỖỘỜỚỞỠỢÙÚỦŨỤỪỨỬỮỰỲÝỶỸỴ]/;

// Proper names that read as part of the English sentence, and are everywhere: left plain.
const PLAIN = new Set(["Tết", "Huế"]);

// Vietnamese words with no accent, which would otherwise be left out of a phrase like "nem rán".
const COMPANIONS = new Set(["nem", "tre", "Tre", "Kim"]);

const isViet = (w: string) => !PLAIN.has(w) && (VI_CHAR.test(w) || COMPANIONS.has(w));

/**
 * English text in which the Vietnamese words stand out: runs of Vietnamese words are set in a
 * highlight colour (`.vi` in globals.css) and marked lang="vi". Words are told apart by the letters
 * only Vietnamese uses, so no markup is needed in the text itself.
 */
export default function Rich({ children }: { children: ReactNode }) {
  const text = Array.isArray(children) ? children.join("") : String(children ?? "");
  const parts = text.split(/(\p{L}+)/u); // [gap, word, gap, word, …]
  const out: ReactNode[] = [];
  let run = "";
  let key = 0;
  const flush = () => {
    if (run) out.push(<span key={key++} className="vi" lang="vi">{run}</span>);
    run = "";
  };
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (i % 2 === 0) {
      // between two Vietnamese words, a single space keeps the phrase together; anything else ends it
      const next = parts[i + 1];
      if (run && p === " " && next && isViet(next)) run += p;
      else {
        flush();
        if (p) out.push(p);
      }
    } else if (isViet(p)) {
      run += p;
    } else {
      flush();
      out.push(p);
    }
  }
  flush();
  return <>{out}</>;
}
