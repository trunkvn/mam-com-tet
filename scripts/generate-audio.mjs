#!/usr/bin/env node
// Makes public/audio/vi/*.m4a: one short recording for every Vietnamese name and wish on the page,
// read by the macOS Vietnamese voice "Linh".
//
//   pnpm audio            make the recordings that are missing
//   pnpm audio --force    make them all again
//
// macOS only (it uses `say` and `afconvert`). These are machine voices. A recording by a person,
// saved as public/audio/vi/<same file name>.m4a, replaces the machine one with no code change:
// the page plays the file, and only falls back to the browser's own voice if there is none.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { DAYS } from "../app/_components/days/data.ts";
import { TRAY_REGIONS } from "../app/_components/dishes/data.ts";
import { WISHES } from "../app/_components/closer/data.ts";
import { FRUIT_REGIONS } from "../app/_components/fruits/data.ts";
import { RECIPES } from "../app/_components/recipes/data.ts";
import { PHRASES, fileOf, spokenOf } from "../app/_components/speech/phrases.ts";

const VOICE = "Linh";
const RATE = "150"; // words a minute: a little slower than usual, for someone learning the tones
const out = fileURLToPath(new URL("../public/audio/vi/", import.meta.url));
const force = process.argv.includes("--force");

// Every string the page offers a speaker button for.
const all = [
  ...TRAY_REGIONS.flatMap((r) => [...r.dishes.map((d) => d.vi), ...r.beside.map((b) => b.vi)]),
  ...DAYS.map((d) => d.vi),
  ...FRUIT_REGIONS.flatMap((r) => r.fruits.map((f) => f.vi)),
  ...RECIPES.map((r) => r.vi),
  ...WISHES.map((w) => w.vi),
  PHRASES.newYear,
  PHRASES.welcome,
  PHRASES.gratitude,
  ...PHRASES.rites,
];

// One recording per distinct thing said.
const phrases = new Map();
for (const text of all) phrases.set(spokenOf(text), text);

try {
  execFileSync("say", ["-v", VOICE, "--", "."], { stdio: "ignore" });
} catch {
  console.error(`The macOS voice "${VOICE}" is not available. Install it in System Settings > Accessibility > Spoken Content.`);
  process.exit(1);
}

mkdirSync(out, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "tet-audio-"));
let made = 0;
let kept = 0;

for (const [spoken, text] of phrases) {
  const file = join(out, `${fileOf(text)}.m4a`);
  if (existsSync(file) && !force) {
    kept++;
    continue;
  }
  const aiff = join(tmp, "say.aiff");
  execFileSync("say", ["-v", VOICE, "-r", RATE, "-o", aiff, "--", spoken]);
  execFileSync("afconvert", ["-f", "m4af", "-d", "aac", "-b", "48000", aiff, file]);
  made++;
  console.log(`  ${spoken.padEnd(34)} ${statSync(file).size} bytes`);
}

rmSync(tmp, { recursive: true, force: true });
console.log(`\n${phrases.size} phrases: ${made} made, ${kept} already there.`);
