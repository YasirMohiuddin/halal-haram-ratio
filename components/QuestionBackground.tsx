"use client";

import { useEffect, useRef } from "react";

export type QuestionTheme =
  | "cityNight" | "warmAmber" | "eveningStars" | "smokeWisps" | "neonPulse"
  | "lateNight" | "dawn" | "mosque" | "deepBlue" | "socialGlow"
  | "messageBubble" | "ramadan" | "nightDrive" | "laylat" | "eid";

export const QUESTION_THEMES: QuestionTheme[] = [
  "cityNight",     // Q1  Friday night group chat
  "warmAmber",     // Q2  Food / eating
  "eveningStars",  // Q3  Evening out, cousin going out
  "smokeWisps",    // Q4  Vape / smoke
  "neonPulse",     // Q5  Someone eyeing you
  "lateNight",     // Q6  1am mum calls
  "dawn",          // Q7  Fajr / Maghrib
  "mosque",        // Q8  Prayer count
  "deepBlue",      // Q9  Guilt / reflection
  "socialGlow",    // Q10 Instagram
  "messageBubble", // Q11 DMs
  "ramadan",       // Q12 Ramadan starts
  "nightDrive",    // Q13 Driving / music
  "laylat",        // Q14 Last 10 days / sadaqah
  "eid",           // Q15 Eid
];

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;
type ThemeFactory = (w: number, h: number) => DrawFn;

// ─── Q1: City night - large drifting bokeh orbs ──────────────────────────────
function makeCityNight(w: number, h: number): DrawFn {
  const orbs = Array.from({ length: 18 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 35 + Math.random() * 75,
    vx: (Math.random() - 0.5) * 9,
    vy: (Math.random() - 0.5) * 9,
    hue: [35, 45, 28][Math.floor(Math.random() * 3)],
    alpha: 0.07 + Math.random() * 0.11,
  }));
  return (ctx, w, h) => {
    for (const o of orbs) {
      o.x += o.vx * 0.016;
      o.y += o.vy * 0.016;
      if (o.x < -o.r) o.x = w + o.r;
      if (o.x > w + o.r) o.x = -o.r;
      if (o.y < -o.r) o.y = h + o.r;
      if (o.y > h + o.r) o.y = -o.r;
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      g.addColorStop(0, `hsla(${o.hue},80%,65%,${o.alpha})`);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fill();
    }
  };
}

