/* Hà Nội · 36 phố phường: giao diện mock.
   Everything here is placeholder content, drawn by script so the mock stays one small folder. */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const NS = "http://www.w3.org/2000/svg";
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const plain = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();

/* seeded random, so the drawings are the same on every visit */
function rng(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

/* ───────────────────────────── the street front (tube houses) ───────────────────────────── */

/** One shopfront, drawn in gold line. `g` is the ground, `h` the height of the building. */
function facade(x, g, h, o) {
  const w = o.w;
  const y = g - h;
  const cx = x + w / 2;
  const gh = 64; // ground floor
  let s = `<rect class="fa" x="${x}" y="${y}" width="${w}" height="${h}"/>`;

  // roof
  if (o.roof === "gable") {
    const peak = Math.min(w * 0.36, 38);
    s += `<path class="fa" d="M${x - 4} ${y}L${cx} ${y - peak}L${x + w + 4} ${y}Z"/>`;
    for (const t of [0.34, 0.67]) {
      const yy = y - peak * t;
      const xl = x - 4 + (cx - (x - 4)) * t;
      const xr = x + w + 4 - (x + w + 4 - cx) * t;
      s += `<path class="ln" d="M${xl} ${yy}H${xr}"/>`;
    }
  } else if (o.roof === "tile") {
    s += `<path class="fa" d="M${x - 6} ${y}L${x + 8} ${y - 24}H${x + w - 8}L${x + w + 6} ${y}Z"/>`;
    s += `<path class="ln" d="M${x - 1} ${y - 9}H${x + w + 1}M${x + 4} ${y - 17}H${x + w - 4}"/>`;
  } else if (o.roof === "dome") {
    s += `<path class="fa" d="M${x - 2} ${y}Q${cx} ${y - 44} ${x + w + 2} ${y}Z"/><path class="ln" d="M${cx} ${y - 20}V${y - 34}"/>`;
  } else {
    s += `<path class="fa" d="M${x - 3} ${y}h${w + 6}v-9h-${w + 6}z"/>`;
    s += `<path class="ln" d="M${cx - 13} ${y - 9}L${cx} ${y - 25}L${cx + 13} ${y - 9}"/><circle class="ln" cx="${cx}" cy="${y - 14}" r="2.2"/>`;
  }

  // upper floors: windows and a balcony on each
  const fh = (h - gh - 8) / o.fl;
  for (let i = 0; i < o.fl; i++) {
    const fy = y + 8 + i * fh;
    const wy = fy + 8;
    const wh = fh - 28;
    const n = w > 98 ? 2 : 1;
    const ww = n === 2 ? (w - 44) / 2 : w - 38;
    for (let k = 0; k < n; k++) {
      const wx = n === 2 ? x + 14 + k * (ww + 16) : x + 19;
      if (o.win === "arch") {
        s += `<path class="ln" d="M${wx} ${wy + wh}V${wy + ww / 2}A${ww / 2} ${ww / 2} 0 0 1 ${wx + ww} ${wy + ww / 2}V${wy + wh}Z"/>`;
        s += `<path class="fillg" d="M${wx} ${wy + wh}V${wy + ww / 2}A${ww / 2} ${ww / 2} 0 0 1 ${wx + ww} ${wy + ww / 2}V${wy + wh}Z"/>`;
      } else {
        s += `<rect class="ln" x="${wx}" y="${wy}" width="${ww}" height="${wh}"/><rect class="fillg" x="${wx}" y="${wy}" width="${ww}" height="${wh}"/>`;
        s += `<path class="ln" d="M${wx + ww / 3} ${wy}V${wy + wh}M${wx + (ww * 2) / 3} ${wy}V${wy + wh}"/>`;
      }
    }
    // balcony rail
    const by = fy + fh - 12;
    let rail = `M${x - 2} ${by}H${x + w + 2}`;
    for (let bx = x + 5; bx < x + w - 2; bx += 8) rail += `M${bx} ${by}v9`;
    s += `<path class="ln" d="${rail}M${x - 2} ${by + 9}H${x + w + 2}"/>`;
  }

  // the shop: roll-up shutter, and a signboard above it
  const sy = g - gh;
  s += `<rect class="fillg" x="${x + 7}" y="${sy + 14}" width="${w - 14}" height="${gh - 14}"/>`;
  let slats = "";
  for (let k = 0; k < 7; k++) slats += `M${x + 7} ${sy + 20 + k * 6}H${x + w - 7}`;
  s += `<path class="ln" d="${slats}" stroke-opacity=".35"/>`;
  s += `<rect class="fa" x="${x + 3}" y="${sy - 1}" width="${w - 6}" height="13"/>`;
  s += `<text class="sg" x="${cx}" y="${sy + 9}" font-size="8.5">${o.shop}</text>`;

  // the vertical signboard hung out over the street
  const hx = o.side ? x + w - 6 : x - 9;
  const hy = sy - 62;
  const letters = [...o.sign].map((c, i) => `<tspan x="${hx + 7.5}" dy="${i ? 9.6 : 0}">${c}</tspan>`).join("");
  s += `<g class="hang"><path class="ln" d="M${hx + 7.5} ${hy - 12}V${hy}"/><rect class="fa" x="${hx}" y="${hy}" width="15" height="${6 + o.sign.length * 9.6 + 6}"/><text class="sg" y="${hy + 14}" font-size="9">${letters}</text></g>`;

  // a red lantern on some of them
  if (o.lamp) {
    s += `<g class="lamp"><path class="ln" d="M${x + 16} ${sy - 1}v10"/><ellipse cx="${x + 16}" cy="${sy + 17}" rx="6" ry="8" fill="#cf2230" stroke="#f0be6b" stroke-width="1"/><path class="ln" d="M${x + 16} ${sy + 25}v6"/></g>`;
  }
  return s;
}

const WIDTHS = [96, 84, 110, 78, 100, 88, 116, 82, 104, 90];
const HEIGHTS = [196, 244, 208, 266, 222, 252, 200, 236, 214, 258];
const ROOFS = ["tile", "gable", "flat", "tile", "dome", "gable", "flat", "tile"];
const WINS = ["arch", "rect", "rect", "arch", "arch", "rect"];
const SIGNS = ["BẠC", "ĐÀO", "MÃ", "GAI", "BÔNG", "QUẠT", "ĐƯỜNG", "BUỒM", "TRỐNG", "THIẾC", "MUỐI", "CÁ", "CHIẾU", "BỒ", "ĐỒNG", "HƯƠNG"];

function skyline(svg, shift = 0) {
  const g = 292;
  let x = -40;
  let i = shift;
  let out = "";
  while (x < 1640) {
    const o = {
      w: WIDTHS[i % WIDTHS.length],
      roof: ROOFS[i % ROOFS.length],
      win: WINS[i % WINS.length],
      fl: 2 + (i % 3 === 1 ? 1 : 0),
      sign: SIGNS[i % SIGNS.length],
      shop: SIGNS[(i + 5) % SIGNS.length],
      side: i % 2,
      lamp: i % 3 === 1,
    };
    out += facade(x, g, HEIGHTS[(i * 3) % HEIGHTS.length], o);
    x += o.w + 3;
    i++;
  }
  out += `<path class="ln" d="M0 ${g}H1600" stroke-opacity=".9"/>`;
  svg.innerHTML = out;
}
skyline($("#skyline"), 0);
skyline($("#skyline2"), 4);

/* ───────────────────────────── 03 · the map ───────────────────────────── */

const GROUPS = {
  kim: "Kim loại",
  vai: "Vải & sợi",
  dung: "Đồ dùng",
  an: "Ăn uống",
  te: "Tế lễ",
  thuyen: "Thuyền bè",
};

const STREETS = [
  { id: "bac", n: "Hàng Bạc", g: "kim", pts: [[470, 285], [470, 475]], trade: "Bạc và đồ kim hoàn", old: "Thợ kim hoàn chế tác và bán đồ bạc, vàng.", now: "Vẫn là nơi tập trung các tiệm vàng bạc." },
  { id: "thiec", n: "Hàng Thiếc", g: "kim", pts: [[430, 335], [590, 335]], trade: "Đồ thiếc, tôn, kim khí", old: "Thợ gò đồ thiếc, tôn bằng tay.", now: "Đang cập nhật." },
  { id: "dong", n: "Hàng Đồng", g: "kim", pts: [[600, 285], [760, 285]], trade: "Đồ đồng", old: "Thợ đúc và gò đồ đồng.", now: "Đang cập nhật." },
  { id: "dao", n: "Hàng Đào", g: "vai", pts: [[310, 475], [700, 475]], trade: "Lụa và vải nhuộm điều", old: "Bán tơ lụa, vải nhuộm màu điều (đỏ đào).", now: "Quần áo, đồ may mặc, quà lưu niệm." },
  { id: "ngang", n: "Hàng Ngang", g: "vai", pts: [[360, 430], [600, 430]], trade: "Vải vóc, tơ lụa", old: "Nhiều cửa hiệu vải buôn bán sầm uất.", now: "Đang cập nhật." },
  { id: "bong", n: "Hàng Bông", g: "vai", pts: [[320, 240], [320, 470]], trade: "Bông và đồ vải", old: "Bán bông, chăn, đệm.", now: "Chăn ga, đệm, đồ vải." },
  { id: "gai", n: "Hàng Gai", g: "vai", pts: [[380, 235], [380, 470]], trade: "Sợi gai, lụa thêu", old: "Bán dây, lưới làm từ sợi gai.", now: "Lụa, đồ thêu, quà lưu niệm." },
  { id: "quat", n: "Hàng Quạt", g: "dung", pts: [[400, 285], [545, 285]], trade: "Quạt và đồ thờ", old: "Làm và bán quạt giấy, quạt lông.", now: "Cờ, đồ thờ cúng, hoành phi." },
  { id: "chieu", n: "Hàng Chiếu", g: "dung", pts: [[690, 238], [780, 192], [858, 150]], trade: "Chiếu cói", old: "Bán chiếu cói và đồ đan.", now: "Đang cập nhật." },
  { id: "trong", n: "Hàng Trống", g: "dung", pts: [[330, 505], [480, 505]], trade: "Trống và đồ gỗ sơn", old: "Thợ bưng trống da.", now: "Đang cập nhật." },
  { id: "bo", n: "Hàng Bồ", g: "dung", pts: [[400, 385], [525, 385]], trade: "Bồ, thúng, đồ đan tre", old: "Bán bồ, rổ rá đan bằng tre.", now: "Đang cập nhật." },
  { id: "duong", n: "Hàng Đường", g: "an", pts: [[610, 385], [770, 385]], trade: "Đường, bánh kẹo", old: "Bán đường mía, đường phèn.", now: "Bánh kẹo, mứt, đặc sản." },
  { id: "muoi", n: "Hàng Muối", g: "an", pts: [[800, 285], [800, 440]], trade: "Muối", old: "Bán muối từ vùng biển đưa lên.", now: "Đang cập nhật." },
  { id: "ca", n: "Hàng Cá", g: "an", pts: [[470, 190], [650, 190]], trade: "Cá và thủy sản", old: "Chợ cá tươi và cá khô.", now: "Đang cập nhật." },
  { id: "ma", n: "Hàng Mã", g: "te", pts: [[560, 238], [790, 238]], trade: "Đồ mã, đồ chơi theo mùa", old: "Làm và bán giấy tiền, đồ mã.", now: "Đồ chơi, đồ trang trí theo từng mùa lễ hội." },
  { id: "buom", n: "Hàng Buồm", g: "thuyen", pts: [[690, 335], [850, 335]], trade: "Buồm và vải bạt", old: "Bán buồm cho thuyền bè trên sông.", now: "Đang cập nhật." },
];

const LANDMARKS = [
  { n: "Chợ Đồng Xuân", x: 660, y: 138, dy: -10 },
  { n: "Ô Quan Chưởng", x: 862, y: 150, dy: -12 },
  { n: "87 Mã Mây", x: 440, y: 232, dy: -12 },
  { n: "Tháp Rùa", x: 702, y: 592, dx: 14, anchor: "start", dy: 4 },
];

const NAMES36 = ["Hàng Bạc", "Hàng Bè", "Hàng Bồ", "Hàng Bông", "Hàng Buồm", "Hàng Cá", "Hàng Cân", "Hàng Chai", "Hàng Chiếu", "Hàng Chĩnh", "Hàng Cót", "Hàng Da", "Hàng Đào", "Hàng Đậu", "Hàng Điếu", "Hàng Đồng", "Hàng Đường", "Hàng Gà", "Hàng Gai", "Hàng Giày", "Hàng Hòm", "Hàng Khay", "Hàng Khoai", "Hàng Lược", "Hàng Mã", "Hàng Mắm", "Hàng Mành", "Hàng Muối", "Hàng Ngang", "Hàng Nón", "Hàng Quạt", "Hàng Rươi", "Hàng Thiếc", "Hàng Thùng", "Hàng Trống", "Hàng Vải"];

const mapSvg = $("#mapsvg");
const streetsG = $("#streets");
let selected = null;
let activeGroups = new Set(Object.keys(GROUPS));
let query = "";

function pathOf(pts) {
  return pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
}

function renderStreets() {
  STREETS.forEach((s) => {
    const d = pathOf(s.pts);
    const a = s.pts[0];
    const b = s.pts[s.pts.length - 1];
    const mid = s.pts[Math.floor(s.pts.length / 2)];
    let ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
    if (ang >= 90) ang -= 180;
    if (ang < -90) ang += 180;
    // push the name 11 units to the side of the line, so it never sits on top of it
    const rad = (ang * Math.PI) / 180;
    const ox = Math.sin(rad) * 11;
    const oy = -Math.cos(rad) * 11;
    const mx = s.pts.length === 2 ? (a[0] + b[0]) / 2 : mid[0];
    const my = s.pts.length === 2 ? (a[1] + b[1]) / 2 : mid[1];
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", `st g-${s.g}`);
    g.dataset.id = s.id;
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", `${s.n}: ${s.trade}`);
    g.innerHTML =
      `<path class="hit" d="${d}"/>` +
      `<path class="road" d="${d}"/>` +
      (s.g === "te" ? `<path class="road2" d="${d}"/>` : "") +
      `<text transform="translate(${mx + ox} ${my + oy}) rotate(${ang})">${s.n}</text>`;
    g.addEventListener("click", () => select(s.id));
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        select(s.id);
      }
    });
    streetsG.appendChild(g);
  });

  const lm = $("#landmarks");
  lm.innerHTML = LANDMARKS.map(
    (m) =>
      `<g class="lm"><path d="M${m.x} ${m.y - 6}L${m.x + 6} ${m.y}L${m.x} ${m.y + 6}L${m.x - 6} ${m.y}Z" fill="#340509" stroke="#f0be6b" stroke-width="1.4"/>` +
      `<text x="${m.x + (m.dx || 0)}" y="${m.y + (m.dy || 0)}" text-anchor="${m.anchor || "middle"}">${m.n}</text></g>`,
  ).join("");
}

