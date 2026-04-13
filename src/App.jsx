import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');`;

const styles = `
  ${FONTS}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #C9A84C;
    --gold-light: #E8C97A;
    --gold-dim: rgba(201,168,76,0.15);
    --bg: #0A0A0A;
    --bg2: #111111;
    --bg3: #161616;
    --bg4: #1C1C1C;
    --surface: #1A1A1A;
    --border: rgba(201,168,76,0.2);
    --text: #F5F0E8;
    --text-muted: #888;
    --text-dim: #555;
    --ff-head: 'Cormorant Garamond', Georgia, serif;
    --ff-body: 'Outfit', sans-serif;
    --transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: var(--ff-body); overflow-x: hidden; }
  
  ::selection { background: var(--gold); color: #000; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    padding: 0 5%;
    display: flex; align-items: center; justify-content: space-between;
    height: 80px;
    transition: all var(--transition);
  }
  .nav.scrolled {
    background: rgba(10,10,10,0.96);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    height: 65px;
  }
  .nav-logo {
    font-family: var(--ff-head);
    font-size: 1.8rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: var(--text);
    cursor: pointer;
  }
  .nav-logo span { color: var(--gold); }
  .nav-links { display: flex; gap: 2.5rem; align-items: center; }
  .nav-links a {
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.3s;
    cursor: pointer;
  }
  .nav-links a:hover { color: var(--gold); }
  .nav-cta {
    background: var(--gold);
    color: #000 !important;
    padding: 0.55rem 1.4rem;
    border-radius: 2px;
    font-weight: 600 !important;
    letter-spacing: 0.1em;
  }
  .nav-cta:hover { background: var(--gold-light) !important; color: #000 !important; }
  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
  .hamburger span { width: 24px; height: 1.5px; background: var(--text); transition: all 0.3s; }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center;
    padding: 0 5%;
    position: relative;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: 
      radial-gradient(ellipse 80% 60% at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 20% 80%, rgba(201,168,76,0.04) 0%, transparent 60%),
      linear-gradient(180deg, #0A0A0A 0%, #0D0C0A 100%);
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: 
      linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
    background-size: 80px 80px;
  }
  .hero-content { position: relative; max-width: 750px; }
  .hero-eyebrow {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 2rem;
    opacity: 0; animation: fadeUp 0.8s 0.3s forwards;
  }
  .hero-eyebrow-line { width: 40px; height: 1px; background: var(--gold); }
  .hero-eyebrow-text {
    font-size: 0.72rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 500;
  }
  .hero-title {
    font-family: var(--ff-head);
    font-size: clamp(3.5rem, 7vw, 6.5rem);
    font-weight: 300;
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin-bottom: 1.5rem;
    opacity: 0; animation: fadeUp 0.8s 0.5s forwards;
  }
  .hero-title em { font-style: italic; color: var(--gold); }
  .hero-sub {
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--text-muted);
    max-width: 480px;
    font-weight: 300;
    margin-bottom: 2.5rem;
    opacity: 0; animation: fadeUp 0.8s 0.7s forwards;
  }
  .hero-actions {
    display: flex; align-items: center; gap: 1.5rem;
    opacity: 0; animation: fadeUp 0.8s 0.9s forwards;
  }
  .btn-primary {
    background: var(--gold);
    color: #000;
    padding: 1rem 2.2rem;
    font-family: var(--ff-body);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 2px;
  }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(201,168,76,0.3); }
  .btn-ghost {
    background: transparent;
    color: var(--text);
    padding: 1rem 2.2rem;
    font-family: var(--ff-body);
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    border: 1px solid rgba(255,255,255,0.15);
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 2px;
  }
  .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }
  .hero-stats {
    position: absolute; right: 5%; bottom: 12%;
    display: flex; flex-direction: column; gap: 2rem;
    opacity: 0; animation: fadeLeft 0.8s 1.1s forwards;
  }
  .hero-stat { text-align: right; }
  .hero-stat-num {
    font-family: var(--ff-head);
    font-size: 2.8rem;
    font-weight: 600;
    color: var(--gold);
    line-height: 1;
  }
  .hero-stat-label { font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-dim); margin-top: 4px; }
  .hero-scroll {
    position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    opacity: 0; animation: fadeUp 0.8s 1.3s forwards;
    cursor: pointer;
  }
  .hero-scroll span { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-dim); }
  .scroll-line { width: 1px; height: 50px; background: linear-gradient(var(--gold), transparent); animation: scrollLine 2s ease infinite; }

  /* SECTION COMMONS */
  .section { padding: 7rem 5%; }
  .section-alt { background: var(--bg2); }
  .section-header { margin-bottom: 4rem; }
  .section-eyebrow {
    display: flex; align-items: center; gap: 0.8rem;
    margin-bottom: 1rem;
  }
  .eyebrow-dot { width: 6px; height: 6px; background: var(--gold); border-radius: 50%; }
  .eyebrow-text { font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); font-weight: 500; }
  .section-title {
    font-family: var(--ff-head);
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 300;
    line-height: 1.1;
    letter-spacing: -0.01em;
  }
  .section-title em { font-style: italic; color: var(--gold); }
  .section-divider { width: 50px; height: 1px; background: var(--gold); margin: 1.5rem 0; }
  .section-sub { font-size: 0.95rem; color: var(--text-muted); line-height: 1.7; max-width: 480px; font-weight: 300; }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
  .about-visual {
    position: relative; height: 500px;
  }
  .about-card {
    position: absolute;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 2rem;
  }
  .about-card-main {
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex; flex-direction: column; justify-content: flex-end;
    background: linear-gradient(135deg, #1a1a0d 0%, #0f0f0a 100%);
    overflow: hidden;
  }
  .about-bg-pattern {
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(45deg, rgba(201,168,76,0.03) 0, rgba(201,168,76,0.03) 1px, transparent 1px, transparent 50%);
    background-size: 20px 20px;
  }
  .about-card-inner { position: relative; z-index: 1; }
  .about-card-title { font-family: var(--ff-head); font-size: 1.8rem; font-weight: 300; margin-bottom: 0.5rem; }
  .about-card-title em { font-style: italic; color: var(--gold); }
  .about-card-sub { font-size: 0.8rem; color: var(--text-muted); letter-spacing: 0.1em; }
  .about-badge {
    position: absolute; top: 1.5rem; right: 1.5rem;
    width: 90px; height: 90px;
    background: var(--gold);
    border-radius: 50%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    z-index: 2;
  }
  .about-badge-num { font-family: var(--ff-head); font-size: 1.8rem; font-weight: 700; color: #000; line-height: 1; }
  .about-badge-text { font-size: 0.55rem; letter-spacing: 0.1em; color: rgba(0,0,0,0.7); text-transform: uppercase; text-align: center; }
  .about-floating {
    bottom: -1.5rem; right: -1.5rem;
    padding: 1.5rem;
    display: flex; flex-direction: column; gap: 0.3rem;
    background: var(--bg3);
  }
  .about-feat { display: flex; align-items: center; gap: 0.6rem; font-size: 0.82rem; color: var(--text-muted); }
  .feat-dot { width: 5px; height: 5px; background: var(--gold); border-radius: 50%; flex-shrink: 0; }
  .about-text { display: flex; flex-direction: column; gap: 1.5rem; }
  .about-p { font-size: 0.95rem; line-height: 1.8; color: var(--text-muted); font-weight: 300; }
  .about-highlights { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .highlight-item { padding: 1.2rem; border: 1px solid var(--border); border-radius: 3px; background: var(--gold-dim); }
  .highlight-num { font-family: var(--ff-head); font-size: 2rem; font-weight: 600; color: var(--gold); }
  .highlight-label { font-size: 0.75rem; color: var(--text-muted); letter-spacing: 0.05em; margin-top: 2px; }

  /* PROGRAMS */
  .programs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px; background: var(--border); border: 1px solid var(--border); }
  .program-card {
    background: var(--bg);
    padding: 2.5rem 2rem;
    position: relative;
    overflow: hidden;
    transition: all var(--transition);
    cursor: pointer;
  }
  .program-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--gold); transform: scaleX(0); transform-origin: left;
    transition: transform var(--transition);
  }
  .program-card:hover::before { transform: scaleX(1); }
  .program-card:hover { background: var(--bg3); }
  .program-icon { font-size: 2.5rem; margin-bottom: 1.5rem; display: block; }
  .program-name { font-family: var(--ff-head); font-size: 1.5rem; font-weight: 400; margin-bottom: 0.8rem; }
  .program-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.7; font-weight: 300; margin-bottom: 1.5rem; }
  .program-meta { display: flex; gap: 1.5rem; }
  .program-tag { font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); }
  .program-tag + .program-tag { color: var(--text-dim); }
  .program-arrow { 
    position: absolute; bottom: 2rem; right: 2rem;
    width: 36px; height: 36px;
    border: 1px solid var(--border);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.9rem;
    transition: all 0.3s;
  }
  .program-card:hover .program-arrow { background: var(--gold); border-color: var(--gold); color: #000; }

  /* SCHEDULE */
  .schedule-tabs { display: flex; gap: 0; margin-bottom: 2rem; border: 1px solid var(--border); width: fit-content; }
  .tab-btn {
    padding: 0.75rem 1.5rem;
    font-family: var(--ff-body);
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: transparent;
    color: var(--text-muted);
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    border-right: 1px solid var(--border);
  }
  .tab-btn:last-child { border-right: none; }
  .tab-btn.active { background: var(--gold); color: #000; font-weight: 600; }
  .schedule-table { width: 100%; border-collapse: collapse; }
  .schedule-table th {
    padding: 1rem 1.5rem;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-dim);
    text-align: left;
    border-bottom: 1px solid var(--border);
    font-weight: 500;
  }
  .schedule-table td {
    padding: 1.2rem 1.5rem;
    font-size: 0.88rem;
    border-bottom: 1px solid rgba(201,168,76,0.06);
    color: var(--text-muted);
  }
  .schedule-table tr:hover td { background: var(--gold-dim); }
  .class-name { color: var(--text); font-weight: 500; }
  .class-badge {
    display: inline-block;
    padding: 0.2rem 0.6rem;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-radius: 2px;
    font-weight: 600;
  }
  .badge-gold { background: var(--gold-dim); color: var(--gold); border: 1px solid var(--gold); }
  .badge-open { background: rgba(74,222,128,0.1); color: #4ade80; border: 1px solid rgba(74,222,128,0.3); }
  .badge-full { background: rgba(248,113,113,0.1); color: #f87171; border: 1px solid rgba(248,113,113,0.3); }

  /* TRAINERS */
  .trainers-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
  .trainer-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
    transition: all var(--transition);
    cursor: pointer;
  }
  .trainer-card:hover { transform: translateY(-6px); border-color: var(--gold); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
  .trainer-photo {
    height: 200px;
    display: flex; align-items: center; justify-content: center;
    font-size: 5rem;
    position: relative;
    overflow: hidden;
  }
  .trainer-photo-bg { position: absolute; inset: 0; }
  .trainer-emoji { position: relative; z-index: 1; }
  .trainer-info { padding: 1.5rem; }
  .trainer-name { font-family: var(--ff-head); font-size: 1.2rem; font-weight: 400; margin-bottom: 0.3rem; }
  .trainer-role { font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); font-weight: 500; margin-bottom: 0.8rem; }
  .trainer-certs { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
  .cert-tag { font-size: 0.65rem; padding: 0.2rem 0.5rem; background: var(--gold-dim); color: var(--gold); border-radius: 2px; }
  .trainer-rating { display: flex; align-items: center; gap: 0.4rem; }
  .stars { color: var(--gold); font-size: 0.8rem; }
  .rating-num { font-size: 0.8rem; color: var(--text-muted); }

  /* PRICING */
  .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .pricing-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 2.5rem;
    position: relative;
    transition: all var(--transition);
  }
  .pricing-card.featured {
    border-color: var(--gold);
    background: linear-gradient(135deg, rgba(201,168,76,0.06) 0%, var(--surface) 100%);
  }
  .pricing-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
  .pricing-badge {
    position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
    background: var(--gold);
    color: #000;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.3rem 1rem;
    border-radius: 20px;
    white-space: nowrap;
  }
  .pricing-plan { font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); font-weight: 500; margin-bottom: 1rem; }
  .pricing-price { font-family: var(--ff-head); font-size: 3rem; font-weight: 600; line-height: 1; margin-bottom: 0.3rem; }
  .pricing-price sup { font-size: 1.2rem; font-weight: 400; vertical-align: top; margin-top: 0.5rem; display: inline-block; }
  .pricing-period { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 2rem; }
  .pricing-divider { height: 1px; background: var(--border); margin-bottom: 2rem; }
  .pricing-features { display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 2.5rem; }
  .pricing-feat { display: flex; align-items: center; gap: 0.7rem; font-size: 0.85rem; color: var(--text-muted); }
  .feat-check { color: var(--gold); font-size: 0.75rem; }
  .feat-x { color: var(--text-dim); font-size: 0.75rem; }
  .feat-disabled { color: var(--text-dim); }

  /* TRANSFORMATIONS */
  .transform-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .transform-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
    transition: all var(--transition);
  }
  .transform-card:hover { border-color: var(--gold); transform: translateY(-4px); }
  .transform-visual {
    display: grid; grid-template-columns: 1fr 1fr;
    height: 150px;
    position: relative;
  }
  .transform-before, .transform-after {
    display: flex; align-items: center; justify-content: center;
    font-size: 3rem;
  }
  .transform-before { background: var(--bg3); }
  .transform-after { background: linear-gradient(135deg, #1a1a0d, #0f0f0a); }
  .transform-arrow {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 36px; height: 36px;
    background: var(--gold);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.9rem; color: #000; font-weight: 700;
    z-index: 1;
  }
  .transform-labels {
    display: grid; grid-template-columns: 1fr 1fr;
    padding: 0.5rem 1rem;
    background: var(--bg2);
  }
  .t-label { font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-dim); }
  .t-label:last-child { text-align: right; color: var(--gold); }
  .transform-info { padding: 1.5rem; }
  .transform-name { font-family: var(--ff-head); font-size: 1.1rem; font-weight: 400; margin-bottom: 0.3rem; }
  .transform-meta { font-size: 0.78rem; color: var(--gold); font-weight: 500; margin-bottom: 0.6rem; }
  .transform-quote { font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; font-style: italic; }

  /* BMI CALCULATOR */
  .bmi-container { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
  .bmi-form { display: flex; flex-direction: column; gap: 1.5rem; }
  .input-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .input-label { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted); font-weight: 500; }
  .input-field {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 0.9rem 1.2rem;
    font-family: var(--ff-body);
    font-size: 0.95rem;
    border-radius: 3px;
    transition: border-color 0.3s;
    outline: none;
  }
  .input-field:focus { border-color: var(--gold); }
  .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .bmi-result {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 2.5rem;
    text-align: center;
  }
  .bmi-num {
    font-family: var(--ff-head);
    font-size: 5rem;
    font-weight: 600;
    line-height: 1;
    margin-bottom: 0.5rem;
  }
  .bmi-category { font-size: 1.1rem; font-weight: 500; margin-bottom: 0.5rem; letter-spacing: 0.1em; text-transform: uppercase; }
  .bmi-advice { font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; }
  .bmi-scale { margin-top: 2rem; }
  .scale-bar { height: 6px; border-radius: 3px; background: linear-gradient(90deg, #4ade80 0%, #facc15 35%, #fb923c 65%, #f87171 100%); position: relative; margin: 1rem 0 0.5rem; }
  .scale-pointer {
    position: absolute; top: -5px;
    width: 16px; height: 16px;
    background: white;
    border: 2px solid var(--gold);
    border-radius: 50%;
    transform: translateX(-50%);
    transition: left 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .scale-labels { display: flex; justify-content: space-between; font-size: 0.65rem; color: var(--text-dim); letter-spacing: 0.08em; }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 5rem; }
  .contact-info { display: flex; flex-direction: column; gap: 2rem; }
  .contact-item { display: flex; gap: 1.2rem; align-items: flex-start; }
  .contact-icon {
    width: 44px; height: 44px;
    background: var(--gold-dim);
    border: 1px solid var(--border);
    border-radius: 3px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; flex-shrink: 0;
  }
  .contact-label { font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.3rem; }
  .contact-value { font-size: 0.9rem; color: var(--text-muted); font-weight: 300; }
  .contact-form { display: flex; flex-direction: column; gap: 1.2rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
  .form-textarea {
    resize: vertical; min-height: 120px;
  }

  /* FOOTER */
  .footer {
    background: var(--bg2);
    border-top: 1px solid var(--border);
    padding: 4rem 5% 2rem;
  }
  .footer-top { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
  .footer-brand { }
  .footer-logo { font-family: var(--ff-head); font-size: 2rem; font-weight: 600; margin-bottom: 1rem; }
  .footer-logo span { color: var(--gold); }
  .footer-tagline { font-size: 0.85rem; color: var(--text-muted); line-height: 1.7; font-weight: 300; max-width: 250px; margin-bottom: 1.5rem; }
  .footer-social { display: flex; gap: 0.8rem; }
  .social-btn {
    width: 36px; height: 36px;
    border: 1px solid var(--border);
    border-radius: 3px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.9rem;
    cursor: pointer; transition: all 0.3s;
    background: transparent;
    color: var(--text-muted);
  }
  .social-btn:hover { border-color: var(--gold); color: var(--gold); background: var(--gold-dim); }
  .footer-col h4 { font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 1.2rem; font-weight: 500; }
  .footer-links { display: flex; flex-direction: column; gap: 0.7rem; }
  .footer-links a { font-size: 0.85rem; color: var(--text-dim); text-decoration: none; transition: color 0.3s; cursor: pointer; }
  .footer-links a:hover { color: var(--gold); }
  .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 2rem; border-top: 1px solid rgba(201,168,76,0.1); }
  .footer-copy { font-size: 0.78rem; color: var(--text-dim); }
  .footer-copy span { color: var(--gold); }

  /* MOBILE NAV */
  .mobile-menu {
    position: fixed; inset: 0; z-index: 999;
    background: rgba(10,10,10,0.98);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 2rem;
    transform: translateX(100%); transition: transform var(--transition);
  }
  .mobile-menu.open { transform: translateX(0); }
  .mobile-menu a { font-family: var(--ff-head); font-size: 2rem; font-weight: 300; color: var(--text); text-decoration: none; cursor: pointer; }
  .mobile-menu a:hover { color: var(--gold); }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeLeft {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes scrollLine {
    0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
    50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
    100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
  }
  .fade-in-section { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .fade-in-section.visible { opacity: 1; transform: translateY(0); }

  /* RESPONSIVE */
  @media (max-width: 1024px) {
    .trainers-grid { grid-template-columns: repeat(2, 1fr); }
    .about-grid { grid-template-columns: 1fr; }
    .about-visual { height: 360px; }
    .footer-top { grid-template-columns: 1fr 1fr; gap: 2rem; }
  }
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .programs-grid { grid-template-columns: 1fr; }
    .pricing-grid { grid-template-columns: 1fr; }
    .transform-grid { grid-template-columns: 1fr; }
    .bmi-container { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
    .hero-stats { display: none; }
    .about-highlights { grid-template-columns: 1fr 1fr; }
    .footer-top { grid-template-columns: 1fr; }
    .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
    .form-row { grid-template-columns: 1fr; }
    .schedule-tabs { flex-wrap: wrap; width: 100%; }
  }
`;