// ─── Q2: Warm amber - rising ember particles ─────────────────────────────────
function makeWarmAmber(w: number, h: number): DrawFn {
  const pts = Array.from({ length: 60 }, () => ({
    x: Math.random() * w,
    y: h + Math.random() * h,
    vy: -(0.3 + Math.random() * 0.7),
    vx: (Math.random() - 0.5) * 0.3,
    size: 0.8 + Math.random() * 2.2,
    alpha: 0.3 + Math.random() * 0.5,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.5 + Math.random() * 1.5,
    hue: 22 + Math.floor(Math.random() * 28),
  }));
  return (ctx, w, h, t) => {
    const bg = ctx.createLinearGradient(0, h * 0.55, 0, h);
    bg.addColorStop(0, "transparent");
    bg.addColorStop(1, "rgba(200,100,20,0.06)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    for (const p of pts) {
      p.y += p.vy;
      p.x += p.vx + Math.sin(t * p.wobbleSpeed + p.wobble) * 0.4;
      if (p.y < -10) { p.y = h + 5; p.x = Math.random() * w; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},90%,65%,${p.alpha})`;
      ctx.fill();
    }
  };
}

// ─── Q3: Evening stars - twinkling star field with sparkle bursts ─────────────
function makeEveningStars(w: number, h: number): DrawFn {
  const stars = Array.from({ length: 130 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: 0.5 + Math.random() * 2,
    freq: 0.4 + Math.random() * 2,
    phase: Math.random() * Math.PI * 2,
    baseAlpha: 0.3 + Math.random() * 0.6,
    sparkle: Math.random() < 0.12,
  }));
  return (ctx, w, h, t) => {
    for (const s of stars) {
      const v = Math.sin(t * s.freq + s.phase);
      const alpha = s.baseAlpha * (0.35 + 0.65 * Math.abs(v));
      if (s.sparkle && v > 0.93) {
        ctx.strokeStyle = `rgba(255,240,200,${alpha * 0.9})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(s.x - s.size * 3.5, s.y);
        ctx.lineTo(s.x + s.size * 3.5, s.y);
        ctx.moveTo(s.x, s.y - s.size * 3.5);
        ctx.lineTo(s.x, s.y + s.size * 3.5);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,240,210,${alpha})`;
      ctx.fill();
    }
  };
}

// ─── Q4: Haze drift - soft amber glow orbs drifting slowly ──────────────────
function makeSmokeWisps(w: number, h: number): DrawFn {
  const orbs = Array.from({ length: 6 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 3,
    r: 70 + Math.random() * 90,
    alpha: 0.018 + Math.random() * 0.022,
    hue: 28 + Math.floor(Math.random() * 20),
    phase: Math.random() * Math.PI * 2,
  }));
  return (ctx, w, h, t) => {
    for (const o of orbs) {
      o.x += o.vx * 0.016;
      o.y += o.vy * 0.016;
      if (o.x < -o.r) o.x = w + o.r;
      if (o.x > w + o.r) o.x = -o.r;
      if (o.y < -o.r) o.y = h + o.r;
      if (o.y > h + o.r) o.y = -o.r;
      const pulse = 0.85 + 0.15 * Math.sin(t * 0.4 + o.phase);
      const r = o.r * pulse;
      const a = o.alpha * pulse;
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
      g.addColorStop(0, `hsla(${o.hue},70%,55%,${a})`);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(o.x, o.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  };
}

// ─── Q5: Neon pulse - pulsing rings in hot pink / magenta ────────────────────
function makeNeonPulse(w: number, h: number): DrawFn {
  const rings = [
    { x: w * 0.5, y: h * 0.38, r: 80, phase: 0, freq: 0.6, hue: 18 },
    { x: w * 0.22, y: h * 0.68, r: 58, phase: 1.5, freq: 0.9, hue: 32 },
    { x: w * 0.78, y: h * 0.58, r: 68, phase: 3.1, freq: 0.7, hue: 8 },
  ];
  return (ctx, w, h, t) => {
    for (const ring of rings) {
      const pulse = 0.5 + 0.5 * Math.sin(t * ring.freq + ring.phase);
      const r = ring.r + pulse * 32;
      const alpha = 0.05 + pulse * 0.13;
      const g = ctx.createRadialGradient(ring.x, ring.y, r * 0.4, ring.x, ring.y, r);
      g.addColorStop(0, "transparent");
      g.addColorStop(0.6, `hsla(${ring.hue},100%,65%,${alpha})`);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  };
}

// ─── Q6: Late night - cold blue stillness + blinking notification ─────────────
function makeLateNight(w: number, h: number): DrawFn {
  const pts = Array.from({ length: 14 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.14,
    vy: (Math.random() - 0.5) * 0.14,
    size: 1 + Math.random() * 2,
    alpha: 0.08 + Math.random() * 0.18,
    freq: 0.25 + Math.random(),
    phase: Math.random() * Math.PI * 2,
  }));
  return (ctx, w, h, t) => {
    const g = ctx.createRadialGradient(w * 0.8, h * 0.1, 0, w * 0.8, h * 0.1, w * 0.55);
    g.addColorStop(0, "rgba(120,80,15,0.07)");
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      const alpha = p.alpha * (0.4 + 0.6 * Math.abs(Math.sin(t * p.freq + p.phase)));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(210,175,100,${alpha})`;
      ctx.fill();
    }
    const blink = 0.5 + 0.5 * Math.sin(t * 1.4);
    ctx.beginPath();
    ctx.arc(w - 22, 28, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(212,168,67,${blink * 0.85})`;
    ctx.fill();
  };
}

// ─── Q7: Dawn - shifting aurora bands + floating motes ───────────────────────
function makeDawn(w: number, h: number): DrawFn {
  const motes = Array.from({ length: 22 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.18,
    vy: -0.05 - Math.random() * 0.14,
    size: 0.8 + Math.random() * 2,
    alpha: 0.2 + Math.random() * 0.45,
    phase: Math.random() * Math.PI * 2,
  }));
  return (ctx, w, h, t) => {
    const dawn1 = Math.abs(Math.sin(t * 0.07));
    const r1 = Math.floor(80 + dawn1 * 45);
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, `rgba(${r1},65,18,0.09)`);
    g.addColorStop(0.5, `rgba(175,85,38,0.04)`);
    g.addColorStop(1, `rgba(110,60,12,0.07)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    const bandY = h * 0.28 + Math.sin(t * 0.09) * h * 0.09;
    const band = ctx.createLinearGradient(0, bandY - 90, 0, bandY + 90);
    band.addColorStop(0, "transparent");
    band.addColorStop(0.5, `rgba(210,130,55,${0.04 + 0.04 * Math.sin(t * 0.18)})`);
    band.addColorStop(1, "transparent");
    ctx.fillStyle = band;
    ctx.fillRect(0, bandY - 90, w, 180);

    for (const m of motes) {
      m.x += m.vx; m.y += m.vy;
      if (m.y < -5) { m.y = h + 5; m.x = Math.random() * w; }
      const alpha = m.alpha * (0.5 + 0.5 * Math.sin(t * 0.85 + m.phase));
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,185,85,${alpha})`;
      ctx.fill();
    }
  };
}

// ─── Q8: Mosque - geometric star overlay + orbiting gold particles ────────────
function makeMosque(w: number, h: number): DrawFn {
  const stars = Array.from({ length: 32 }, () => ({
    angle: Math.random() * Math.PI * 2,
    radius: 22 + Math.random() * Math.min(w, h) * 0.42,
    speed: (Math.random() < 0.5 ? 1 : -1) * (0.008 + Math.random() * 0.014),
    size: 0.8 + Math.random() * 1.5,
    alpha: 0.15 + Math.random() * 0.35,
  }));
  return (ctx, w, h) => {
    const cx = w * 0.5, cy = h * 0.4;
    const scale = Math.min(w, h) * 0.38;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = "rgba(212,168,67,0.045)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 4);
      ctx.beginPath();
      ctx.moveTo(0, -scale);
      ctx.lineTo(scale * 0.22, -scale * 0.22);
      ctx.lineTo(scale, 0);
      ctx.stroke();
      ctx.restore();
    }
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI * 2) / 8 - Math.PI / 8;
      const x = Math.cos(a) * scale, y = Math.sin(a) * scale;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    for (const s of stars) {
      s.angle += s.speed;
      const x = cx + Math.cos(s.angle) * s.radius;
      const y = cy + Math.sin(s.angle) * s.radius;
      ctx.beginPath();
      ctx.arc(x, y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,168,67,${s.alpha})`;
      ctx.fill();
    }
  };
}

