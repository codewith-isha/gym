import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import PageTransition from "../components/PageTransition";
import { TRAINERS } from "../data/index";

export default function Trainers() {
  const heroRef = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 });
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <div style={{ minHeight: "40vh", display: "flex", alignItems: "center", padding: "8rem 5% 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div ref={heroRef} style={{ position: "relative", opacity: 0 }}>
          <div className="section-eyebrow"><div className="eyebrow-dot" /><span className="eyebrow-text">Our Coaches</span></div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(3rem,6vw,5rem)", fontWeight: 300, lineHeight: 1.05, marginBottom: "1.2rem" }}>
            Trained by the <em style={{ color: "#C9A84C" }}>best</em>,<br />coached by the best
          </h1>
          <p style={{ fontSize: "1rem", color: "#888", maxWidth: "500px", lineHeight: 1.7, fontWeight: 300 }}>
            Every FORGE coach holds elite certifications and has proven results with hundreds of clients.
          </p>
        </div>
      </div>

      {/* Trainers Grid */}
      <section className="section">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {TRAINERS.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(0,0,0,0.5)", borderColor: "rgba(201,168,76,0.6)" }}
                onClick={() => setActive(active?.name === t.name ? null : t)}
                style={{
                  background: "#1A1A1A",
                  border: "1px solid rgba(201,168,76,0.18)",
                  borderRadius: "6px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "border-color 0.3s",
                  position: "relative",
                }}
              >
                {/* Photo area */}
                <div style={{ height: "220px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5.5rem", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: t.bg }} />
                  <motion.span
                    animate={active?.name === t.name ? { scale: 1.1 } : { scale: 1 }}
                    style={{ position: "relative", zIndex: 1 }}
                  >
                    {t.emoji}
                  </motion.span>

                  {/* Active indicator */}
                  <AnimatePresence>
                    {active?.name === t.name && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          position: "absolute", inset: 0,
                          background: "rgba(201,168,76,0.08)",
                          border: "2px solid rgba(201,168,76,0.4)",
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 400, marginBottom: "0.3rem" }}>{t.name}</div>
                  <div style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 500, marginBottom: "0.8rem" }}>{t.role}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                    {t.certs.map(c => (
                      <span key={c} style={{ fontSize: "0.65rem", padding: "0.2rem 0.5rem", background: "rgba(201,168,76,0.1)", color: "#C9A84C", borderRadius: "2px" }}>{c}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.8rem" }}>
                    <span style={{ color: "#C9A84C", fontSize: "0.8rem" }}>★★★★★</span>
                    <span style={{ fontSize: "0.8rem", color: "#888" }}>{t.rating} ({t.reviews} reviews)</span>
                  </div>
                  <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A84C" }}>
                    {active?.name === t.name ? "▲ Close" : "→ View Profile"}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Expanded Profile */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.name}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ overflow: "hidden", marginTop: "1.5rem" }}
            >
              <div style={{
                background: "#111",
                border: "1px solid rgba(201,168,76,0.25)",
                borderLeft: "3px solid #C9A84C",
                padding: "3rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "3rem",
              }}>
                <div>
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>{active.emoji}</div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 300, marginBottom: "0.5rem" }}>
                    {active.name}
                  </h2>
                  <div style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1.5rem" }}>{active.role}</div>
                  <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.8, fontWeight: 300 }}>{active.bio}</p>
                </div>
                <div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.8rem" }}>Speciality</h4>
                    <div style={{ fontSize: "1rem", color: "#F5F0E8" }}>{active.specialty}</div>
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.8rem" }}>Certifications</h4>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {active.certs.map(c => (
                        <span key={c} style={{ padding: "0.3rem 0.8rem", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", fontSize: "0.75rem", borderRadius: "2px" }}>{c}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: "2rem" }}>
                    <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.5rem" }}>Rating</h4>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ color: "#C9A84C", fontSize: "1.2rem" }}>★★★★★</span>
                      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", color: "#C9A84C" }}>{active.rating}</span>
                      <span style={{ color: "#888", fontSize: "0.85rem" }}>({active.reviews} verified reviews)</span>
                    </div>
                  </div>
                  <Link to="/contact" className="btn-primary">Book a Session with {active.name.split(" ")[0]}</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Join the Team */}
      <section className="section section-alt" style={{ textAlign: "center" }}>
        <AnimatedSection>
          <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>Join our <em>coaching team</em></h2>
            <p style={{ color: "#888", marginBottom: "2rem", fontSize: "0.95rem", lineHeight: 1.7 }}>
              We're always looking for passionate, certified coaches to join the FORGE family.
            </p>
            <Link to="/contact" className="btn-ghost">Apply Now →</Link>
          </div>
        </AnimatedSection>
      </section>
    </PageTransition>
  );
}
