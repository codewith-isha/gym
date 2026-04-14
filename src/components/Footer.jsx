import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer style={{
      background: "#111",
      borderTop: "1px solid rgba(201,168,76,0.18)",
      padding: "4rem 5% 2rem",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
        gap: "3rem",
        marginBottom: "3rem",
      }}>
        {/* Brand */}
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 600, marginBottom: "1rem" }}>
            FORGE<span style={{ color: "#C9A84C" }}>.</span>
          </div>
          <p style={{ fontSize: "0.85rem", color: "#888", lineHeight: 1.7, fontWeight: 300, maxWidth: "250px", marginBottom: "1.5rem" }}>
            New Delhi's most prestigious fitness destination. Where champions are made.
          </p>
          <div style={{ display: "flex", gap: "0.8rem" }}>
            {["f", "ig", "tw", "yt"].map((s) => (
              <motion.button
                key={s}
                whileHover={{ borderColor: "#C9A84C", color: "#C9A84C", background: "rgba(201,168,76,0.1)" }}
                style={{
                  width: "36px", height: "36px",
                  border: "1px solid rgba(201,168,76,0.18)",
                  borderRadius: "3px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  background: "transparent",
                  color: "#888",
                  fontWeight: 600,
                  letterSpacing: 0,
                  transition: "all 0.3s",
                }}
              >
                {s}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div>
          <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888", marginBottom: "1.2rem", fontWeight: 500 }}>Programs</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {["Strength Training", "HIIT Cardio", "Combat Boxing", "Yoga & Mobility", "Functional Fitness"].map(l => (
              <Link key={l} to="/programs" style={{ fontSize: "0.85rem", color: "#555", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "#C9A84C"}
                onMouseLeave={e => e.target.style.color = "#555"}>
                {l}
              </Link>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888", marginBottom: "1.2rem", fontWeight: 500 }}>Company</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {[["About", "/"], ["Trainers", "/trainers"], ["Membership", "/pricing"], ["Schedule", "/schedule"], ["Contact", "/contact"]].map(([l, to]) => (
              <Link key={l} to={to} style={{ fontSize: "0.85rem", color: "#555", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "#C9A84C"}
                onMouseLeave={e => e.target.style.color = "#555"}>
                {l}
              </Link>
            ))}
          </div>
        </div>

        {/* Support */}
        <div>
          <h4 style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888", marginBottom: "1.2rem", fontWeight: 500 }}>Support</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {["Contact Us", "FAQ", "Privacy Policy", "Terms of Service"].map(l => (
              <Link key={l} to="/contact" style={{ fontSize: "0.85rem", color: "#555", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "#C9A84C"}
                onMouseLeave={e => e.target.style.color = "#555"}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingTop: "2rem",
        borderTop: "1px solid rgba(201,168,76,0.08)",
      }}>
        <p style={{ fontSize: "0.78rem", color: "#555" }}>© 2025 <span style={{ color: "#C9A84C" }}>FORGE Premium Fitness</span>. All rights reserved.</p>
        <p style={{ fontSize: "0.78rem", color: "#555" }}>Crafted with <span style={{ color: "#C9A84C" }}>✦</span> in New Delhi</p>
      </div>

      <style>{`
        @media (max-width: 1024px) { footer > div:first-child { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { footer > div:first-child { grid-template-columns: 1fr !important; } footer > div:last-child { flex-direction: column; gap: 0.5rem; text-align: center; } }
      `}</style>
    </footer>
  );
}
