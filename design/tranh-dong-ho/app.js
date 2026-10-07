/* Tranh Đông Hồ: giao diện mock.
   The prints are drawn here in code, in the way they are made: a black line block, and a flat block
   for every colour. Everything is placeholder. */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

/* ═══════════════════════════ the rooster: Gà đại cát, one layer per block ═══════════════════════════ */

// Each shape is written once. The colour layers fill them; the black layer outlines them.
const ROO = {
  tail1: "M296 268C324 214 340 156 372 94C396 150 376 218 322 276Z",
  tail2: "M304 284C346 246 392 206 420 150C430 214 388 268 326 300Z",
  tail3: "M308 306C352 292 404 278 432 252C424 306 384 338 326 330Z",
  tip1: "M372 94C382 114 382 132 376 150C364 130 364 110 372 94Z",
  tip2: "M420 150C428 168 428 186 420 204C408 186 410 166 420 150Z",
  tip3: "M432 252C428 270 418 284 404 292C406 274 416 262 432 252Z",
  body: "M130 146L170 150C172 192 194 214 230 222C294 234 324 290 306 346C290 396 230 418 174 402C130 390 112 346 112 300C110 270 112 248 114 224C116 192 122 168 130 146Z",
  head: "M92 126a30 30 0 1 0 60 0a30 30 0 1 0-60 0Z",
  comb: "M100 110C88 90 104 70 116 84C118 62 142 62 142 84C158 72 172 92 154 110Z",
  beak: "M96 124L56 138L98 148Z",
  wattle: "M104 152C88 176 104 194 120 172C124 160 118 154 104 152Z",
  wing: "M168 270C214 246 282 264 298 322C248 350 188 336 168 270Z",
  wingLines: "M190 284C222 278 256 292 272 314M186 300C214 296 240 308 256 326M196 318C214 316 228 322 238 332",
  scallops: "M140 342q10-12 20 0q10-12 20 0q10-12 20 0M150 368q10-12 20 0q10-12 20 0q10-12 20 0",
  ribs: "M296 268C330 220 350 160 372 94M304 284C346 246 392 206 420 150M308 306C352 292 404 278 432 252",
  legs: "M178 402L176 430M228 408L232 430",
  toes: "M176 430L152 438M176 430L178 444M176 430L200 438M232 430L208 438M232 430L234 444M232 430L256 438",
  tufts: "M96 436q6-16 12 0M290 438q6-18 12 0",
  band: "M24 450H416V496H24Z",
};

const ROO_LAYERS = {
  // yellow: the body, the head, the beak and the legs
  yellow: `<g class="fy"><path d="${ROO.body}"/><path d="${ROO.head}"/><path d="${ROO.beak}"/></g><path class="sy" stroke-width="11" d="${ROO.legs}"/>`,
  // green: the tail feathers and the wing
  green: `<g class="fg"><path d="${ROO.tail1}"/><path d="${ROO.tail2}"/><path d="${ROO.tail3}"/><path d="${ROO.wing}"/></g>`,
  // red: the comb, the wattle, a cheek, the tips of the tail, and the caption band
  red: `<g class="fr"><path d="${ROO.comb}"/><path d="${ROO.wattle}"/><circle cx="132" cy="138" r="7"/><path d="${ROO.tip1}"/><path d="${ROO.tip2}"/><path d="${ROO.tip3}"/><path d="${ROO.band}"/></g>`,
  // black: every outline, the eye, and the name
  black:
    `<g class="k"><path class="th" d="M10 10H430V510H10Z"/><path class="fine" d="M24 24H416V496H24Z"/><path d="M24 450H416"/>` +
    `<path d="${ROO.tail1}"/><path d="${ROO.tail2}"/><path d="${ROO.tail3}"/><path class="fine" d="${ROO.ribs}"/>` +
    `<path d="${ROO.body}"/><path d="${ROO.head}"/><path d="${ROO.comb}"/><path d="${ROO.beak}"/><path d="${ROO.wattle}"/>` +
    `<path d="${ROO.wing}"/><path class="fine" d="${ROO.wingLines}"/><path class="fine" d="${ROO.scallops}"/>` +
    `<path d="${ROO.legs}"/><path d="${ROO.toes}"/><path class="fine" d="${ROO.tufts}"/></g>` +
    `<circle class="kf" cx="112" cy="118" r="5.5"/><text class="kt" x="220" y="484" font-size="30">GÀ ĐẠI CÁT</text>` +
    `<path class="fine k" d="M40 40l8 8l-8 8l-8-8zM392 40l8 8l-8 8l-8-8z"/>`,
};

