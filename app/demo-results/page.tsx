import Link from "next/link";
import { DEMO_RATIO, DEMO_RESULTS } from "@/lib/demo-results";

function DemoLinkList({
  gender,
  getHref,
}: {
  gender: "Women" | "Men";
  getHref: (id: number) => string;
}) {
  return (
    <ul className="space-y-3">
      {DEMO_RESULTS.map((demo) => (
        <li key={`${gender}-${demo.id}`}>
          <Link
            href={getHref(demo.id)}
            className="block rounded-2xl px-4 py-4 transition-colors hover:bg-white/[0.04]"
            style={{
              border: "1.5px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{demo.archetype.emoji}</span>
              <div>
                <p className="font-bold">
                  Demo {demo.id}: {demo.archetype.name}
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  {getHref(demo.id)} · {DEMO_RATIO}%
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function DemoResultsIndexPage() {
  return (
    <div className="min-h-dvh bg-void text-text px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted mb-2">
          Screenshot gallery
        </p>
        <h1 className="text-3xl font-black mb-2">Demo Results</h1>
        <p className="text-sm text-text-secondary mb-8">
          Ten viral UI variants at {DEMO_RATIO}% with different archetypes. Pick a gender column,
          open a link, and screenshot the full result screen.
        </p>

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-text-muted mb-4">
              Women
            </h2>
            <DemoLinkList
              gender="Women"
              getHref={(id) => `/demo-results/${id}`}
            />
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-text-muted mb-4">
              Men
            </h2>
            <DemoLinkList
              gender="Men"
              getHref={(id) => `/demo-results/${id}/men`}
            />
          </div>
        </div>

        <p className="mt-8 text-xs text-text-muted">
          Also available at{" "}
          <Link href="/viral-ui" className="text-gold underline underline-offset-2">
            /viral-ui
          </Link>
        </p>
      </div>
    </div>
  );
}