function legendSample(g) {
  return `<svg viewBox="0 0 38 8" aria-hidden="true"><g class="st g-${g}"><path class="road" d="M3 4H35"/>${g === "te" ? '<path class="road2" d="M3 4H35"/>' : ""}</g></svg>`;
}

function renderFilters() {
  const chips = $("#chips");
  chips.innerHTML = Object.entries(GROUPS)
    .map(([k, v]) => `<button class="chip" type="button" aria-pressed="true" data-g="${k}">${v}</button>`)
    .join("");
  chips.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    const k = b.dataset.g;
    // clicking a trade when all are on shows only that trade; clicking again brings the rest back
    if (activeGroups.size === Object.keys(GROUPS).length) activeGroups = new Set([k]);
    else if (activeGroups.has(k) && activeGroups.size === 1) activeGroups = new Set(Object.keys(GROUPS));
    else activeGroups.has(k) ? activeGroups.delete(k) : activeGroups.add(k);
    $$(".chip").forEach((c) => c.setAttribute("aria-pressed", activeGroups.has(c.dataset.g)));
    applyFilters();
  });
  $("#legend").innerHTML = Object.entries(GROUPS)
    .map(([k, v]) => `<li>${legendSample(k)}<span>${v}</span></li>`)
    .join("");
  $("#q").addEventListener("input", (e) => {
    query = plain(e.target.value.trim());
    applyFilters();
  });
  $("#q").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const hit = STREETS.find((s) => plain(s.n).includes(query));
    if (hit) select(hit.id);
  });
}