const ORDER = ["yellow", "green", "red", "black"];

function rooster(layered = false) {
  return ORDER.map((id) => `<g class="layer${layered ? "" : " on"}" id="${layered ? "L-" : "P-"}${id}" data-l="${id}">${ROO_LAYERS[id]}</g>`).join("");
}

/* ═══════════════════════════ the pig: Lợn âm dương ═══════════════════════════ */

function pig() {
  const body = "M80 190C80 126 160 98 248 104C336 110 392 150 388 214C384 258 330 274 248 274C160 274 80 252 80 190Z";
  return (
    // colour
    `<g class="fr"><path d="${body}"/><path d="M24 306H416V336H24Z"/></g>` +
    `<g class="fy"><path d="M120 270V298H150V270ZM176 272V300H206V272ZM268 272V300H298V272ZM324 268V296H354V268Z"/><path d="M236 134A54 54 0 0 1 236 242A27 27 0 0 1 236 188A27 27 0 0 0 236 134Z"/></g>` +
    `<g class="fg"><path d="M60 188a22 24 0 1 0 44 0a22 24 0 1 0-44 0Z"/></g>` +
    // line
    `<g class="k"><path class="th" d="M10 10H430V350H10Z"/><path class="fine" d="M24 24H416V336H24Z"/><path d="M24 306H416"/>` +
    `<path d="${body}"/><path d="M120 270V298H150V270ZM176 272V300H206V272ZM268 272V300H298V272ZM324 268V296H354V268Z"/>` +
    `<circle cx="236" cy="188" r="54"/><path d="M236 134A54 54 0 0 1 236 242A27 27 0 0 1 236 188A27 27 0 0 0 236 134Z"/>` +
    `<path d="M60 188a22 24 0 1 0 44 0a22 24 0 1 0-44 0Z"/><path d="M100 126C92 96 124 90 140 110C128 118 112 124 100 126Z"/>` +
    `<path d="M388 200C416 192 424 164 404 156C390 152 380 168 394 174"/>` +
    `<path class="fine" d="M150 116l-6-14M184 108l-4-16M214 104l-2-16M276 106l2-16M310 116l4-14M344 130l8-12"/></g>` +
    `<circle class="kf" cx="236" cy="161" r="8"/><circle class="fw" cx="236" cy="215" r="8" stroke="#1b0c0e" stroke-width="3"/>` +
    `<circle class="kf" cx="88" cy="174" r="5.5"/><ellipse class="kf" cx="74" cy="196" rx="3" ry="5"/><ellipse class="kf" cx="92" cy="196" rx="3" ry="5"/>` +
    `<text class="kt" x="220" y="328" font-size="26">LỢN ÂM DƯƠNG</text>`
  );
}

/* ═══════════════════════════ Đám cưới chuột ═══════════════════════════ */

// A standing mouse, facing right, with its feet at (0, 0).
function mouse(x, y, s, robe, opt = {}) {
  const hat = opt.hat ? `<path class="k fr" d="M-6 -124H22V-134H-6Z"/>` : "";
  return (
    `<g transform="translate(${x} ${y}) scale(${(opt.flip ? -1 : 1) * s} ${s})">` +
    `<path class="k" d="M-24 -14C-62 -10 -70 -48 -44 -60"/>` +
    `<path class="k" d="M-10 0V-18M10 0V-18"/><ellipse class="kf" cx="-10" cy="1" rx="9" ry="3"/><ellipse class="kf" cx="10" cy="1" rx="9" ry="3"/>` +
    `<path class="k" style="fill:${robe}" d="M-26 -16C-30 -50 -20 -84 0 -92C22 -84 30 -50 26 -16Z"/>` +
    `<circle class="k fw" style="fill:#e4d3b8" cx="-6" cy="-124" r="9"/><circle class="k fw" style="fill:#e4d3b8" cx="12" cy="-126" r="9"/>` +
    `<circle class="k" style="fill:#e4d3b8" cx="6" cy="-108" r="18"/>` +
    `<path class="k" style="fill:#e4d3b8" d="M20 -112L46 -104L20 -98Z"/><circle class="kf" cx="46" cy="-104" r="3"/><circle class="kf" cx="14" cy="-112" r="3"/>` +
    `<path class="k fine" d="M30 -101L50 -94M30 -104L52 -108"/>` +
    hat +
    (opt.extra || "") +
    `</g>`
  );
}

