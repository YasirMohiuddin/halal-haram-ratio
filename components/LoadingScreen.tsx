"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LOADING_MESSAGES } from "@/lib/quiz-data";

interface LoadingScreenProps {
  targetRatio: number;
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1100);

    // After cycling through messages, trigger the reveal
    const done = setTimeout(() => {
      clearInterval(interval);
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, 7700);

    return () => {
      clearInterval(interval);
      clearTimeout(done);
    };
  }, [onComplete]);

  const emojiFloat = {
    animate: {
      y: [0, -12, 0],
      rotate: [0, 8, -8, 0],
      transition: {
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-void px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(180,110,15,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div variants={emojiFloat} animate="animate" className="text-7xl mb-10">
          📿
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-semibold text-text-secondary max-w-xs leading-snug"
          >
            {LOADING_MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>

        <div className="mt-10 flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#d4a843" }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
