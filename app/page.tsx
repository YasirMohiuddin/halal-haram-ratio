"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroScreen from "@/components/HeroScreen";
import QuestionScreen from "@/components/QuestionScreen";
import LoadingScreen from "@/components/LoadingScreen";
import ResultsScreen from "@/components/ResultsScreen";
import MirrorScreen from "@/components/MirrorScreen";
import {
  PathKey,
  getPathKey,
  getQuestionOptions,
  calculateRatio,
  getArchetype,
  getMirrorAfterQuestionId,
  getMirrorContent,
  getQuizQuestion,
  getUserGenderFromAnswer,
  getSocialProofAudience,
  buildQuestionFlow,
  QUIZ_CONTENT_QUESTION_COUNT,
  Archetype,
  AnswerRecord,
  UserGender,
} from "@/lib/quiz-data";
import { buildSocialProofLine, getSocialProofPercentFromRatio } from "@/lib/social-proof";

type Screen = "hero" | "quiz" | "mirror" | "loading" | "results";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("hero");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [activePath, setActivePath] = useState<PathKey>("path1");
  const [userGender, setUserGender] = useState<UserGender | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [currentMirrorIndex, setCurrentMirrorIndex] = useState(0);
  const [pendingNextIndex, setPendingNextIndex] = useState(0);
  const [ratio, setRatio] = useState(0);
  const [archetype, setArchetype] = useState<Archetype | null>(null);
  const [socialProofLine, setSocialProofLine] = useState<string | undefined>();

  const currentQuestion = getQuizQuestion(questionIndex, userGender, activePath);

  const finishQuiz = useCallback(
    (finalScores: number[], gender: UserGender) => {
      const finalRatio = calculateRatio(finalScores);
      const finalArchetype = getArchetype(finalRatio);
      const audience = getSocialProofAudience(gender);
      setRatio(finalRatio);
      setArchetype(finalArchetype);
      setSocialProofLine(
        buildSocialProofLine(getSocialProofPercentFromRatio(finalRatio), audience)
      );
      setScreen("loading");
    },
    []
  );

  const handleStart = useCallback(() => {
    setScreen("quiz");
    setQuestionIndex(0);
    setScores([]);
    setAnswers([]);
    setActivePath("path1");
    setUserGender(null);
    setSocialProofLine(undefined);
  }, []);

  const handleAnswer = useCallback(
    (score: number, optionIndex: number) => {
      const currentQ = getQuizQuestion(questionIndex, userGender, activePath);
      if (!currentQ) return;

      if (questionIndex === 0) {
        const opt = getQuestionOptions(currentQ, activePath)[optionIndex];
        setAnswers((prev) => [
          ...prev,
          { questionId: 1, optionIndex, emoji: opt.emoji, text: opt.text, score: 0 },
        ]);
        setActivePath(getPathKey(optionIndex));
        setQuestionIndex(1);
        return;
      }

      if (questionIndex === 1) {
        const opt = currentQ.options[optionIndex];
        const gender = getUserGenderFromAnswer(optionIndex);
        setUserGender(gender);
        setAnswers((prev) => [
          ...prev,
          { questionId: 0, optionIndex, emoji: opt.emoji, text: opt.text, score: 0 },
        ]);
        setQuestionIndex(2);
        return;
      }

      const opts = getQuestionOptions(currentQ, activePath);
      const opt = opts[optionIndex];
      const newAnswers: AnswerRecord[] = [
        ...answers,
        { questionId: currentQ.id, optionIndex, emoji: opt.emoji, text: opt.text, score },
      ];
      setAnswers(newAnswers);

      const newScores = [...scores, score];
      setScores(newScores);

      const flowLength = buildQuestionFlow(userGender!, activePath).length;
      const nextIndex = questionIndex + 1;
      const mirrorIdx = getMirrorAfterQuestionId(currentQ.id);

      if (mirrorIdx !== -1) {
        setCurrentMirrorIndex(mirrorIdx);
        setPendingNextIndex(nextIndex);
        setScreen("mirror");
        return;
      }

      if (nextIndex >= flowLength + 2) {
        finishQuiz(newScores, userGender!);
      } else {
        setQuestionIndex(nextIndex);
      }
    },
    [questionIndex, scores, answers, activePath, userGender, finishQuiz]
  );

  const handleMirrorContinue = useCallback(() => {
    const flowLength = userGender ? buildQuestionFlow(userGender, activePath).length : 0;

    if (pendingNextIndex >= flowLength + 2) {
      finishQuiz(scores, userGender!);
    } else {
      setQuestionIndex(pendingNextIndex);
      setScreen("quiz");
    }
  }, [pendingNextIndex, scores, userGender, activePath, finishQuiz]);

  const handleLoadingComplete = useCallback(() => {
    setScreen("results");
  }, []);

  const handleRetake = useCallback(() => {
    setScreen("hero");
    setQuestionIndex(0);
    setScores([]);
    setAnswers([]);
    setActivePath("path1");
    setUserGender(null);
    setRatio(0);
    setArchetype(null);
    setSocialProofLine(undefined);
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
                totalQuestions={QUIZ_CONTENT_QUESTION_COUNT + 1}
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
                socialProofLine={socialProofLine}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