function mice() {
  const g = 372;
  let s = "";
  // sky, ground, frame
  s += `<g class="fy"><path d="M24 24H1176V86H24Z" opacity=".0"/></g>`;
  s += `<g class="fg"><path d="M24 ${g}H1176V418H24Z"/></g>`;
  s += `<g class="fr"><path d="M24 24H410V74H24Z"/></g>`;
  s += `<g class="k"><path class="th" d="M8 8H1192V432H8Z"/><path class="fine" d="M22 22H1178V418H22Z"/><path d="M24 74H410M410 24V74"/><path d="M22 ${g}H1178"/></g>`;
  s += `<text class="kt" x="217" y="62" font-size="32">ĐÁM CƯỚI CHUỘT</text>`;

  // flag bearer
  s += `<path class="k th" d="M214 ${g}V150"/><path class="k fy" d="M214 150H292V212H214Z"/><circle class="k fr" cx="253" cy="181" r="14"/>`;
  s += mice1(150, g, "#cf2230", { hat: true });
  // drummer
  s += `<ellipse class="k fr" cx="372" cy="${g - 62}" rx="44" ry="30"/><path class="k fy" d="M328 ${g - 62}V${g - 26}C328 ${g - 8} 416 ${g - 8} 416 ${g - 26}V${g - 62}"/><path class="k" d="M300 ${g - 130}L346 ${g - 90}M276 ${g - 112}L326 ${g - 82}"/>`;
  s += mice1(300, g, "#4f7f55", { hat: true });
  // the palanquin and its bearers
  s += `<path class="k th" d="M470 ${g - 160}H830"/>`;
  s += mice1(470, g, "#cf2230", { hat: true });
  s += mice1(830, g, "#cf2230", { hat: true });
  s += `<path class="k" d="M540 ${g - 160}V${g - 130}M760 ${g - 160}V${g - 130}"/>`;
  s += `<path class="k fr" d="M520 ${g - 186}C560 ${g - 262} 740 ${g - 262} 780 ${g - 186}Z"/>`;
  s += `<path class="k fy" d="M532 ${g - 186}H768V${g - 52}H532Z"/>`;
  s += `<path class="k fr" d="M556 ${g - 170}H744V${g - 112}H556Z"/>`;
  s += `<circle class="k" style="fill:#e4d3b8" cx="650" cy="${g - 142}" r="22"/><path class="k fr" d="M628 ${g - 158}C640 ${g - 178} 662 ${g - 178} 672 ${g - 158}Z"/><circle class="kf" cx="660" cy="${g - 146}" r="3"/><path class="k" style="fill:#e4d3b8" d="M668 ${g - 146}L690 ${g - 140}L668 ${g - 134}Z"/>`;
  s += `<path class="k fine" d="M532 ${g - 96}H768M532 ${g - 74}H768M560 ${g - 52}V${g - 30}M740 ${g - 52}V${g - 30}"/>`;
  s += `<path class="k" d="M600 ${g - 270}V${g - 250}M700 ${g - 270}V${g - 250}"/><circle class="kf" cx="600" cy="${g - 272}" r="5"/><circle class="kf" cx="700" cy="${g - 272}" r="5"/>`;
  // trumpeter
  s += `<path class="k fy" d="M936 ${g - 96}L1016 ${g - 128}L1016 ${g - 76}Z"/><path class="k th" d="M926 ${g - 92}L944 ${g - 98}"/>`;
  s += mice1(900, g, "#4f7f55", { hat: true });
  // the cat, and a plate of fish put down for it
  s += `<ellipse class="k fy" cx="1010" cy="${g - 14}" rx="64" ry="14"/><path class="k fr" d="M974 ${g - 30}C992 ${g - 52} 1030 ${g - 52} 1048 ${g - 30}C1030 ${g - 18} 992 ${g - 18} 974 ${g - 30}Z"/><path class="k" d="M1048 ${g - 30}L1066 ${g - 44}L1066 ${g - 16}Z"/><circle class="kf" cx="988" cy="${g - 34}" r="3"/>`;
  s += `<path class="k" style="fill:#d8a043" d="M1100 ${g}C1080 ${g - 40} 1090 ${g - 110} 1130 ${g - 130}C1170 ${g - 110} 1176 ${g - 40} 1156 ${g}Z"/>`;
  s += `<circle class="k" style="fill:#d8a043" cx="1118" cy="${g - 158}" r="30"/><path class="k" style="fill:#d8a043" d="M92 0"/><path class="k" style="fill:#d8a043" d="M1092 ${g - 174}L1098 ${g - 206}L1118 ${g - 186}ZM1144 ${g - 174}L1140 ${g - 206}L1120 ${g - 186}Z"/>`;
  s += `<path class="kf" d="M1100 ${g - 164}Q1108 ${g - 172} 1116 ${g - 164}Q1108 ${g - 158} 1100 ${g - 164}ZM1124 ${g - 164}Q1132 ${g - 172} 1140 ${g - 164}Q1132 ${g - 158} 1124 ${g - 164}Z"/>`;
  s += `<path class="k fine" d="M1090 ${g - 150}L1062 ${g - 146}M1090 ${g - 144}L1064 ${g - 132}M1146 ${g - 150}L1172 ${g - 146}M1146 ${g - 144}L1170 ${g - 132}"/><path class="k" d="M1156 ${g - 20}C1196 ${g - 20} 1196 ${g - 80} 1170 ${g - 84}"/>`;
  return s;
}
// (kept as a named helper so the scene above stays readable)
function mice1(x, y, robe, o) {
  return mouse(x, y, 1, robe, o);
}

