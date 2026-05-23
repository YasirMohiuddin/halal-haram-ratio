"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { trackEvent } from "@/lib/analytics";
import { motion, AnimatePresence } from "framer-motion";
import { Confetti, ConfettiRef } from "@/components/ui/confetti";
import { Archetype } from "@/lib/quiz-data";
import ShareCard from "@/components/ShareCard";
import SocialProofBubble from "@/components/SocialProofBubble";
import { buildSocialProofLine, getSocialProofPercentFromRatio } from "@/lib/social-proof";

type Phase = "gap" | "counting" | "revealing";

interface ResultsScreenProps {
  ratio: number;
  archetype: Archetype;
  onRetake?: () => void;
  demo?: boolean;
  socialProofLine?: string;
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const LUMO_APP_STORE_URL =
  "https://apps.apple.com/us/app/lumo-a-muslim-friend/id6757131632?ppid=74f7b080-b982-4d13-a220-6b1a0b504b5a";

export default function ResultsScreen({
  ratio,
  archetype,
  onRetake,
  demo = false,
  socialProofLine,
}: ResultsScreenProps) {
  const confettiRef = useRef<ConfettiRef>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("gap");
  const [displayRatio, setDisplayRatio] = useState(0);
  const [sharing, setSharing] = useState(false);
  const completedRef = useRef(false);

  const haramColor = "#ef4444";
  const halalColor = "#22c55e";
  const spectrumColor =
    ratio > 65 ? halalColor : ratio < 35 ? haramColor : "#d4a843";

  const fireConfetti = useCallback(() => {
    if (!confettiRef.current) return;

    if (ratio > 70) {
      confettiRef.current.fire({
        particleCount: 220,
        spread: 160,
        origin: { x: 0.5, y: 0.55 },
        startVelocity: 48,
        ticks: 220,
        gravity: 0.65,
        colors: ["#d4a843", "#22c55e", "#c47c10", "#e8c06a", "#a3e635"],
        shapes: ["circle"],
        scalar: 1.2,
      });
      confettiRef.current.fire({
        particleCount: 130,
        angle: 55,
        spread: 110,
        origin: { x: 0, y: 0.65 },
        startVelocity: 58,
        ticks: 200,
        gravity: 0.68,
        colors: ["#d4a843", "#22c55e", "#e8c06a"],
      });
      confettiRef.current.fire({
        particleCount: 130,
        angle: 125,
        spread: 110,
        origin: { x: 1, y: 0.65 },
        startVelocity: 58,
        ticks: 200,
        gravity: 0.68,
        colors: ["#c47c10", "#d4a843", "#e8c06a"],
      });
      setTimeout(() => {
        confettiRef.current?.fire({
          particleCount: 90,
          spread: 150,
          origin: { x: 0.5, y: 0.25 },
          startVelocity: 28,
          ticks: 180,
          gravity: 0.45,
          colors: ["#d4a843", "#22c55e", "#e8c06a", "#c47c10"],
        });
      }, 350);
    } else if (ratio >= 40) {
      confettiRef.current.fire({
        particleCount: 110,
        angle: 55,
        spread: 110,
        origin: { x: 0, y: 0.65 },
        startVelocity: 48,
        ticks: 180,
        gravity: 0.72,
        colors: ["#d4a843", "#e8c06a", "#22c55e"],
      });
      confettiRef.current.fire({
        particleCount: 110,
        angle: 125,
        spread: 110,
        origin: { x: 1, y: 0.65 },
        startVelocity: 48,
        ticks: 180,
        gravity: 0.72,
        colors: ["#d4a843", "#e8c06a", "#22c55e"],
      });
      setTimeout(() => {
        confettiRef.current?.fire({
          particleCount: 60,
          spread: 130,
          origin: { x: 0.5, y: 0.35 },
          startVelocity: 28,
          ticks: 150,
          gravity: 0.55,
          colors: ["#d4a843", "#e8c06a"],
        });
      }, 280);
    } else {
      confettiRef.current.fire({
        particleCount: 22,
        spread: 90,
        origin: { x: 0.5, y: 0.55 },
        startVelocity: 28,
        ticks: 130,
        gravity: 0.7,
        colors: ["#d4a843", "#22c55e"],
        scalar: 0.85,
      });
    }
  }, [ratio]);

  // Gap phase → counting phase
  useEffect(() => {
    const t = setTimeout(() => setPhase("counting"), 600);
    return () => clearTimeout(t);
  }, []);

  // Count-up when counting phase starts
  useEffect(() => {
    if (phase !== "counting") return;

    const duration = 1400;
    const start = performance.now();
    let raf: number;

    const frame = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayRatio(Math.round(eased * ratio));

      if (progress < 1) {
        raf = requestAnimationFrame(frame);
      } else {
        if (!completedRef.current) {
          completedRef.current = true;
          setTimeout(() => {
            setPhase("revealing");
            setTimeout(fireConfetti, 250);
          }, 450);
        }
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [phase, ratio, fireConfetti]);

  const handleShareInstagram = async () => {
    if (sharing || !shareCardRef.current) return;
    setSharing(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: "#08080f",
        scale: 1,
        useCORS: true,
        allowTaint: true,
        width: 1080,
        height: 1920,
        windowWidth: 1080,
        windowHeight: 1920,
      });

      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b!), "image/png")
      );
      const filename = `halal-haram-ratio-${ratio}pct.png`;
      const file = new File([blob], filename, { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] });
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("Share failed:", err);
      }
    } finally {
      setSharing(false);
    }
  };

  const handleOpenLumo = () => {
    trackEvent("lumo_cta_click", {
      ratio,
      archetype_name: archetype.name,
    });
    window.open(LUMO_APP_STORE_URL, "_blank", "noopener,noreferrer");
  };

  const resolvedSocialProofLine =
    socialProofLine ?? buildSocialProofLine(getSocialProofPercentFromRatio(ratio), "women");

  const RatioNumber = ({ value }: { value: number }) => (
    <div className="flex items-baseline gap-1.5 overflow-visible">
      <span
        className="inline-block text-[5.8rem] font-black leading-none tabular-nums"
        style={{
          letterSpacing: "-0.05em",
          background: `linear-gradient(135deg, ${spectrumColor} 0%, #d4a843 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </span>
      <span
        className="text-3xl font-black pb-3 shrink-0"
        style={{ color: "rgba(242,242,247,0.35)" }}
      >
        %
      </span>
    </div>
  );

  return (
    <div className="min-h-dvh flex flex-col bg-void overflow-x-visible overflow-y-hidden relative">
      <Confetti
        ref={confettiRef}
        manualstart
        className="fixed inset-0 w-full h-full pointer-events-none z-50"
      />

      <ShareCard ref={shareCardRef} ratio={ratio} archetype={archetype} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${spectrumColor}0a 0%, transparent 60%)`,
        }}
      />

      <AnimatePresence mode="sync">
        {/* Centered count-up */}
        {phase === "counting" && (
          <motion.div
            key="counting"
            className="fixed inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40, transition: { duration: 0.3, ease: "easeIn" } }}
            transition={{ duration: 0.4, ease }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease }}
            >
              <RatioNumber value={displayRatio} />
            </motion.div>
          </motion.div>
        )}

        {/* Full results layout */}
        {phase === "revealing" && (
          <motion.div
            key="revealing"
            className={`relative z-10 flex-1 flex flex-col items-center px-5 pb-8 overflow-x-visible overflow-y-auto ${
              demo ? "justify-center min-h-dvh py-8" : "pt-10"
            }`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {/* Number slides up from center */}
            <motion.div
              initial={{ opacity: 0, y: 220 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease }}
              className="mb-2 flex flex-col items-center w-full overflow-visible"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-xs font-semibold text-text-muted uppercase tracking-[0.2em] mb-3 text-center"
              >
                Your Halal Haram Ratio
              </motion.p>
              <div className="relative inline-flex items-center justify-center">
                <RatioNumber value={ratio} />
                {resolvedSocialProofLine && (
                  <SocialProofBubble line={resolvedSocialProofLine} />
                )}
              </div>
            </motion.div>

            {/* Rest of content stagger-reveals */}
            <motion.div
              className="w-full max-w-sm flex flex-col items-center"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55, ease }}
            >
              {/* Spectrum bar */}
              <div className="w-full mb-8">
                <div
                  className="relative w-full h-3 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${ratio}%` }}
                    transition={{ duration: 1.1, ease, delay: 0.45 }}
                    style={{
                      background: `linear-gradient(90deg, ${haramColor}, #d4a843 50%, ${halalColor})`,
                      backgroundSize: "100% 100%",
                      backgroundPositionX: `${-((1 - ratio / 100) * 100)}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs font-medium" style={{ color: haramColor + "99" }}>
                    Haram 🔥
                  </span>
                  <span className="text-xs font-medium" style={{ color: halalColor + "99" }}>
                    Halal 😇
                  </span>
                </div>
              </div>

              {/* Archetype card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease }}
                className="w-full rounded-2xl px-5 py-6 mb-6"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1.5px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex flex-col items-center gap-2 mb-3">
                  <span className="text-4xl">{archetype.emoji}</span>
                  <h2 className="text-xl font-black text-text leading-tight text-center">{archetype.name}</h2>
                </div>
                <p className="text-sm font-semibold text-text-secondary leading-relaxed text-center">
                  {archetype.description}
                </p>
              </motion.div>

              {/* Share buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5, ease }}
                className="w-full flex flex-col gap-3 mb-4"
              >
                <motion.button
                  onClick={handleShareInstagram}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.1 }}
                  disabled={sharing}
                  className="w-full py-4 rounded-full text-void font-bold text-base cursor-pointer select-none flex items-center justify-center gap-2"
                  style={{
                    background: sharing
                      ? "rgba(212,168,67,0.4)"
                      : "linear-gradient(135deg, #d4a843 0%, #e8c06a 60%, #d4a843 100%)",
                    boxShadow: "0 4px 20px rgba(212,168,67,0.2)",
                  }}
                >
                  <span>📸</span>
                  <span>{sharing ? "Generating..." : "Share to Instagram"}</span>
                </motion.button>

                {!demo && (
                  <motion.button
                    onClick={handleOpenLumo}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.1 }}
                    className="w-full py-4 rounded-full font-bold text-base cursor-pointer select-none flex items-center justify-center gap-2"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1.5px solid rgba(255,255,255,0.1)",
                      color: "#f2f2f7",
                    }}
                  >
                    <span>✨</span>
                    <span>Improve your ratio for free</span>
                  </motion.button>
                )}
              </motion.div>

              {!demo && onRetake && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85, duration: 0.4 }}
                  onClick={onRetake}
                  whileTap={{ scale: 0.96 }}
                  className="mt-2 py-3 px-8 rounded-2xl text-sm font-medium cursor-pointer select-none"
                  style={{ background: "transparent", color: "rgba(174,174,194,0.6)" }}
                >
                  Retake the quiz 🔄
                </motion.button>
              )}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
                className={
                  demo ? "mt-6 text-sm font-semibold tracking-wide" : "mt-4 text-xs font-medium"
                }
                style={{
                  color: demo ? "rgba(212,168,67,0.9)" : "rgba(107,107,138,0.45)",
                  letterSpacing: demo ? "0.06em" : "0.05em",
                }}
              >
                halalharamratio.live
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
