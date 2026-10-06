"use client";

// ============================================================================
// BƯỚC 8 (cuối): KÉO HÀNG BẰNG CHUỘT.
//
// Màn hình cảm ứng tự cuộn được bằng ngón tay. Chuột trên desktop thì không:
// giữ chuột rồi kéo không làm gì cả. Bước này tự làm hành vi đó.
// Làm xong bước này, component giống hệt Days.tsx thật.
//
// So với Step7.tsx, bước này thêm (tìm các dấu ⬇):
//   ⬇ 1. hai hằng số: DRAG_THRESHOLD, SETTLE_MS
//   ⬇ 2. state `drag` với 3 trạng thái, và ref `suppressClick`
//   ⬇ 3. onScroll chỉ đổi active khi drag === "idle"
//   ⬇ 4. onPointerDown: toàn bộ logic kéo
//   ⬇ 5. gắn class theo trạng thái drag, gắn onPointerDown và onDragStart vào <ol>
// CSS: ba class .grab / .holding / .settling ở cuối Step2.module.css.
// ============================================================================

import { useEffect, useRef, useState } from "react";
import DayIcon from "../DayIcon";
import type { Day } from "../data";
import styles from "../Days.module.css";
import row from "./Step2.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

// ⬇ 1.
// DRAG_THRESHOLD: chuột xê dịch ít hơn 5px thì vẫn tính là CLICK, không phải kéo.
//   Tay người luôn run nhẹ khi bấm chuột; không có ngưỡng này thì mọi cú click
//   đều bị coi là kéo và không chọn được thẻ.
// SETTLE_MS: sau khi thả chuột, giữ snap tắt thêm 700ms cho hàng kịp trượt về thẻ.
const DRAG_THRESHOLD = 5;
const SETTLE_MS = 700;

const LOCK_MS = 300;
const LOCK_RENEW_MS = 150;