/* ═══════════════════════════ hero and ending: the prints on the wall ═══════════════════════════ */

function fillPrints() {
  const pigSvg = `<svg viewBox="0 0 440 360" aria-hidden="true">${pig()}</svg>`;
  const rooSvg = `<svg viewBox="0 0 440 520" aria-hidden="true">${rooster(false)}</svg>`;
  ["artPig", "artPig2"].forEach((id) => {
    const el = $("#" + id);
    el.classList.add("diep");
    el.innerHTML = pigSvg;
  });
  ["artRooster", "artRooster2"].forEach((id) => {
    const el = $("#" + id);
    el.classList.add("diep");
    el.innerHTML = rooSvg;
  });
}
fillPrints();

/* ═══════════════════════════ 02 · the paper that glints ═══════════════════════════ */

(() => {
  const el = $("#shimmer");
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  });
})();

/* ═══════════════════════════ 03 · the press ═══════════════════════════ */

const BLOCKS = [
  { id: "yellow", n: "Ván vàng", s: "hoa hòe", color: "var(--c-yellow)", carve: "repeating-linear-gradient(45deg,#3a2113 0 3px,transparent 3px 8px)", t: "Ván vàng", d: "Vàng in thân, đầu, mỏ và chân. Đây là mảng lớn nhất nên đi trước, để các màu sau in lên trên." },
  { id: "green", n: "Ván xanh", s: "lá chàm, gỉ đồng", color: "var(--c-green)", carve: "radial-gradient(circle,#3a2113 0 2px,transparent 3px) 0 0/9px 9px", t: "Ván xanh", d: "Xanh in bộ đuôi và cánh. Mỗi ván chỉ có phần cần màu ấy, những chỗ còn lại được đục bỏ." },
  { id: "red", n: "Ván đỏ", s: "sỏi son, gỗ vang", color: "var(--c-red)", carve: "repeating-linear-gradient(0deg,#3a2113 0 3px,transparent 3px 8px)", t: "Ván đỏ", d: "Đỏ in mào, yếm, đầu lông đuôi và dải chữ ở chân tranh. Chỉ vài mảng đỏ mà bức tranh đã sáng lên." },
  { id: "black", n: "Ván nét đen", s: "than lá tre", color: "var(--ink)", carve: "repeating-conic-gradient(#3a2113 0 25%,transparent 0 50%) 0 0/12px 12px", t: "Ván nét đen", d: "Ván nét đen luôn in sau cùng. Nó viền cho mọi mảng màu và viết tên bức tranh, nên lệch một ly là thấy ngay." },
];

