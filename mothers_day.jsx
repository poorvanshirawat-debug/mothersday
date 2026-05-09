import { useState, useEffect, useRef } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');`;

const globalCSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Quicksand', sans-serif; background: #000; overflow-x: hidden; cursor: none; }

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #38bdf8, #4ade80); border-radius: 2px; }

.cursor-glow {
  position: fixed; pointer-events: none; z-index: 9999;
  width: 20px; height: 20px; border-radius: 50%;
  background: radial-gradient(circle, rgba(56,189,248,0.8) 0%, rgba(74,222,128,0.3) 60%, transparent 80%);
  transform: translate(-50%, -50%);
  transition: transform 0.05s, width 0.2s, height 0.2s;
  mix-blend-mode: screen;
}
.cursor-trail {
  position: fixed; pointer-events: none; z-index: 9998;
  width: 40px; height: 40px; border-radius: 50%;
  background: radial-gradient(circle, rgba(74,222,128,0.2) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: transform 0.15s ease-out;
  mix-blend-mode: screen;
}

.scroll-progress {
  position: fixed; top: 0; left: 0; height: 3px; z-index: 9000;
  background: linear-gradient(90deg, #38bdf8, #4ade80, #f472b6);
  transition: width 0.1s linear;
  box-shadow: 0 0 10px rgba(56,189,248,0.8);
}

.music-btn {
  position: fixed; top: 20px; right: 20px; z-index: 8000;
  background: rgba(255,255,255,0.08); backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.15); border-radius: 50px;
  padding: 10px 20px; color: white; cursor: pointer;
  font-family: 'Quicksand', sans-serif; font-size: 13px; font-weight: 500;
  transition: all 0.3s; letter-spacing: 0.5px;
}
.music-btn:hover { background: rgba(255,255,255,0.15); border-color: rgba(56,189,248,0.5); box-shadow: 0 0 20px rgba(56,189,248,0.3); }

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
  50% { transform: translateY(-20px) rotate(10deg); opacity: 1; }
}
@keyframes floatHeart {
  0% { transform: translateY(100vh) scale(0) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 0.7; }
  100% { transform: translateY(-10vh) scale(1) rotate(360deg); opacity: 0; }
}
@keyframes pulse-glow {
  0%, 100% { text-shadow: 0 0 30px rgba(56,189,248,0.5), 0 0 60px rgba(74,222,128,0.3); }
  50% { text-shadow: 0 0 60px rgba(56,189,248,0.9), 0 0 120px rgba(74,222,128,0.6), 0 0 180px rgba(244,114,182,0.3); }
}
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.15); }
  28% { transform: scale(1); }
  42% { transform: scale(1.1); }
  70% { transform: scale(1); }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-60px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(60px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes ripple {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
}
@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}
@keyframes blink {
  50% { border-color: transparent; }
}

.animated-bg {
  background: linear-gradient(-45deg, #0c1445, #0a2a1a, #051a2e, #0d2b1a, #1a0533, #0c2436);
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
}

.hero-title {
  font-family: 'Playfair Display', serif;
  background: linear-gradient(135deg, #38bdf8, #4ade80, #a78bfa, #f472b6, #38bdf8);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease infinite, pulse-glow 3s ease-in-out infinite;
  filter: drop-shadow(0 0 30px rgba(56,189,248,0.4));
}

.glass-card {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
}

.glow-btn {
  background: linear-gradient(135deg, rgba(56,189,248,0.2), rgba(74,222,128,0.2));
  border: 1px solid rgba(56,189,248,0.4);
  border-radius: 50px;
  color: white;
  padding: 16px 40px;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.4s;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
}
.glow-btn::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #38bdf8, #4ade80, #f472b6);
  border-radius: 52px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s;
}
.glow-btn:hover::before { opacity: 1; }
.glow-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 20px 60px rgba(56,189,248,0.4), 0 0 30px rgba(74,222,128,0.3);
}

.memory-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px rgba(56,189,248,0.3), 0 0 0 1px rgba(56,189,248,0.3);
}
.reason-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 25px 60px rgba(74,222,128,0.25), 0 0 0 1px rgba(74,222,128,0.3);
}

.particle { position: absolute; border-radius: 50%; pointer-events: none; }