const PROGRAMS = [
  { icon: "🔥", name: "Strength Training", desc: "Build raw power and muscle mass with progressive overload systems designed by elite coaches.", duration: "60 min", level: "All Levels" },
  { icon: "⚡", name: "HIIT Cardio", desc: "High-intensity interval training that torches fat and elevates your cardiovascular threshold.", duration: "45 min", level: "Intermediate" },
  { icon: "🥊", name: "Combat Boxing", desc: "Channel your aggression into technique. Full-body workout inspired by professional boxing.", duration: "60 min", level: "All Levels" },
  { icon: "🧘", name: "Yoga & Mobility", desc: "Restore balance, improve flexibility and mental clarity with guided sessions.", duration: "75 min", level: "Beginner" },
  { icon: "🏃", name: "Functional Fitness", desc: "Movement-based training that translates directly to real-world strength and agility.", duration: "50 min", level: "All Levels" },
  { icon: "🏊", name: "Aqua Training", desc: "Low-impact, high-resistance pool workouts perfect for recovery and conditioning.", duration: "45 min", level: "All Levels" },
];

const SCHEDULE = {
  Monday: [
    { time: "06:00 AM", class: "Morning HIIT", trainer: "Alex Reid", spots: "3 left", status: "open" },
    { time: "08:00 AM", class: "Strength Training", trainer: "Marcus Cole", spots: "Full", status: "full" },
    { time: "12:00 PM", class: "Yoga & Mobility", trainer: "Priya Sharma", spots: "12 left", status: "open" },
    { time: "06:00 PM", class: "Combat Boxing", trainer: "Jake Torres", spots: "5 left", status: "open" },
    { time: "07:30 PM", class: "Functional Fitness", trainer: "Alex Reid", spots: "Premium", status: "premium" },
  ],
  Tuesday: [
    { time: "07:00 AM", class: "Aqua Training", trainer: "Priya Sharma", spots: "8 left", status: "open" },
    { time: "09:00 AM", class: "Strength Training", trainer: "Marcus Cole", spots: "Full", status: "full" },
    { time: "05:30 PM", class: "HIIT Cardio", trainer: "Jake Torres", spots: "2 left", status: "open" },
    { time: "07:00 PM", class: "Yoga & Mobility", trainer: "Priya Sharma", spots: "15 left", status: "open" },
  ],
  Wednesday: [
    { time: "06:00 AM", class: "Functional Fitness", trainer: "Alex Reid", spots: "Premium", status: "premium" },
    { time: "10:00 AM", class: "Combat Boxing", trainer: "Jake Torres", spots: "6 left", status: "open" },
    { time: "12:30 PM", class: "HIIT Cardio", trainer: "Marcus Cole", spots: "Full", status: "full" },
    { time: "06:30 PM", class: "Strength Training", trainer: "Marcus Cole", spots: "4 left", status: "open" },
  ],
};

