"use client";

import { forwardRef } from "react";
import { Archetype } from "@/lib/quiz-data";

interface ShareCardProps {
  ratio: number;
  archetype: Archetype;
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ ratio, archetype }, ref) => {
  const numColor =
    ratio > 65 ? "#22c55e" : ratio < 35 ? "#ef4444" : "#d4a843";

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
        justifyContent: "space-between",
        fontFamily: '"SF Pro Rounded", ui-rounded, system-ui, sans-serif',
        overflow: "hidden",
        padding: "120px 80px 100px",
        boxSizing: "border-box",
      }}
    >
      {/* Background glows */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 55% at 50% 15%, rgba(212,168,67,0.13) 0%, transparent 60%), radial-gradient(ellipse 60% 45% at 80% 85%, rgba(180,110,15,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Border frame */}
      <div
        style={{
          position: "absolute",
          inset: "40px",
          border: "2px solid rgba(212,168,67,0.1)",
          borderRadius: "48px",
          pointerEvents: "none",
        }}
      />

      {/* Top: label */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: "96px", lineHeight: 1, marginBottom: "40px" }}>☪️</div>
        <p
          style={{
            fontSize: "34px",
            fontWeight: 500,
            color: "rgba(174,174,194,0.7)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          My Halal Haram Ratio
        </p>
      </div>

      {/* Middle: big number */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
          <span
            style={{
              fontSize: "320px",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-12px",
              color: numColor,
            }}
          >
            {ratio}
          </span>
          <span
            style={{
              fontSize: "120px",
              fontWeight: 900,
              color: "rgba(107,107,138,0.5)",
              paddingBottom: "40px",
            }}
          >
            %
          </span>
        </div>
        <p
          style={{
            fontSize: "30px",
            fontWeight: 400,
            color: "rgba(107,107,138,0.6)",
            margin: "8px 0 0",
            letterSpacing: "0.08em",
          }}
        >
          halal
        </p>
      </div>

      {/* Archetype card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          padding: "52px 72px",
          background: "rgba(255,255,255,0.045)",
          border: "1.5px solid rgba(255,255,255,0.09)",
          borderRadius: "36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <p style={{ fontSize: "88px", lineHeight: 1, margin: "0 0 24px" }}>{archetype.emoji}</p>
        <p
          style={{
            fontSize: "60px",
            fontWeight: 800,
            color: "#f2f2f7",
            lineHeight: 1.15,
            margin: "0 0 20px",
          }}
        >
          {archetype.name}
        </p>
        <p
          style={{
            fontSize: "34px",
            fontWeight: 400,
            color: "rgba(174,174,194,0.65)",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {archetype.shareTagline}
        </p>
      </div>

      {/* Bottom: spectrum bar + URL */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "48px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "14px",
            background: "rgba(255,255,255,0.07)",
            borderRadius: "999px",
            overflow: "hidden",
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
            fontSize: "28px",
            fontWeight: 500,
            color: "rgba(107,107,138,0.45)",
            letterSpacing: "0.06em",
            margin: 0,
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