.section-title {
  font-family: 'Playfair Display', serif;
  background: linear-gradient(135deg, #38bdf8, #4ade80);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.shimmer-text {
  background: linear-gradient(90deg, #94a3b8 25%, #e2e8f0 50%, #94a3b8 75%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
}

.open-when-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.open-when-card:hover { border-color: rgba(56,189,248,0.4) !important; box-shadow: 0 0 30px rgba(56,189,248,0.15); }

.final-heart {
  animation: heartbeat 1.5s ease-in-out infinite;
  filter: drop-shadow(0 0 30px rgba(244,114,182,0.8));
}

.stars-bg { position: absolute; inset: 0; overflow: hidden; }
.star {
  position: absolute;
  background: white;
  border-radius: 50%;
}
`;

function Cursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  useEffect(() => {
    const move = e => {
      if (cursorRef.current) { cursorRef.current.style.left = e.clientX + "px"; cursorRef.current.style.top = e.clientY + "px"; }
      if (trailRef.current) { trailRef.current.style.left = e.clientX + "px"; trailRef.current.style.top = e.clientY + "px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div ref={cursorRef} className="cursor-glow" />
      <div ref={trailRef} className="cursor-trail" />
    </>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div className="scroll-progress" style={{ width: progress + "%" }} />;
}

function Stars() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
  }));
  return (
    <div className="stars-bg">
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          left: s.x + "%", top: s.y + "%",
          width: s.size + "px", height: s.size + "px",
          opacity: 0.4,
          animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

function FloatingHearts({ count = 12 }) {
  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 95 + "%",
    size: Math.random() * 16 + 10,
    delay: Math.random() * 8,
    duration: Math.random() * 6 + 8,
    emoji: ["💙", "💚", "🩵", "💫", "✨", "🌸", "💕"][Math.floor(Math.random() * 7)],
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100, overflow: "hidden" }}>
      {hearts.map(h => (
        <div key={h.id} style={{
          position: "absolute", bottom: 0, left: h.left,
          fontSize: h.size + "px",
          animation: `floatHeart ${h.duration}s linear ${h.delay}s infinite`,
        }}>{h.emoji}</div>
      ))}
    </div>
  );
}

function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 3,
    color: ["rgba(56,189,248,0.4)", "rgba(74,222,128,0.4)", "rgba(167,139,250,0.4)", "rgba(244,114,182,0.3)"][Math.floor(Math.random() * 4)],
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left: p.x + "%", top: p.y + "%",
          width: p.size + "px", height: p.size + "px",
          background: p.color,
          animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

function TypewriterText({ text, style, delay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(t);
  }, [started, text, delay]);
  return <span ref={ref} style={style}>{displayed}<span style={{ borderRight: "2px solid rgba(56,189,248,0.7)", animation: "blink 1s step-end infinite", marginLeft: 2 }} /></span>;
}

function FadeInSection({ children, delay = 0, direction = "up" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const anim = direction === "left" ? "slideInLeft" : direction === "right" ? "slideInRight" : "fadeInUp";
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      animation: visible ? `${anim} 0.8s ease ${delay}s both` : "none",
      transition: "opacity 0.1s",
    }}>
      {children}
    </div>
  );
}

// ——————————————————————————————
// HERO
// ——————————————————————————————
function Hero({ onScroll }) {
  return (
    <section className="animated-bg" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "40px 20px",
      textAlign: "center",
    }}>
      <Stars />
      <Particles />

      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "15%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "8%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 800 }}>
        <FadeInSection delay={0.1}>
          <div style={{ fontSize: 16, color: "rgba(74,222,128,0.8)", letterSpacing: 4, textTransform: "uppercase", marginBottom: 24, fontWeight: 500 }}>
            Happy Mother's Day 🌸
          </div>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <h1 className="hero-title" style={{ fontSize: "clamp(56px, 10vw, 110px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
            I LOVE YOU ❤️
          </h1>
        </FadeInSection>

        <FadeInSection delay={0.6}>
          <p style={{ fontSize: "clamp(18px, 3vw, 28px)", color: "rgba(255,255,255,0.8)", fontWeight: 300, lineHeight: 1.6, marginBottom: 16, fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
            To the woman who made my world beautiful.
          </p>
        </FadeInSection>

        <FadeInSection delay={0.9}>
          <p style={{ fontSize: "clamp(16px, 2.5vw, 22px)", color: "rgba(56,189,248,0.9)", fontWeight: 500, marginBottom: 48 }}>
            Will you always be my safe place forever? 💙
          </p>
        </FadeInSection>

        <FadeInSection delay={1.2}>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="glow-btn" onClick={onScroll} style={{ fontSize: "clamp(14px,2vw,16px)" }}>YES ALWAYS ❤️</button>
            <button className="glow-btn" onClick={onScroll} style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.2), rgba(167,139,250,0.2))", borderColor: "rgba(74,222,128,0.4)", fontSize: "clamp(14px,2vw,16px)" }}>
              FOREVER &amp; EVER 🌸
            </button>
          </div>
        </FadeInSection>
      </div>

      {/* Scroll hint */}
      <FadeInSection delay={1.8}>
        <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", animation: "float 3s ease-in-out infinite" }}>
          scroll down ↓
        </div>
      </FadeInSection>
    </section>
  );
}

// ——————————————————————————————
// LETTER
// ——————————————————————————————
const letterParagraphs = [
  "From the very first moment you held me, you gave me everything — your warmth, your strength, your unconditional love. Long before I could speak the words, I felt it. The way you stayed awake through countless nights so I could sleep peacefully. The way you sacrificed your own dreams just so mine could take flight.",
  "I remember the smell of your kitchen when you cooked my favorite meals, even after long exhausting days. I remember how you wiped my tears when the world felt too heavy, never once making me feel like a burden. You were — and still are — my home.",
  "There were moments I didn't understand your decisions, times I pushed back, times I was too young to see how much you were carrying. But now I see it. Every sleepless night, every silent prayer, every careful choice — all of it was love. A love so deep it has no language.",
  "You taught me resilience without lecturing. You showed me grace by living it. You gave me roots by always being there, and wings by trusting me to fly. Not many people get to experience a love like yours. I am one of the lucky ones.",
  "I carry you with me in everything — in how I treat others, in how I face difficulty, in how I find beauty in ordinary moments. You are woven into every good part of who I am.",
  "No amount of flowers, gifts, or words could ever repay what you've given me. But please know: I see you. I appreciate you. I am so endlessly, deeply grateful for you. You are my greatest blessing, and I will spend my whole life making sure you never doubt that. ❤️",
];

function Letter() {
  return (
    <section id="letter" style={{ padding: "100px 20px", position: "relative", background: "linear-gradient(180deg, #060d1f 0%, #03110a 100%)" }}>
      <Stars />
      <div style={{ maxWidth: 780, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <FadeInSection>
          <h2 className="section-title" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, textAlign: "center", marginBottom: 60, fontFamily: "'Playfair Display', serif" }}>
            A Letter For You 💌
          </h2>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="glass-card" style={{ padding: "clamp(30px, 5vw, 60px)" }}>
            <div style={{ color: "rgba(56,189,248,0.7)", fontSize: 14, letterSpacing: 3, textTransform: "uppercase", marginBottom: 32 }}>
              Dear Mama,
            </div>
            {letterParagraphs.map((p, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <p style={{
                  color: "rgba(255,255,255,0.82)", fontSize: "clamp(15px,2vw,18px)",
                  lineHeight: 1.9, marginBottom: 24,
                  fontFamily: i % 3 === 1 ? "'Playfair Display', serif" : "'Quicksand', sans-serif",
                  fontStyle: i % 3 === 1 ? "italic" : "normal",
                  fontWeight: i % 3 === 1 ? 400 : 400,
                }}>
                  {p}
                </p>
              </FadeInSection>
            ))}
            <FadeInSection delay={1}>
              <div style={{ textAlign: "right", color: "rgba(74,222,128,0.7)", fontSize: 16, fontFamily: "'Playfair Display', serif", fontStyle: "italic", marginTop: 16 }}>
                — With all the love I have, always 💚
              </div>
            </FadeInSection>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// ——————————————————————————————
// TIMELINE
// ——————————————————————————————
const memories = [
  { year: "2006", caption: "The day you brought me into the world. Your first gift to me was your courage.", emoji: "🌟" },
  { year: "2020", caption: "You sat with me through every exam. Your belief in me never wavered — even when mine did.", emoji: "📚" },
  { year: "2022", caption: "Your hugs fixed every bad day. They still do, no matter how old I get.", emoji: "🤗" },
  { year: "2025", caption: "When the world felt uncertain, your voice on the phone was my anchor.", emoji: "💙" },
  { year: "2026", caption: "Every day I understand more deeply what you sacrificed. Every day I love you more.", emoji: "❤️" },
];

function Timeline() {
  return (
    <section style={{ padding: "100px 20px", background: "linear-gradient(180deg, #03110a 0%, #0c1445 100%)", position: "relative" }}>
      <Stars />
      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <FadeInSection>
          <h2 className="section-title" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, textAlign: "center", marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>
            Our Memories 📸
          </h2>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", marginBottom: 70, fontSize: 16 }}>
            Each one a treasure I'll carry forever
          </p>
        </FadeInSection>

        <div style={{ position: "relative" }}>
          {/* Center line */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg, transparent, rgba(56,189,248,0.4) 10%, rgba(74,222,128,0.4) 90%, transparent)", transform: "translateX(-50%)" }} />

          {memories.map((m, i) => (
            <FadeInSection key={i} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
              <div style={{
                display: "flex", justifyContent: i % 2 === 0 ? "flex-end" : "flex-start",
                paddingRight: i % 2 === 0 ? "calc(50% + 30px)" : 0,
                paddingLeft: i % 2 !== 0 ? "calc(50% + 30px)" : 0,
                marginBottom: 40,
                position: "relative",
              }}>
                {/* Dot */}
                <div style={{
                  position: "absolute", left: "50%", top: 24, transform: "translateX(-50%)",
                  width: 14, height: 14, borderRadius: "50%",
                  background: "linear-gradient(135deg, #38bdf8, #4ade80)",
                  boxShadow: "0 0 20px rgba(56,189,248,0.6)",
                  zIndex: 2,
                }} />
                <div className="glass-card memory-card" style={{
                  maxWidth: 340, padding: "28px 32px",
                  transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                  cursor: "pointer",
                }}>
                  <div style={{ fontSize: 52, marginBottom: 14, lineHeight: 1 }}>{m.emoji}</div>
                  <div style={{ color: "rgba(56,189,248,0.8)", fontWeight: 700, fontSize: 22, fontFamily: "'Playfair Display', serif", marginBottom: 10 }}>
                    {m.year}
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.7 }}>{m.caption}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ——————————————————————————————
// REASONS
// ——————————————————————————————
const reasons = [
  { icon: "💪", title: "You Never Gave Up On Me", body: "Even when I gave you every reason to, you stayed. Your faith in me became the foundation I built myself upon." },
  { icon: "🌧️", title: "You Loved Me on Difficult Days", body: "Your love wasn't conditional on my perfection. You loved me through my worst moments, and that changed me forever." },
  { icon: "🏠", title: "Your Smile Feels Like Home", body: "No matter where I am in the world, one look at your smile and I'm safe. You are my home." },
  { icon: "✨", title: "Your Sacrifices Built My Future", body: "Every dream I chase has your fingerprints on it. Your quiet sacrifices gave me a running start at life." },
  { icon: "🌺", title: "You Made Ordinary Beautiful", body: "Sunday mornings, kitchen conversations, old family photos — you taught me that magic lives in small moments." },
  { icon: "🫂", title: "You Were Always Present", body: "In a world full of distractions, you chose to be fully present. Every school play, every bad grade, every triumph." },
];

function Reasons() {
  return (
    <section style={{ padding: "100px 20px", background: "linear-gradient(180deg, #0c1445 0%, #03110a 100%)", position: "relative" }}>
      <Stars />
      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <FadeInSection>
          <h2 className="section-title" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, textAlign: "center", marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>
            Why I Love You 💚
          </h2>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", marginBottom: 60, fontSize: 16 }}>
            There are more reasons than stars in the sky
          </p>
        </FadeInSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {reasons.map((r, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div className="glass-card reason-card" style={{
                padding: "32px 28px", cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                background: "rgba(255,255,255,0.04)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: "linear-gradient(90deg, #38bdf8, #4ade80)",
                  opacity: 0.6,
                }} />
                <div style={{ fontSize: 36, marginBottom: 16 }}>{r.icon}</div>
                <h3 style={{ color: "white", fontSize: 18, fontWeight: 600, marginBottom: 12, lineHeight: 1.3 }}>{r.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.8 }}>{r.body}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ——————————————————————————————
// OPEN WHEN
// ——————————————————————————————
const openWhenItems = [
  {
    trigger: "Open When You Are Sad 💙",
    color: "#38bdf8",
    message: "Mama, if you are reading this through tears, please know — every storm passes. You have weathered so many of them with such quiet grace. You are not weak for feeling sad; you are human. And you are so deeply loved. I am here, always. When your heart feels heavy, remember: you have given the world something irreplaceable — yourself. That matters more than you know.",
  },
  {
    trigger: "Open When You Miss Me 🌸",
    color: "#f472b6",
    message: "Missing someone means they lived so deep in your heart they left an echo. Every time you miss me, know that I am missing you too — the warmth of your presence, your voice, the comfort of just being near you. Distance is only physical. The love between us crosses every mile. I carry you with me, always.",
  },
  {
    trigger: "Open When You Are Tired 💚",
    color: "#4ade80",
    message: "You have worked so hard, for so long, for so many people. If there is one person on this earth who deserves rest, it is you. Please — close your eyes. Let the world carry itself for a moment. You do not always have to be strong. Let yourself be held. You have earned every quiet moment of peace.",
  },
  {
    trigger: "Open When Life Feels Difficult ✨",
    color: "#a78bfa",
    message: "Life does not always make sense. There are chapters that feel impossible to get through. But you — you have survived 100% of your hardest days so far. That is your evidence. You are more resilient than the storms that come. I believe in you with my whole heart. One breath at a time. One day at a time.",
  },
  {
    trigger: "Open When You Need a Smile 🌻",
    color: "#fbbf24",
    message: "Remember the time we laughed until we cried over absolutely nothing? Remember how the kitchen smelled on Sunday mornings? Remember all the inside jokes no one else would understand? Those memories live in me like sunlight. You gave me every single one of them. Now smile — because you are so incredibly loved, and the world is better with you in it.",
  },
];

function OpenWhen() {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ padding: "100px 20px", background: "linear-gradient(180deg, #03110a 0%, #060d1f 100%)", position: "relative" }}>
      <Stars />
      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <FadeInSection>
          <h2 className="section-title" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, textAlign: "center", marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>
            Open When… 💌
          </h2>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", marginBottom: 60, fontSize: 16 }}>
            Little notes for every kind of day
          </p>
        </FadeInSection>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {openWhenItems.map((item, i) => (
            <FadeInSection key={i} delay={i * 0.08}>
              <div className="open-when-card" style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid rgba(255,255,255,0.08)`,
                borderRadius: 16, overflow: "hidden",
              }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{
                  width: "100%", padding: "20px 28px", background: "none", border: "none",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  cursor: "pointer", textAlign: "left",
                }}>
                  <span style={{ color: "white", fontSize: "clamp(14px,2vw,17px)", fontWeight: 600 }}>{item.trigger}</span>
                  <span style={{
                    color: item.color, fontSize: 20, transition: "transform 0.3s",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    display: "inline-block",
                  }}>+</span>
                </button>
                {open === i && (
                  <div style={{ padding: "0 28px 24px", animation: "fadeInUp 0.4s ease both" }}>
                    <div style={{ width: 40, height: 2, background: item.color, marginBottom: 16, opacity: 0.6 }} />
                    <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(14px,2vw,16px)", lineHeight: 1.8, fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
                      {item.message}
                    </p>
                  </div>
                )}
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ——————————————————————————————
// EMOJI MOSAIC
// ——————————————————————————————
const mosaicItems = [
  { emoji: "🌸", label: "Your warmth", color: "rgba(244,114,182,0.12)", border: "rgba(244,114,182,0.25)" },
  { emoji: "☀️", label: "Your light", color: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.25)" },
  { emoji: "🌊", label: "Your calm", color: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.25)" },
  { emoji: "🍃", label: "Your peace", color: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.25)" },
  { emoji: "🌙", label: "Your comfort", color: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.3)" },
  { emoji: "🎂", label: "Every celebration", color: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.2)" },
  { emoji: "🌺", label: "Your beauty", color: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)" },
  { emoji: "💫", label: "Your magic", color: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.2)" },
  { emoji: "🕊️", label: "Your grace", color: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.12)" },
  { emoji: "🌿", label: "Your growth", color: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.2)" },
  { emoji: "💙", label: "Your love", color: "rgba(56,189,248,0.12)", border: "rgba(56,189,248,0.3)" },
  { emoji: "✨", label: "Your spirit", color: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.2)" },
];