const TRAINERS = [
  { emoji: "💪", bg: "linear-gradient(135deg,#1a0d0d,#0f0a0a)", name: "Marcus Cole", role: "Head Coach", certs: ["CSCS", "CPT", "SFG"], rating: "4.9", reviews: 128 },
  { emoji: "🥊", bg: "linear-gradient(135deg,#0d1a0d,#0a0f0a)", name: "Jake Torres", role: "Combat Specialist", certs: ["WBC", "MMA", "HIIT"], rating: "4.8", reviews: 94 },
  { emoji: "🧘", bg: "linear-gradient(135deg,#0d0d1a,#0a0a0f)", name: "Priya Sharma", role: "Yoga & Recovery", certs: ["RYT-500", "CPT"], rating: "5.0", reviews: 201 },
  { emoji: "⚡", bg: "linear-gradient(135deg,#1a1a0d,#0f0f0a)", name: "Alex Reid", role: "Performance Coach", certs: ["NSCA", "FMS", "PN1"], rating: "4.9", reviews: 156 },
];

const PLANS = [
  {
    plan: "Basic", price: "29", period: "/ month",
    features: [
      { text: "Gym Access (6AM–10PM)", ok: true },
      { text: "2 Group Classes / week", ok: true },
      { text: "Locker Room Access", ok: true },
      { text: "Fitness Assessment", ok: false },
      { text: "Personal Training", ok: false },
      { text: "Nutrition Consultation", ok: false },
    ]
  },
  {
    plan: "Elite", price: "79", period: "/ month", featured: true,
    features: [
      { text: "Unlimited Gym Access 24/7", ok: true },
      { text: "Unlimited Group Classes", ok: true },
      { text: "Locker Room + Sauna", ok: true },
      { text: "Monthly Fitness Assessment", ok: true },
      { text: "2 PT Sessions / month", ok: true },
      { text: "Nutrition Consultation", ok: false },
    ]
  },
  {
    plan: "Prestige", price: "149", period: "/ month",
    features: [
      { text: "Unlimited Gym Access 24/7", ok: true },
      { text: "Unlimited Group Classes", ok: true },
      { text: "All Premium Facilities", ok: true },
      { text: "Weekly Fitness Assessment", ok: true },
      { text: "8 PT Sessions / month", ok: true },
      { text: "Full Nutrition Program", ok: true },
    ]
  }
];