export default function Step8({ days }: { days: Day[] }) {
  const rowRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(() => Math.max(0, days.findIndex((d) => d.hot)));
  const lockUntil = useRef(0);
  const [pct, setPct] = useState(20);

  // ⬇ 2a. Trạng thái kéo, một trong ba giá trị:
  //   "idle"     : bình thường, không kéo
  //   "holding"  : đang giữ chuột và kéo
  //   "settling" : vừa thả chuột, hàng đang trượt về thẻ gần nhất
  // Dùng STATE vì mỗi trạng thái cần một class CSS khác -> phải vẽ lại.
  const [drag, setDrag] = useState<"idle" | "holding" | "settling">("idle");

  // ⬇ 2b. Cờ "bỏ qua click kế tiếp". Dùng REF vì chỉ cần đọc lại, không cần vẽ lại.
  // Lý do: sau khi kéo xong và thả chuột, trình duyệt VẪN bắn một sự kiện click vào
  // thẻ đang nằm dưới con trỏ. Không chặn thì thẻ đó bị chọn nhầm.
  const suppressClick = useRef(false);

  const cards = () => Array.from(rowRef.current?.children ?? []) as HTMLElement[];

  const padLeft = () => {
    const row = rowRef.current;
    const first = row?.firstElementChild as HTMLElement | null | undefined;
    if (!row || !first) return 0;
    return row.scrollLeft + first.getBoundingClientRect().left - row.getBoundingClientRect().left;
  };

  const scrollTarget = (i: number) => {
    const row = rowRef.current;
    const card = cards()[i];
    if (!row || !card) return 0;
    const left = row.scrollLeft + (card.getBoundingClientRect().left - row.getBoundingClientRect().left) - padLeft();
    return Math.min(Math.max(left, 0), row.scrollWidth - row.clientWidth);
  };

  const nearestCard = () => {
    const row = rowRef.current;
    if (!row) return 0;
    const edge = row.getBoundingClientRect().left + padLeft();
    let best = 0;
    let bestDist = Infinity;
    cards().forEach((c, i) => {
      const dist = Math.abs(c.getBoundingClientRect().left - edge);
      if (dist < bestDist) {
        best = i;
        bestDist = dist;
      }
    });
    return best;
  };

  const focusCard = (i: number) => {
    const row = rowRef.current;
    if (!row) return;
    const index = Math.min(Math.max(i, 0), days.length - 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lockUntil.current = Date.now() + LOCK_MS;
    setActive(index);
    row.scrollTo({ left: scrollTarget(index), behavior: reduce ? "auto" : "smooth" });
  };

  const onScroll = () => {
    const row = rowRef.current;
    if (!row) return;
    const max = row.scrollWidth - row.clientWidth;
    setPct(max > 0 ? 20 + 80 * (row.scrollLeft / max) : 100);
    const now = Date.now();
    if (now <= lockUntil.current) {
      lockUntil.current = now + LOCK_RENEW_MS;
      return;
    }
    // ⬇ 3. Chỉ đổi active theo thẻ gần nhất khi KHÔNG đang kéo chuột.
    //   Đang kéo ("holding"), việc chọn thẻ để lúc thả chuột mới quyết định (xem `up` bên dưới).
    //   Nếu để active nhảy lung tung theo tay kéo thì viền vàng chớp liên tục.
    if (drag === "idle") setActive(nearestCard());
  };

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const ro = new ResizeObserver(() => {
      const max = row.scrollWidth - row.clientWidth;
      setPct(max > 0 ? 20 + 80 * (row.scrollLeft / max) : 100);
    });
    ro.observe(row);
    return () => ro.disconnect();
  }, []);

  // ⬇ 4. NHẤN CHUỘT XUỐNG trên hàng: bắt đầu một lần kéo tiềm năng.
  const onPointerDown = (e: React.PointerEvent<HTMLOListElement>) => {
    // "Pointer event" gộp chuột, ngón tay, bút vào một loại sự kiện.
    // Chạm và bút đã tự cuộn được, nên CHỈ xử lý chuột (pointerType "mouse")
    // và chỉ nút trái (button 0), tránh xung đột với cuộn có sẵn.
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const row = rowRef.current;
    if (!row) return;

    // Ghi nhớ điểm xuất phát của lần kéo này. Đây là biến thường (let/const trong hàm),
    // không phải state: chỉ sống trong lần kéo này, vẽ lại giao diện cũng chẳng cần.
    const startX = e.clientX; // chuột đang ở đâu (theo trục ngang) lúc nhấn xuống
    const startLeft = row.scrollLeft; // hàng đang cuộn tới đâu lúc nhấn xuống
    let moved = false; // đã xê dịch quá ngưỡng chưa? (phân biệt kéo với click)
    setDrag("holding"); // -> class .holding: tắt snap, con trỏ thành bàn tay nắm

    // Chuột di chuyển: cuộn hàng theo.
    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - startX; // chuột đã đi ngang bao nhiêu px kể từ lúc nhấn
      if (Math.abs(dx) > DRAG_THRESHOLD) moved = true;
      // Kéo chuột sang PHẢI (dx > 0) thì nội dung đi sang phải = scrollLeft GIẢM.
      // Vì vậy là `startLeft - dx` (trừ), giống như đang kéo một tờ giấy dưới tay.
      row.scrollLeft = startLeft - dx;
    };

    // Thả chuột: kết thúc lần kéo.
    const up = () => {
      // Gỡ ba listener đã đăng ký, nếu không chúng chạy mãi và chồng chất mỗi lần kéo.
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);

      if (moved) {
        // Là một lần KÉO thật.
        // (a) chặn cú click mà trình duyệt sắp bắn (xem suppressClick ở trên).
        //     setTimeout 0 = tắt cờ ngay sau khi click đó đã bị bỏ qua.
        suppressClick.current = true;
        setTimeout(() => (suppressClick.current = false), 0);
        // (b) chuyển sang "settling": vẫn tắt snap để animation trượt không bị chen ngang
        setDrag("settling");
        // (c) trượt về thẻ gần nhất, đồng thời chọn thẻ đó làm active
        focusCard(nearestCard());
        // (d) sau 700ms, trượt chắc đã xong -> về "idle", snap bật lại.
        //     Hàng lúc này đã nằm đúng chỗ thẻ nên bật snap không gây giật.
        setTimeout(() => setDrag("idle"), SETTLE_MS);
      } else {
        // Chuột gần như đứng yên = một cú CLICK. Không làm gì thêm: onClick của <li> sẽ lo.
        setDrag("idle");
      }
    };

    // Đăng ký trên `window` chứ không phải trên <ol>: khi đang kéo, chuột có thể
    // vọt ra ngoài khung hàng, mà ta vẫn muốn bắt được chuyển động và cú thả chuột.
    // pointercancel: trình duyệt hủy giữa chừng (ví dụ cửa sổ mất focus) -> coi như thả.
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  return (
    <>
      <div className={`wrap ${styles.controls}`}>
        <div className={styles.arrows} role="group" aria-label="Choose a day">
          <button
            type="button"
            onClick={() => focusCard(active - 1)}
            disabled={active === 0}
            aria-label="Previous day"
          >
            <svg viewBox="0 0 16 16">
              <path d="M10 2 4 8l6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => focusCard(active + 1)}
            disabled={active === days.length - 1}
            aria-label="Next day"
          >
            <svg viewBox="0 0 16 16">
              <path d="M6 2l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <ol
        // ⬇ 5a. Ghép class theo trạng thái:
        //   luôn có `row.row` và `row.grab` (bàn tay mở),
        //   thêm `holding` khi đang kéo, thêm `settling` khi đang trượt về thẻ.
        className={`${row.row} ${row.grab} ${drag === "holding" ? row.holding : ""} ${drag === "settling" ? row.settling : ""}`}
        ref={rowRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown} // ⬇ 5b. nhấn chuột xuống -> bắt đầu kéo
        // ⬇ 5c. Chặn tính năng "kéo thả" mặc định của trình duyệt (kéo chữ/hình ra khỏi trang),
        //       nếu không nó giành mất cú kéo của ta.
        onDragStart={(e) => e.preventDefault()}
        tabIndex={0}
        aria-label="Five days of Tết. Drag, or use the arrow keys, to move between them"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            focusCard(active + 1);
            e.preventDefault();
          }
          if (e.key === "ArrowLeft") {
            focusCard(active - 1);
            e.preventDefault();
          }
        }}
      >
        {days.map((d, i) => (
          <li
            key={d.n}
            onClick={() => {
              // ⬇ Click chỉ có tác dụng nếu KHÔNG phải cú click "ma" sau khi kéo
              if (!suppressClick.current) focusCard(i);
            }}
          >
            <article
              className={`${styles.day} ${i === active ? styles.active : ""}`}
              aria-current={i === active}
            >
              <p className={styles.m}>
                <span>{d.month}</span>
                <span>
                  {pad(i + 1)} / {pad(days.length)}
                </span>
              </p>
              <div className={styles.n}>{d.n}</div>
              <div className={styles.ic}>
                <DayIcon name={d.icon} />
              </div>
              {d.varies && (
                <p className={styles.tag} lang="en">
                  Date varies
                </p>
              )}
              <h3 lang="vi">{d.vi}</h3>
              <p className={styles.say} lang="en">
                say “{d.say}”
              </p>
              <p className={styles.en} lang="en">
                {d.en}
              </p>
              <p className={styles.body} lang="en">
                {d.body}
              </p>
              <ul className={styles.chips} lang="en" aria-label="On the tray">
                {d.chips.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              {d.note && (
                <p className={styles.note} lang="en">
                  {d.note}
                </p>
              )}
            </article>
          </li>
        ))}
      </ol>

      <div className="wrap">
        <div className={styles.bar} aria-hidden="true">
          <i style={{ width: `${pct}%` }} />
        </div>
      </div>
    </>
  );
}

// ============================================================================
// DÒNG THỜI GIAN của một lần kéo
//
//   nhấn chuột   -> setDrag("holding"): tắt snap. Ghi nhớ startX, startLeft.
//   di chuyển    -> mỗi lần: scrollLeft = startLeft - dx. Hàng đi theo tay.
//                   (onScroll chạy liên tục nhưng drag !== "idle" nên không đổi active)
//   thả chuột    -> setDrag("settling"), focusCard(nearestCard()): trượt về thẻ gần nhất
//   700ms sau    -> setDrag("idle"): bật lại snap. Mọi thứ về bình thường.
//
// Còn một lần "nhấn rồi thả mà không xê dịch" = click: moved = false,
// về "idle" ngay, và onClick của <li> chọn thẻ như bình thường.
// ============================================================================
