"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NOTIFICATIONS, getNotificationEmoji } from "@/lib/quiz-data";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";

interface NotificationItem {
  id: number;
  name: string;
  city: string;
  percent: number;
  x: number; // viewport % center x
  y: number; // viewport % center y
}

interface HeroScreenProps {
  onStart: () => void;
}

// Word-by-word stagger timing
const WORD_DELAY_START = 0.18;
const WORD_STAGGER = 0.11;
const TITLE_WORDS_1 = ["Every", "Muslim", "has", "a"];
const TITLE_WORDS_2 = ["Halal", "Haram", "Ratio"];
const TOTAL_WORDS = TITLE_WORDS_1.length + TITLE_WORDS_2.length;
// Last word settles at ~0.18 + 6*0.11 + 0.3 ≈ 1.14s, phase 2 at 1.55s
const PHASE_2_AT = 1550;

export default function HeroScreen({ onStart }: HeroScreenProps) {
  const [phase, setPhase] = useState<1 | 2>(1);
  const [toasts, setToasts] = useState<NotificationItem[]>([]);
  const counterRef = useRef(0);
  const notifIndexRef = useRef(0);
  const shuffledRef = useRef([...NOTIFICATIONS].sort(() => Math.random() - 0.5));
  const confettiRef = useRef<ConfettiRef>(null);

  // Phase 2 transition + confetti
  const confettiFiredRef = useRef(false);
  useEffect(() => {
    const phaseTimer = setTimeout(() => setPhase(2), PHASE_2_AT);

    if (confettiFiredRef.current) return () => clearTimeout(phaseTimer);
    confettiFiredRef.current = true;

    const t1 = setTimeout(() => {
      confettiRef.current?.fire({
        particleCount: 130,
        spread: 70,
        angle: 45,
        origin: { x: 0, y: 0.6 },
        startVelocity: 50,
        colors: ["#d4a843", "#e8c06a", "#c47c10", "#f5f0e8", "#22c55e", "#ef4444"],
        gravity: 0.85,
        scalar: 0.75,
        decay: 0.93,
      });
      setTimeout(() => {
        confettiRef.current?.fire({
          particleCount: 130,
          spread: 70,
          angle: 135,
          origin: { x: 1, y: 0.6 },
          startVelocity: 50,
          colors: ["#d4a843", "#e8c06a", "#c47c10", "#f5f0e8", "#22c55e", "#ef4444"],
          gravity: 0.85,
          scalar: 0.75,
          decay: 0.93,
        });
      }, 120);
    }, 600);

    return () => {
      clearTimeout(phaseTimer);
      clearTimeout(t1);
    };
  }, []);

  // Toast system
  useEffect(() => {
    const add = () => {
      const notif = shuffledRef.current[notifIndexRef.current % shuffledRef.current.length];
      notifIndexRef.current++;
      const id = counterRef.current++;
      // Alternate sides so toasts hug the edges and don't fully block content
      const onLeft = id % 2 === 0;
      const x = onLeft ? 3 + Math.random() * 18 : 79 + Math.random() * 18; // 3–21% or 79–97%
      // Avoid the center band (30–65%) where the main title and button live
      const y = Math.random() < 0.5 ? 5 + Math.random() * 20 : 68 + Math.random() * 22; // top 5–25% or bottom 68–90%
      setToasts((prev) => [...prev, { id, ...notif, x, y }].slice(-4));
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5000);
    };
    const t = setTimeout(add, 1200);
    const iv = setInterval(add, 3200);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, []);

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center px-6 overflow-hidden bg-void">
      {/* Confetti canvas - full viewport */}
      <Confetti
        ref={confettiRef}
        manualstart
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 60 }}
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,168,67,0.09) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(180,110,15,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Main content block */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">

        {/* Title - layout-animated: moves up when phase-2 content appears below */}
        <motion.div
          layout
          transition={{ layout: { duration: 0.7, ease } }}
          className="text-center"
        >
          <h1 className="text-[2.6rem] leading-[1.12] font-black text-text tracking-tight">
            {TITLE_WORDS_1.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: WORD_DELAY_START + i * WORD_STAGGER, duration: 0.28 }}
                className="inline"
              >
                {word}{" "}
              </motion.span>
            ))}
            {TITLE_WORDS_2.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: WORD_DELAY_START + (TITLE_WORDS_1.length + i) * WORD_STAGGER,
                  duration: 0.28,
                }}
                style={{
                  background: "linear-gradient(135deg, #d4a843 0%, #e8c06a 50%, #d4a843 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                className="inline"
              >
                {word}{i < TITLE_WORDS_2.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Phase-2 content - mounts after title settles, pushing title up via layout */}
        <AnimatePresence>
          {phase === 2 && (
            <motion.div
              key="phase2"
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.01 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.55, ease }}
                className="mt-10 w-full"
              >
                <motion.button
                  onClick={onStart}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.1 }}
                  className="w-full py-4 px-8 rounded-full text-void text-lg font-bold tracking-tight cursor-pointer select-none"
                  style={{
                    background: "linear-gradient(135deg, #d4a843 0%, #e8c06a 60%, #d4a843 100%)",
                    boxShadow: "0 0 40px rgba(212,168,67,0.25), 0 4px 20px rgba(0,0,0,0.4)",
                  }}
                >
                  Calculate yours  📌
                </motion.button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.55, ease }}
                className="mt-5 text-sm font-semibold text-text-muted"
              >
                Takes 2 minutes. No judgment... kinda.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast notifications - scattered across the viewport */}
      <div className="fixed inset-0 pointer-events-none z-20">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.28 } }}
              transition={{ duration: 0.4, ease }}
              style={{
                position: "absolute",
                left: `${toast.x}%`,
                top: `${toast.y}%`,
                transform: "translateX(-50%)",
                width: "210px",
                background: "rgba(12,9,3,0.45)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 4px 18px rgba(0,0,0,0.22)",
                borderRadius: "16px",
              }}
              className="px-3 py-2.5 flex items-center gap-2.5"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0"
                style={{ background: "rgba(212,168,67,0.14)" }}
              >
                {getNotificationEmoji(toast.percent)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-text truncate">
                  {toast.name} from {toast.city}
                </p>
                <p className="text-[11px] font-medium text-text-secondary">
                  just got{" "}
                  <span style={{ color: "#d4a843", fontWeight: 700 }}>{toast.percent}%</span>{" "}
                  {getNotificationEmoji(toast.percent)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