(() => {
  const svg = $("#printSvg");
  svg.innerHTML = rooster(true);
  $("#stepTot").textContent = BLOCKS.length;

  const blocksEl = $("#blocks");
  blocksEl.innerHTML = BLOCKS.map(
    (b, i) => `<button class="blk" type="button" data-i="${i}" style="--pig:${b.color};--carve:${b.carve}">
      <span class="face"></span>
      <span><b>${b.n}</b><small>${b.s}</small></span><span class="dot"></span></button>`,
  ).join("");
  $("#steps").innerHTML = BLOCKS.map(() => "<i></i>").join("");

  let done = 0;
  let timer = null;

  function ui() {
    $$(".blk").forEach((el, i) => {
      el.classList.toggle("done", i < done);
      el.classList.toggle("next", i === done);
      el.disabled = i !== done;
      el.setAttribute("aria-label", `${BLOCKS[i].n}${i < done ? ", đã in" : i === done ? ", in ván này" : ", chưa tới lượt"}`);
    });
    $$("#steps i").forEach((el, i) => el.classList.toggle("on", i < done));
    $("#stepNo").textContent = done;
    if (done === 0) {
      $("#stepTitle").textContent = "Tờ giấy điệp";
      $("#stepText").textContent = "Tranh bắt đầu từ một tờ giấy điệp, chưa có gì trên đó. Bấm ván đang nhấp nháy để in.";
    } else {
      const b = BLOCKS[done - 1];
      $("#stepTitle").textContent = b.t;
      $("#stepText").textContent = b.d + (done === BLOCKS.length ? " Bức tranh đã xong." : "");
    }
    $("#auto").textContent = done === BLOCKS.length ? "↺ In lại" : "▶ Tự in cả bức";
  }

  function press(i, quick) {
    const b = BLOCKS[i];
    const fly = $("#fly");
    fly.style.setProperty("--pig", b.color);
    fly.classList.remove("go");
    void fly.offsetWidth;
    fly.classList.add("go");
    done = i + 1;
    ui();
    // the colour shows once the block has touched the paper
    setTimeout(() => $(`#L-${b.id}`).classList.add("on"), quick ? 120 : 480);
  }

  function reset() {
    clearTimeout(timer);
    $$(".layer", svg).forEach((l) => l.classList.remove("on"));
    done = 0;
    ui();
  }

  blocksEl.addEventListener("click", (e) => {
    const el = e.target.closest(".blk");
    if (el && !el.disabled) press(+el.dataset.i);
  });
  $("#reprint").addEventListener("click", reset);
  $("#mis").addEventListener("change", (e) => $(".sheetframe").classList.toggle("misreg", e.target.checked));
  $("#auto").addEventListener("click", () => {
    if (done === BLOCKS.length) reset();
    const step = () => {
      if (done >= BLOCKS.length) return;
      press(done);
      timer = setTimeout(step, 1100);
    };
    step();
  });
  ui();
})();

/* ═══════════════════════════ 04 · reading "Đám cưới chuột" ═══════════════════════════ */

const READ = [
  { x: 214, y: 150, t: "Chuột cầm cờ", p: "Đi đầu là một chú chuột cầm cờ hiệu, dáng nghiêm trang như đám rước của người. Người vẽ cố tình làm cả đám trông thật nghiêm túc, để nụ cười đến muộn hơn." },
  { x: 372, y: 292, t: "Trống và nhạc", p: "Chiêng trống và kèn đi cùng đám rước. Cả đoàn chuột làm đủ lễ như một đám cưới thật." },
  { x: 650, y: 150, t: "Kiệu hoa", p: "Cô dâu ngồi trong kiệu, hai chú chuột khiêng. Những chi tiết trang hoàng gửi vào đó mong ước ăn nên làm ra, con cháu đầy đàn." },
  { x: 976, y: 300, t: "Mâm lễ", p: "Trước mặt đoàn là một mâm lễ đặt xuống. Nhiều người hiểu đó là phần quà chuột phải nộp để được đi qua." },
  { x: 1118, y: 176, t: "Con mèo", p: "Con mèo ngồi chờ ở cuối đường. Theo cách hiểu phổ biến, chuột phải biếu lễ để mèo làm ngơ: một lời châm biếm nhẹ nhàng cảnh dân phải lót tay kẻ có quyền." },
  { x: 880, y: 130, t: "Vài ván màu và một nét đen", p: "Chỉ bốn ván màu và một ván nét đen mà kể được cả đám rước và cả lời chê: cách kể gọn của tranh dân gian." },
];

