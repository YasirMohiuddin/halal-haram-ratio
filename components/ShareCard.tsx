"use client";

import { forwardRef } from "react";
import { Archetype } from "@/lib/quiz-data";

interface ShareCardProps {
  ratio: number;
  archetype: Archetype;
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ ratio, archetype }, ref) => {
  const numColor = ratio > 65 ? "#22c55e" : ratio < 35 ? "#ef4444" : "#d4a843";
  const haramColor = "#ef4444";
  const halalColor = "#22c55e";

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
        padding: "140px 100px 120px",
        boxSizing: "border-box",
        borderRadius: "80px",
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
          borderRadius: "56px",
          pointerEvents: "none",
        }}
      />

      {/* Top: icon + label */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "100px", lineHeight: 1, marginBottom: "40px" }}>🕌</div>
        <p
          style={{
            fontSize: "34px",
            fontWeight: 500,
            color: "rgba(174,174,194,0.7)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            margin: 0,
            paddingTop: "20px",
          }}
        >
          My Halal Haram Ratio
        </p>
      </div>

      {/* Number + bar */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Compound number: "73 % Halal" */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "16px",
            marginBottom: "180px",
          }}
        >
          <span
            style={{
              fontSize: "280px",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-10px",
              color: numColor,
            }}
          >
            {ratio}
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: "20px",
            }}
          >
            <span
              style={{
                fontSize: "96px",
                fontWeight: 900,
                color: "rgba(107,107,138,0.5)",
                lineHeight: 1,
              }}
            >
              %
            </span>
            <span
              style={{
                fontSize: "52px",
                fontWeight: 700,
                color: "rgba(107,107,138,0.45)",
                lineHeight: 1.2,
                letterSpacing: "0.02em",
                paddingTop: "10px",
              }}
            >
              halal
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ width: "100%" }}>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "18px",
            }}
          >
            <span
              style={{ fontSize: "28px", fontWeight: 500, color: haramColor + "99" }}
            >
              Haram 🔥
            </span>
            <span
              style={{ fontSize: "28px", fontWeight: 500, color: halalColor + "99" }}
            >
              Halal 😇
            </span>
          </div>
        </div>
      </div>

      {/* Archetype card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          paddingTop: "40px",
          paddingBottom: "80px",
          paddingLeft: "72px",
          paddingRight: "72px",
          background: "rgba(255,255,255,0.045)",
          border: "1.5px solid rgba(255,255,255,0.09)",
          borderRadius: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <p style={{ fontSize: "88px", lineHeight: 1, margin: "0 0 40px" }}>
          {archetype.emoji}
        </p>
        <p
          style={{
            fontSize: "60px",
            fontWeight: 800,
            color: "#f2f2f7",
            lineHeight: 1.15,
            margin: "0 0 32px",
            textAlign: "center",
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
            textAlign: "center",
          }}
        >
          {archetype.shareTagline}
        </p>
      </div>

      {/* Bottom: site name */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontSize: "52px",
            fontWeight: 700,
            color: "rgba(174,174,194,0.8)",
            letterSpacing: "0.04em",
            margin: 0,
            paddingBottom: "40px",
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
