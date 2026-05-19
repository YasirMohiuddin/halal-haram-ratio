"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Question,
  PathKey,
  AnswerOption,
  getQuestionOptions,
  getSetupLine,
  getQuestionText,
} from "@/lib/quiz-data";
import QuestionBackground, { QUESTION_THEMES } from "@/components/QuestionBackground";
import ForegroundEffect from "@/components/ForegroundEffect";

interface QuestionScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  activePath: PathKey;
  onAnswer: (score: number, optionIndex: number) => void;
}

const ENTRANCE_ANIMATIONS = [
  "slideRight",
  "fadeUp",
  "scaleIn",
  "rotateIn",
  "slideLeft",
  "fadeUp",
  "scaleIn",
  "slideUp",
  "rotateIn",
  "slideRight",
  "fadeUp",
  "scaleIn",
  "rotateIn",
  "slideUp",
  "slideRight",
] as const;

type AnimationType = (typeof ENTRANCE_ANIMATIONS)[number];

function getVariants(type: AnimationType): Variants {
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

  const map: Record<AnimationType, Variants> = {
    slideRight: {
      hidden: { x: 60, opacity: 0 },
      show: { x: 0, opacity: 1, transition: { duration: 0.4, ease } },
      exit: { x: -40, opacity: 0, transition: { duration: 0.22 } },
    },
    slideLeft: {
      hidden: { x: -60, opacity: 0 },
      show: { x: 0, opacity: 1, transition: { duration: 0.4, ease } },
      exit: { x: 40, opacity: 0, transition: { duration: 0.22 } },
    },
    fadeUp: {
      hidden: { y: 36, opacity: 0 },
      show: { y: 0, opacity: 1, transition: { duration: 0.4, ease } },
      exit: { y: -24, opacity: 0, transition: { duration: 0.22 } },
    },
    slideUp: {
      hidden: { y: 64, opacity: 0 },
      show: { y: 0, opacity: 1, transition: { duration: 0.4, ease } },
      exit: { y: -40, opacity: 0, transition: { duration: 0.22 } },
    },
    scaleIn: {
      hidden: { scale: 0.9, opacity: 0 },
      show: { scale: 1, opacity: 1, transition: { duration: 0.4, ease } },
      exit: { scale: 0.94, opacity: 0, transition: { duration: 0.22 } },
    },
    rotateIn: {
      hidden: { rotate: -3, scale: 0.95, opacity: 0 },
      show: { rotate: 0, scale: 1, opacity: 1, transition: { duration: 0.4, ease } },
      exit: { rotate: 2, scale: 0.96, opacity: 0, transition: { duration: 0.22 } },
    },
  };
  return map[type];
}

const QUESTION_WORD_DELAY_START = 0.25;
const SENTENCE_BREAK_EXTRA = 0.45;

function gapAfterWord(word: string): number {
  const clean = word.replace(/[^a-zA-Z]/g, "");
  const base = 0.06 + clean.length * 0.028;
  if (/[.?!]$/.test(word)) return base + SENTENCE_BREAK_EXTRA;
  if (/[,;:]$/.test(word)) return base + 0.15;
  return base;
}

function getWordDelay(words: string[], index: number): number {
  let delay = QUESTION_WORD_DELAY_START;
  for (let i = 0; i < index; i++) {
    delay += gapAfterWord(words[i]);
  }
  return delay;
}

function getAnswersDelay(words: string[]): number {
  const lastWordDelay = getWordDelay(words, words.length - 1);
  return lastWordDelay + 0.5 + 0.25; // last word duration + buffer
}

const answerItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  activePath,
  onAnswer,
}: QuestionScreenProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const options: AnswerOption[] = getQuestionOptions(question, activePath);
  const setupLine = getSetupLine(question, activePath);
  const questionText = getQuestionText(question, activePath);
  const combinedQuestion = setupLine ? `${setupLine} ${questionText}` : questionText;

  const animType = ENTRANCE_ANIMATIONS[questionIndex % ENTRANCE_ANIMATIONS.length];
  const variants = getVariants(animType);

  const progressPercent = (questionIndex / totalQuestions) * 100;
  const questionWords = combinedQuestion.split(" ");
  const answersDelay = getAnswersDelay(questionWords);

  useEffect(() => {
    setSelected(null);
  }, [question.id]);

  const handleSelect = (index: number, score: number) => {
    if (selected !== null) return;
    setSelected(index);
    setTimeout(() => {
      onAnswer(score, index);
    }, 500);
  };

  const theme = QUESTION_THEMES[questionIndex % QUESTION_THEMES.length];

  return (
    <div className="min-h-dvh flex flex-col bg-void relative">
      {/* Background crossfade between questions */}
      <AnimatePresence>
        <motion.div
          key={`bg-${questionIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <QuestionBackground theme={theme} />
        </motion.div>
      </AnimatePresence>

      {/* Foreground effect crossfade */}
      <AnimatePresence>
        <motion.div
          key={`fg-${questionIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <ForegroundEffect questionIndex={questionIndex} />
        </motion.div>
      </AnimatePresence>

      {/* Progress bar - full viewport width, fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px]" style={{ background: "rgba(255,255,255,0.05)" }}>
        <motion.div
          className="h-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ background: "linear-gradient(90deg, #c47c10, #d4a843, #e8c06a)" }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          className="relative z-10 flex-1 flex flex-col px-5"
          style={{ paddingTop: "max(4rem, calc(env(safe-area-inset-top) + 2rem))", paddingBottom: "2rem" }}
          variants={variants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <div className="flex-1 flex flex-col justify-center gap-7 py-4">
            <h2 className="text-[1.6rem] font-black text-text leading-snug text-center">
              {questionWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: getWordDelay(questionWords, i), duration: 0.5 }}
                  className="inline"
                >
                  {word}{" "}
                </motion.span>
              ))}
            </h2>

            {/* Answers - stagger in after question finishes */}
            <motion.div
              className="flex flex-col gap-3"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: answersDelay } } }}
              initial="hidden"
              animate="show"
            >
              {options.map((opt, i) => {
                const isSelected = selected === i;
                const isDimmed = selected !== null && !isSelected;

                return (
                  <motion.div
                    key={i}
                    variants={answerItemVariants}
                    onClick={() => handleSelect(i, opt.score)}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.1 }}
                    animate={
                      isSelected
                        ? { scale: 1.02, transition: { duration: 0.15 } }
                        : isDimmed
                          ? { opacity: 0.4, transition: { duration: 0.2 } }
                          : {}
                    }
                    className="flex items-center gap-4 px-5 py-4 rounded-full cursor-pointer select-none backdrop-blur-md"
                    style={{
                      background: isSelected
                        ? "rgba(212,168,67,0.14)"
                        : "rgba(255,255,255,0.05)",
                      border: isSelected
                        ? "1.5px solid rgba(212,168,67,0.45)"
                        : "1.5px solid rgba(255,255,255,0.09)",
                      transition: "background 0.2s, border-color 0.2s",
                    }}
                  >
                    <span className="text-2xl flex-shrink-0 leading-none">{opt.emoji}</span>
                    <span
                      className="text-[15px] font-medium leading-snug flex-1"
                      style={{ color: isSelected ? "#e8c06a" : "#f2f2f7" }}
                    >
                      {opt.text}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.18 }}
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "#d4a843" }}
                      >
                        <span className="text-void text-xs font-black leading-none">✓</span>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
