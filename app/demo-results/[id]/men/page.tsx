import { notFound } from "next/navigation";
import DemoResultClient from "@/components/DemoResultClient";
import { getDemoResult, getDemoSocialProof } from "@/lib/demo-results";

interface DemoResultMenPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({ id: String(i + 1) }));
}

export default async function DemoResultMenPage({ params }: DemoResultMenPageProps) {
  const { id } = await params;
  const demoId = Number(id);

  if (!Number.isInteger(demoId) || demoId < 1 || demoId > 10) {
    notFound();
  }

  const demo = getDemoResult(demoId);
  if (!demo) notFound();

  return (
    <DemoResultClient
      ratio={67}
      archetype={demo.archetype}
      socialProofLine={getDemoSocialProof(demo, "men")}
    />
  );
}