function applyFilters() {
  $$(".st[data-id]").forEach((el) => {
    const s = STREETS.find((x) => x.id === el.dataset.id);
    const okG = activeGroups.has(s.g);
    const okQ = !query || plain(s.n).includes(query);
    el.classList.toggle("dim", !(okG && okQ));
  });
}

/* zoom: the viewBox shrinks around a point */
const BASE = { x: 150, y: 70, w: 850, h: 610 };
let zoom = 1;
let cx = BASE.x + BASE.w / 2;
let cy = BASE.y + BASE.h / 2;
function applyView() {
  const w = BASE.w / zoom;
  const h = BASE.h / zoom;
  cx = clamp(cx, BASE.x + w / 2, BASE.x + BASE.w - w / 2);
  cy = clamp(cy, BASE.y + h / 2, BASE.y + BASE.h - h / 2);
  mapSvg.setAttribute("viewBox", `${cx - w / 2} ${cy - h / 2} ${w} ${h}`);
}
$("#zin").addEventListener("click", () => {
  zoom = Math.min(zoom * 1.4, 2.6);
  applyView();
});
$("#zout").addEventListener("click", () => {
  zoom = Math.max(zoom / 1.4, 1);
  applyView();
});
$("#zreset").addEventListener("click", () => {
  zoom = 1;
  cx = BASE.x + BASE.w / 2;
  cy = BASE.y + BASE.h / 2;
  applyView();
});

/* the drawer */
function drawerFacade(sign) {
  const svg = $("#dFacade");
  const short = sign.replace(/^Hàng /, "").toUpperCase().slice(0, 5);
  const g = 158;
  svg.innerHTML =
    facade(8, g, 112, { w: 88, roof: "gable", win: "rect", fl: 1, sign: "HÀNG".slice(0, 4), shop: short, side: 1, lamp: false }) +
    facade(100, g, 138, { w: 116, roof: "tile", win: "arch", fl: 2, sign: short, shop: short, side: 0, lamp: true }) +
    facade(220, g, 100, { w: 92, roof: "flat", win: "rect", fl: 1, sign: short.slice(0, 3), shop: short, side: 1, lamp: false }) +
    `<path class="ln" d="M0 ${g}H320"/>`;
}

function select(id) {
  const s = STREETS.find((x) => x.id === id);
  selected = id;
  $$(".st[data-id]").forEach((el) => el.classList.toggle("on", el.dataset.id === id));
  $$(".pl").forEach((el) => el.classList.toggle("on", plain(el.textContent) === plain(s ? s.n : "")));
  if (!s) return;
  $("#dTag").textContent = GROUPS[s.g];
  $("#dName").textContent = s.n;
  $("#dTrade").textContent = s.trade;
  $("#dOld").textContent = s.old;
  $("#dNow").textContent = s.now;
  drawerFacade(s.n);
  // pan the map to it when zoomed in
  const mid = s.pts[Math.floor(s.pts.length / 2)];
  if (zoom > 1) {
    cx = mid[0];
    cy = mid[1];
    applyView();
  }
}

function selectPlain(name) {
  const hit = STREETS.find((s) => plain(s.n) === plain(name));
  if (hit) return select(hit.id);
  // on the list, but not drawn on the mock map
  selected = null;
  $$(".st[data-id]").forEach((el) => el.classList.remove("on"));
  $$(".pl").forEach((el) => el.classList.toggle("on", el.textContent === name));
  $("#dTag").textContent = "Chưa vẽ trên mock";
  $("#dName").textContent = name;
  $("#dTrade").textContent = "Phố này có trong danh sách nhưng chưa có vị trí trên bản đồ mock.";
  $("#dOld").textContent = "—";
  $("#dNow").textContent = "—";
  drawerFacade(name);
}

function renderPlates() {
  $("#plates").innerHTML = NAMES36.map((n) => {
    const on = STREETS.some((s) => plain(s.n) === plain(n));
    return `<button class="pl${on ? "" : " off"}" type="button" role="listitem">${n}</button>`;
  }).join("");
  $("#plates").addEventListener("click", (e) => {
    const b = e.target.closest(".pl");
    if (b) selectPlain(b.textContent);
  });
}

