import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import PageTransition from "../components/PageTransition";
import { PROGRAMS } from "../data/index";

const DETAIL = {
  "Strength Training": {
    overview: "Our signature strength program uses periodized training cycles built around compound lifts, progressive overload, and intelligent recovery. Whether you're a beginner or advanced lifter, our coaches tailor every session to your current capacity.",
    benefits: ["Increase functional strength", "Build lean muscle mass", "Improve bone density", "Boost metabolism"],
    schedule: "Mon, Wed, Fri — 6AM, 8AM, 6:30PM",
    equipment: "Olympic barbells, power racks, cable machines, dumbbells up to 80kg",
  },
  "HIIT Cardio": {
    overview: "Scientifically structured high-intensity intervals designed to maximize caloric burn, improve VO2 max, and build cardiovascular resilience. Sessions alternate between explosive work periods and active recovery.",
    benefits: ["Burn calories efficiently", "Elevate cardiovascular fitness", "Increase metabolic rate for 24hrs", "Improve athletic endurance"],
    schedule: "Tue, Thu, Fri — 5:30PM, 7:30PM",
    equipment: "Assault bikes, rowing machines, kettlebells, battle ropes",
  },
  "Combat Boxing": {
    overview: "Professional boxing techniques meet elite conditioning. Learn proper stance, footwork, combinations and defensive movements while getting an unmatched full-body workout. No prior experience required.",
    benefits: ["Full-body conditioning", "Improve coordination", "Build mental toughness", "Learn real boxing technique"],
    schedule: "Mon, Wed, Fri — 6PM, Sat — 12PM",
    equipment: "Heavy bags, speed bags, focus mitts, boxing rings",
  },
  "Yoga & Mobility": {
    overview: "Ancient practice meets modern sports science. Our sessions integrate traditional yoga flows with targeted mobility work to restore balance, reduce injury risk, and enhance performance in every other discipline.",
    benefits: ["Reduce injury risk", "Improve flexibility & range of motion", "Enhance recovery speed", "Develop mind-body connection"],
    schedule: "Mon, Thu — 12PM, Sat — 8AM",
    equipment: "Premium yoga mats, blocks, straps, bolsters",
  },
  "Functional Fitness": {
    overview: "Movement patterns that translate directly to real-world performance. Drawing from CrossFit, athletic training, and movement therapy, these sessions build strength, agility, and coordination simultaneously.",
    benefits: ["Improve athletic performance", "Build total-body coordination", "Enhance movement quality", "Prevent everyday injuries"],
    schedule: "Tue, Thu — 6AM, Wed, Sat — 4PM",
    equipment: "Gymnastic rings, plyometric boxes, sleds, TRX systems",
  },
  "Aqua Training": {
    overview: "Harness the resistance of water for a zero-impact, high-intensity workout. Perfect for recovery days, injury rehabilitation, or anyone seeking an effective low-stress alternative to traditional training.",
    benefits: ["Zero joint impact", "High caloric burn", "Enhanced recovery", "Improved cardiovascular health"],
    schedule: "Tue — 7AM, Thu — 7PM, Sat — 10AM",
    equipment: "Olympic-length pool, aqua dumbbells, resistance bands, kickboards",
  },
};

export default function Programs() {
  const heroRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <div style={{
        minHeight: "45vh", display: "flex", alignItems: "center",
        padding: "8rem 5% 4rem",
        position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, rgba(201,168,76,0.05) 0%, transparent 50%)",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div ref={heroRef} style={{ position: "relative", opacity: 0 }}>
          <div className="section-eyebrow"><div className="eyebrow-dot" /><span className="eyebrow-text">Training Programs</span></div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(3rem,6vw,5rem)", fontWeight: 300, lineHeight: 1.05, marginBottom: "1.2rem" }}>
            Every discipline.<br /><em style={{ color: "#C9A84C" }}>One</em> destination.
          </h1>
          <p style={{ fontSize: "1rem", color: "#888", maxWidth: "500px", lineHeight: 1.7, fontWeight: 300 }}>
            Six elite training disciplines, each meticulously designed to deliver measurable results with expert guidance.
          </p>
        </div>
      </div>

      {/* Programs Grid */}
      <section className="section">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1px",
          background: "rgba(201,168,76,0.18)",
          border: "1px solid rgba(201,168,76,0.18)",
        }}>
          {PROGRAMS.map((p, i) => (
            <AnimatedSection key={p.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ backgroundColor: "#161616" }}
                onClick={() => setSelected(selected?.name === p.name ? null : p)}
                style={{
                  background: "#0A0A0A",
                  padding: "2.5rem 2rem",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
              >
                {/* Top accent */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                    background: p.color || "#C9A84C",
                    transformOrigin: "left",
                    transition: "transform 0.4s ease",
                  }}
                />

                <span style={{ fontSize: "2.5rem", marginBottom: "1.5rem", display: "block" }}>{p.icon}</span>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 400, marginBottom: "0.8rem" }}>{p.name}</div>
                <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.7, fontWeight: 300, marginBottom: "1.5rem" }}>{p.desc}</p>
                <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C" }}>⏱ {p.duration}</span>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#555" }}>◉ {p.level}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 500 }}>
                  {selected?.name === p.name ? "▲ Close Details" : "→ View Details"}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Expanded Detail Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ overflow: "hidden" }}
            >
              <div style={{
                background: "#111",
                border: "1px solid rgba(201,168,76,0.18)",
                borderTop: `3px solid ${selected.color || "#C9A84C"}`,
                padding: "3rem",
                marginTop: "1px",
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3rem" }}>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 300, marginBottom: "1rem" }}>
                      {selected.icon} <em style={{ color: "#C9A84C" }}>{selected.name}</em>
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.8, fontWeight: 300 }}>{DETAIL[selected.name]?.overview}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1rem" }}>Key Benefits</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                      {DETAIL[selected.name]?.benefits.map(b => (
                        <div key={b} style={{ display: "flex", gap: "0.7rem", alignItems: "center", fontSize: "0.85rem", color: "#888" }}>
                          <span style={{ color: "#C9A84C" }}>✦</span>{b}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.5rem" }}>Schedule</h4>
                      <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.7 }}>{DETAIL[selected.name]?.schedule}</p>
                    </div>
                    <div style={{ marginBottom: "2rem" }}>
                      <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.5rem" }}>Equipment</h4>
                      <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.7 }}>{DETAIL[selected.name]?.equipment}</p>
                    </div>
                    <Link to="/schedule" className="btn-primary" style={{ fontSize: "0.72rem" }}>Book a Session →</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* CTA */}
      <section className="section section-alt" style={{ textAlign: "center" }}>
        <AnimatedSection>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>Not sure where to start?</h2>
          <p style={{ color: "#888", marginBottom: "2rem", fontSize: "0.95rem" }}>Book a free fitness consultation with one of our expert coaches.</p>
          <Link to="/contact" className="btn-primary">Get Expert Guidance</Link>
        </AnimatedSection>
      </section>
    </PageTransition>
  );
}
