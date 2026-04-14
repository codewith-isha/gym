export const PROGRAMS = [
  { icon: "🔥", name: "Strength Training", desc: "Build raw power and muscle mass with progressive overload systems designed by elite coaches.", duration: "60 min", level: "All Levels", color: "#C9A84C" },
  { icon: "⚡", name: "HIIT Cardio", desc: "High-intensity interval training that torches fat and elevates your cardiovascular threshold.", duration: "45 min", level: "Intermediate", color: "#fb923c" },
  { icon: "🥊", name: "Combat Boxing", desc: "Channel your aggression into technique. Full-body workout inspired by professional boxing.", duration: "60 min", level: "All Levels", color: "#f87171" },
  { icon: "🧘", name: "Yoga & Mobility", desc: "Restore balance, improve flexibility and mental clarity with guided sessions.", duration: "75 min", level: "Beginner", color: "#4ade80" },
  { icon: "🏃", name: "Functional Fitness", desc: "Movement-based training that translates directly to real-world strength and agility.", duration: "50 min", level: "All Levels", color: "#60a5fa" },
  { icon: "🏊", name: "Aqua Training", desc: "Low-impact, high-resistance pool workouts perfect for recovery and conditioning.", duration: "45 min", level: "All Levels", color: "#a78bfa" },
];

export const SCHEDULE = {
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
  Thursday: [
    { time: "06:30 AM", class: "Strength Training", trainer: "Marcus Cole", spots: "8 left", status: "open" },
    { time: "09:00 AM", class: "Yoga & Mobility", trainer: "Priya Sharma", spots: "10 left", status: "open" },
    { time: "05:00 PM", class: "HIIT Cardio", trainer: "Alex Reid", spots: "Full", status: "full" },
    { time: "07:00 PM", class: "Aqua Training", trainer: "Priya Sharma", spots: "Premium", status: "premium" },
  ],
  Friday: [
    { time: "06:00 AM", class: "Combat Boxing", trainer: "Jake Torres", spots: "4 left", status: "open" },
    { time: "10:00 AM", class: "Functional Fitness", trainer: "Alex Reid", spots: "6 left", status: "open" },
    { time: "06:00 PM", class: "Strength Training", trainer: "Marcus Cole", spots: "Full", status: "full" },
    { time: "07:30 PM", class: "HIIT Cardio", trainer: "Jake Torres", spots: "7 left", status: "open" },
  ],
  Saturday: [
    { time: "08:00 AM", class: "Yoga & Mobility", trainer: "Priya Sharma", spots: "Premium", status: "premium" },
    { time: "10:00 AM", class: "Aqua Training", trainer: "Priya Sharma", spots: "5 left", status: "open" },
    { time: "12:00 PM", class: "Combat Boxing", trainer: "Jake Torres", spots: "Full", status: "full" },
    { time: "04:00 PM", class: "Functional Fitness", trainer: "Alex Reid", spots: "9 left", status: "open" },
  ],
};

export const TRAINERS = [
  { emoji: "💪", bg: "linear-gradient(135deg,#1a0d0d,#0f0a0a)", name: "Marcus Cole", role: "Head Coach", certs: ["CSCS", "CPT", "SFG"], rating: "4.9", reviews: 128, bio: "10+ years sculpting champions. Marcus blends biomechanics with relentless intensity to push you beyond your limits.", specialty: "Strength & Powerlifting" },
  { emoji: "🥊", bg: "linear-gradient(135deg,#0d1a0d,#0a0f0a)", name: "Jake Torres", role: "Combat Specialist", certs: ["WBC", "MMA", "HIIT"], rating: "4.8", reviews: 94, bio: "Former professional boxer turned elite coach. Jake's high-energy sessions combine fight technique with conditioning.", specialty: "Boxing & Combat Sports" },
  { emoji: "🧘", bg: "linear-gradient(135deg,#0d0d1a,#0a0a0f)", name: "Priya Sharma", role: "Yoga & Recovery", certs: ["RYT-500", "CPT"], rating: "5.0", reviews: 201, bio: "Trained in Rishikesh and Los Angeles, Priya blends ancient tradition with modern sports recovery science.", specialty: "Yoga & Mobility" },
  { emoji: "⚡", bg: "linear-gradient(135deg,#1a1a0d,#0f0f0a)", name: "Alex Reid", role: "Performance Coach", certs: ["NSCA", "FMS", "PN1"], rating: "4.9", reviews: 156, bio: "Athletic performance specialist who has worked with professional athletes across 5 sports disciplines.", specialty: "Functional Fitness & HIIT" },
];

export const PLANS = [
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

export const TRANSFORMS = [
  { before: "😔", after: "💪", name: "Rahul Mehta", meta: "-18kg in 4 months", quote: "FORGE completely changed my relationship with fitness. I'm a different person." },
  { before: "😮", after: "🏆", name: "Ananya Kapoor", meta: "+12kg muscle in 6 months", quote: "The trainers here are unmatched. My transformation exceeded every expectation." },
  { before: "😓", after: "⚡", name: "Dev Sharma", meta: "-24kg in 7 months", quote: "I never believed I could get here. FORGE made the impossible routine." },
];