renderStreets();
renderFilters();
renderPlates();
applyFilters();
select("bac");

/* ───────────────────────────── 04 · the tube house ───────────────────────────── */

const GL = 470; // ground level
const F1 = 342; // the floor of the upper storey
const RF = 200; // underside of the roof

const ZONES = [
  { x0: 0, x1: 190, n: "•", t: "Hè phố", p: "Gánh hàng rong, xe đạp, tiếng rao. Nhà quay mặt ra đây, và mọi việc buôn bán bắt đầu ở đây." },
  { x0: 190, x1: 640, n: "1", t: "Mặt tiền và gian bán hàng", p: "Chỉ rộng vài mét. Tầng dưới là cửa hàng, tầng trên là gác xép. Biển hiệu dọc treo ra phố để người đi đường nhìn thấy từ xa." },
  { x0: 640, x1: 900, n: "2", t: "Sân trời", p: "Một khoảng trống không mái giữa hai gian nhà: lấy ánh sáng, lấy gió và hứng nước mưa. Thường có một chậu cây hoặc bể nước nhỏ." },
  { x0: 900, x1: 1420, n: "3", t: "Gian giữa", p: "Nơi cả nhà sinh hoạt: chỗ ngủ ở dưới, bàn thờ ở trên. Càng vào sâu càng yên tĩnh, tiếng phố nhỏ dần." },
  { x0: 1420, x1: 1600, n: "4", t: "Giếng trời", p: "Một giếng sáng hẹp, cao, đưa ánh sáng xuống tận gian sâu của ngôi nhà." },
  { x0: 1600, x1: 2000, n: "5", t: "Bếp", p: "Bếp ở phía sau, xa phố nhất. Khói theo ống thoát lên khỏi mái, gác xép bên trên dùng để cất đồ." },
  { x0: 2000, x1: 2400, n: "6", t: "Sân sau", p: "Một khoảng sân với giếng, cây và chỗ giặt giũ. Đi hết nhà là đã sâu mấy chục mét so với mặt phố." },
];

