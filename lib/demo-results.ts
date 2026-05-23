import { ARCHETYPES, type Archetype } from "@/lib/quiz-data";
import { buildSocialProofLine } from "@/lib/social-proof";

export const DEMO_RATIO = 67;

export type SocialProofGender = "women" | "men";

export interface DemoResult {
  id: number;
  slug: string;
  archetype: Archetype;
  socialProofPercent: number;
}

export const DEMO_RESULTS: DemoResult[] = [
  { id: 1, slug: "cultural-muslim", archetype: ARCHETYPES[0], socialProofPercent: 44 },
  { id: 2, slug: "ramadan-muslim", archetype: ARCHETYPES[1], socialProofPercent: 52 },
  { id: 3, slug: "selective-halal", archetype: ARCHETYPES[2], socialProofPercent: 48 },
  { id: 4, slug: "drinks-after-jummah", archetype: ARCHETYPES[3], socialProofPercent: 57 },
  { id: 5, slug: "modest-insta", archetype: ARCHETYPES[4], socialProofPercent: 63 },
  { id: 6, slug: "wallah-breaker", archetype: ARCHETYPES[5], socialProofPercent: 54 },
  { id: 7, slug: "guilt-tripper", archetype: ARCHETYPES[6], socialProofPercent: 59 },
  { id: 8, slug: "quote-sender", archetype: ARCHETYPES[7], socialProofPercent: 61 },
  { id: 9, slug: "haram-detector", archetype: ARCHETYPES[8], socialProofPercent: 57 },
  { id: 10, slug: "inshallah-everything", archetype: ARCHETYPES[9], socialProofPercent: 64 },
];

export function getDemoResult(id: number): DemoResult | undefined {
  return DEMO_RESULTS.find((demo) => demo.id === id);
}

export function getDemoSocialProof(demo: DemoResult, gender: SocialProofGender): string {
  return buildSocialProofLine(demo.socialProofPercent, gender);
}
