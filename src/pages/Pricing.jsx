import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import PageTransition from "../components/PageTransition";
import { PLANS } from "../data/index";

function BMICalc() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calc = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) setBmi(+(w / (h * h)).toFixed(1));
  };

  const cat = bmi
    ? bmi < 18.5 ? { label: "Underweight", color: "#60a5fa", pct: 10, advice: "Our nutrition + strength programs can help you build healthy mass." }
    : bmi < 25 ? { label: "Healthy", color: "#4ade80", pct: 35, advice: "Excellent! Maintain your current lifestyle with our performance programs." }
    : bmi < 30 ? { label: "Overweight", color: "#fb923c", pct: 65, advice: "Our elite coaches have tailored programs to help you reach your goals." }
    : { label: "Obese", color: "#f87171", pct: 88, advice: "Our specialist coaches will create a safe, effective program just for you." }
    : null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="input-group">
            <label className="input-label">Height (cm)</label>
            <input className="input-field" type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="175" />
          </div>
          <div className="input-group">
            <label className="input-label">Weight (kg)</label>
            <input className="input-field" type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" />
          </div>
        </div>
        <div className="input-group">
          <label className="input-label">Age</label>
          <input className="input-field" type="number" placeholder="28" />
        </div>
        <div className="input-group">
          <label className="input-label">Gender</label>
          <select className="input-field" style={{ cursor: "pointer" }}>
            <option>Male</option>
            <option>Female</option>
            <option>Prefer not to say</option>
          </select>
        </div>
        <motion.button whileTap={{ scale: 0.98 }} onClick={calc} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
          Calculate My BMI
        </motion.button>
        <p style={{ fontSize: "0.78rem", color: "#555", lineHeight: 1.6 }}>Your BMI data is never stored. This tool is for informational purposes only.</p>
      </div>

      <div style={{ background: "#1A1A1A", border: "1px solid rgba(201,168,76,0.18)", borderRadius: "4px", padding: "2.5rem", textAlign: "center" }}>
        {bmi ? (
          <>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "5rem", fontWeight: 600, lineHeight: 1, color: cat.color, marginBottom: "0.5rem" }}
            >
              {bmi}
            </motion.div>
            <div style={{ fontSize: "1.1rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: cat.color, marginBottom: "0.8rem" }}>{cat.label}</div>
            <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.6, marginBottom: "1.5rem" }}>{cat.advice}</p>
            <div style={{ height: "6px", borderRadius: "3px", background: "linear-gradient(90deg, #4ade80 0%, #facc15 35%, #fb923c 65%, #f87171 100%)", position: "relative", margin: "1rem 0 0.5rem" }}>
              <motion.div
                initial={{ left: "0%" }}
                animate={{ left: `${cat.pct}%` }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                style={{ position: "absolute", top: "-5px", width: "16px", height: "16px", background: "#fff", border: "2px solid #C9A84C", borderRadius: "50%", transform: "translateX(-50%)" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "#555", letterSpacing: "0.08em" }}>
              <span>Underweight</span><span>Healthy</span><span>Overweight</span><span>Obese</span>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📊</div>
            <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Enter your details to get personalised program recommendations from our expert coaches.
            </p>
            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {["Personalised program match", "Nutrition guidance", "Goal timeline estimate"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.82rem", color: "#888" }}>
                  <span style={{ color: "#C9A84C" }}>✦</span>{f}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`@media (max-width: 768px) { [class*="bmi-grid"] { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

export default function Pricing() {
  const heroRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 });
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <div style={{ minHeight: "40vh", display: "flex", alignItems: "center", padding: "8rem 5% 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div ref={heroRef} style={{ position: "relative", opacity: 0 }}>
          <div className="section-eyebrow"><div className="eyebrow-dot" /><span className="eyebrow-text">Membership</span></div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(3rem,6vw,5rem)", fontWeight: 300, lineHeight: 1.05, marginBottom: "1.2rem" }}>
            Invest in your <em style={{ color: "#C9A84C" }}>transformation</em>
          </h1>
          <p style={{ fontSize: "1rem", color: "#888", maxWidth: "500px", lineHeight: 1.7, fontWeight: 300 }}>
            Transparent pricing. No hidden fees. Cancel anytime. First 7 days completely free.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <section className="section">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", alignItems: "start" }}>
          {PLANS.map((p, i) => (
            <AnimatedSection key={p.plan} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}
                style={{
                  background: p.featured ? "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, #1A1A1A 100%)" : "#1A1A1A",
                  border: `1px solid ${p.featured ? "#C9A84C" : "rgba(201,168,76,0.18)"}`,
                  borderRadius: "4px",
                  padding: "2.5rem",
                  position: "relative",
                  transition: "box-shadow 0.3s",
                }}
              >
                {p.featured && (
                  <div style={{
                    position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                    background: "#C9A84C", color: "#000", fontSize: "0.65rem", fontWeight: 700,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    padding: "0.3rem 1rem", borderRadius: "20px", whiteSpace: "nowrap",
                  }}>Most Popular</div>
                )}
                <div style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 500, marginBottom: "1rem" }}>{p.plan}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "3rem", fontWeight: 600, lineHeight: 1, marginBottom: "0.3rem" }}>
                  <sup style={{ fontSize: "1.2rem", fontWeight: 400, verticalAlign: "top", marginTop: "0.5rem", display: "inline-block" }}>₹</sup>
                  {p.price}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#888", marginBottom: "2rem" }}>{p.period}</div>
                <div style={{ height: "1px", background: "rgba(201,168,76,0.18)", marginBottom: "2rem" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "2.5rem" }}>
                  {p.features.map(f => (
                    <div key={f.text} style={{ display: "flex", alignItems: "center", gap: "0.7rem", fontSize: "0.85rem", color: f.ok ? "#888" : "#555" }}>
                      <span style={{ color: f.ok ? "#C9A84C" : "#555", fontSize: "0.75rem" }}>{f.ok ? "✓" : "×"}</span>
                      {f.text}
                    </div>
                  ))}
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelected(p.plan)}
                  className={p.featured ? "btn-primary" : "btn-ghost"}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {selected === p.plan ? "✓ Selected!" : p.featured ? "Get Started — Free Trial" : `Choose ${p.plan}`}
                </motion.button>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Trust badges */}
        <AnimatedSection delay={0.4}>
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center",
            marginTop: "3rem", padding: "2rem",
            border: "1px solid rgba(201,168,76,0.1)",
            borderRadius: "4px",
            background: "rgba(201,168,76,0.02)",
          }}>
            {["🔒 Secure Payment", "✅ No Hidden Fees", "🔄 Cancel Anytime", "🆓 7-Day Free Trial", "⭐ 4.9/5 Rating"].map(b => (
              <span key={b} style={{ fontSize: "0.8rem", color: "#888", letterSpacing: "0.05em" }}>{b}</span>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* BMI Calculator */}
      <section className="section section-alt">
        <AnimatedSection>
          <div className="section-header">
            <div className="section-eyebrow"><div className="eyebrow-dot" /><span className="eyebrow-text">Smart Tools</span></div>
            <h2 className="section-title">Find your <em>starting point</em></h2>
            <div className="section-divider" />
            <p className="section-sub">Use our BMI calculator to get personalised program recommendations.</p>
          </div>
          <BMICalc />
        </AnimatedSection>
      </section>

      {/* FAQ */}
      <section className="section">
        <AnimatedSection>
          <div className="section-header">
            <div className="section-eyebrow"><div className="eyebrow-dot" /><span className="eyebrow-text">FAQ</span></div>
            <h2 className="section-title">Common <em>questions</em></h2>
            <div className="section-divider" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", maxWidth: "700px" }}>
            {[
              ["Can I freeze my membership?", "Yes. Elite and Prestige members can freeze their membership for up to 3 months per year at no extra charge."],
              ["Is there a joining fee?", "No joining fee. You only pay the monthly subscription, starting after your free 7-day trial."],
              ["Can I upgrade my plan?", "Absolutely. You can upgrade at any time and we'll pro-rate the difference."],
              ["What facilities are included?", "All memberships include access to the main gym floor. Sauna, steam room, and premium classes are included in Elite and above."],
            ].map(([q, a], i) => (
              <FaqItem key={i} question={q} answer={a} />
            ))}
          </div>
        </AnimatedSection>
      </section>
    </PageTransition>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid rgba(201,168,76,0.18)", borderRadius: "3px", overflow: "hidden", marginBottom: "1px" }}>
      <motion.button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "1.2rem 1.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: open ? "rgba(201,168,76,0.05)" : "transparent",
          border: "none", cursor: "pointer",
          fontFamily: "'Outfit',sans-serif",
          fontSize: "0.9rem", color: "#F5F0E8", textAlign: "left",
          transition: "background 0.3s",
        }}
      >
        {question}
        <motion.span animate={{ rotate: open ? 45 : 0 }} style={{ color: "#C9A84C", fontSize: "1.2rem", fontWeight: 300 }}>+</motion.span>
      </motion.button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ overflow: "hidden" }}
      >
        <div style={{ padding: "0 1.5rem 1.2rem", fontSize: "0.88rem", color: "#888", lineHeight: 1.7 }}>{answer}</div>
      </motion.div>
    </div>
  );
}