// ─── Q9: Deep blue - ripple circles expanding from center ────────────────────
function makeDeepBlue(w: number, h: number): DrawFn {
  const ripples: { r: number; alpha: number; speed: number }[] = [];
  let lastSpawn = -2;
  return (ctx, w, h, t) => {
    if (t - lastSpawn > 2.2) {
      ripples.push({ r: 0, alpha: 0.28, speed: 42 + Math.random() * 22 });
      lastSpawn = t;
    }
    const cx = w * 0.5, cy = h * 0.5;
    const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
    cg.addColorStop(0, "rgba(160,100,15,0.09)");
    cg.addColorStop(1, "transparent");
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.arc(cx, cy, 90, 0, Math.PI * 2);
    ctx.fill();
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += rp.speed * 0.016;
      rp.alpha -= 0.003;
      if (rp.alpha <= 0) { ripples.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.arc(cx, cy, rp.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(212,168,67,${rp.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  };
}

// ─── Q10: Social glow - grid of dots with random flickers ────────────────────
function makeSocialGlow(w: number, h: number): DrawFn {
  const COLS = 10, ROWS = 15;
  const dots = Array.from({ length: COLS * ROWS }, (_, i) => ({
    col: i % COLS,
    row: Math.floor(i / COLS),
    lit: Math.random() < 0.28,
    nextToggle: Math.random() * 4,
  }));
  return (ctx, w, h, t) => {
    const cw = w / COLS, ch = h / ROWS;
    for (const d of dots) {
      if (t > d.nextToggle) {
        d.lit = Math.random() < 0.22;
        d.nextToggle = t + 0.8 + Math.random() * 4;
      }
      const x = (d.col + 0.5) * cw, y = (d.row + 0.5) * ch;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = d.lit ? "rgba(212,168,67,0.45)" : "rgba(255,255,255,0.04)";
      ctx.fill();
    }
  };
}

// ─── Q11: Message bubbles - rounded rects floating upward ────────────────────
function makeMessageBubble(w: number, h: number): DrawFn {
  const bubbles: { x: number; y: number; vy: number; alpha: number; bw: number }[] = [];
  let lastSpawn = 0;
  return (ctx, w, h, t) => {
    if (t - lastSpawn > 0.9 + Math.random() * 0.9) {
      bubbles.push({
        x: w * 0.18 + Math.random() * w * 0.64,
        y: h + 24,
        vy: -(28 + Math.random() * 28),
        alpha: 0.35 + Math.random() * 0.3,
        bw: 38 + Math.random() * 64,
      });
      lastSpawn = t;
    }
    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      b.y += b.vy * 0.016;
      b.alpha -= 0.0028;
      if (b.alpha <= 0 || b.y < -32) { bubbles.splice(i, 1); continue; }
      const bh = 20;
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(b.x - b.bw / 2, b.y - bh / 2, b.bw, bh, 10);
      ctx.fillStyle = `rgba(212,185,120,${b.alpha * 0.28})`;
      ctx.strokeStyle = `rgba(212,185,120,${b.alpha})`;
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  };
}

// ─── Q12: Ramadan - star field + crescent + lantern glows ────────────────────
function makeRamadan(w: number, h: number): DrawFn {
  const stars = Array.from({ length: 90 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h * 0.72,
    size: 0.5 + Math.random() * 1.5,
    freq: 0.3 + Math.random() * 1.5,
    phase: Math.random() * Math.PI * 2,
    alpha: 0.2 + Math.random() * 0.6,
  }));
  const mx = w * 0.74, my = h * 0.14, mr = 36;
  const lanterns = [
    { x: w * 0.14, y: h * 0.32, r: 52, hue: 40 },
    { x: w * 0.86, y: h * 0.52, r: 42, hue: 30 },
  ];
  return (ctx, w, h, t) => {
    for (const s of stars) {
      const alpha = s.alpha * (0.45 + 0.55 * Math.abs(Math.sin(t * s.freq + s.phase)));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,240,200,${alpha})`;
      ctx.fill();
    }
    // Crescent using clip
    ctx.save();
    ctx.beginPath();
    ctx.arc(mx, my, mr, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = "rgba(255,232,105,0.22)";
    ctx.beginPath();
    ctx.arc(mx, my, mr, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(8,8,15,0.97)";
    ctx.beginPath();
    ctx.arc(mx + mr * 0.52, my, mr * 0.86, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    // Crescent outer glow
    const cg = ctx.createRadialGradient(mx, my, 0, mx, my, mr * 2);
    cg.addColorStop(0, "rgba(255,220,80,0.09)");
    cg.addColorStop(1, "transparent");
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.arc(mx, my, mr * 2, 0, Math.PI * 2);
    ctx.fill();
    // Lanterns
    for (const l of lanterns) {
      const pulse = 0.8 + 0.2 * Math.sin(t * 1.2 + l.x);
      const lg = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r * pulse);
      lg.addColorStop(0, `hsla(${l.hue},90%,65%,0.13)`);
      lg.addColorStop(1, "transparent");
      ctx.fillStyle = lg;
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.r * pulse, 0, Math.PI * 2);
      ctx.fill();
    }
  };
}

// ─── Q13: Night drive - horizontal light streaks ──────────────────────────────
function makeNightDrive(w: number, h: number): DrawFn {
  const streaks: { y: number; x: number; len: number; speed: number; alpha: number; lw: number }[] = [];
  let lastSpawn = 0;
  return (ctx, w, h, t) => {
    if (t - lastSpawn > 0.06 + Math.random() * 0.1) {
      streaks.push({
        y: Math.random() * h,
        x: w + 60,
        len: 40 + Math.random() * 130,
        speed: 200 + Math.random() * 320,
        alpha: 0.1 + Math.random() * 0.25,
        lw: 0.5 + Math.random() * 1.5,
      });
      lastSpawn = t;
    }
    for (let i = streaks.length - 1; i >= 0; i--) {
      const s = streaks[i];
      s.x -= s.speed * 0.016;
      if (s.x + s.len < 0) { streaks.splice(i, 1); continue; }
      const gr = ctx.createLinearGradient(s.x - s.len, s.y, s.x, s.y);
      gr.addColorStop(0, "transparent");
      gr.addColorStop(1, `rgba(212,185,120,${s.alpha})`);
      ctx.strokeStyle = gr;
      ctx.lineWidth = s.lw;
      ctx.beginPath();
      ctx.moveTo(s.x - s.len, s.y);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();
    }
  };
}

// ─── Q14: Laylatul Qadr - golden particles drifting down ─────────────────────
function makeLaylat(w: number, h: number): DrawFn {
  const pts = Array.from({ length: 75 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vy: 0.28 + Math.random() * 0.75,
    vx: (Math.random() - 0.5) * 0.28,
    size: 0.7 + Math.random() * 2,
    alpha: 0.18 + Math.random() * 0.6,
    phase: Math.random() * Math.PI * 2,
    hue: 34 + Math.floor(Math.random() * 22),
  }));
  return (ctx, w, h, t) => {
    const g = ctx.createRadialGradient(w * 0.5, h * 0.28, 0, w * 0.5, h * 0.28, w * 0.62);
    g.addColorStop(0, "rgba(160,100,15,0.06)");
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    for (const p of pts) {
      p.y += p.vy;
      p.x += p.vx + Math.sin(t * 0.48 + p.phase) * 0.32;
      if (p.y > h + 5) { p.y = -5; p.x = Math.random() * w; }
      const alpha = p.alpha * (0.55 + 0.45 * Math.sin(t * 0.75 + p.phase));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},90%,70%,${alpha})`;
      ctx.fill();
    }
  };
}

// ─── Q15: Eid - colourful tumbling confetti ───────────────────────────────────
function makeEid(w: number, h: number): DrawFn {
  const pieces = Array.from({ length: 65 }, () => ({
    x: Math.random() * w,
    y: -Math.random() * h,
    vx: (Math.random() - 0.5) * 1.4,
    vy: 0.8 + Math.random() * 1.6,
    pw: 4 + Math.random() * 6,
    ph: 2 + Math.random() * 4,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.1,
    hue: [44, 138, 30, 0, 50][Math.floor(Math.random() * 5)],
    alpha: 0.4 + Math.random() * 0.4,
  }));
  return (ctx, w, h, t) => {
    for (const c of pieces) {
      c.x += c.vx + Math.sin(t * 0.5 + c.rot) * 0.45;
      c.y += c.vy;
      c.rot += c.rotSpeed;
      if (c.y > h + 12) { c.y = -12; c.x = Math.random() * w; }
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rot);
      ctx.fillStyle = `hsla(${c.hue},85%,65%,${c.alpha})`;
      ctx.fillRect(-c.pw / 2, -c.ph / 2, c.pw, c.ph);
      ctx.restore();
    }
  };
}

// ─── Registry ─────────────────────────────────────────────────────────────────
const THEME_FACTORIES: Record<QuestionTheme, ThemeFactory> = {
  cityNight: makeCityNight,
  warmAmber: makeWarmAmber,
  eveningStars: makeEveningStars,
  smokeWisps: makeSmokeWisps,
  neonPulse: makeNeonPulse,
  lateNight: makeLateNight,
  dawn: makeDawn,
  mosque: makeMosque,
  deepBlue: makeDeepBlue,
  socialGlow: makeSocialGlow,
  messageBubble: makeMessageBubble,
  ramadan: makeRamadan,
  nightDrive: makeNightDrive,
  laylat: makeLaylat,
  eid: makeEid,
};

export default function QuestionBackground({ theme }: { theme: QuestionTheme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let drawFn: DrawFn | null = null;

    const setup = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFn = THEME_FACTORIES[theme](width, height);
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

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7, zIndex: 0 }}
    />
  );
}