function houseSvg() {
  const walls = [190, 640, 900, 1420, 1600, 2000, 2380];
  let s = "";
  // the sky and the street
  s += `<path class="bp dash" d="M0 126H2400"/>`;
  // the ground line and the street
  s += `<path class="bp th" d="M0 ${GL}H2400"/><path class="bp fine" d="M0 ${GL + 14}H2400M0 ${GL + 28}H2400"/>`;

  // street: a hawker with a shoulder pole
  s += `<g class="bp"><circle cx="86" cy="${GL - 96}" r="10"/><path d="M62 ${GL - 90}L112 ${GL - 96}M86 ${GL - 86}V${GL - 40}M86 ${GL - 40}L76 ${GL}M86 ${GL - 40}L98 ${GL}M52 ${GL - 80}L120 ${GL - 100}"/><path d="M54 ${GL - 78}C44 ${GL - 56} 62 ${GL - 56} 56 ${GL - 78}M116 ${GL - 100}C106 ${GL - 78} 124 ${GL - 78} 118 ${GL - 100}"/><path d="M72 ${GL - 108}L86 ${GL - 122}L100 ${GL - 108}Z"/></g>`;
  s += `<text class="bpt sm" x="20" y="${GL + 50}">hè phố</text>`;

  // built blocks: walls, floors, roofs
  const blocks = [
    { a: 190, b: 640, kind: "shop" },
    { a: 900, b: 1420, kind: "mid" },
    { a: 1600, b: 2000, kind: "kitchen" },
  ];
  blocks.forEach((bl) => {
    // roof: a single slope, with tile lines
    s += `<path class="bp th" d="M${bl.a - 10} ${RF}L${bl.a + (bl.b - bl.a) * 0.5} ${RF - 62}L${bl.b + 10} ${RF}"/>`;
    s += `<path class="bpf" d="M${bl.a - 10} ${RF}L${bl.a + (bl.b - bl.a) * 0.5} ${RF - 62}L${bl.b + 10} ${RF}Z"/>`;
    for (let k = 1; k < 4; k++) {
      const t = k / 4;
      const yy = RF - 62 * t;
      const xl = bl.a - 10 + (bl.a + (bl.b - bl.a) * 0.5 - (bl.a - 10)) * t;
      const xr = bl.b + 10 - (bl.b + 10 - (bl.a + (bl.b - bl.a) * 0.5)) * t;
      s += `<path class="bp fine" d="M${xl} ${yy}H${xr}"/>`;
    }
    // ceiling and upper floor
    s += `<path class="bp" d="M${bl.a} ${RF}H${bl.b}"/><path class="bp th" d="M${bl.a} ${F1}H${bl.b}"/>`;
    s += `<path class="bp th" d="M${bl.a} ${RF}V${GL}M${bl.b} ${RF}V${GL}"/>`;
  });

  // 1 · shop
  s += `<path class="bp" d="M190 ${GL - 150}H640"/>`;
  // shopfront: shutter and signboard
  s += `<rect class="bp" x="190" y="${F1 + 6}" width="14" height="${GL - F1 - 6}"/><rect class="bpg" x="190" y="${F1 + 6}" width="14" height="${GL - F1 - 6}"/>`;
  s += `<rect class="bp th" x="174" y="${F1 - 22}" width="44" height="22"/><text class="bpt sm" x="196" y="${F1 - 7}" text-anchor="middle">BẠC</text>`;
  s += `<g class="bp"><path d="M156 ${F1 - 26}V${F1 + 52}"/><rect x="146" y="${F1 - 22}" width="20" height="70"/></g><text class="bpt sm" x="132" y="${F1 + 96}">biển dọc</text>`;
  // counter and shelves
  s += `<g class="bp"><rect x="300" y="${GL - 70}" width="170" height="70"/><path d="M300 ${GL - 56}H470"/><rect x="520" y="${GL - 200}" width="104" height="170"/><path d="M520 ${GL - 160}H624M520 ${GL - 120}H624M520 ${GL - 80}H624"/></g>`;
  s += `<g class="bpg"><rect x="530" y="${GL - 188}" width="22" height="22"/><rect x="570" y="${GL - 188}" width="22" height="22"/><rect x="540" y="${GL - 148}" width="30" height="22"/><rect x="584" y="${GL - 108}" width="26" height="22"/><rect x="532" y="${GL - 68}" width="34" height="24"/></g>`;
  // upper room: arched window on the front
  s += `<path class="bp" d="M215 ${F1 - 20}V${RF + 84}A24 24 0 0 1 263 ${RF + 84}V${F1 - 20}Z"/><path class="bpg" d="M215 ${F1 - 20}V${RF + 84}A24 24 0 0 1 263 ${RF + 84}V${F1 - 20}Z"/>`;

  // 2 · courtyard: open to the sky
  s += `<g class="bp fine"><path d="M700 130V${GL - 10}M770 130V${GL - 10}M840 130V${GL - 10}" stroke-dasharray="3 9"/></g>`;
  s += `<g class="bp"><path d="M728 ${GL}V${GL - 30}M728 ${GL - 30}C700 ${GL - 40} 700 ${GL - 78} 728 ${GL - 90}C756 ${GL - 78} 756 ${GL - 40} 728 ${GL - 30}M728 ${GL - 56}C716 ${GL - 64} 716 ${GL - 80} 728 ${GL - 88}"/><path d="M800 ${GL}h52v-34h-52z"/><path d="M800 ${GL - 34}h52"/></g><rect class="bpg" x="802" y="${GL - 24}" width="48" height="22"/>`;
  s += `<path class="bp" d="M640 ${F1}H900" stroke-dasharray="2 7"/>`;
  s += `<text class="bpt sm" x="770" y="150" text-anchor="middle">sáng, gió, mưa</text>`;

  // 3 · middle house
  s += `<g class="bp"><rect x="940" y="${GL - 40}" width="190" height="40"/><path d="M940 ${GL - 40}V${GL - 74}H1000V${GL - 40}"/><rect x="1180" y="${GL - 80}" width="120" height="80"/><path d="M1180 ${GL - 50}H1300"/></g>`;
  s += `<g class="bp"><rect x="1000" y="${RF + 40}" width="150" height="${F1 - RF - 40 - 4}"/><path d="M1000 ${RF + 60}H1150M1048 ${RF + 60}V${RF + 40}M1100 ${RF + 60}V${RF + 40}"/><path d="M1076 ${RF + 36}V${RF + 22}M1070 ${RF + 30}h12"/></g><text class="bpt sm" x="1076" y="${RF + 100}" text-anchor="middle">bàn thờ</text>`;
  s += `<path class="bp" d="M1230 ${F1 - 70}h120v70h-120z"/><path class="bpg" d="M1230 ${F1 - 70}h120v70h-120z"/>`;

  // 4 · light well
  s += `<g class="bp fine"><path d="M1480 130V${GL - 10}M1540 130V${GL - 10}" stroke-dasharray="3 9"/></g>`;
  s += `<path class="bp th" d="M1420 ${RF - 40}V${GL}M1600 ${RF - 40}V${GL}"/>`;
  s += `<g class="bp"><path d="M1510 ${GL}V${GL - 46}M1510 ${GL - 46}C1494 ${GL - 56} 1496 ${GL - 80} 1510 ${GL - 90}C1524 ${GL - 80} 1526 ${GL - 56} 1510 ${GL - 46}"/></g>`;

  // 5 · kitchen
  s += `<g class="bp"><rect x="1660" y="${GL - 56}" width="130" height="56"/><path d="M1680 ${GL - 56}V${GL - 66}H1770V${GL - 56}"/><path d="M1840 ${GL - 56}V${GL}M1840 ${GL - 56}H1930"/></g>`;
  s += `<path class="bpg" d="M1692 ${GL}C1680 ${GL - 16} 1696 ${GL - 26} 1704 ${GL - 40}C1716 ${GL - 24} 1722 ${GL - 14} 1716 ${GL}ZM1738 ${GL}C1730 ${GL - 12} 1738 ${GL - 20} 1744 ${GL - 30}C1754 ${GL - 18} 1756 ${GL - 8} 1752 ${GL}Z"/>`;
  s += `<path class="bp" d="M1740 ${GL - 66}V${RF - 56}h22v${56}"/><g class="bp fine"><path d="M1744 ${RF - 74}C1730 ${RF - 94} 1766 ${RF - 100} 1752 ${RF - 126}"/></g>`;
  s += `<g class="bp"><rect x="1700" y="${RF + 50}" width="240" height="${F1 - RF - 56}"/><path d="M1700 ${RF + 100}H1940M1760 ${RF + 50}V${F1 - 6}M1850 ${RF + 50}V${F1 - 6}"/></g><text class="bpt sm" x="1820" y="${RF + 124}" text-anchor="middle">gác xép</text>`;

  // 6 · back yard
  s += `<g class="bp"><circle cx="2120" cy="${GL - 18}" r="30" /><path d="M2090 ${GL - 18}V${GL}M2150 ${GL - 18}V${GL}"/><path d="M2090 ${GL - 18}h60"/></g><rect class="bpg" x="2092" y="${GL - 16}" width="56" height="14"/>`;
  s += `<g class="bp"><path d="M2250 ${GL}V${GL - 80}M2250 ${GL - 80}C2210 ${GL - 90} 2210 ${GL - 150} 2250 ${GL - 160}C2290 ${GL - 150} 2290 ${GL - 90} 2250 ${GL - 80}M2250 ${GL - 110}C2232 ${GL - 118} 2234 ${GL - 140} 2250 ${GL - 150}"/></g>`;
  s += `<path class="bp th" d="M2380 ${RF - 20}V${GL}"/><g class="bp"><rect x="2300" y="${GL - 100}" width="80" height="100"/><path d="M2300 ${GL - 100}L2340 ${GL - 128}L2380 ${GL - 100}"/></g><text class="bpt sm" x="2340" y="${GL - 40}" text-anchor="middle">WC</text>`;

  // the depth ruler along the top
  s += `<g class="bp" stroke-width="1.2"><path d="M190 60H2380M190 52V68M2380 52V68"/></g>`;
  for (let m = 0; m <= 48; m += 8) {
    const x = 190 + (m / 48) * 2190;
    s += `<path class="bp fine" d="M${x} 56V64"/><text class="bpt sm" x="${x}" y="46" text-anchor="middle">${m} m</text>`;
  }
  s += `<text class="bpt" x="1285" y="100" text-anchor="middle">chiều sâu: có thể tới 40–60 m</text>`;

  // wall labels
  s += `<text class="bpt sm" x="215" y="${GL + 50}">mặt tiền ≈ 3–4 m</text>`;

  // the moving cut line
  s += `<path class="cut" id="cutline" d="M209 70V${GL + 30}"/>`;

  // hotspots
  ZONES.slice(1).forEach((z, i) => {
    const xs = [415, 770, 1160, 1510, 1800, 2200][i];
    const ys = [F1 - 60, 300, 270, 250, 385, 330][i];
    s += `<g class="hot" data-z="${i + 1}" tabindex="0" role="button" aria-label="${z.t}"><circle cx="${xs}" cy="${ys}" r="15"/><text x="${xs}" y="${ys + 5}">${z.n}</text></g>`;
  });
  return s;
}

const hs = $("#housesvg");
hs.innerHTML = houseSvg();

