import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import PageTransition from "../components/PageTransition";

const CONTACT_INFO = [
  { icon: "📍", label: "Location", value: "FORGE Premium Fitness\n42 Connaught Place, New Delhi, 110001" },
  { icon: "📞", label: "Phone", value: "+91 98765 43210" },
  { icon: "✉️", label: "Email", value: "hello@forgefit.in" },
  { icon: "🕐", label: "Hours", value: "Mon–Fri: 5:30AM – 11PM\nSat–Sun: 6AM – 9PM" },
];

export default function Contact() {
  const heroRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "Free 7-Day Trial", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    gsap.fromTo(heroRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 });
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSubmitted(true);
  };

  const set = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: undefined }));
  };

  return (
    <PageTransition>
      {/* Hero */}
      <div style={{ minHeight: "40vh", display: "flex", alignItems: "center", padding: "8rem 5% 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div ref={heroRef} style={{ position: "relative", opacity: 0 }}>
          <div className="section-eyebrow"><div className="eyebrow-dot" /><span className="eyebrow-text">Get In Touch</span></div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(3rem,6vw,5rem)", fontWeight: 300, lineHeight: 1.05, marginBottom: "1.2rem" }}>
            Begin your <em style={{ color: "#C9A84C" }}>journey</em>
          </h1>
          <p style={{ fontSize: "1rem", color: "#888", maxWidth: "500px", lineHeight: 1.7, fontWeight: 300 }}>
            Reach out and our team will get back to you within 24 hours. No pressure, no sales scripts — just real conversation.
          </p>
        </div>
      </div>

      {/* Main content */}
      <section className="section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "5rem", alignItems: "start" }}>

          {/* Info */}
          <AnimatedSection direction="left">
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {CONTACT_INFO.map(c => (
                <motion.div
                  key={c.label}
                  whileHover={{ x: 4 }}
                  style={{ display: "flex", gap: "1.2rem", alignItems: "flex-start" }}
                >
                  <div style={{
                    width: "44px", height: "44px",
                    background: "rgba(201,168,76,0.1)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    borderRadius: "3px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem", flexShrink: 0,
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.3rem" }}>{c.label}</div>
                    <div style={{ fontSize: "0.9rem", color: "#888", fontWeight: 300, whiteSpace: "pre-line", lineHeight: 1.7 }}>{c.value}</div>
                  </div>
                </motion.div>
              ))}

              {/* Map placeholder */}
              <div style={{
                marginTop: "1rem",
                height: "180px",
                background: "#111",
                border: "1px solid rgba(201,168,76,0.18)",
                borderRadius: "4px",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: "0.5rem",
                color: "#555",
                cursor: "pointer",
              }}>
                <span style={{ fontSize: "2rem" }}>🗺️</span>
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>View on Google Maps</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection direction="right">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    padding: "4rem 3rem",
                    background: "#1A1A1A",
                    border: "1px solid rgba(201,168,76,0.3)",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                    style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}
                  >✦</motion.div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.2rem", fontWeight: 300, marginBottom: "1rem" }}>
                    Message <em style={{ color: "#C9A84C" }}>Received</em>
                  </div>
                  <p style={{ color: "#888", fontSize: "0.9rem", maxWidth: "340px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
                    Our team will reach out within 24 hours to discuss your fitness goals. Welcome to FORGE.
                  </p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", interest: "Free 7-Day Trial", message: "" }); }} className="btn-ghost">
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                      <Field label="Full Name" error={errors.name}>
                        <input className="input-field" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Arjun Mehta"
                          style={{ borderColor: errors.name ? "#f87171" : undefined }} />
                      </Field>
                      <Field label="Email" error={errors.email}>
                        <input className="input-field" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="arjun@example.com"
                          style={{ borderColor: errors.email ? "#f87171" : undefined }} />
                      </Field>
                    </div>
                    <Field label="Phone">
                      <input className="input-field" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+91 98765 43210" />
                    </Field>
                    <Field label="I'm interested in">
                      <select className="input-field" value={form.interest} onChange={e => set("interest", e.target.value)} style={{ cursor: "pointer" }}>
                        <option>Free 7-Day Trial</option>
                        <option>Elite Membership</option>
                        <option>Personal Training</option>
                        <option>Corporate Packages</option>
                        <option>Just Looking Around</option>
                      </select>
                    </Field>
                    <Field label="Message (optional)">
                      <textarea className="input-field" value={form.message} onChange={e => set("message", e.target.value)}
                        placeholder="Tell us about your goals…"
                        style={{ resize: "vertical", minHeight: "120px" }} />
                    </Field>
                    <motion.button whileTap={{ scale: 0.98 }} onClick={handleSubmit} className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "1.1rem" }}>
                      Send Message →
                    </motion.button>
                    <p style={{ fontSize: "0.75rem", color: "#555" }}>We respond within 24 hours. No spam, ever.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </section>

      {/* Visit us strip */}
      <section className="section section-alt">
        <AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "🚇", title: "By Metro", desc: "Rajiv Chowk station, Exit 5. 3-minute walk." },
              { icon: "🚗", title: "By Car", desc: "Paid parking available at CP Parking Block C." },
              { icon: "🚶", title: "Walk-ins Welcome", desc: "Come in anytime during opening hours for a free tour." },
              { icon: "📅", title: "Book a Tour", desc: "Schedule a guided tour with a coach before joining." },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div style={{ padding: "1.8rem", background: "#1A1A1A", border: "1px solid rgba(201,168,76,0.18)", borderRadius: "4px" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 400, marginBottom: "0.5rem" }}>{item.title}</div>
                  <p style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <style>{`@media (max-width: 768px) { section > div[style*="1fr 1.6fr"] { grid-template-columns: 1fr !important; gap: 3rem !important; } }`}</style>
    </PageTransition>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ fontSize: "0.72rem", color: "#f87171" }}>
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
