import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";
import PageTransition from "../components/PageTransition";
import { SCHEDULE } from "../data/index";

const DAYS = Object.keys(SCHEDULE);

export default function Schedule() {
  const heroRef = useRef(null);
  const [activeDay, setActiveDay] = useState("Monday");
  const [booked, setBooked] = useState([]);

  useEffect(() => {
    gsap.fromTo(heroRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 });
  }, []);

  const handleBook = (cls) => {
    const key = `${activeDay}-${cls.time}`;
    setBooked(prev => prev.includes(key) ? prev : [...prev, key]);
  };

  return (
    <PageTransition>
      {/* Hero */}
      <div style={{ minHeight: "40vh", display: "flex", alignItems: "center", padding: "8rem 5% 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div ref={heroRef} style={{ position: "relative", opacity: 0 }}>
          <div className="section-eyebrow"><div className="eyebrow-dot" /><span className="eyebrow-text">Class Schedule</span></div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(3rem,6vw,5rem)", fontWeight: 300, lineHeight: 1.05, marginBottom: "1.2rem" }}>
            Book your <em style={{ color: "#C9A84C" }}>perfect</em> session
          </h1>
          <p style={{ fontSize: "1rem", color: "#888", maxWidth: "500px", lineHeight: 1.7, fontWeight: 300 }}>
            Classes available 6 days a week with expert trainers. Reserve your spot before they fill up.
          </p>
        </div>
      </div>

      {/* Schedule */}
      <section className="section">
        <AnimatedSection>
          {/* Day Tabs */}
          <div className="schedule-tabs" style={{ marginBottom: "2.5rem" }}>
            {DAYS.map(d => (
              <motion.button
                key={d}
                whileTap={{ scale: 0.97 }}
                className={`tab-btn${activeDay === d ? " active" : ""}`}
                onClick={() => setActiveDay(d)}
              >
                {d.slice(0, 3)}
              </motion.button>
            ))}
          </div>

          {/* Table */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Class</th>
                    <th>Trainer</th>
                    <th>Availability</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {SCHEDULE[activeDay].map((c, i) => {
                    const key = `${activeDay}-${c.time}`;
                    const isBooked = booked.includes(key);
                    return (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <td style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", color: "#F5F0E8" }}>{c.time}</td>
                        <td><span className="class-name">{c.class}</span></td>
                        <td>{c.trainer}</td>
                        <td>
                          <span className={`class-badge ${c.status === "open" ? "badge-open" : c.status === "full" ? "badge-full" : "badge-gold"}`}>
                            {c.status === "open" ? `✓ ${c.spots}` : c.status === "full" ? "✗ Full" : `★ ${c.spots}`}
                          </span>
                        </td>
                        <td>
                          <motion.button
                            whileHover={c.status !== "full" && !isBooked ? { scale: 1.04 } : {}}
                            whileTap={c.status !== "full" && !isBooked ? { scale: 0.97 } : {}}
                            onClick={() => c.status !== "full" && !isBooked && handleBook(c)}
                            style={{
                              padding: "0.4rem 1rem",
                              fontSize: "0.7rem",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              background: isBooked ? "rgba(74,222,128,0.1)" : c.status === "full" ? "transparent" : "#C9A84C",
                              color: isBooked ? "#4ade80" : c.status === "full" ? "#555" : "#000",
                              border: `1px solid ${isBooked ? "rgba(74,222,128,0.3)" : c.status === "full" ? "rgba(201,168,76,0.18)" : "#C9A84C"}`,
                              borderRadius: "2px",
                              cursor: c.status === "full" ? "default" : "pointer",
                              fontFamily: "'Outfit',sans-serif",
                              fontWeight: 600,
                              transition: "all 0.2s",
                            }}
                          >
                            {isBooked ? "✓ Booked" : c.status === "full" ? "Waitlist" : "Book Now"}
                          </motion.button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </motion.div>
          </AnimatePresence>
        </AnimatedSection>

        {/* Booked confirmation */}
        <AnimatePresence>
          {booked.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: "2rem",
                padding: "1.5rem 2rem",
                background: "rgba(74,222,128,0.06)",
                border: "1px solid rgba(74,222,128,0.2)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>✓</span>
              <div>
                <div style={{ fontWeight: 600, marginBottom: "0.2rem", color: "#4ade80", fontSize: "0.9rem" }}>
                  {booked.length} class{booked.length > 1 ? "es" : ""} booked
                </div>
                <div style={{ fontSize: "0.82rem", color: "#888" }}>
                  You'll receive a confirmation at your registered email.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Info Cards */}
      <section className="section section-alt">
        <AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "🔔", title: "Class Reminders", desc: "Get SMS and email reminders 30 minutes before your session starts." },
              { icon: "🔄", title: "Easy Rescheduling", desc: "Cancel or reschedule up to 2 hours before class with no penalty." },
              { icon: "⭐", title: "Premium Access", desc: "Elite and Prestige members get priority booking for all classes." },
              { icon: "📱", title: "Mobile Booking", desc: "Book classes anytime from our app. Your schedule, your way." },
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
    </PageTransition>
  );
}
