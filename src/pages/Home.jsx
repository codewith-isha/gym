import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import PageTransition from "../components/PageTransition";
import { TRANSFORMS } from "../data/index";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  ["2,400+", "Active Members"],
  ["98%", "Retention Rate"],
  ["6", "Years of Excellence"],
  ["18", "Expert Coaches"],
];

const QUICK_FEATURES = [
  { icon: "🔥", title: "Elite Programming", desc: "Science-backed training protocols used by professional athletes." },
  { icon: "🧠", title: "Expert Coaching", desc: "Certified coaches with 10+ years of specialised experience." },
  { icon: "💎", title: "Premium Facilities", desc: "State-of-art equipment in an environment built for performance." },
  { icon: "📊", title: "Progress Tracking", desc: "Monthly assessments and data-driven program adjustments." },
];

export default function Home() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);
  const eyebrowRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }, 0.4)
        .fromTo(titleRef.current,
          { opacity: 0, y: 50, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 1 }, 0.6)
        .fromTo(subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 }, 0.9)
        .fromTo(actionsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 }, 1.1)
        .fromTo(statsRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8 }, 1.2);

      // Parallax on hero bg
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(".hero-bg-inner", { y: self.progress * 80 });
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: "0 5%",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
      }}>
        <div className="hero-bg-inner" style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(201,168,76,0.04) 0%, transparent 60%),
            linear-gradient(180deg, #0A0A0A 0%, #0D0C0A 100%)
          `,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }} />

        {/* Floating orb */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            right: "15%", top: "30%",
            width: "400px", height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", maxWidth: "780px" }}>
          <div ref={eyebrowRef} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", opacity: 0 }}>
            <div style={{ width: "40px", height: "1px", background: "#C9A84C" }} />
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 500 }}>
              Premium Fitness Club — Est. 2018
            </span>
          </div>

          <h1 ref={titleRef} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            fontWeight: 300,
            lineHeight: 1.02,
            letterSpacing: "-0.01em",
            marginBottom: "1.5rem",
            opacity: 0,
          }}>
            Forge Your<br />
            <em style={{ fontStyle: "italic", color: "#C9A84C" }}>Strongest</em><br />
            Self
          </h1>

          <p ref={subtitleRef} style={{
            fontSize: "1.05rem", lineHeight: 1.7, color: "#888",
            maxWidth: "480px", fontWeight: 300, marginBottom: "2.5rem", opacity: 0,
          }}>
            Where elite coaching meets precision programming. Transform your body, elevate your mind, and redefine what's possible.
          </p>

          <div ref={actionsRef} style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap", opacity: 0 }}>
            <Link to="/pricing" className="btn-primary">Start Free Trial</Link>
            <Link to="/programs" className="btn-ghost">Explore Programs</Link>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} style={{
          position: "absolute", right: "5%", bottom: "12%",
          display: "flex", flexDirection: "column", gap: "2rem",
          opacity: 0, textAlign: "right",
        }} className="hero-stats-block">
          {STATS.map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.8rem", fontWeight: 600, color: "#C9A84C", lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", marginTop: "4px" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "1px", height: "50px", background: "linear-gradient(#C9A84C, transparent)" }}
          />
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#555" }}>Scroll</span>
        </motion.div>
      </section>

      {/* ── WHY FORGE ── */}
      <section className="section section-alt">
        <AnimatedSection>
          <div className="section-header" style={{ textAlign: "center" }}>
            <div className="section-eyebrow" style={{ justifyContent: "center" }}>
              <div className="eyebrow-dot" />
              <span className="eyebrow-text">Why FORGE</span>
            </div>
            <h2 className="section-title">Built for those who refuse<br />to <em>settle</em></h2>
            <div className="section-divider" style={{ margin: "1.5rem auto" }} />
          </div>
        </AnimatedSection>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}>
          {QUICK_FEATURES.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, borderColor: "rgba(201,168,76,0.5)" }}
                style={{
                  background: "#1A1A1A",
                  border: "1px solid rgba(201,168,76,0.18)",
                  borderRadius: "4px",
                  padding: "2rem",
                  transition: "border-color 0.3s",
                  cursor: "default",
                }}
              >
                <div style={{ fontSize: "2.2rem", marginBottom: "1.2rem" }}>{f.icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 400, marginBottom: "0.7rem" }}>{f.title}</div>
                <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section style={{
        padding: "5rem 5%",
        background: "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 50%)",
        borderTop: "1px solid rgba(201,168,76,0.12)",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}>
          {STATS.map(([n, l], i) => (
            <AnimatedSection key={l} delay={i * 0.1} direction="none">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 600, color: "#C9A84C", lineHeight: 1, marginBottom: "0.5rem" }}>{n}</div>
                <div style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#555" }}>{l}</div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── TRANSFORMATIONS ── */}
      <section className="section">
        <AnimatedSection>
          <div className="section-header">
            <div className="section-eyebrow"><div className="eyebrow-dot" /><span className="eyebrow-text">Transformations</span></div>
            <h2 className="section-title">Real people,<br /><em>real</em> results</h2>
            <div className="section-divider" />
          </div>
        </AnimatedSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {TRANSFORMS.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(201,168,76,0.5)" }}
                style={{
                  background: "#1A1A1A",
                  border: "1px solid rgba(201,168,76,0.18)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  transition: "border-color 0.3s",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "140px", position: "relative" }}>
                  <div style={{ background: "#161616", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>{t.before}</div>
                  <div style={{ background: "linear-gradient(135deg,#1a1a0d,#0f0f0a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>{t.after}</div>
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "32px", height: "32px", background: "#C9A84C", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", color: "#000", fontWeight: 700 }}>→</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "0.5rem 1rem", background: "#111" }}>
                  <span style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#555" }}>Before</span>
                  <span style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", textAlign: "right" }}>After ✦</span>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 400, marginBottom: "0.3rem" }}>{t.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "#C9A84C", fontWeight: 500, marginBottom: "0.6rem" }}>{t.meta}</div>
                  <p style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.6, fontStyle: "italic" }}>"{t.quote}"</p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{
        padding: "6rem 5%",
        background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(10,10,10,0) 60%)",
        borderTop: "1px solid rgba(201,168,76,0.12)",
        textAlign: "center",
      }}>
        <AnimatedSection>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, marginBottom: "1.5rem" }}>
            Ready to <em style={{ color: "#C9A84C" }}>transform</em>?
          </div>
          <p style={{ color: "#888", fontSize: "0.95rem", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Join 2,400+ members already on their journey. First 7 days completely free.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/pricing" className="btn-primary">Start Free Trial</Link>
            <Link to="/contact" className="btn-ghost">Book a Tour</Link>
          </div>
        </AnimatedSection>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-stats-block { display: none !important; }
        }
        @media (max-width: 600px) {
          [style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </PageTransition>
  );
}
