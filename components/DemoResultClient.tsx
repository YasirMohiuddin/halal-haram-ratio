"use client";

import ResultsScreen from "@/components/ResultsScreen";
import type { Archetype } from "@/lib/quiz-data";

interface DemoResultClientProps {
  ratio: number;
  archetype: Archetype;
  socialProofLine?: string;
}

export default function DemoResultClient({
  ratio,
  archetype,
  socialProofLine,
}: DemoResultClientProps) {
  return (
    <ResultsScreen
      ratio={ratio}
      archetype={archetype}
      demo
      socialProofLine={socialProofLine}
    />
  );
}