(() => {
  const svg = $("#miceSvg");
  svg.innerHTML =
    mice() +
    READ.map(
      (h, i) => `<g class="hot" data-i="${i}" tabindex="0" role="button" aria-label="${h.t}"><circle class="ring" cx="${h.x}" cy="${h.y}" r="26"/><circle cx="${h.x}" cy="${h.y}" r="17"/><text x="${h.x}" y="${h.y + 8}">${i + 1}</text></g>`,
    ).join("");
  $("#rTot").textContent = READ.length;
  let cur = 0;
  function show(i) {
    cur = (i + READ.length) % READ.length;
    const r = READ[cur];
    $("#rNo").textContent = cur + 1;
    $("#rTitle").textContent = r.t;
    $("#rText").textContent = r.p;
    $$(".hot", svg).forEach((h) => h.classList.toggle("on", +h.dataset.i === cur));
  }
  $$(".hot", svg).forEach((h) => {
    h.addEventListener("click", () => show(+h.dataset.i));
    h.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        show(+h.dataset.i);
      }
    });
  });
  $("#prevR").addEventListener("click", () => show(cur - 1));
  $("#nextR").addEventListener("click", () => show(cur + 1));
  show(0);
})();

/* ═══════════════════════════ 05 · colour from nature ═══════════════════════════ */

const PIGMENTS = [
  { id: "den", n: "Đen", v: "--ink", opts: [{ t: "Than lá tre", c: "#1b0c0e", d: "Lá tre đốt thành than, nghiền mịn rồi trộn hồ." }] },
  { id: "do", n: "Đỏ", v: "--c-red", opts: [{ t: "Sỏi son", c: "#cf2230", d: "Đá son mài nhỏ: ra màu đỏ tươi, gọi là đỏ son." }, { t: "Gỗ vang", c: "#a3263a", d: "Gỗ vang nấu lấy nước: màu đỏ trầm hơn, gọi là đỏ vang." }] },
  { id: "vang", n: "Vàng", v: "--c-yellow", opts: [{ t: "Hoa hòe", c: "#f2b631", d: "Nụ hoa hòe nấu lấy nước vàng." }] },
  { id: "xanh", n: "Xanh", v: "--c-green", opts: [{ t: "Gỉ đồng", c: "#4f8a6c", d: "Gỉ đồng cho màu xanh lục." }, { t: "Lá chàm", c: "#2f4e7a", d: "Lá chàm ủ lấy nước, cho xanh chàm." }] },
  { id: "trang", n: "Trắng", v: "--diep", opts: [{ t: "Vỏ sò điệp", c: "#f4ebd7", d: "Vỏ sò điệp nung và nghiền: chính là lớp điệp trên nền giấy." }] },
];

(() => {
  const pick = {};
  const root = $("#previewSvg");
  root.innerHTML = rooster(false);
  const list = $("#pigments");
  list.innerHTML = PIGMENTS.map((p) => {
    pick[p.id] = 0;
    return `<div class="pg" data-id="${p.id}"><span class="swatch" style="--sw:${p.opts[0].c}"></span>
      <h3 class="disp">${p.n}<small>${p.opts.length > 1 ? "CHỌN MỘT" : "MỘT NGUỒN"}</small></h3>
      <p class="from">${p.opts[0].d}</p>
      <div class="opts">${p.opts.map((o, i) => `<button class="opt" type="button" data-i="${i}" aria-pressed="${i === 0}">${o.t}</button>`).join("")}</div></div>`;
  }).join("");

  function apply() {
    const names = [];
    PIGMENTS.forEach((p) => {
      const o = p.opts[pick[p.id]];
      root.style.setProperty(p.v, o.c);
      if (p.id === "do" || p.id === "xanh") names.push(`${p.n.toLowerCase()} ${o.t.toLowerCase()}`);
      const row = $(`.pg[data-id="${p.id}"]`);
      row.querySelector(".swatch").style.setProperty("--sw", o.c);
      row.querySelector(".from").textContent = o.d;
      $$(".opt", row).forEach((b, i) => b.setAttribute("aria-pressed", i === pick[p.id]));
    });
    $("#pcap").textContent = `Tranh đang dùng: ${names.join(" · ")}, vàng hoa hòe, đen than lá tre, nền điệp.`;
  }
  list.addEventListener("click", (e) => {
    const b = e.target.closest(".opt");
    if (!b) return;
    pick[b.closest(".pg").dataset.id] = +b.dataset.i;
    apply();
  });
  apply();
})();

