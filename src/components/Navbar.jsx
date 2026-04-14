import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/programs", label: "Programs" },
  { to: "/schedule", label: "Schedule" },
  { to: "/trainers", label: "Trainers" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav ref={navRef} style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "0 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: scrolled ? "65px" : "80px",
        background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.18)" : "none",
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.8rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: "#F5F0E8",
              cursor: "pointer",
            }}
          >
            FORGE<span style={{ color: "#C9A84C" }}>.</span>
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}
          className="desktop-nav">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              style={({ isActive }) => ({
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: isActive ? "#C9A84C" : "#888",
                textDecoration: "none",
                transition: "color 0.3s",
                position: "relative",
              })}
            >
              {({ isActive }) => (
                <span style={{ position: "relative" }}>
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      style={{
                        position: "absolute",
                        bottom: "-4px",
                        left: 0,
                        right: 0,
                        height: "1px",
                        background: "#C9A84C",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </span>
              )}
            </NavLink>
          ))}
          <Link to="/pricing" className="btn-primary" style={{ padding: "0.55rem 1.4rem" }}>
            Join Now
          </Link>
        </div>

        {/* Hamburger */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: "4px",
          }}
          className="hamburger-btn"
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={menuOpen ? {
                rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                y: i === 0 ? 7 : i === 2 ? -7 : 0,
                opacity: i === 1 ? 0 : 1,
              } : { rotate: 0, y: 0, opacity: 1 }}
              style={{
                display: "block",
                width: "24px",
                height: "1.5px",
                background: "#F5F0E8",
                borderRadius: "2px",
                transformOrigin: "center",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed", inset: 0, zIndex: 999,
              background: "rgba(10,10,10,0.98)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "2.5rem",
            }}
          >
            {NAV_LINKS.map(({ to, label }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={to}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2.5rem",
                    fontWeight: 300,
                    color: "#F5F0E8",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/pricing" className="btn-primary" onClick={() => setMenuOpen(false)}>
                Join Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
