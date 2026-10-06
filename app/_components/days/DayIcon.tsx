import type { DayIcon as Key } from "./data";

// Simple line icons on a 64-unit grid, drawn in whatever colour the parent sets.
const PATHS: Record<Key, React.ReactNode> = {
  carp: (
    <>
      <path d="M8 32c8-14 26-14 36 0c-10 14-28 14-36 0Z" />
      <path d="M44 32l12-9v18z" />
      <circle cx="18" cy="30" r="1.8" />
      <path d="M28 24c4 4 4 12 0 16" />
    </>
  ),
  tray: (
    <>
      <circle cx="32" cy="32" r="22" />
      <circle cx="32" cy="32" r="6" />
      <circle cx="32" cy="15" r="3" />
      <circle cx="47" cy="40" r="3" />
      <circle cx="17" cy="40" r="3" />
    </>
  ),
  bowl: (
    <>
      <path d="M10 32h44c0 14-10 24-22 24S10 46 10 32Z" />
      <path d="M24 56v4h16v-4" />
      <path d="M44 6L30 28M51 10L37 31" />
    </>
  ),
  ingot: (
    <>
      <path d="M8 34h48l-8 14H16Z" />
      <path d="M16 34c0-9 8-14 16-14s16 5 16 14" />
      <path d="M24 41h16" />
    </>
  ),
  pole: (
    <>
      <path d="M32 58V8" />
      <path d="M32 10c10 0 14 4 18 8c-6 2-12 2-18-2Z" />
      <path d="M22 54h20" />
      <circle cx="32" cy="8" r="2" />
    </>
  ),
};

export default function DayIcon({ name }: { name: Key }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