/* ═══════════════════════════ 06 · the vault of blocks ═══════════════════════════ */

const VAULT = [
  { n: "Gà đại cát", s: 1, p: "Bộ ván còn đủ, vẫn được in hằng năm trước Tết.", r: -1.5 },
  { n: "Đàn lợn âm dương", s: 1, p: "Bức tranh được nhắc nhiều nhất, thường treo cùng gà.", r: 1.2 },
  { n: "Đám cưới chuột", s: 1, p: "Ván nhiều chi tiết, khó khắc, ít thợ dám nhận.", r: -0.8 },
  { n: "Thầy đồ cóc", s: 2, p: "Còn một vài tấm ván cũ, chưa có ai in lại.", r: 1.6 },
  { n: "Hứng dừa", s: 2, p: "Chỉ còn ván nét, các ván màu đã mòn.", r: -1.2 },
  { n: "Đánh ghen", s: 2, p: "Ván đang được nghệ nhân khắc phục chế.", r: 0.9 },
  { n: "Vinh hoa, Phú quý", s: 1, p: "Cặp tranh chúc tụng, bán chạy vào dịp Tết.", r: -1.7 },
  { n: "Chăn trâu thổi sáo", s: 3, p: "Ván đã thất lạc, chỉ còn bản in cũ.", r: 1.3 },
];
const STATUS = { 1: "Còn in", 2: "Chỉ còn ván", 3: "Thất lạc" };

