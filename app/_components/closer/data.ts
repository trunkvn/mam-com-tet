export type Wish = { vi: string; say: string; en: string };

export const WISHES: Wish[] = [
  { vi: "An khang", say: "ahn kahng", en: "peace and good health" },
  { vi: "Thịnh vượng", say: "tin vuh-ung", en: "prosperity" },
  { vi: "Vạn sự như ý", say: "vahn suh nyuh ee", en: "may everything go as you wish" },
  { vi: "Sức khỏe dồi dào", say: "suhk kweh zoy zow", en: "plenty of health" },
];

export type SourceGroup = { topic: string; items: { title: string; url: string }[] };

// Pages read while writing the text. Mostly Vietnamese press; English travel guides are the weakest
// and are used only for the guest courtesies. None of this replaces asking a family.
export const SOURCES: SourceGroup[] = [
  {
    topic: "The tray and its dishes",
    items: [
      { title: "Thanh Niên: Mâm cúng giao thừa 3 miền", url: "https://thanhnien.vn/mam-cung-giao-thua-3-mien-gom-nhung-gi-chuyen-gia-van-hoa-giai-dap-chi-tiet-185260215214612558.htm" },
      { title: "VnExpress: A tradition of feasting, 10 Vietnamese Tet meals", url: "https://e.vnexpress.net/news/food-recipes/a-tradition-of-feasting-10-vietnamese-tet-meals-4710174.html" },
      { title: "VietNamNet: Món ngon trong mâm cỗ Tết cổ truyền ở miền Bắc (4 bát 4 đĩa)", url: "https://vietnamnet.vn/mon-ngon-trong-mam-co-tet-co-truyen-o-mien-bac-2366323.html" },
      { title: "Tạp chí Công Thương: “No ba ngày Tết” với mâm cỗ ba miền", url: "https://tapchicongthuong.vn/no-ba-ngay-tet--voi-mam-co-ba-mien-116822.htm" },
      { title: "VietNamNet: Món ăn đặc trưng trong mâm cỗ Tết miền Trung", url: "https://vietnamnet.vn/nhung-mon-an-dac-trung-trong-mam-co-mien-trung-ngay-tet-nguyen-dan-2489557.html" },
      { title: "VietNamNet: Mâm cỗ ngày Tết miền Trung", url: "https://vietnamnet.vn/mam-co-ngay-tet-mien-trung-dip-tet-nguyen-dan-co-nhung-mon-ngon-nao-2101997.html" },
    ],
  },
  {
    topic: "Offered, then shared",
    items: [
      { title: "Soha: Thắp hương xong bao lâu thì hạ lễ và thụ lộc", url: "https://soha.vn/thap-huong-xong-bao-lau-thi-ha-le-thu-loc-198260528140310266.htm" },
      { title: "Kênh14: Có nên ăn đồ cúng ngay sau khi hạ lễ?", url: "https://kenh14.vn/co-nen-an-do-cung-ngay-sau-khi-ha-le-215260512190956689.chn" },
    ],
  },
  {
    topic: "Day by day",
    items: [
      { title: "Tuổi Trẻ: 6 nghi lễ thờ cúng ngày Tết", url: "https://tuoitre.vn/6-nghi-le-tho-cung-ngay-tet-co-y-nghia-ra-sao-20250125145703848.htm" },
      { title: "Dân sinh: Tục cúng gà lễ hóa vàng ngày mùng 3 Tết", url: "https://dansinh.dantri.com.vn/dien-dan-dan-sinh/tuc-cung-ga-le-hoa-vang-ngay-mung-3-tet-20230123191856000.htm" },
      { title: "1thegioi: Cúng mùng 3 tiễn ông bà, miền Tây", url: "https://1thegioi.vn/cung-mung-3-tien-ong-ba-mien-tay-viet-hoa-su-tich-thanh-phong-tuc-dep-246415.html" },
      { title: "VietNamNet: Lễ hạ nêu mùng 7 Tết", url: "https://vietnamnet.vn/le-ha-neu-mung-7-tet-nguyen-dan-la-gi-co-y-nghia-ra-sao-2487771.html" },
      { title: "Wikipedia: Tết", url: "https://en.wikipedia.org/wiki/T%E1%BA%BFt" },
    ],
  },
  {
    topic: "The five fruits",
    items: [
      { title: "Thanh Niên: Mâm ngũ quả “cầu dừa đủ xài”", url: "https://thanhnien.vn/mam-ngu-qua-cau-dua-du-xai-y-nghia-trai-cay-tren-ban-tho-ngay-tet-1851524134.htm" },
      { title: "Traveloka: Mâm ngũ quả miền Trung", url: "https://www.traveloka.com/vi-vn/explore/tips/mam-ngu-qua-mien-trung/412061" },
      { title: "Dân Việt: Cách bày mâm ngũ quả đúng chuẩn 3 miền", url: "https://danviet.vn/cach-bay-mam-ngu-qua-dung-chuan-3-mien-bac-trung-nam-cau-tai-loc-sung-tuc-binh-an-d1399793.html" },
    ],
  },
  {
    topic: "If you are invited, and the proverb",
    items: [
      { title: "Vietcetera: Lunar New Year celebration 101", url: "https://vietcetera.com/en/vietnam-survival-guide-lunar-new-year-celebration-101" },
      { title: "Hà Nội Mới: Nguồn gốc và ý nghĩa tục xông đất", url: "https://hanoimoi.vn/nguon-goc-va-y-nghia-tuc-xong-dat-dau-nam-658052.html" },
      { title: "VOH: Giải thích “lời chào cao hơn mâm cỗ”", url: "https://voh.com.vn/song-dep/loi-chao-cao-hon-mam-co-436057.html" },
    ],
  },
];
