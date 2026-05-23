"use client";

import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const BUBBLE_FILL = "#231b09";
const BUBBLE_BORDER = "#554219";

type ArrowDirection = "left" | "up";

interface SocialProofTooltipProps {
  line: string;
  active: boolean;
  children: React.ReactNode;
}

const bubbleClassName =
  "relative max-w-[9.75rem] overflow-visible rounded-2xl border px-4 py-3.5 text-center text-[0.8125rem] font-bold leading-snug text-[#c9b56a]";

function usePreferredSide() {
  const [side, setSide] = useState<"right" | "bottom">("right");

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setSide(media.matches ? "bottom" : "right");
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return side;
}

function useTooltipArrowDirection(open: boolean) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<ArrowDirection>("left");

  useEffect(() => {
    if (!open) return;

    let observer: MutationObserver | null = null;
    let rafId = 0;

    const sync = () => {
      const side = popupRef.current?.getAttribute("data-side");
      setDirection(side === "bottom" ? "up" : "left");
    };

    const attach = () => {
      const popup = popupRef.current;
      if (!popup) {
        rafId = requestAnimationFrame(attach);
        return;
      }

      sync();
      observer = new MutationObserver(sync);
      observer.observe(popup, { attributes: true, attributeFilter: ["data-side"] });
    };

    attach();
    window.addEventListener("resize", sync);

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, [open]);

  return { popupRef, direction };
}

function TooltipArrow({ direction }: { direction: ArrowDirection }) {
  if (direction === "up") {
    return (
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-50 size-0 -translate-x-1/2"
        aria-hidden
      >
        <div
          className="absolute left-1/2 top-0"
          style={{
            transform: "translate(-50%, -100%)",
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderBottom: `8px solid ${BUBBLE_BORDER}`,
          }}
        />
        <div
          className="absolute left-1/2 top-0"
          style={{
            transform: "translate(-50%, calc(-100% + 1.5px))",
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: `7px solid ${BUBBLE_FILL}`,
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute left-0 top-1/2 z-50 size-0 -translate-y-1/2"
      aria-hidden
    >
      <div
        className="absolute left-0 top-1/2"
        style={{
          transform: "translate(-100%, -50%)",
          width: 0,
          height: 0,
          borderTop: "7px solid transparent",
          borderBottom: "7px solid transparent",
          borderRight: `8px solid ${BUBBLE_BORDER}`,
        }}
      />
      <div
        className="absolute left-0 top-1/2"
        style={{
          transform: "translate(calc(-100% + 1.5px), -50%)",
          width: 0,
          height: 0,
          borderTop: "6px solid transparent",
          borderBottom: "6px solid transparent",
          borderRight: `7px solid ${BUBBLE_FILL}`,
        }}
      />
    </div>
  );
}

export default function SocialProofTooltip({
  line,
  active,
  children,
}: SocialProofTooltipProps) {
  const [open, setOpen] = useState(false);
  const preferredSide = usePreferredSide();
  const { popupRef, direction } = useTooltipArrowDirection(open);

  useEffect(() => {
    if (!active) {
      setOpen(false);
      return;
    }

    const timer = window.setTimeout(() => setOpen(true), 1750);
    return () => window.clearTimeout(timer);
  }, [active, line]);

  return (
    <Tooltip
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) setOpen(true);
      }}
    >
      <TooltipTrigger render={<div className="inline-flex items-center justify-center" />}>
        {children}
      </TooltipTrigger>
      <TooltipContent
        ref={popupRef}
        hideArrow
        side={preferredSide}
        sideOffset={preferredSide === "bottom" ? 10 : 14}
        align="center"
        className={cn(bubbleClassName, "max-w-[9.75rem]")}
        style={{ borderColor: BUBBLE_BORDER, backgroundColor: BUBBLE_FILL }}
      >
        <TooltipArrow direction={direction} />
        {line}
      </TooltipContent>
    </Tooltip>
  );
}
