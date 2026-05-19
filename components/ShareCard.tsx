"use client";

import { forwardRef } from "react";
import { Archetype } from "@/lib/quiz-data";

interface ShareCardProps {
  ratio: number;
  archetype: Archetype;
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ ratio, archetype }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: "-9999px",
        left: "-9999px",
        width: "1080px",
        height: "1920px",
        background: "#08080f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '"SF Pro Rounded", ui-rounded, system-ui, sans-serif',
        overflow: "hidden",
        padding: "80px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(212,168,67,0.14) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(180,110,15,0.09) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "2px solid rgba(212,168,67,0.1)",
          margin: "40px",
          borderRadius: "48px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            marginBottom: "48px",
            lineHeight: 1,
          }}
        >
          ☪️
        </div>

        <p
          style={{
            fontSize: "32px",
            fontWeight: 500,
            color: "rgba(174,174,194,0.8)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "16px",
            margin: "0 0 16px 0",
          }}
        >
          My Halal Haram Ratio
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              fontSize: "240px",
              fontWeight: 900,
              lineHeight: 1,
              background: "linear-gradient(135deg, #22c55e 0%, #d4a843 60%, #d4a843 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-8px",
            }}
          >
            {ratio}
          </span>
          <span
            style={{
              fontSize: "100px",
              fontWeight: 900,
              color: "rgba(107,107,138,0.6)",
              paddingBottom: "32px",
            }}
          >
            %
          </span>
        </div>

        <p
          style={{
            fontSize: "28px",
            fontWeight: 400,
            color: "rgba(107,107,138,0.7)",
            marginBottom: "80px",
            margin: "0 0 80px 0",
          }}
        >
          halal
        </p>

        <div
          style={{
            padding: "40px 64px",
            background: "rgba(255,255,255,0.04)",
            border: "1.5px solid rgba(255,255,255,0.08)",
            borderRadius: "32px",
            marginBottom: "40px",
          }}
        >
          <p
            style={{
              fontSize: "80px",
              lineHeight: 1,
              marginBottom: "20px",
              margin: "0 0 20px 0",
            }}
          >
            {archetype.emoji}
          </p>
          <p
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#f2f2f7",
              lineHeight: 1.2,
              margin: "0 0 20px 0",
            }}
          >
            {archetype.name}
          </p>
          <p
            style={{
              fontSize: "32px",
              fontWeight: 400,
              color: "rgba(174,174,194,0.7)",
              lineHeight: 1.5,
              margin: 0,
              maxWidth: "800px",
            }}
          >
            {archetype.shareTagline}
          </p>
        </div>

        <div
          style={{
            width: "800px",
            height: "16px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "999px",
            overflow: "hidden",
            marginBottom: "200px",
          }}
        >
          <div
            style={{
              width: `${ratio}%`,
              height: "100%",
              background: "linear-gradient(90deg, #ef4444, #d4a843, #22c55e)",
              borderRadius: "999px",
            }}
          />
        </div>

        <p
          style={{
            position: "absolute",
            bottom: "-680px",
            fontSize: "28px",
            fontWeight: 500,
            color: "rgba(107,107,138,0.5)",
            letterSpacing: "0.05em",
          }}
        >
          halalharamratio.com
        </p>
      </div>
    </div>
  );
});

ShareCard.displayName = "ShareCard";

export default ShareCard;
