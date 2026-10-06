"use client";

// ============================================================================
// BƯỚC 7: THANH TIẾN ĐỘ dưới hàng thẻ, cho biết đã cuộn được bao xa.
//
// So với Step6.tsx, bước này thêm (tìm các dấu ⬇):
//   ⬇ 1. import useEffect
//   ⬇ 2. state `pct`: độ rộng thanh vàng, tính theo %
//   ⬇ 3. onScroll cập nhật pct
//   ⬇ 4. useEffect + ResizeObserver: cập nhật pct lúc mới hiện và khi đổi cỡ cửa sổ
//   ⬇ 5. JSX của thanh (CSS .bar có sẵn trong Days.module.css)
// ============================================================================

import { useEffect, useRef, useState } from "react"; // ⬇ 1. thêm useEffect
import DayIcon from "../DayIcon";
import type { Day } from "../data";
import styles from "../Days.module.css";
import row from "./Step2.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

const LOCK_MS = 300;
const LOCK_RENEW_MS = 150;

export default function Step7({ days }: { days: Day[] }) {
  const rowRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(() => Math.max(0, days.findIndex((d) => d.hot)));
  const lockUntil = useRef(0);

  // ⬇ 2. Độ rộng thanh vàng, đơn vị %. Bắt đầu ở 20 (thẻ đầu, chưa cuộn).
  //   Là STATE (không phải ref) vì khi nó đổi, thanh PHẢI được vẽ lại.
  const [pct, setPct] = useState(20);

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

    // ⬇ 3. Cập nhật thanh tiến độ MỖI LẦN cuộn, kể cả đang bị khóa.
    //   Vì thế dòng này nằm TRƯỚC đoạn kiểm tra khóa: khóa chỉ chặn việc đổi `active`,
    //   còn thanh tiến độ vẫn phải chạy mượt trong lúc hàng trượt.
    //
    //   max = đoạn cuộn tối đa có thể (cuộn hết cỡ thì scrollLeft = max)
    //   scrollLeft / max = đã cuộn bao nhiêu phần: 0 (đầu) ... 1 (cuối)
    //   20 + 80 * phần   = chạy từ 20% tới 100% (luôn chừa sẵn 20% để thanh không trống)
    //   max <= 0         = không có gì để cuộn (màn hình rất rộng) -> thanh đầy 100%
    const max = row.scrollWidth - row.clientWidth;
    setPct(max > 0 ? 20 + 80 * (row.scrollLeft / max) : 100);

    const now = Date.now();
    if (now <= lockUntil.current) {
      lockUntil.current = now + LOCK_RENEW_MS;
      return;
    }
    setActive(nearestCard());
  };

  // ⬇ 4. useEffect: chạy một đoạn code SAU KHI component hiện ra trên trang.
  //   Cần dùng ở đây vì ta phải đợi <ol> tồn tại (rowRef.current khác null) mới đo được.
  //
  //   Vì sao cần cái này khi đã có onScroll? onScroll chỉ chạy khi CUỘN. Còn:
  //     - lúc trang mới hiện ra (chưa ai cuộn), thanh phải ra đúng giá trị
  //     - khi người dùng kéo giãn/thu hẹp cửa sổ, `max` đổi, thanh phải tính lại
  //   ResizeObserver là "camera giám sát kích thước": hễ phần tử đổi cỡ thì gọi hàm.
  //   Điểm hay: ngay khi bắt đầu observe(), nó báo MỘT LẦN đầu tiên luôn,
  //   nên một cơ chế lo được cả hai việc trên.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const ro = new ResizeObserver(() => {
      const max = row.scrollWidth - row.clientWidth;
      setPct(max > 0 ? 20 + 80 * (row.scrollLeft / max) : 100);
    });
    ro.observe(row);
    // Hàm trả về ở cuối useEffect = dọn dẹp, chạy khi component bị gỡ khỏi trang.
    // Không dọn thì "camera" vẫn chạy mãi và rò rỉ bộ nhớ.
    return () => ro.disconnect();
  }, []); // [] = chỉ chạy MỘT lần sau lần hiện đầu tiên

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
        className={row.row}
        ref={rowRef}
        onScroll={onScroll}
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
          <li key={d.n} onClick={() => focusCard(i)}>
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

      {/* ⬇ 5. Thanh tiến độ. Khung ngoài (.bar) là đường mờ, <i> bên trong là phần vàng.
            style={{ width: ... }} là cách đặt một giá trị TÍNH TOÁN vào CSS:
            width đổi theo pct, và `transition: width 0.2s` trong CSS làm nó chạy mượt.
            aria-hidden: thanh chỉ để trang trí, trình đọc màn hình bỏ qua. */}
      <div className="wrap">
        <div className={styles.bar} aria-hidden="true">
          <i style={{ width: `${pct}%` }} />
        </div>
      </div>
    </>
  );
}
