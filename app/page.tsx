"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroScreen from "@/components/HeroScreen";
import QuestionScreen from "@/components/QuestionScreen";
import LoadingScreen from "@/components/LoadingScreen";
import ResultsScreen from "@/components/ResultsScreen";
import MirrorScreen from "@/components/MirrorScreen";
import {
  QUESTIONS,
  PathKey,
  getPathKey,
  getQuestionOptions,
  calculateRatio,
  getArchetype,
  getMirrorIndex,
  getMirrorContent,
  Archetype,
  AnswerRecord,
} from "@/lib/quiz-data";

type Screen = "hero" | "quiz" | "mirror" | "loading" | "results";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("hero");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [activePath, setActivePath] = useState<PathKey>("path1");
  const [scores, setScores] = useState<number[]>([]);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [currentMirrorIndex, setCurrentMirrorIndex] = useState(0);
  const [pendingNextIndex, setPendingNextIndex] = useState(0);
  const [ratio, setRatio] = useState(0);
  const [archetype, setArchetype] = useState<Archetype | null>(null);

  const currentQuestion = QUESTIONS[questionIndex];

  const handleStart = useCallback(() => {
    setScreen("quiz");
    setQuestionIndex(0);
    setScores([]);
    setAnswers([]);
    setActivePath("path1");
  }, []);

  const handleAnswer = useCallback(
    (score: number, optionIndex: number) => {
      if (questionIndex === 0) {
        const opt = QUESTIONS[0].options[optionIndex];
        setAnswers((prev) => [
          ...prev,
          { questionId: 1, optionIndex, emoji: opt.emoji, text: opt.text, score: 0 },
        ]);
        const path = getPathKey(optionIndex);
        setActivePath(path);
        setQuestionIndex(1);
        return;
      }

      const currentQ = QUESTIONS[questionIndex];
      const opts = getQuestionOptions(currentQ, activePath);
      const opt = opts[optionIndex];
      const newAnswers: AnswerRecord[] = [
        ...answers,
        { questionId: currentQ.id, optionIndex, emoji: opt.emoji, text: opt.text, score },
      ];
      setAnswers(newAnswers);

      const newScores = [...scores, score];
      setScores(newScores);

      const nextIndex = questionIndex + 1;
      const mirrorIdx = getMirrorIndex(questionIndex);

      if (mirrorIdx !== -1) {
        setCurrentMirrorIndex(mirrorIdx);
        setPendingNextIndex(nextIndex);
        setScreen("mirror");
        return;
      }

      if (nextIndex >= QUESTIONS.length) {
        const finalRatio = calculateRatio(newScores);
        const finalArchetype = getArchetype(finalRatio);
        setRatio(finalRatio);
        setArchetype(finalArchetype);
        setScreen("loading");
      } else {
        setQuestionIndex(nextIndex);
      }
    },
    [questionIndex, scores, answers, activePath]
  );

  const handleMirrorContinue = useCallback(() => {
    if (pendingNextIndex >= QUESTIONS.length) {
      const finalRatio = calculateRatio(scores);
      const finalArchetype = getArchetype(finalRatio);
      setRatio(finalRatio);
      setArchetype(finalArchetype);
      setScreen("loading");
    } else {
      setQuestionIndex(pendingNextIndex);
      setScreen("quiz");
    }
  }, [pendingNextIndex, scores]);

  const handleLoadingComplete = useCallback(() => {
    setScreen("results");
  }, []);

  const handleRetake = useCallback(() => {
    setScreen("hero");
    setQuestionIndex(0);
    setScores([]);
    setAnswers([]);
    setActivePath("path1");
    setRatio(0);
    setArchetype(null);
  }, []);

  const mirrorContent =
    screen === "mirror"
      ? getMirrorContent(currentMirrorIndex, answers, activePath)
      : null;

  return (
    <div className="bg-void min-h-dvh flex justify-center">
      <div className="w-full max-w-[430px] relative flex flex-col">
        <AnimatePresence mode="wait">
          {screen === "hero" && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <HeroScreen onStart={handleStart} />
            </motion.div>
          )}

          {screen === "quiz" && currentQuestion && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex-1"
            >
              <QuestionScreen
                question={currentQuestion}
                questionIndex={questionIndex}
                totalQuestions={QUESTIONS.length - 1}
                activePath={activePath}
                onAnswer={handleAnswer}
              />
            </motion.div>
          )}

          {screen === "mirror" && mirrorContent && (
            <motion.div
              key={`mirror-${currentMirrorIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex-1"
            >
              <MirrorScreen
                label={mirrorContent.label}
                headline={mirrorContent.headline}
                subtext={mirrorContent.subtext}
                onContinue={handleMirrorContinue}
              />
            </motion.div>
          )}

          {screen === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <LoadingScreen targetRatio={ratio} onComplete={handleLoadingComplete} />
            </motion.div>
          )}

          {screen === "results" && archetype && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-1"
            >
              <ResultsScreen
                ratio={ratio}
                archetype={archetype}
                onRetake={handleRetake}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