const TRANSFORMS = [
  { before: "😔", after: "💪", name: "Rahul Mehta", meta: "-18kg in 4 months", quote: "FORGE completely changed my relationship with fitness. I'm a different person." },
  { before: "😮", after: "🏆", name: "Ananya Kapoor", meta: "+12kg muscle in 6 months", quote: "The trainers here are unmatched. My transformation exceeded every expectation." },
  { before: "😓", after: "⚡", name: "Dev Sharma", meta: "-24kg in 7 months", quote: "I never believed I could get here. FORGE made the impossible routine." },
];

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
}

function useIntersect(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function FadeSection({ children, className = "" }) {
  const ref = useRef(null);
  const vis = useIntersect(ref);
  return <div ref={ref} className={`fade-in-section${vis ? " visible" : ""} ${className}`}>{children}</div>;
}

function BMICalc() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const calc = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) setBmi(+(w / (h * h)).toFixed(1));
  };
  const cat = bmi ? bmi < 18.5 ? { label: "Underweight", color: "#60a5fa", pct: 10 } : bmi < 25 ? { label: "Healthy", color: "#4ade80", pct: 35 } : bmi < 30 ? { label: "Overweight", color: "#fb923c", pct: 65 } : { label: "Obese", color: "#f87171", pct: 88 } : null;
  return (
    <div className="bmi-container">
      <div className="bmi-form">
        <div className="input-row">
          <div className="input-group"><label className="input-label">Height (cm)</label><input className="input-field" type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="175" /></div>
          <div className="input-group"><label className="input-label">Weight (kg)</label><input className="input-field" type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" /></div>
        </div>
        <div className="input-group"><label className="input-label">Age</label><input className="input-field" type="number" placeholder="28" /></div>
        <div className="input-group">
          <label className="input-label">Gender</label>
          <select className="input-field" style={{cursor:"pointer"}}>
            <option>Male</option><option>Female</option><option>Prefer not to say</option>
          </select>
        </div>
        <button className="btn-primary" onClick={calc} style={{width:"100%"}}>Calculate My BMI</button>
        <p style={{fontSize:"0.78rem",color:"var(--text-dim)",lineHeight:1.6}}>Your BMI data is never stored. This tool is for informational purposes only.</p>
      </div>
      <div className="bmi-result">
        {bmi ? (<>
          <div className="bmi-num" style={{color:cat.color}}>{bmi}</div>
          <div className="bmi-category" style={{color:cat.color}}>{cat.label}</div>
          <p className="bmi-advice">{cat.label === "Healthy" ? "Excellent! Maintain your current lifestyle with our performance programs." : cat.label === "Underweight" ? "Our nutrition + strength programs can help you build healthy mass." : "Our elite coaches have tailored programs to help you reach your goals."}</p>
          <div className="bmi-scale">
            <div className="scale-bar"><div className="scale-pointer" style={{left:`${cat.pct}%`}} /></div>
            <div className="scale-labels"><span>Underweight</span><span>Healthy</span><span>Overweight</span><span>Obese</span></div>
          </div>
        </>) : (<>
          <div style={{fontSize:"4rem",marginBottom:"1rem"}}>📊</div>
          <p style={{color:"var(--text-muted)",fontSize:"0.9rem",lineHeight:1.7}}>Enter your details and calculate your BMI to receive personalized program recommendations from our expert coaches.</p>
          <div style={{marginTop:"2rem",display:"flex",flexDirection:"column",gap:"0.6rem"}}>
            {["Personalised program match","Nutrition guidance","Goal timeline estimate"].map(f=>(
              <div key={f} style={{display:"flex",alignItems:"center",gap:"0.6rem",fontSize:"0.82rem",color:"var(--text-muted)"}}>
                <span style={{color:"var(--gold)"}}>✦</span>{f}
              </div>
            ))}
          </div>
        </>)}
      </div>
    </div>
  );
}

