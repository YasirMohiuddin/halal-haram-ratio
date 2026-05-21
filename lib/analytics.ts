import posthog from "posthog-js";

type EventProperties = Record<string, string | number | boolean | undefined>;

/** Custom events via PostHog (requires NEXT_PUBLIC_POSTHOG_KEY). Free tier: 1M events/mo. */
export function trackEvent(eventName: string, properties?: EventProperties) {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  posthog.capture(eventName, properties);
}
