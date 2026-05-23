export function buildSocialProofLine(percent: number, gender: "women" | "men"): string {
  const audience = gender === "men" ? "Muslim men" : "Muslim women";
  return `${percent}% of ${audience} would still swipe right on you`;
}

export function getSocialProofPercentFromRatio(ratio: number): number {
  return Math.min(99, Math.max(38, Math.round(ratio * 0.72 + 6)));
}
