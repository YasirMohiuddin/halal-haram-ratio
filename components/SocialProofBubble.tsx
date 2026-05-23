"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const BUBBLE_FILL = "#231b09";
const BUBBLE_BORDER = "rgba(212,168,67,0.28)";
const BUBBLE_TEXT = "#c9b56a";

interface SocialProofBubbleProps {
  line: string;
}

export default function SocialProofBubble({ line }: SocialProofBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, x: -6 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 1.75, duration: 0.5, ease }}
      className="absolute left-[calc(100%+1.35rem)] top-1/2 z-20 w-[9.75rem] -translate-y-1/2"
    >
      <div className="relative">
        {/* Tail outline */}
        <div
          className="pointer-events-none absolute left-0 top-1/2"
          style={{
            transform: "translate(-100%, -50%)",
            width: 0,
            height: 0,
            borderTop: "7px solid transparent",
            borderBottom: "7px solid transparent",
            borderRight: `8px solid ${BUBBLE_BORDER}`,
          }}
        />
        {/* Tail fill — inset to sit flush against the box */}
        <div
          className="pointer-events-none absolute left-0 top-1/2"
          style={{
            transform: "translate(calc(-100% + 1.5px), -50%)",
            width: 0,
            height: 0,
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
            borderRight: `7px solid ${BUBBLE_FILL}`,
          }}
        />

        <div
          className="rounded-2xl px-4 py-3.5 text-center text-[0.8125rem] font-bold leading-snug"
          style={{
            background: BUBBLE_FILL,
            border: `1.5px solid ${BUBBLE_BORDER}`,
            color: BUBBLE_TEXT,
          }}
        >
          {line}
        </div>
      </div>
    </motion.div>
  );
}