const depth = $("#depth");
function setDepth(v, fromHot) {
  const x = 20 + (v / 100) * 2360;
  $("#cutline").setAttribute("d", `M${x} 70V${GL + 30}`);
  const meters = Math.max(0, Math.round(((x - 190) / 2190) * 48));
  $("#depthOut").textContent = x < 190 ? "ở ngoài phố" : `≈ ${meters} m`;
  const z = ZONES.find((zz) => x >= zz.x0 && x < zz.x1) || ZONES[ZONES.length - 1];
  $("#hNum").textContent = z.n;
  $("#hTitle").textContent = z.t;
  $("#hText").textContent = z.p;
  $$(".hot").forEach((h) => h.classList.toggle("on", ZONES[+h.dataset.z] === z));
  if (!fromHot) return;
}
depth.addEventListener("input", () => setDepth(+depth.value));
$$(".hot").forEach((h) => {
  const go = () => {
    const z = ZONES[+h.dataset.z];
    const mid = (z.x0 + z.x1) / 2;
    depth.value = ((mid - 20) / 2360) * 100;
    setDepth(+depth.value, true);
  };
  h.addEventListener("click", go);
  h.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      go();
    }
  });
});
setDepth(+depth.value);

// drag the drawing sideways
(() => {
  const el = $("#hscroll");
  let down = false;
  let sx = 0;
  let sl = 0;
  el.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".hot")) return;
    down = true;
    sx = e.clientX;
    sl = el.scrollLeft;
    el.style.cursor = "grabbing";
  });
  window.addEventListener("pointermove", (e) => {
    if (down) el.scrollLeft = sl - (e.clientX - sx);
  });
  window.addEventListener("pointerup", () => {
    down = false;
    el.style.cursor = "";
  });
})();

/* ───────────────────────────── 05 · the sound ───────────────────────────── */

const ICONS = {
  mic: '<path d="M8 2.5a2 2 0 0 1 2 2V8a2 2 0 0 1-4 0V4.5a2 2 0 0 1 2-2zM4 7.5a4 4 0 0 0 8 0M8 11.5V14"/>',
  hammer: '<path d="M3 12l5-5M7 3l4 4-1.6 1.6-4-4zM9 5l3-2 1 1-2 3"/>',
  basket: '<path d="M2.5 7h11l-1.2 6H3.7zM5 7l2-4M11 7L9 3"/>',
  bike: '<circle cx="4" cy="11" r="2.6"/><circle cx="12" cy="11" r="2.6"/><path d="M4 11l3-5h3l2 5M7 6l-1-2"/>',
  door: '<path d="M3 3h10v10H3zM3 6h10M3 9h10"/>',
  rain: '<path d="M4 9a3 3 0 0 1 .6-5.9A4 4 0 0 1 12 4a2.5 2.5 0 0 1 0 5zM5 11.5l-.8 2M8 11.5l-.8 2M11 11.5l-.8 2"/>',
};

const CHANNELS = [
  { id: "rao", n: "Tiếng rao hàng rong", s: "“Ai bánh mì nóng đây…”", ranges: [[5, 22]], ico: "mic" },
  { id: "bua", n: "Búa gõ đồng", s: "phố Hàng Đồng", ranges: [[8, 17]], ico: "hammer" },
  { id: "cho", n: "Chợ sớm", s: "quanh chợ Đồng Xuân", ranges: [[4, 9.5]], ico: "basket" },
  { id: "xe", n: "Xe cộ và còi", s: "cả khu phố", ranges: [[6, 23.5]], ico: "bike" },
  { id: "cua", n: "Cửa cuốn kéo", s: "đầu và cuối ngày", ranges: [[6, 8.5], [20, 23]], ico: "door" },
  { id: "mua", n: "Mưa trên mái tôn", s: "tùy hôm", ranges: [[4, 24]], ico: "rain" },
];

const mixState = {};
function renderChannels() {
  const rand = rng(7);
  $("#channels").innerHTML = CHANNELS.map((c) => {
    mixState[c.id] = c.id !== "mua";
    let bars = "";
    for (let i = 0; i < 46; i++) {
      const env = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.5 + c.n.length));
      bars += `<i style="--h:${Math.round(6 + env * rand() * 28)}px;--d:${(-rand() * 1.4).toFixed(2)}s"></i>`;
    }
    return `<div class="channel" data-id="${c.id}">
      <span class="cico"><svg viewBox="0 0 16 16" aria-hidden="true">${ICONS[c.ico]}</svg></span>
      <div class="cname"><b>${c.n}</b><small>${c.s}</small></div>
      <div class="wave" aria-hidden="true">${bars}</div>
      <input type="range" min="0" max="100" value="${c.id === "mua" ? 35 : 70}" aria-label="Âm lượng: ${c.n}" />
      <button class="tog" type="button" aria-pressed="${mixState[c.id]}" aria-label="Bật hoặc tắt: ${c.n}"></button>
    </div>`;
  }).join("");
  $("#channels").addEventListener("click", (e) => {
    const b = e.target.closest(".tog");
    if (!b) return;
    const id = b.closest(".channel").dataset.id;
    mixState[id] = !mixState[id];
    b.setAttribute("aria-pressed", mixState[id]);
    updateMixer();
  });
}

function activeAt(c, h) {
  return c.ranges.some(([a, b]) => h >= a && h < b);
}

function fmtHour(h) {
  const hh = Math.floor(h);
  const mm = h % 1 ? "30" : "00";
  return `${String(hh).padStart(2, "0")}:${mm}`;
}

function drawDay() {
  const P0 = [30, 100];
  const P1 = [300, -60];
  const P2 = [570, 100];
  let s = `<defs><linearGradient id="sky" x1="0" x2="1"><stop offset="0" stop-color="#62080f"/><stop offset=".5" stop-color="#aa101e" stop-opacity=".55"/><stop offset="1" stop-color="#2a0307"/></linearGradient></defs>`;
  s += `<path d="M30 100Q300 -60 570 100V112H30Z" fill="url(#sky)" opacity=".7"/>`;
  s += `<path d="M30 100Q300 -60 570 100" fill="none" stroke="#f0be6b" stroke-opacity=".5" stroke-dasharray="3 6"/>`;
  s += `<path d="M20 100H580" stroke="#f0be6b" stroke-opacity=".35"/>`;
  for (let h = 4; h <= 24; h += 4) {
    const t = (h - 4) / 20;
    const x = (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0];
    s += `<path d="M${x} 100v8" stroke="#f0be6b" stroke-opacity=".6"/><text x="${x}" y="119" text-anchor="middle" fill="#f7efe0" fill-opacity=".6" font-size="9" font-family="Be Vietnam Pro,sans-serif" letter-spacing=".1em">${String(h % 24).padStart(2, "0")}h</text>`;
  }
  s += `<circle id="sun" r="9" fill="#f0be6b" stroke="#2a0307" stroke-width="3"/>`;
  $("#dayArc").innerHTML = s;
}

