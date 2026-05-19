"use client";

import { useEffect, useRef } from "react";

type FXType =
  | "smokeCannon" | "sparkCannon" | "heartDrift"
  | "starfall" | "lightSweep" | "confettiCannon"
  | "emojiCannon" | "ringFloat";

interface EmojiConfig { emojis: string[] }

interface FXConfig {
  type: FXType;
  emoji?: EmojiConfig;
  zIndex?: number;
}

// Every question gets a foreground effect
export const FOREGROUND_FX: Record<number, FXConfig> = {
  0:  { type: "sparkCannon" },                                          // Q1  Friday night
  1:  { type: "emojiCannon", emoji: { emojis: ["🍕","🍗","🥗","🌭","🥩"] } }, // Q2  Food
  2:  { type: "emojiCannon", emoji: { emojis: ["⭐","🌙","✨","🌟"] } },       // Q3  Evening
  3:  { type: "ringFloat", zIndex: 5 },                                  // Q4  Vape - behind content
  4:  { type: "heartDrift" },                                           // Q5  Someone eyeing you
  5:  { type: "emojiCannon", emoji: { emojis: ["📱","💬","😬","😅"] } },       // Q6  Mum calls
  6:  { type: "emojiCannon", emoji: { emojis: ["🌅","✨","🤲","🕌"] } },       // Q7  Fajr / Maghrib
  7:  { type: "emojiCannon", emoji: { emojis: ["📿","🤲","🕌","☪️"] } },       // Q8  Prayer count
  8:  { type: "emojiCannon", emoji: { emojis: ["💭","😔","🤲","😬"] } },       // Q9  Guilt
  9:  { type: "emojiCannon", emoji: { emojis: ["📸","❤️","👀","✨"] } },       // Q10 Instagram
  10: { type: "emojiCannon", emoji: { emojis: ["💬","📩","👀","😅"] } },       // Q11 DMs
  11: { type: "starfall" },                                             // Q12 Ramadan
  12: { type: "emojiCannon", emoji: { emojis: ["🚗","🎵","🎶","🌙","🛣️"] } }, // Q13 Night drive
  13: { type: "emojiCannon", emoji: { emojis: ["💰","💸","🤲","❤️"] } },       // Q14 Sadaqah
  14: { type: "confettiCannon" },                                       // Q15 Eid
};

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