export default function GymWebsite() {
  const scrolled = useScrolled();
  const [activeDay, setActiveDay] = useState("Monday");
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const scrollTo = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  const handleContact = () => {
    if (contactForm.name && contactForm.email) { setSubmitted(true); }
  };

  return (
    <>
      <style>{styles}</style>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen?" open":""}`}>
        {["about","programs","schedule","trainers","pricing","contact"].map(s=>(
          <a key={s} onClick={()=>scrollTo(s)}>{s.charAt(0).toUpperCase()+s.slice(1)}</a>
        ))}
        <button className="btn-primary" onClick={()=>scrollTo("pricing")}>Join Now</button>
      </div>

      {/* NAV */}
      <nav className={`nav${scrolled?" scrolled":""}`}>
        <div className="nav-logo">FORGE<span>.</span></div>
        <div className="nav-links">
          {["about","programs","schedule","trainers","pricing","contact"].map(s=>(
            <a key={s} onClick={()=>scrollTo(s)}>{s.charAt(0).toUpperCase()+s.slice(1)}</a>
          ))}
          <a className="nav-cta" onClick={()=>scrollTo("pricing")}>Join Now</a>
        </div>
        <div className="hamburger" onClick={()=>setMenuOpen(!menuOpen)}>
          <span style={menuOpen?{transform:"rotate(45deg) translate(5px,5px)"}:{}} />
          <span style={menuOpen?{opacity:0}:{}} />
          <span style={menuOpen?{transform:"rotate(-45deg) translate(5px,-5px)"}:{}} />
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg" /><div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">Premium Fitness Club — Est. 2018</span>
          </div>
          <h1 className="hero-title">
            Forge Your<br/><em>Strongest</em><br/>Self
          </h1>
          <p className="hero-sub">Where elite coaching meets precision programming. Transform your body, elevate your mind, and redefine what's possible.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={()=>scrollTo("pricing")}>Start Free Trial</button>
            <button className="btn-ghost" onClick={()=>scrollTo("programs")}>Explore Programs</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><div className="hero-stat-num">2,400+</div><div className="hero-stat-label">Active Members</div></div>
          <div className="hero-stat"><div className="hero-stat-num">98%</div><div className="hero-stat-label">Retention Rate</div></div>
          <div className="hero-stat"><div className="hero-stat-num">6</div><div className="hero-stat-label">Years of Excellence</div></div>
        </div>
        <div className="hero-scroll" onClick={()=>scrollTo("about")}>
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <FadeSection>
          <div className="about-grid">
            <div className="about-visual">
              <div className="about-card about-card-main">
                <div className="about-bg-pattern" />
                <div className="about-badge">
                  <span className="about-badge-num">6+</span>
                  <span className="about-badge-text">Years of<br/>Excellence</span>
                </div>
                <div className="about-card-inner">
                  <div className="about-card-title">A new standard<br/>in <em>elite</em> fitness</div>
                  <div className="about-card-sub">New Delhi's most prestigious training facility</div>
                </div>
              </div>
              <div className="about-card about-floating">
                {["State-of-art equipment","Expert certified coaches","Science-based programming","Recovery & wellness centre"].map(f=>(
                  <div key={f} className="about-feat"><div className="feat-dot"/>{f}</div>
                ))}
              </div>
            </div>
            <div className="about-text">
              <div className="section-header" style={{marginBottom:"1.5rem"}}>
                <div className="section-eyebrow"><div className="eyebrow-dot"/><span className="eyebrow-text">Our Story</span></div>
                <h2 className="section-title">Built for those who<br/>refuse to <em>settle</em></h2>
                <div className="section-divider"/>
              </div>
              <p className="about-p">FORGE was founded on a singular philosophy: that extraordinary results require extraordinary environments. We combined world-class equipment, elite coaching methodology, and a culture of relentless improvement into one premium destination.</p>
              <p className="about-p">Every detail — from the programming to the atmosphere — has been engineered to help you perform at your absolute peak. This is not just a gym. This is a transformation system.</p>
              <div className="about-highlights">
                {[["2,400+","Members Transformed"],["4.9★","Average Rating"],["18","Expert Coaches"],["24/7","Premium Access"]].map(([n,l])=>(
                  <div key={l} className="highlight-item"><div className="highlight-num">{n}</div><div className="highlight-label">{l}</div></div>
                ))}
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* PROGRAMS */}
      <section className="section section-alt" id="programs">
        <FadeSection>
          <div className="section-header">
            <div className="section-eyebrow"><div className="eyebrow-dot"/><span className="eyebrow-text">Programs</span></div>
            <h2 className="section-title">Every discipline.<br/><em>One</em> destination.</h2>
            <div className="section-divider"/>
            <p className="section-sub">Six elite training disciplines, each meticulously designed to deliver measurable results with expert guidance.</p>
          </div>
          <div className="programs-grid">
            {PROGRAMS.map(p=>(
              <div key={p.name} className="program-card">
                <span className="program-icon">{p.icon}</span>
                <div className="program-name">{p.name}</div>
                <p className="program-desc">{p.desc}</p>
                <div className="program-meta">
                  <span className="program-tag">⏱ {p.duration}</span>
                  <span className="program-tag">◉ {p.level}</span>
                </div>
                <div className="program-arrow">→</div>
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* SCHEDULE */}
      <section className="section" id="schedule">
        <FadeSection>
          <div className="section-header">
            <div className="section-eyebrow"><div className="eyebrow-dot"/><span className="eyebrow-text">Class Schedule</span></div>
            <h2 className="section-title">Book your <em>perfect</em><br/>session</h2>
            <div className="section-divider"/>
          </div>
          <div className="schedule-tabs">
            {Object.keys(SCHEDULE).map(d=>(
              <button key={d} className={`tab-btn${activeDay===d?" active":""}`} onClick={()=>setActiveDay(d)}>{d}</button>
            ))}
          </div>
          <table className="schedule-table">
            <thead><tr><th>Time</th><th>Class</th><th>Trainer</th><th>Availability</th><th>Action</th></tr></thead>
            <tbody>
              {SCHEDULE[activeDay].map((c,i)=>(
                <tr key={i}>
                  <td style={{fontFamily:"var(--ff-head)",fontSize:"1rem",color:"var(--text)"}}>{c.time}</td>
                  <td><span className="class-name">{c.class}</span></td>
                  <td>{c.trainer}</td>
                  <td>
                    <span className={`class-badge ${c.status==="open"?"badge-open":c.status==="full"?"badge-full":"badge-gold"}`}>
                      {c.status==="open"?"✓ "+c.spots:c.status==="full"?"✗ Full":"★ "+c.spots}
                    </span>
                  </td>
                  <td>
                    <button style={{
                      padding:"0.4rem 1rem",fontSize:"0.7rem",letterSpacing:"0.1em",textTransform:"uppercase",
                      background:c.status==="full"?"transparent":"var(--gold)",
                      color:c.status==="full"?"var(--text-dim)":"#000",
                      border:`1px solid ${c.status==="full"?"var(--border)":"var(--gold)"}`,
                      borderRadius:"2px",cursor:c.status==="full"?"default":"pointer",fontFamily:"var(--ff-body)",fontWeight:600
                    }}>
                      {c.status==="full"?"Waitlist":"Book"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeSection>
      </section>

      {/* TRAINERS */}
      <section className="section section-alt" id="trainers">
        <FadeSection>
          <div className="section-header">
            <div className="section-eyebrow"><div className="eyebrow-dot"/><span className="eyebrow-text">Our Coaches</span></div>
            <h2 className="section-title">Trained by the <em>best</em>,<br/>coached by the best</h2>
            <div className="section-divider"/>
          </div>
          <div className="trainers-grid">
            {TRAINERS.map(t=>(
              <div key={t.name} className="trainer-card">
                <div className="trainer-photo"><div className="trainer-photo-bg" style={{background:t.bg}}/><span className="trainer-emoji">{t.emoji}</span></div>
                <div className="trainer-info">
                  <div className="trainer-name">{t.name}</div>
                  <div className="trainer-role">{t.role}</div>
                  <div className="trainer-certs">{t.certs.map(c=><span key={c} className="cert-tag">{c}</span>)}</div>
                  <div className="trainer-rating"><span className="stars">★★★★★</span><span className="rating-num">{t.rating} ({t.reviews} reviews)</span></div>
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* PRICING */}
      <section className="section" id="pricing">
        <FadeSection>
          <div className="section-header">
            <div className="section-eyebrow"><div className="eyebrow-dot"/><span className="eyebrow-text">Membership</span></div>
            <h2 className="section-title">Invest in your <em>transformation</em></h2>
            <div className="section-divider"/>
            <p className="section-sub">Transparent pricing. No hidden fees. Cancel anytime. First 7 days completely free.</p>
          </div>
          <div className="pricing-grid">
            {PLANS.map(p=>(
              <div key={p.plan} className={`pricing-card${p.featured?" featured":""}`}>
                {p.featured && <div className="pricing-badge">Most Popular</div>}
                <div className="pricing-plan">{p.plan}</div>
                <div className="pricing-price"><sup>₹</sup>{p.price}</div>
                <div className="pricing-period">{p.period}</div>
                <div className="pricing-divider"/>
                <div className="pricing-features">
                  {p.features.map(f=>(
                    <div key={f.text} className="pricing-feat">
                      <span className={f.ok?"feat-check":"feat-x"}>{f.ok?"✓":"×"}</span>
                      <span className={f.ok?"":"feat-disabled"}>{f.text}</span>
                    </div>
                  ))}
                </div>
                <button className={p.featured?"btn-primary":"btn-ghost"} style={{width:"100%"}}>
                  {p.featured?"Get Started — Free Trial":"Choose {p.plan}".replace("{p.plan}",p.plan)}
                </button>
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* TRANSFORMATIONS */}
      <section className="section section-alt">
        <FadeSection>
          <div className="section-header">
            <div className="section-eyebrow"><div className="eyebrow-dot"/><span className="eyebrow-text">Transformations</span></div>
            <h2 className="section-title">Real people,<br/><em>real</em> results</h2>
            <div className="section-divider"/>
          </div>
          <div className="transform-grid">
            {TRANSFORMS.map(t=>(
              <div key={t.name} className="transform-card">
                <div className="transform-visual">
                  <div className="transform-before">{t.before}</div>
                  <div className="transform-after">{t.after}</div>
                  <div className="transform-arrow">→</div>
                </div>
                <div className="transform-labels"><span className="t-label">Before</span><span className="t-label">After ✦</span></div>
                <div className="transform-info">
                  <div className="transform-name">{t.name}</div>
                  <div className="transform-meta">{t.meta}</div>
                  <p className="transform-quote">"{t.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* BMI */}
      <section className="section">
        <FadeSection>
          <div className="section-header">
            <div className="section-eyebrow"><div className="eyebrow-dot"/><span className="eyebrow-text">Smart Tools</span></div>
            <h2 className="section-title">Find your <em>starting point</em></h2>
            <div className="section-divider"/>
            <p className="section-sub">Use our BMI calculator to get personalised program recommendations from our expert coaching team.</p>
          </div>
          <BMICalc/>
        </FadeSection>
      </section>

      {/* CONTACT */}
      <section className="section section-alt" id="contact">
        <FadeSection>
          <div className="section-header">
            <div className="section-eyebrow"><div className="eyebrow-dot"/><span className="eyebrow-text">Contact</span></div>
            <h2 className="section-title">Begin your <em>journey</em></h2>
            <div className="section-divider"/>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              {[
                { icon: "📍", label: "Location", value: "FORGE Premium Fitness\n42 Connaught Place, New Delhi, 110001" },
                { icon: "📞", label: "Phone", value: "+91 98765 43210" },
                { icon: "✉️", label: "Email", value: "hello@forgefit.in" },
                { icon: "🕐", label: "Hours", value: "Mon–Fri: 5:30AM – 11PM\nSat–Sun: 6AM – 9PM" },
              ].map(c=>(
                <div key={c.label} className="contact-item">
                  <div className="contact-icon">{c.icon}</div>
                  <div><div className="contact-label">{c.label}</div><div className="contact-value" style={{whiteSpace:"pre-line"}}>{c.value}</div></div>
                </div>
              ))}
            </div>
            {submitted ? (
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"4rem",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"4px",textAlign:"center",gap:"1rem"}}>
                <div style={{fontSize:"3rem"}}>✦</div>
                <div style={{fontFamily:"var(--ff-head)",fontSize:"2rem",fontWeight:300}}>Message <em style={{color:"var(--gold)"}}>Received</em></div>
                <p style={{color:"var(--text-muted)",fontSize:"0.9rem",maxWidth:"320px",lineHeight:1.7}}>Our team will reach out within 24 hours to discuss your fitness goals. Welcome to FORGE.</p>
              </div>
            ) : (
              <div className="contact-form">
                <div className="form-row">
                  <div className="input-group"><label className="input-label">Full Name</label><input className="input-field" value={contactForm.name} onChange={e=>setContactForm({...contactForm,name:e.target.value})} placeholder="Arjun Mehta"/></div>
                  <div className="input-group"><label className="input-label">Email</label><input className="input-field" type="email" value={contactForm.email} onChange={e=>setContactForm({...contactForm,email:e.target.value})} placeholder="arjun@example.com"/></div>
                </div>
                <div className="input-group"><label className="input-label">Phone</label><input className="input-field" value={contactForm.phone} onChange={e=>setContactForm({...contactForm,phone:e.target.value})} placeholder="+91 98765 43210"/></div>
                <div className="input-group">
                  <label className="input-label">I'm interested in</label>
                  <select className="input-field" style={{cursor:"pointer"}}>
                    <option>Free 7-Day Trial</option>
                    <option>Elite Membership</option>
                    <option>Personal Training</option>
                    <option>Corporate Packages</option>
                  </select>
                </div>
                <div className="input-group"><label className="input-label">Message (optional)</label><textarea className={`input-field form-textarea`} value={contactForm.message} onChange={e=>setContactForm({...contactForm,message:e.target.value})} placeholder="Tell us about your goals…"/></div>
                <button className="btn-primary" onClick={handleContact} style={{width:"100%",padding:"1.1rem"}}>Send Message</button>
                <p style={{fontSize:"0.75rem",color:"var(--text-dim)"}}>We respond within 24 hours. No spam, ever.</p>
              </div>
            )}
          </div>
        </FadeSection>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">FORGE<span>.</span></div>
            <p className="footer-tagline">New Delhi's most prestigious fitness destination. Where champions are made.</p>
            <div className="footer-social">
              {["📘","📸","🐦","▶️"].map((s,i)=><button key={i} className="social-btn">{s}</button>)}
            </div>
          </div>
          <div className="footer-col">
            <h4>Programs</h4>
            <div className="footer-links">
              {["Strength Training","HIIT Cardio","Combat Boxing","Yoga & Mobility","Functional Fitness","Aqua Training"].map(l=><a key={l}>{l}</a>)}
            </div>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <div className="footer-links">
              {["About FORGE","Our Coaches","Membership","Transformations","Blog","Careers"].map(l=><a key={l}>{l}</a>)}
            </div>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <div className="footer-links">
              {["Contact Us","FAQ","Privacy Policy","Terms of Service","Refund Policy"].map(l=><a key={l}>{l}</a>)}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2025 <span>FORGE Premium Fitness</span>. All rights reserved.</p>
          <p className="footer-copy">Crafted with <span>✦</span> in New Delhi</p>
        </div>
      </footer>
    </>
  );
}