function updateMixer() {
  const h = +$("#hour").value;
  $("#hourOut").textContent = fmtHour(h);
  // the sun (or moon) rides the arc
  const t = clamp((h - 4) / 20, 0, 1);
  const P0 = [30, 100];
  const P1 = [300, -60];
  const P2 = [570, 100];
  const x = (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0];
  const y = (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t * t * P2[1];
  const sun = $("#sun");
  sun.setAttribute("cx", x);
  sun.setAttribute("cy", y);
  sun.setAttribute("fill", h < 5.5 || h > 18.5 ? "#f7efe0" : "#f0be6b");
  CHANNELS.forEach((c) => {
    const el = $(`.channel[data-id="${c.id}"]`);
    const live = activeAt(c, h);
    el.classList.toggle("off", !live);
    el.classList.toggle("on", live && mixState[c.id]);
  });
}

renderChannels();
drawDay();
$("#hour").addEventListener("input", updateMixer);
updateMixer();
$("#playAll").addEventListener("click", () => {
  const all = CHANNELS.every((c) => mixState[c.id] || c.id === "mua");
  CHANNELS.forEach((c) => {
    mixState[c.id] = c.id === "mua" ? false : !all ? true : mixState[c.id];
    $(`.channel[data-id="${c.id}"] .tog`).setAttribute("aria-pressed", mixState[c.id]);
  });
  updateMixer();
});

/* ───────────────────────────── 06 · what remains ───────────────────────────── */

const gate = `<svg class="ill" viewBox="0 0 300 200" aria-hidden="true"><path class="bpf" d="M30 190V96H270V190Z"/><path class="bp th" d="M30 190V96H270V190"/><path class="bp" d="M110 190V128A40 40 0 0 1 190 128V190"/><path class="bp" d="M20 96H280M44 96V76H256V96M70 76V56H230V76M92 56V38H208V56"/><path class="bp" d="M14 76C30 76 38 70 44 76M286 76C270 76 262 70 256 76M40 56C60 56 66 50 70 56M260 56C240 56 234 50 230 56M82 38C96 38 100 32 108 38M218 38C204 38 200 32 192 38"/><path class="bp fine" d="M44 112H100M200 112H256M44 134H100M200 134H256M44 156H100M200 156H256"/><path class="bp" d="M150 38V22M144 28h12"/></svg>`;
const house = `<svg class="ill" viewBox="0 0 300 200" aria-hidden="true"><path class="bpf" d="M96 190V64H204V190Z"/><path class="bp th" d="M96 190V64H204V190M84 64L100 40H200L216 64Z"/><path class="bp fine" d="M92 52H208M98 46H202"/><path class="bp" d="M112 150V112A16 16 0 0 1 144 112V150ZM156 150V112A16 16 0 0 1 188 112V150Z"/><path class="bp" d="M96 96H204M96 104H204M104 96v8M116 96v8M128 96v8M140 96v8M152 96v8M164 96v8M176 96v8M188 96v8"/><rect class="bp" x="104" y="160" width="92" height="30"/><path class="bp fine" d="M104 166H196M104 172H196M104 178H196"/><path class="bp" d="M210 76v50M214 76v18h12v-18z"/></svg>`;
const dinh = `<svg class="ill" viewBox="0 0 300 200" aria-hidden="true"><path class="bpf" d="M60 190V120H240V190Z"/><path class="bp th" d="M60 190V120H240V190"/><path class="bp th" d="M20 118C60 118 70 100 80 84H220C230 100 240 118 280 118Z"/><path class="bp" d="M40 84C66 84 76 70 90 58H210C224 70 234 84 260 84M70 58C100 58 110 44 130 36H170C190 44 200 58 230 58"/><path class="bp fine" d="M30 118H270M90 84V118M150 84V118M210 84V118"/><path class="bp" d="M126 190V150A24 24 0 0 1 174 150V190"/><path class="bp" d="M150 36V22M144 22h12"/></svg>`;
const market = `<svg class="ill" viewBox="0 0 300 200" aria-hidden="true"><path class="bpf" d="M20 190V90H280V190Z"/><path class="bp th" d="M20 190V90H280V190"/><path class="bp" d="M110 90L150 52L190 90"/><path class="bp th" d="M20 90H280"/><circle class="bp" cx="150" cy="74" r="9"/><path class="bp" d="M150 68V74L155 76"/><path class="bp" d="M40 190V130A18 18 0 0 1 76 130V190M92 190V130A18 18 0 0 1 128 130V190M132 190V130A18 18 0 0 1 168 130V190M172 190V130A18 18 0 0 1 208 130V190M224 190V130A18 18 0 0 1 260 130V190"/><path class="bp fine" d="M20 108H280"/></svg>`;
const sign = `<svg class="ill" viewBox="0 0 300 200" aria-hidden="true"><rect class="bpf" x="40" y="56" width="220" height="86" rx="6"/><rect class="bp th" x="40" y="56" width="220" height="86" rx="6"/><rect class="bp" x="50" y="66" width="200" height="66" rx="3"/><circle class="bp" cx="56" cy="72" r="2.4"/><circle class="bp" cx="244" cy="72" r="2.4"/><circle class="bp" cx="56" cy="126" r="2.4"/><circle class="bp" cx="244" cy="126" r="2.4"/><text class="bpt" x="150" y="106" text-anchor="middle" font-size="30" style="font-variation-settings:'wdth' 66">HÀNG ···</text><path class="bp dash" d="M20 170H280"/><text class="bpt sm" x="150" y="186" text-anchor="middle">nghề đã đổi, tên còn lại</text></svg>`;
const alley = `<svg class="ill" viewBox="0 0 300 200" aria-hidden="true"><path class="bpf" d="M70 190V84A80 80 0 0 1 230 84V190Z"/><path class="bp th" d="M70 190V84A80 80 0 0 1 230 84V190"/><path class="bp" d="M104 190V100A46 46 0 0 1 196 100V190"/><path class="bp fine" d="M104 190V100M196 190V100M150 54V190"/><path class="bp" d="M150 62V40M142 40h16"/><ellipse cx="150" cy="104" rx="6" ry="8" fill="#cf2230" stroke="#850c17" stroke-width="1.4"/><path class="bp" d="M70 84H230"/></svg>`;

const RELICS = [
  { cls: "big", r: -1.2, st: "Còn nguyên", stc: "", acc: "DT-01 · 1749", h: "Ô Quan Chưởng", p: "Cửa ô duy nhất còn lại của những cửa thành Thăng Long xưa, đứng ở đầu phố Hàng Chiếu.", go: "chieu", ill: gate },
  { cls: "mid", r: 1.1, st: "Còn nguyên", stc: "", acc: "DT-02", h: "Nhà cổ 87 Mã Mây", p: "Ngôi nhà ống được giữ lại và mở cửa đón khách, cho thấy cách người xưa ở và làm nghề.", go: "ma", ill: house },
  { cls: "mid", r: -0.8, st: "Còn một phần", stc: "part", acc: "DT-03", h: "Đình thờ tổ nghề", p: "Nhiều phố vẫn còn đình thờ tổ nghề ẩn trong ngõ, nhưng ít nhà còn người làm nghề ấy.", go: "bac", ill: dinh },
  { cls: "", r: 1.4, st: "Còn nguyên", stc: "", acc: "DT-04 · cuối thế kỉ 19", h: "Chợ Đồng Xuân", p: "Ngôi chợ lớn nhất khu phố cổ, vẫn họp mỗi ngày.", go: "", ill: market },
  { cls: "", r: -1.4, st: "Chỉ còn tên", stc: "name", acc: "DT-05", h: "Tên phố", p: "Nhiều phố đã đổi nghề từ lâu. Thứ còn lại là cái tên.", go: "", ill: sign },
  { cls: "", r: 0.9, st: "Còn một phần", stc: "part", acc: "DT-06", h: "Cổng ngõ", p: "Một số ngõ còn cổng cũ, nơi xưa được đóng kín về đêm để giữ yên cả xóm.", go: "", ill: alley },
];

$("#cards").innerHTML = RELICS.map(
  (c) => `<article class="card ${c.cls}" style="--r:${c.r}deg">
    <span class="stamp ${c.stc}">${c.st}</span>
    <p class="acc">${c.acc}</p>
    ${c.ill}
    <h3 class="cond">${c.h}</h3>
    <p>${c.p}</p>
    <div class="cfoot"><span>Tư liệu: đang cập nhật</span>${c.go ? `<a href="#s3" data-go="${c.go}">Xem trên bản đồ ↗</a>` : ""}</div>
  </article>`,
).join("");
$("#cards").addEventListener("click", (e) => {
  const a = e.target.closest("[data-go]");
  if (a) select(a.dataset.go);
});

/* ───────────────────────────── 07 · a walk ───────────────────────────── */

const STOPS = [
  { t: "Bắt đầu · 0 phút", h: "Bờ Hồ", p: "Xuất phát từ hồ Hoàn Kiếm, nhìn lên phía bắc, nơi những con phố nghề bắt đầu.", tip: "Cà phê trứng", pt: [690, 522] },
  { t: "+15 phút", h: "Hàng Gai", p: "Lụa, đồ thêu và những cửa hiệu hẹp mà sâu: nhà ống đầu tiên của chuyến đi.", tip: "Ngắm biển hiệu dọc", pt: [380, 440] },
  { t: "+35 phút", h: "Hàng Bạc", p: "Tiệm vàng bạc san sát. Tìm đình thờ tổ nghề lẩn trong ngõ.", tip: "Đứng nghe tiếng búa", pt: [470, 430] },
  { t: "+55 phút", h: "Hàng Đào", p: "Con phố của vải vóc và quần áo, đông và sáng đèn về chiều.", tip: "Chè hoặc nước mía", pt: [560, 475] },
  { t: "+1 giờ 20", h: "87 Mã Mây", p: "Vào một ngôi nhà ống thật: cửa hàng, sân trời, gian giữa, bếp, sân sau.", tip: "Xem lại mặt cắt", pt: [440, 232] },
  { t: "+1 giờ 50", h: "Hàng Mã", p: "Nhiều màu sắc nhất phố cổ, nhất là những dịp lễ và Tết.", tip: "Chụp ảnh", pt: [650, 238] },
  { t: "+2 giờ 20", h: "Chợ Đồng Xuân", p: "Ngôi chợ lớn của khu phố, nơi tiếng ồn của cả khu hội tụ.", tip: "Bún chả hoặc bánh mì", pt: [660, 138] },
  { t: "+2 giờ 50", h: "Ô Quan Chưởng", p: "Dừng chân ở cửa ô cuối cùng, nhìn ra phía sông.", tip: "Nghỉ chân", pt: [858, 150] },
];

$("#stops").innerHTML = STOPS.map(
  (s, i) => `<li class="stop${i === 0 ? " on" : ""}" data-i="${i}"><span class="dot"></span>
    <p class="t">${s.t}</p><h3 class="cond">${s.h}</h3><p>${s.p}</p><span class="tip">Gợi ý: ${s.tip}</span></li>`,
).join("");

(() => {
  // a small copy of the map: the lake, the river, every street faint, the route bright
  const T = ([x, y]) => [((x - 280) * 0.6).toFixed(1), ((y - 100) * 0.6).toFixed(1)];
  const poly = (pts) => pts.map((p, i) => `${i ? "L" : "M"}${T(p).join(" ")}`).join(" ");
  let s = `<rect width="400" height="360" fill="#340509"/><rect width="400" height="360" fill="url(#dots)"/>`;
  s += `<path d="${poly([[930, 100], [950, 340], [930, 520], [952, 680]])} V360 H400 V0 H${T([930, 100])[0]}Z" fill="url(#hatch)" stroke="#f0be6b" stroke-opacity=".35"/>`;
  s += `<path d="M${T([590, 560]).join(" ")}C${T([600, 530]).join(" ")} ${T([660, 520]).join(" ")} ${T([720, 530]).join(" ")}C${T([790, 540]).join(" ")} ${T([820, 580]).join(" ")} ${T([790, 620]).join(" ")}C${T([760, 655]).join(" ")} ${T([660, 660]).join(" ")} ${T([610, 625]).join(" ")}Z" fill="url(#hatch)" stroke="#f0be6b" stroke-opacity=".5"/>`;
  STREETS.forEach((st) => (s += `<path d="${poly(st.pts)}" fill="none" stroke="#f0be6b" stroke-opacity=".28" stroke-width="2" stroke-linecap="round"/>`));
  s += `<path class="rt" d="${poly(STOPS.map((x) => x.pt))}"/>`;
  STOPS.forEach((st, i) => {
    const [x, y] = T(st.pt);
    s += `<circle class="rtd${i === 0 ? " on" : ""}" data-i="${i}" cx="${x}" cy="${y}" r="5.5"/>`;
  });
  const [x0, y0] = T(STOPS[0].pt);
  s += `<circle class="me" id="me" cx="${x0}" cy="${y0}" r="8"/>`;
  $("#miniMap").innerHTML = s;
  $("#miniLbl").textContent = `1 / ${STOPS.length} · ${STOPS[0].h}`;

  const stops = $$(".stop");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const i = +e.target.dataset.i;
        stops.forEach((el, k) => el.classList.toggle("on", k <= i));
        $$(".rtd").forEach((d, k) => d.classList.toggle("on", k <= i));
        const [x, y] = T(STOPS[i].pt);
        $("#me").setAttribute("cx", x);
        $("#me").setAttribute("cy", y);
        $("#miniLbl").textContent = `${i + 1} / ${STOPS.length} · ${STOPS[i].h}`;
      });
    },
    { rootMargin: "-40% 0px -45% 0px" },
  );
  stops.forEach((el) => io.observe(el));
})();

/* ───────────────────────────── the ruler along the top ───────────────────────────── */

(() => {
  const links = $$("#ruler a");
  const secs = links.map((a) => $(a.getAttribute("href")));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === `#${e.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  secs.forEach((s) => io.observe(s));
  links[0].classList.add("on");
})();

$("#snd").addEventListener("click", (e) => {
  const b = e.currentTarget;
  b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") !== "true");
});
