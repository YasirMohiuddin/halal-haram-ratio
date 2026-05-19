"use client";

import { motion } from "framer-motion";

interface MirrorScreenProps {
  label: string;
  headline: string;
  subtext: string;
  onContinue: () => void;
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const WORD_START = 0.4;

function gapAfterWord(word: string): number {
  const letters = word.replace(/[^a-zA-Z]/g, "");
  const base = 0.06 + letters.length * 0.028;
  if (/[.!?]$/.test(word)) return base + 0.32;
  if (/[,;:]$/.test(word)) return base + 0.15;
  return base;
}

function buildDelays(words: string[]): number[] {
  return words.reduce<number[]>((acc, word, i) => {
    if (i === 0) return [WORD_START];
    return [...acc, acc[i - 1] + gapAfterWord(words[i - 1])];
  }, []);
}

export default function MirrorScreen({ label, headline, subtext, onContinue }: MirrorScreenProps) {
  const words = headline.split(" ");
  const delays = buildDelays(words);
  const lastDelay = delays[delays.length - 1] ?? WORD_START;
  const subtextDelay = lastDelay + gapAfterWord(words[words.length - 1]) + 0.1;
  const tapDelay = subtextDelay + 0.65;

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center bg-void relative cursor-pointer select-none"
      onClick={onContinue}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(196,124,16,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-5 px-8 max-w-[380px] text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease }}
          className="text-[10px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: "rgba(212,168,67,0.55)" }}
        >
          {label}
        </motion.p>

        <h2 className="text-[1.6rem] font-black text-text leading-snug">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delays[i], duration: 0.55, ease: "easeOut" }}
              className="inline-block"
              style={{ marginRight: i < words.length - 1 ? "0.25em" : 0 }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: subtextDelay, duration: 0.9, ease }}
          className="text-[14px] font-medium leading-relaxed"
          style={{ color: "rgba(242,242,247,0.45)" }}
        >
          {subtext}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: tapDelay, duration: 0.5 }}
          className="text-[11px] font-medium mt-16"
          style={{ color: "rgba(242,242,247,0.2)" }}
        >
          tap to continue
        </motion.p>
      </div>
    </div>
  );
}
