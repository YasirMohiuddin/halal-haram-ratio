"use client";

import { motion } from "framer-motion";

interface MirrorScreenProps {
  label: string;
  headline: string;
  subtext: string;
  onContinue: () => void;
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function MirrorScreen({ label, headline, subtext, onContinue }: MirrorScreenProps) {
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
          transition={{ delay: 0.35, duration: 0.5, ease }}
          className="text-[10px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: "rgba(212,168,67,0.55)" }}
        >
          {label}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease }}
          className="text-[1.6rem] font-black text-text leading-snug"
        >
          {headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.5, ease }}
          className="text-[14px] font-medium leading-relaxed"
          style={{ color: "rgba(242,242,247,0.45)" }}
        >
          {subtext}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="text-[11px] font-medium mt-16"
          style={{ color: "rgba(242,242,247,0.2)" }}
        >
          tap to continue
        </motion.p>
      </div>
    </div>
  );
}
