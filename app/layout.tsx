import type { Metadata, Viewport } from "next";
import { Archivo, Be_Vietnam_Pro } from "next/font/google";
import Preloader from "./_components/preloader/Preloader";
import Rail from "./_components/rail/Rail";
import DishSprite from "./_components/dishes/DishSprite";
import "./globals.css";

// Archivo's width axis drives the extended display type ("wdth" 70–125).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext", "vietnamese"],
  axes: ["wdth"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const TITLE = "Mâm Cơm Tết · The Vietnamese new-year feast tray";
const DESCRIPTION =
  "An illustrated guide to the Tết feast tray: eight dishes set one at a time, how the tray changes from the 23rd to the 7th, the five fruits, and what to know if you are invited.";

export const metadata: Metadata = {
  title: { default: TITLE, template: "%s · Mâm Cơm Tết" },
  description: DESCRIPTION,
  applicationName: "Mâm Cơm Tết",
  keywords: [
    "Tết",
    "mâm cơm Tết",
    "Vietnamese New Year",
    "Tet feast",
    "mâm ngũ quả",
    "bánh chưng",
    "lì xì",
    "Vietnamese culture",
  ],
  openGraph: {
    type: "website",
    siteName: "Mâm Cơm Tết",
    title: TITLE,
    description: DESCRIPTION,
    locale: "vi_VN",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#2a0307",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${beVietnamPro.variable}`}
    >
      <body>
        <Preloader />
        <DishSprite />
        <Rail />
        {children}
      </body>
    </html>
  );
}