function carving(i) {
  // eight different carvings, so every block looks like a different one
  const k = "stroke:#3a2113;stroke-width:3;fill:none;stroke-linecap:round";
  const p = [
    `<circle cx="50" cy="50" r="40" style="${k}"/><circle cx="50" cy="50" r="26" style="${k}"/><circle cx="50" cy="50" r="12" style="${k}"/>`,
    `<path d="M10 70C30 30 50 30 50 50C50 70 70 70 90 30" style="${k}"/><path d="M10 84C30 44 50 44 50 64C50 84 70 84 90 44" style="${k}"/>`,
    `<path d="M50 8L92 50L50 92L8 50Z" style="${k}"/><path d="M50 26L74 50L50 74L26 50Z" style="${k}"/>`,
    `<path d="M14 20H86M14 40H86M14 60H86M14 80H86" style="${k}"/><path d="M30 12V88M50 12V88M70 12V88" style="${k}"/>`,
    `<path d="M50 90V40M50 40C30 40 22 24 26 12C40 14 50 24 50 40M50 52C70 52 78 36 74 24C60 26 50 36 50 52" style="${k}"/>`,
    `<path d="M10 90L50 10L90 90Z" style="${k}"/><path d="M26 90L50 44L74 90" style="${k}"/>`,
    `<circle cx="34" cy="50" r="22" style="${k}"/><circle cx="66" cy="50" r="22" style="${k}"/>`,
    `<path d="M10 50H90M50 10V90M22 22L78 78M78 22L22 78" style="${k}"/>`,
  ];
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${p[i % p.length]}</svg>`;
}

(() => {
  $("#legend2").innerHTML = [1, 2, 3].map((s) => `<span><i class="chip${s > 1 ? " s" + s : ""}">${STATUS[s]}</i>${s === 1 ? "bộ ván còn đủ, còn người in" : s === 2 ? "còn ván nhưng chưa in lại" : "đã mất ván"}</span>`).join("") + `<span style="opacity:.6">· tình trạng chỉ là minh họa</span>`;
  $("#vault").innerHTML = VAULT.map(
    (v, i) => `<button class="vb${v.s === 3 ? " lost" : ""}" type="button" style="--r:${v.r}deg">
      <span class="wood">${carving(i)}<i class="chip st${v.s > 1 ? " s" + v.s : ""}">${STATUS[v.s]}</i></span>
      <h3 class="disp">${v.n}</h3><p>${v.p}</p></button>`,
  ).join("");
})();

/* ═══════════════════════════ 07 · a day in the village ═══════════════════════════ */

const DAY = [
  { h: 5, t: "05:00", s: "Rạng sáng", n: "Quét điệp", p: "Người làng quét bột điệp lên giấy dó bằng chổi lá thông, quét nhiều lớp rồi phơi cho khô nắng.", w: "Sân nhà" },
  { h: 9, t: "09:00", s: "Sáng", n: "Pha màu", p: "Giã lá chàm, nấu hoa hòe, mài sỏi son. Mỗi màu pha riêng, không trộn lẫn với màu khác.", w: "Gian bếp" },
  { h: 11, t: "11:00", s: "Trưa", n: "Khắc ván", p: "Thợ khắc dùng những chiếc đục nhỏ khắc từng nét lên gỗ, mỗi màu một ván.", w: "Chái nhà" },
  { h: 14, t: "14:00", s: "Chiều", n: "In tranh", p: "Ván màu in trước, ván nét đen in sau cùng. Tay đều, nhịp đều: một người có thể in hàng trăm tờ.", w: "Bàn in" },
  { h: 17, t: "17:00", s: "Xế chiều", n: "Phơi tranh", p: "Tranh mới in được phơi trên sào, ánh điệp sáng lên dưới nắng chiều.", w: "Sân phơi" },
  { h: 20, t: "20:00", s: "Tối", n: "Xếp tranh", p: "Tranh được xếp từng cặp, buộc lại, chuẩn bị mang ra chợ Tết.", w: "Hiên nhà" },
];

(() => {
  $("#hours").innerHTML = DAY.map(
    (d, i) => `<li class="hr${i === 0 ? " on" : ""}" data-i="${i}">
      <div class="time">${d.t}<small>${d.s}</small></div>
      <div><h3 class="disp">${d.n}</h3><p>${d.p}</p><span class="where">${d.w}</span></div></li>`,
  ).join("");

  // the sundial: twenty-four hours round a circle
  let s = `<circle cx="160" cy="160" r="146" fill="#f7efe0" stroke="#1b0c0e" stroke-width="5"/><circle cx="160" cy="160" r="128" fill="none" stroke="#1b0c0e" stroke-width="1.5" stroke-dasharray="3 6"/>`;
  for (let h = 0; h < 24; h++) {
    const a = ((h / 24) * 2 * Math.PI) - Math.PI / 2;
    const r1 = h % 6 === 0 ? 112 : 120;
    s += `<path d="M${160 + Math.cos(a) * r1} ${160 + Math.sin(a) * r1}L${160 + Math.cos(a) * 128} ${160 + Math.sin(a) * 128}" stroke="#1b0c0e" stroke-width="${h % 6 === 0 ? 4 : 2}" stroke-linecap="round"/>`;
  }
  [[0, "24"], [6, "6"], [12, "12"], [18, "18"]].forEach(([h, label]) => {
    const a = ((h / 24) * 2 * Math.PI) - Math.PI / 2;
    s += `<text x="${160 + Math.cos(a) * 94}" y="${160 + Math.sin(a) * 94 + 8}" text-anchor="middle" font-family="Archivo,sans-serif" font-weight="900" font-size="22" fill="#aa101e">${label}</text>`;
  });
  s += `<g class="hand" id="hand"><path d="M160 160V56" stroke="#1b0c0e" stroke-width="6" stroke-linecap="round"/><circle cx="160" cy="44" r="15" fill="#f2b631" stroke="#1b0c0e" stroke-width="4"/></g>`;
  s += `<circle cx="160" cy="160" r="12" fill="#cf2230" stroke="#1b0c0e" stroke-width="4"/>`;
  $("#dialSvg").innerHTML = s;

  function at(i) {
    const d = DAY[i];
    $("#hand").style.rotate = `${(d.h / 24) * 360}deg`;
    $("#dLabel").textContent = `${d.t} · ${d.n}`;
    $$(".hr").forEach((el, k) => el.classList.toggle("on", k === i));
  }
  at(0);
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && at(+e.target.dataset.i)),
    { rootMargin: "-40% 0px -45% 0px" },
  );
  $$(".hr").forEach((el) => io.observe(el));
})();

/* ═══════════════════════════ the seals down the right edge ═══════════════════════════ */

(() => {
  const links = $$("#seals a");
  const secs = links.map((a) => $(a.getAttribute("href")));
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === `#${e.target.id}`))),
    { rootMargin: "-45% 0px -50% 0px" },
  );
  secs.forEach((s) => io.observe(s));
  links[0].classList.add("on");
})();
