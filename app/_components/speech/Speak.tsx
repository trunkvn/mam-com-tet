"use client";

import { useEffect, useRef, useState } from "react";
import { audioUrl, spokenOf } from "./phrases";
import styles from "./Speak.module.css";

type State = "idle" | "playing" | "unavailable";

// Only one thing speaks at a time: starting a new one stops whichever was playing.
let stopCurrent: (() => void) | null = null;

// A recording is fetched when its button is first pointed at or focused, so the click plays at once.
const cache = new Map<string, HTMLAudioElement>();
const audioFor = (src: string) => {
  let a = cache.get(src);
  if (!a) {
    a = new Audio(src);
    a.preload = "auto";
    cache.set(src, a);
  }
  return a;
};

/** The browser's own Vietnamese voice, if it has one. Another language's voice would teach the wrong sounds. */
const vietnameseVoice = () =>
  window.speechSynthesis
    .getVoices()
    .find((v) => v.lang.toLowerCase().replace("_", "-").startsWith("vi"));

/**
 * A small speaker button: plays how a Vietnamese word is said, tones and all.
 * It plays the recording in /public/audio/vi, and falls back to the browser's Vietnamese voice
 * when there is none. If neither works, the button says so rather than playing the wrong sounds.
 */
export default function Speak({ text }: { text: string }) {
  const [state, setState] = useState<State>("idle");
  const alive = useRef(true);
  const mine = useRef<(() => void) | null>(null);
  const said = spokenOf(text);

  const set = (s: State) => {
    if (alive.current) setState(s);
  };

  useEffect(() => {
    alive.current = true;
    // some browsers only list their voices after the first ask
    if ("speechSynthesis" in window) window.speechSynthesis.getVoices();
    return () => {
      alive.current = false;
      if (mine.current && stopCurrent === mine.current) stopCurrent();
    };
  }, []);

  const speakWithBrowser = () => {
    if (!("speechSynthesis" in window)) return false;
    const voice = vietnameseVoice();
    if (!voice) return false;
    const u = new SpeechSynthesisUtterance(said);
    u.voice = voice;
    u.lang = voice.lang;
    u.rate = 0.85; // a little slower than talk, for someone learning the tones
    u.onend = () => set("idle");
    u.onerror = () => set("idle");
    const stop = () => {
      window.speechSynthesis.cancel();
      set("idle");
    };
    mine.current = stopCurrent = stop;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    set("playing");
    return true;
  };

  const play = () => {
    if (state === "playing") {
      stopCurrent?.();
      return;
    }
    stopCurrent?.();

    const a = audioFor(audioUrl(text));
    const stop = () => {
      a.pause();
      a.currentTime = 0;
      set("idle");
    };
    // a file that will not load reports it twice (the error event and the rejected play), so
    // only the first report is acted on
    let failed = false;
    const fallBack = () => {
      if (failed) return;
      failed = true;
      stop();
      if (!speakWithBrowser()) set("unavailable");
    };
    a.onended = () => set("idle");
    a.onerror = fallBack;
    mine.current = stopCurrent = stop;
    a.currentTime = 0;
    set("playing");
    a.play().catch(fallBack);
  };

  return (
    <button
      type="button"
      className={styles.speak}
      data-state={state}
      disabled={state === "unavailable"}
      onClick={play}
      onPointerEnter={() => audioFor(audioUrl(text))}
      onFocus={() => audioFor(audioUrl(text))}
      aria-label={
        state === "unavailable"
          ? `No Vietnamese audio is available for “${said}”`
          : `Hear “${said}” in Vietnamese`
      }
      title={state === "unavailable" ? "No Vietnamese audio is available here" : "Hear it"}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path className={styles.cone} d="M2 6v4h2.6L8 13V3L4.6 6z" />
        <path className={styles.w1} d="M10.3 5.9a3 3 0 0 1 0 4.2" />
        <path className={styles.w2} d="M12.2 4a5.6 5.6 0 0 1 0 8" />
      </svg>
    </button>
  );
}