// ─── Smoke cannon ─────────────────────────────────────────────────────────────
function makeSmokeCannon(w: number, h: number): DrawFn {
  interface P { x:number;y:number;vx:number;vy:number;size:number;alpha:number;maxAlpha:number;age:number;maxAge:number;hue:number }
  const pool: P[] = [];
  let lastL = -1, lastR = -0.08;
  const sc = Math.max(1, w / 390);

  const emit = (side: "left" | "right") => {
    const x = side === "left" ? -40 * sc : w + 40 * sc;
    const dir = side === "left" ? 1 : -1;
    for (let i = 0; i < 4; i++) {
      pool.push({
        x, y: h * 0.15 + Math.random() * h * 0.65,
        vx: dir * (50 + Math.random() * 80) * sc,
        vy: -8 + Math.random() * 16,
        size: (30 + Math.random() * 50) * sc,
        alpha: 0, maxAlpha: 0.055 + Math.random() * 0.06,
        age: 0, maxAge: 3.2 + Math.random() * 2,
        hue: 248 + Math.random() * 35,
      });
    }
  };

  return (ctx, w, h, t) => {
    const dt = 0.016;
    if (t > 0.3 && t - lastL > 0.14) { emit("left");  lastL = t; }
    if (t > 0.3 && t - lastR > 0.17) { emit("right"); lastR = t; }
    for (let i = pool.length - 1; i >= 0; i--) {
      const p = pool[i];
      p.age += dt;
      if (p.age > p.maxAge) { pool.splice(i, 1); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.vy -= 18 * dt; p.vx *= 0.991; p.size += 28 * sc * dt;
      const life = p.age / p.maxAge;
      p.alpha = p.maxAlpha * Math.min(1, p.age * 4) * (1 - life * life);
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      g.addColorStop(0,   `hsla(${p.hue},22%,82%,${p.alpha})`);
      g.addColorStop(0.5, `hsla(${p.hue},18%,72%,${p.alpha * 0.45})`);
      g.addColorStop(1,   "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  };
}

// ─── Spark cannon ─────────────────────────────────────────────────────────────
function makeSparkCannon(w: number, h: number): DrawFn {
  interface S { x:number;y:number;vx:number;vy:number;size:number;alpha:number;age:number;maxAge:number;hue:number;trail:{x:number,y:number}[] }
  const pool: S[] = [];
  let last = 0;
  const sc = Math.sqrt(Math.max(1, w / 390));

  const emit = () => {
    const sides = [{ x: -10 * sc, dir: 1 }, { x: w + 10 * sc, dir: -1 }];
    for (const c of sides) {
      for (let i = 0; i < 8 + Math.floor(Math.random() * 6); i++) {
        pool.push({
          x: c.x, y: h * 0.15 + Math.random() * h * 0.65,
          vx: c.dir * (55 + Math.random() * 100) * sc,
          vy: -50 + Math.random() * 100,
          size: (0.8 + Math.random() * 1.4) * sc,
          alpha: 0.7 + Math.random() * 0.3,
          age: 0, maxAge: 0.6 + Math.random() * 0.8,
          hue: Math.random() < 0.6 ? 44 : 30,
          trail: [],
        });
      }
    }
  };

  return (ctx, w, h, t) => {
    const dt = 0.016;
    if (t > 0.3 && t - last > 0.18 + Math.random() * 0.14) { emit(); last = t; }
    for (let i = pool.length - 1; i >= 0; i--) {
      const s = pool[i];
      s.trail.push({ x: s.x, y: s.y });
      if (s.trail.length > 7) s.trail.shift();
      s.age += dt;
      if (s.age > s.maxAge) { pool.splice(i, 1); continue; }
      s.x += s.vx * dt; s.y += s.vy * dt;
      s.vy += 200 * dt;
      const life = s.age / s.maxAge;
      const alpha = s.alpha * (1 - life);
      for (let j = 1; j < s.trail.length; j++) {
        ctx.strokeStyle = `hsla(${s.hue},100%,75%,${alpha * (j / s.trail.length) * 0.45})`;
        ctx.lineWidth = s.size * (j / s.trail.length);
        ctx.beginPath();
        ctx.moveTo(s.trail[j - 1].x, s.trail[j - 1].y);
        ctx.lineTo(s.trail[j].x, s.trail[j].y);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue},100%,88%,${alpha})`;
      ctx.fill();
    }
  };
}

// ─── Heart drift ──────────────────────────────────────────────────────────────
function makeHeartDrift(w: number, h: number): DrawFn {
  interface H { x:number;y:number;vx:number;vy:number;size:number;alpha:number;age:number;maxAge:number;rot:number;rotSpeed:number;hue:number }
  const pool: H[] = [];
  let last = 0;
  const sc = Math.max(1, w / 390);

  const heart = (ctx: CanvasRenderingContext2D, s: number) => {
    const k = s;
    ctx.beginPath();
    ctx.moveTo(0, k * 0.28);
    ctx.bezierCurveTo(0, -k * 0.15, k, -k * 0.48, k, 0);
    ctx.bezierCurveTo(k, k * 0.55, 0, k * 0.92, 0, k * 1.22);
    ctx.bezierCurveTo(0, k * 0.92, -k, k * 0.55, -k, 0);
    ctx.bezierCurveTo(-k, -k * 0.48, 0, -k * 0.15, 0, k * 0.28);
    ctx.closePath();
  };

  return (ctx, w, h, t) => {
    const dt = 0.016;
    if (t - last > 0.45 + Math.random() * 0.6) {
      const left = Math.random() < 0.5;
      pool.push({
        x: left ? -25 * sc : w + 25 * sc,
        y: h * 0.1 + Math.random() * h * 0.72,
        vx: left ? (40 + Math.random() * 55) * sc : -(40 + Math.random() * 55) * sc,
        vy: -15 + Math.random() * 30,
        size: (18 + Math.random() * 22) * sc,
        alpha: 0, age: 0, maxAge: 3 + Math.random() * 2,
        rot: (Math.random() - 0.5) * 0.35,
        rotSpeed: (Math.random() - 0.5) * 0.28,
        hue: 335 + Math.floor(Math.random() * 28),
      });
      last = t;
    }
    for (let i = pool.length - 1; i >= 0; i--) {
      const p = pool[i];
      p.age += dt;
      if (p.age > p.maxAge) { pool.splice(i, 1); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.vy -= 8 * dt; p.rot += p.rotSpeed * dt;
      const life = p.age / p.maxAge;
      p.alpha = 0.7 * Math.min(1, p.age * 3) * (1 - life * life);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      heart(ctx, p.size);
      ctx.fillStyle = `hsla(${p.hue},90%,68%,${p.alpha})`;
      ctx.fill();
      ctx.restore();
    }
  };
}

// ─── Star shower ──────────────────────────────────────────────────────────────
function makeStarfall(w: number, h: number): DrawFn {
  interface S { x:number;y:number;vx:number;vy:number;size:number;alpha:number;age:number;maxAge:number;sparkle:boolean }
  const pool: S[] = [];
  let last = 0;
  const sc = Math.max(1, w / 390);

  return (ctx, w, h, t) => {
    const dt = 0.016;
    if (t > 0.3 && t - last > 0.22 + Math.random() * 0.28) {
      for (let i = 0; i < 1 + Math.floor(Math.random() * 2); i++) {
        const vy = (12 + Math.random() * 22) * sc;
        pool.push({
          x: Math.random() * w, y: -10,
          vx: (Math.random() - 0.5) * 10, vy,
          size: (0.6 + Math.random() * 1.2) * sc,
          alpha: 0.4 + Math.random() * 0.4,
          age: 0, maxAge: (h + 20) / vy,
          sparkle: Math.random() < 0.28,
        });
      }
      last = t;
    }
    for (let i = pool.length - 1; i >= 0; i--) {
      const s = pool[i];
      s.age += dt;
      if (s.age > s.maxAge) { pool.splice(i, 1); continue; }
      s.x += s.vx * dt; s.y += s.vy * dt;
      const alpha = s.alpha * (1 - s.age / s.maxAge);
      if (s.sparkle) {
        const arm = s.size * 3.5;
        ctx.strokeStyle = `rgba(255,238,170,${alpha * 0.75})`;
        ctx.lineWidth = 0.8 * sc;
        ctx.beginPath();
        ctx.moveTo(s.x - arm, s.y); ctx.lineTo(s.x + arm, s.y);
        ctx.moveTo(s.x, s.y - arm); ctx.lineTo(s.x, s.y + arm);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,228,140,${alpha})`;
      ctx.fill();
    }
  };
}

// ─── Light sweep ──────────────────────────────────────────────────────────────
function makeLightSweep(w: number, h: number): DrawFn {
  interface B { x:number;age:number;maxAge:number;speed:number;spread:number;y:number;alpha:number }
  const pool: B[] = [];
  let last = 0;

  return (ctx, w, h, t) => {
    const dt = 0.016;
    if (t - last > 2 + Math.random() * 1.5) {
      pool.push({
        x: w + 70, age: 0,
        maxAge: 2.8 + Math.random() * 0.8,
        speed: (w + 140) / (1.4 + Math.random() * 0.5),
        spread: 0.22 + Math.random() * 0.12,
        y: h * 0.25 + Math.random() * h * 0.45,
        alpha: 0,
      });
      last = t;
    }
    for (let i = pool.length - 1; i >= 0; i--) {
      const b = pool[i];
      b.age += dt;
      if (b.age > b.maxAge) { pool.splice(i, 1); continue; }
      b.x -= b.speed * dt;
      b.alpha = 0.18 * Math.sin((b.age / b.maxAge) * Math.PI);
      const len = w * 0.85;
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, len);
      g.addColorStop(0,        `rgba(255,242,210,${b.alpha})`);
      g.addColorStop(b.spread, `rgba(255,242,210,${b.alpha * 0.22})`);
      g.addColorStop(1,        "transparent");
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.arc(b.x, b.y, len, -b.spread * Math.PI, b.spread * Math.PI);
      ctx.closePath();
      ctx.fillStyle = g;
      ctx.fill();
      ctx.restore();
    }
  };
}

// ─── Confetti cannon ──────────────────────────────────────────────────────────
function makeConfettiCannon(w: number, h: number): DrawFn {
  interface P { x:number;y:number;vx:number;vy:number;pw:number;ph:number;rot:number;rotSpeed:number;alpha:number;age:number;maxAge:number;hue:number }
  const pool: P[] = [];
  let bursts = 0, lastBurst = -1;
  const sc = Math.max(1, w / 390);

  const fire = () => {
    const sides = [{ x: -20 * sc, dir: 1 }, { x: w + 20 * sc, dir: -1 }];
    for (const s of sides) {
      for (let i = 0; i < 50 + Math.floor(Math.random() * 30); i++) {
        const ang = -(0.2 + Math.random() * 0.55) * Math.PI;
        const spd = (180 + Math.random() * 320) * sc;
        pool.push({
          x: s.x, y: h * 0.25 + Math.random() * h * 0.45,
          vx: s.dir * Math.abs(Math.cos(ang)) * spd,
          vy: Math.sin(ang) * spd,
          pw: (2 + Math.random() * 3.5) * sc,
          ph: (1 + Math.random() * 2) * sc,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 14,
          alpha: 0.8 + Math.random() * 0.2,
          age: 0, maxAge: 2.5 + Math.random() * 1.8,
          hue: [44, 138, 30, 0, 50, 20][Math.floor(Math.random() * 6)],
        });
      }
    }
  };

  return (ctx, w, h, t) => {
    const dt = 0.016;
    if (t > 0.35 && bursts === 0)             { fire(); bursts = 1; lastBurst = t; }
    if (bursts === 1 && t - lastBurst > 0.42) { fire(); bursts = 2; lastBurst = t; }
    if (bursts === 2 && t - lastBurst > 0.42) { fire(); bursts = 3; }
    for (let i = pool.length - 1; i >= 0; i--) {
      const c = pool[i];
      c.age += dt;
      if (c.age > c.maxAge) { pool.splice(i, 1); continue; }
      c.x += c.vx * dt; c.y += c.vy * dt;
      c.vy += 340 * dt; c.vx *= 0.99; c.rot += c.rotSpeed * dt;
      const alpha = c.alpha * (1 - (c.age / c.maxAge) ** 2);
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rot);
      ctx.fillStyle = `hsla(${c.hue},85%,65%,${alpha})`;
      ctx.fillRect(-c.pw / 2, -c.ph / 2, c.pw, c.ph);
      ctx.restore();
    }
  };
}

// ─── Emoji cannon ─────────────────────────────────────────────────────────────
// Fires one burst from both sides, then emojis drift/float for their lifetime.
// No continuous re-firing - just ambient floating after the initial volley.
function makeEmojiCannon(emojis: string[], w: number, h: number): DrawFn {
  interface E {
    x:number; y:number; vx:number; vy:number;
    size:number; alpha:number; age:number; maxAge:number;
    emoji:string; rot:number; rotSpeed:number;
    wobblePhase:number; wobbleFreq:number;
  }
  const pool: E[] = [];
  let fired = false;
  let lastTopUp = 0;
  // sqrt scaling so desktop isn't 3× mobile - softer growth curve
  const sc = Math.sqrt(Math.max(1, w / 390));

  const spawnOne = (side: "left" | "right") => {
    const dir = side === "left" ? 1 : -1;
    pool.push({
      x: side === "left" ? -30 * sc : w + 30 * sc,
      y: h * 0.1 + Math.random() * h * 0.72,
      vx: dir * (45 + Math.random() * 65) * sc,
      vy: -12 + Math.random() * 24,
      size: (16 + Math.random() * 10) * sc,
      alpha: 0, age: 0,
      maxAge: 7 + Math.random() * 4,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      rot: (Math.random() - 0.5) * 0.5,
      rotSpeed: (Math.random() - 0.5) * 0.6,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleFreq: 0.35 + Math.random() * 0.55,
    });
  };

  return (ctx, w, h, t) => {
    const dt = 0.016;

    // One initial burst from both sides
    if (!fired && t > 0.4) {
      for (let i = 0; i < 4; i++) spawnOne("left");
      for (let i = 0; i < 4; i++) spawnOne("right");
      fired = true;
      lastTopUp = t;
    }

    // Quietly top up 1 emoji every ~5s if pool is thinning (max 8 at once)
    if (fired && t - lastTopUp > 5 && pool.length < 8) {
      spawnOne(Math.random() < 0.5 ? "left" : "right");
      lastTopUp = t;
    }

    for (let i = pool.length - 1; i >= 0; i--) {
      const p = pool[i];
      p.age += dt;
      if (p.age > p.maxAge) { pool.splice(i, 1); continue; }

      // Decelerate then drift with gentle wobble + slow upward float
      p.vx *= 0.975;
      p.vy *= 0.975;
      p.x += p.vx * dt + Math.sin(t * p.wobbleFreq + p.wobblePhase) * 16 * dt;
      p.y += p.vy * dt - 6 * dt; // slow upward drift
      p.rot += p.rotSpeed * dt;

      const life = p.age / p.maxAge;
      const fadeIn  = Math.min(1, p.age * 3);
      const fadeOut = life > 0.78 ? 1 - (life - 0.78) / 0.22 : 1;
      p.alpha = 0.82 * fadeIn * fadeOut;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.font = `${p.size}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillText(p.emoji, 0, 0);
      ctx.restore();
    }
  };
}

// ─── Ring float - translucent rings drifting upward ──────────────────────────
function makeRingFloat(w: number, h: number): DrawFn {
  interface R { x:number; y:number; r:number; maxR:number; alpha:number; age:number; maxAge:number; lw:number }
  const pool: R[] = [];
  let last = 0;
  const sc = Math.sqrt(Math.max(1, w / 390));

  return (ctx, w, h, t) => {
    const dt = 0.016;
    if (t - last > 1.2 + Math.random() * 1.6) {
      pool.push({
        x: w * 0.18 + Math.random() * w * 0.64,
        y: h * 0.55 + Math.random() * h * 0.35,
        r: 6 * sc,
        maxR: (38 + Math.random() * 28) * sc,
        alpha: 0.42 + Math.random() * 0.22,
        age: 0,
        maxAge: 4.5 + Math.random() * 2.5,
        lw: (1.2 + Math.random() * 1.2) * sc,
      });
      last = t;
    }
    for (let i = pool.length - 1; i >= 0; i--) {
      const ring = pool[i];
      ring.age += dt;
      if (ring.age > ring.maxAge) { pool.splice(i, 1); continue; }
      const life = ring.age / ring.maxAge;
      ring.r = ring.r + (ring.maxR - ring.r) * 0.018;
      ring.y -= 0.28 * sc;
      const alpha = ring.alpha * (1 - life * life);
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(210,185,140,${alpha})`;
      ctx.lineWidth = ring.lw * (1 - life * 0.6);
      ctx.stroke();
    }
  };
}

// ─── Factory resolver ─────────────────────────────────────────────────────────
function buildDrawFn(cfg: FXConfig, w: number, h: number): DrawFn {
  switch (cfg.type) {
    case "smokeCannon":    return makeSmokeCannon(w, h);
    case "sparkCannon":    return makeSparkCannon(w, h);
    case "heartDrift":     return makeHeartDrift(w, h);
    case "starfall":       return makeStarfall(w, h);
    case "lightSweep":     return makeLightSweep(w, h);
    case "confettiCannon": return makeConfettiCannon(w, h);
    case "emojiCannon":    return makeEmojiCannon(cfg.emoji?.emojis ?? ["✨"], w, h);
    case "ringFloat":      return makeRingFloat(w, h);
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ForegroundEffect({ questionIndex }: { questionIndex: number }) {
  const cfg = FOREGROUND_FX[questionIndex];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!cfg) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let drawFn: DrawFn | null = null;

    const setup = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width  = Math.floor(width  * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFn = buildDrawFn(cfg, width, height);
    };

    setup();

    let raf: number;
    let startTime: number | null = null;

    const loop = (ts: number) => {
      if (!startTime) startTime = ts;
      const t = (ts - startTime) / 1000;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      if (drawFn) drawFn(ctx, width, height, t);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(setup);
    ro.observe(canvas);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [cfg]);

  if (!cfg) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: cfg.zIndex ?? 30 }}
    />
  );
}
