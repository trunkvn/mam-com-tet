import type { ReactNode } from "react";

// Dish drawings: gold line with a soft wash, like inlay on lacquer.
// Rendered once in the root layout; <DishArt> references each symbol with <use>.
function Sym({ id, children }: { id: string; children: ReactNode }) {
  return (
    <symbol id={`a-${id}`} viewBox="0 0 120 120">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {children}
      </g>
    </symbol>
  );
}

export default function DishSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <Sym id="chung">
          <path d="M60 24 100 44 60 64 20 44Z" fill="#7fb8a2" fillOpacity=".3" />
          <path d="M20 44v36l40 20V64M100 44v36L60 100" fill="#7fb8a2" fillOpacity=".14" />
          <path d="M40 34l40 20M80 34L40 54M40 54v36M80 54v36" />
          <circle cx="60" cy="44" r="3.4" fill="currentColor" stroke="none" />
        </Sym>
        <Sym id="log">
          <path d="M20 38H92A8 14 0 0 1 92 66H20Z" fill="#7fb8a2" fillOpacity=".2" />
          <ellipse cx="20" cy="52" rx="8" ry="14" fill="#7fb8a2" fillOpacity=".3" />
          <path d="M44 38q4 14 0 28M64 38q4 14 0 28M84 38q4 14 0 28" />
          <circle cx="84" cy="94" r="17" fill="currentColor" fillOpacity=".14" />
          <circle cx="84" cy="94" r="10" strokeDasharray="2 3" />
          <circle cx="84" cy="94" r="3.4" fill="currentColor" stroke="none" />
        </Sym>
        <Sym id="chicken">
          <ellipse cx="60" cy="100" rx="50" ry="11" />
          <ellipse cx="60" cy="100" rx="38" ry="6.5" strokeOpacity=".5" />
          <path d="M26 84C24 60 52 46 74 56C90 64 92 80 80 88C64 96 38 96 26 84Z" fill="currentColor" fillOpacity=".2" />
          <path d="M70 58C74 46 76 40 82 34L92 38C88 46 86 52 82 62Z" fill="currentColor" fillOpacity=".2" />
          <circle cx="88" cy="30" r="7" fill="currentColor" fillOpacity=".2" />
          <path d="M84 24q2-9 6-4q3-6 6 0q-1 5-4 5Z" fill="currentColor" />
          <path d="M95 29l8 3-8 3Z" />
          <path d="M26 76C14 68 12 56 18 46C24 54 28 62 30 70Z" fill="currentColor" fillOpacity=".3" />
          <path d="M48 92q-2 6-9 6M64 94q0 6-7 7" />
          <circle cx="89" cy="29" r="1.3" fill="currentColor" stroke="none" />
        </Sym>
        <Sym id="roll">
          <rect x="18" y="26" width="68" height="20" rx="10" fill="currentColor" fillOpacity=".18" />
          <rect x="30" y="50" width="68" height="20" rx="10" fill="currentColor" fillOpacity=".18" />
          <rect x="22" y="74" width="68" height="20" rx="10" fill="currentColor" fillOpacity=".18" />
          <path d="M32 33h30M44 57h30M36 81h30" strokeOpacity=".6" />
          <circle cx="76" cy="36" r="4.5" />
          <circle cx="88" cy="60" r="4.5" />
          <circle cx="80" cy="84" r="4.5" />
          <circle cx="76" cy="36" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="88" cy="60" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="80" cy="84" r="1.3" fill="currentColor" stroke="none" />
        </Sym>
        <Sym id="soup">
          <path d="M18 62H102C102 86 84 102 60 102S18 86 18 62Z" fill="currentColor" fillOpacity=".14" />
          <path d="M46 102v7h28v-7" />
          <path d="M22 72H98" strokeOpacity=".5" />
          <ellipse cx="60" cy="62" rx="42" ry="8" fill="currentColor" fillOpacity=".2" />
          <ellipse cx="46" cy="62" rx="8" ry="3" />
          <ellipse cx="72" cy="64" rx="9" ry="3" />
          <path d="M46 50c-7-8 7-12 0-22M60 50c-7-8 7-12 0-22M74 50c-7-8 7-12 0-22" strokeOpacity=".75" />
        </Sym>
        <Sym id="noodle">
          <path d="M18 62H102C102 86 84 102 60 102S18 86 18 62Z" fill="currentColor" fillOpacity=".14" />
          <path d="M46 102v7h28v-7" />
          <ellipse cx="60" cy="62" rx="42" ry="8" fill="currentColor" fillOpacity=".2" />
          <path d="M28 56q8-16 16 0t16 0t16 0t14 0" strokeOpacity=".85" />
          <path d="M34 46q8-14 14 0t14 0t14 0" strokeOpacity=".6" />
        </Sym>
        <Sym id="balls">
          <path d="M18 62H102C102 86 84 102 60 102S18 86 18 62Z" fill="currentColor" fillOpacity=".14" />
          <path d="M46 102v7h28v-7" />
          <ellipse cx="60" cy="62" rx="42" ry="8" fill="currentColor" fillOpacity=".2" />
          <circle cx="44" cy="54" r="10" fill="currentColor" fillOpacity=".3" />
          <circle cx="66" cy="50" r="10" fill="currentColor" fillOpacity=".3" />
          <circle cx="82" cy="58" r="8" fill="currentColor" fillOpacity=".3" />
          <path d="M40 52q4-3 8 0M62 48q4-3 8 0" strokeOpacity=".6" />
        </Sym>
        <Sym id="puff">
          <path d="M18 62H102C102 86 84 102 60 102S18 86 18 62Z" fill="currentColor" fillOpacity=".14" />
          <path d="M46 102v7h28v-7" />
          <ellipse cx="60" cy="62" rx="42" ry="8" fill="currentColor" fillOpacity=".2" />
          <path d="M30 60c-4-12 8-16 13-8c4-9 17-6 15 6z" fill="currentColor" fillOpacity=".25" />
          <path d="M60 60c-3-11 8-15 13-7c5-8 16-3 14 7z" fill="currentColor" fillOpacity=".25" />
          <path d="M42 50q3-4 6 0M72 51q3-4 6 0" strokeOpacity=".6" />
        </Sym>
        <Sym id="bundle">
          <ellipse cx="60" cy="96" rx="46" ry="10" fill="currentColor" fillOpacity=".1" />
          <path d="M30 60c0-14 12-24 30-24s30 10 30 24-12 30-30 30-30-16-30-30Z" fill="#7fb8a2" fillOpacity=".28" />
          <path d="M44 40c6 10 6 30 0 46M60 36v54M76 40c-6 10-6 30 0 46" strokeOpacity=".6" />
          <path d="M34 62h52M36 72h48" strokeDasharray="2 3" />
          <circle cx="60" cy="63" r="3.2" fill="currentColor" stroke="none" />
        </Sym>
        <Sym id="shrimp">
          <ellipse cx="60" cy="100" rx="46" ry="9" fill="currentColor" fillOpacity=".1" />
          <path d="M34 78c-14-6-16-30-2-42c14-12 36-8 44 6c6 10 2 22-8 26c-6 2-12-2-10-8c2-6 10-4 10-12c0-8-10-12-20-6c-10 6-10 20 0 26c4 3 2 8-2 10Z" fill="currentColor" fillOpacity=".2" />
          <path d="M34 78l-12 10l12-2l-2 12l10-12" />
          <path d="M70 34l12-14M74 38l16-6" />
          <circle cx="66" cy="44" r="2" fill="currentColor" stroke="none" />
        </Sym>
        <Sym id="xoi">
          <path d="M20 76H100C100 94 84 106 60 106S20 94 20 76Z" fill="currentColor" fillOpacity=".14" />
          <path d="M24 84H96" strokeOpacity=".5" />
          <path d="M28 76C28 36 92 36 92 76Z" fill="currentColor" fillOpacity=".3" />
          <path d="M44 60l4-2M58 50l4 2M72 60l4-2M52 68l4 1M68 66l4-1M60 58l1 4M38 72l4-1M80 72l4-1" strokeOpacity=".8" />
        </Sym>
        <Sym id="jar">
          <rect x="34" y="34" width="52" height="68" rx="10" fill="currentColor" fillOpacity=".1" />
          <rect x="38" y="22" width="44" height="12" rx="3" fill="currentColor" fillOpacity=".3" />
          <circle cx="50" cy="86" r="9" fill="currentColor" fillOpacity=".22" />
          <circle cx="70" cy="86" r="9" fill="currentColor" fillOpacity=".22" />
          <circle cx="60" cy="68" r="9" fill="currentColor" fillOpacity=".22" />
          <path d="M50 77v-5M70 77v-5M60 59v-5" />
          <path d="M34 50h52" strokeDasharray="3 4" strokeOpacity=".7" />
          <circle cx="76" cy="66" r="2.6" fill="currentColor" stroke="none" />
        </Sym>
        <Sym id="pork">
          <ellipse cx="60" cy="88" rx="50" ry="14" />
          <ellipse cx="60" cy="88" rx="38" ry="9" strokeOpacity=".5" />
          <ellipse cx="42" cy="76" rx="18" ry="7" transform="rotate(-12 42 76)" fill="currentColor" fillOpacity=".2" />
          <ellipse cx="72" cy="74" rx="18" ry="7" transform="rotate(10 72 74)" fill="currentColor" fillOpacity=".2" />
          <ellipse cx="57" cy="62" rx="18" ry="7" fill="currentColor" fillOpacity=".2" />
          <path d="M30 78q12-5 24-2M60 76q12-1 24 2M45 62q12-2 24 0" strokeOpacity=".8" />
        </Sym>
        <Sym id="sweet">
          <ellipse cx="60" cy="84" rx="48" ry="16" fill="currentColor" fillOpacity=".14" />
          <ellipse cx="60" cy="80" rx="36" ry="10" strokeOpacity=".6" />
          <path d="M36 70l7-8 7 8-7 8zM56 62l7-8 7 8-7 8zM76 70l7-8 7 8-7 8z" fill="currentColor" fillOpacity=".3" />
          <circle cx="48" cy="86" r="5" />
          <circle cx="68" cy="84" r="5" />
        </Sym>
      </defs>
    </svg>
  );
}