function EmojiMosaic() {
  return (
    <section style={{ padding: "100px 20px", background: "linear-gradient(180deg, #060d1f 0%, #03110a 100%)", position: "relative" }}>
      <Stars />
      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <FadeInSection>
          <h2 className="section-title" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, textAlign: "center", marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>
            Everything You Are 🌸
          </h2>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", marginBottom: 60, fontSize: 16 }}>
            Every piece of you is a gift to the world
          </p>
        </FadeInSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16 }}>
          {mosaicItems.map((item, i) => (
            <FadeInSection key={i} delay={i * 0.06}>
              <div style={{
                background: item.color,
                border: `1px solid ${item.border}`,
                borderRadius: 20,
                padding: "32px 16px",
                textAlign: "center",
                cursor: "default",
                transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px) scale(1.04)";
                e.currentTarget.style.boxShadow = `0 20px 50px ${item.border}`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}>
                <div style={{ fontSize: 44, marginBottom: 14, lineHeight: 1 }}>{item.emoji}</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500, letterSpacing: 0.5 }}>{item.label}</div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Emotional quote row */}
        <FadeInSection delay={0.4}>
          <div style={{ marginTop: 60, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            {["You are my sunrise 🌅", "You are my anchor ⚓", "You are my home 🏡", "You are my hero 🦋"].map((q, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 50, padding: "12px 24px",
                color: "rgba(255,255,255,0.65)", fontSize: 14, fontWeight: 500,
                fontFamily: "'Playfair Display', serif", fontStyle: "italic",
              }}>{q}</div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// ——————————————————————————————
// FINAL
// ——————————————————————————————
function Final() {
  return (
    <section className="animated-bg" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "80px 20px",
      textAlign: "center",
    }}>
      <Stars />
      <Particles />
      {/* Extra deep glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,114,182,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 700 }}>
        <FadeInSection>
          {/* Glowing animated heart */}
          <div className="final-heart" style={{ fontSize: "clamp(60px, 10vw, 100px)", marginBottom: 40 }}>❤️</div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <h2 className="hero-title" style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 700, marginBottom: 28, lineHeight: 1.2, fontFamily: "'Playfair Display', serif" }}>
            Thank You For Everything ❤️
          </h2>
        </FadeInSection>

        <FadeInSection delay={0.4}>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(16px,2.5vw,22px)", lineHeight: 1.8, marginBottom: 50, fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
            No words, gift, or website could ever fully express what you mean to me.
          </p>
        </FadeInSection>

        {/* Ripple rings */}
        <FadeInSection delay={0.5}>
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 120, height: 120, marginBottom: 50 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                position: "absolute", width: 80, height: 80, borderRadius: "50%",
                border: "1px solid rgba(244,114,182,0.4)",
                animation: `ripple 2.4s ease-out ${i * 0.6}s infinite`,
              }} />
            ))}
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, rgba(244,114,182,0.4), rgba(167,139,250,0.4))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
              💕
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.7}>
          <div className="glass-card" style={{ padding: "32px 48px", display: "inline-block" }}>
            <p style={{ color: "rgba(56,189,248,0.9)", fontSize: "clamp(18px,3vw,26px)", fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400, lineHeight: 1.6 }}>
              "Home will always be wherever you are."
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.9}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginTop: 48, letterSpacing: 2, textTransform: "uppercase" }}>
            Made with ❤️ for the most important person in my world
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}

// ——————————————————————————————
// MUSIC BUTTON
// ——————————————————————————————
function MusicBtn() {
  const [on, setOn] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create a simple Web Audio API tone as placeholder music feedback
    if (!audioRef.current) return;
  }, []);

  const toggle = () => {
    setOn(v => !v);
    // Real implementation would control audio element here
  };

  return (
    <button className="music-btn" onClick={toggle} title="Toggle background music">
      {on ? "🎵 Music On" : "🔇 Music Off"}
    </button>
  );
}

// ——————————————————————————————
// APP
// ——————————————————————————————
export default function App() {
  const letterRef = useRef(null);

  const scrollToLetter = () => {
    document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{FONT + globalCSS}</style>
      <Cursor />
      <ScrollProgress />
      <FloatingHearts count={10} />
      <MusicBtn />
      <Hero onScroll={scrollToLetter} />
      <Letter />
      <Timeline />
      <Reasons />
      <OpenWhen />
      <EmojiMosaic />
      <Final />
    </>
  );
}
