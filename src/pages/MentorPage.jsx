// src/pages/MentorPage.jsx
import React, { useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

// ----------------- DATA -----------------
const heroStories = [
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
    title: "From Intern to CEO: Sarah’s Journey",
    desc: "Sarah Chen’s story of growth and leadership, guided by mentorship.",
  },
  {
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80",
    title: "David’s Mentorship: Building a Tech Startup",
    desc: "David Lee’s experience in creating a successful tech company with mentor support.",
  },
  {
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=600&q=80",
    title: "Maria’s Impact: Transforming a Marketing Strategy",
    desc: "Maria Rodriguez’s success in revitalizing a marketing approach with guidance.",
  },
];

const mentorCategories = [
  {
    icon: "💼",
    title: "Business Strategy",
    desc: "Develop effective business plans and strategies.",
  },
  {
    icon: "💻",
    title: "Software Engineering",
    desc: "Learn to code and build software applications.",
  },
  {
    icon: "📈",
    title: "Marketing",
    desc: "Master marketing techniques and strategies.",
  },
  {
    icon: "💸",
    title: "Finance",
    desc: "Understand financial markets and investments.",
  },
  {
    icon: "🎨",
    title: "Design",
    desc: "Enhance your design skills and creativity.",
  },
];

const expertiseTabs = [
  "Software Engineering",
  "Product Management",
  "Data Science",
  "Marketing",
  "Design",
];

const mentorProfiles = [
  { name: "Fatima Khan", role: "Software Engineering", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&q=80" },
  { name: "Benjamin Hayes", role: "Product Management", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80" },
  { name: "Aisha Rahman", role: "Data Science", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=80" },
  { name: "Samuel Reed", role: "Marketing", image: "https://images.unsplash.com/photo-1552053566-35c9e1e96c79?w=300&q=80" },
  { name: "Zainab Malik", role: "Design", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&q=80" },
  { name: "Elijah Bennett", role: "Software Engineering", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=80" },
  { name: "Nadia Ali", role: "Product Management", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&q=80" },
  { name: "Grayson Cole", role: "Data Science", image: "https://images.unsplash.com/photo-1552053566-35c9e1e96c79?w=300&q=80" },
  { name: "Aaliyah Siddiqui", role: "Marketing", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&q=80" },
  { name: "Jackson Reed", role: "Design", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&q=80" },
  { name: "Hafsa Ahmed", role: "Software Engineering", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&q=80" },
  { name: "Carter Hayes", role: "Product Management", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80" },
  { name: "Mariam Hassan", role: "Data Science", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=80" },
  { name: "Henry Cole", role: "Marketing", image: "https://images.unsplash.com/photo-1552053566-35c9e1e96c79?w=300&q=80" },
  { name: "Lina Ibrahim", role: "Design", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&q=80" },
];

// ----------------- LAYOUT COMPONENTS -----------------
const Navbar = () => (
  <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-20 border-b border-gray-100">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-emerald-500 grid place-items-center text-white font-bold">
          R
        </div>
        <span className="text-lg font-semibold text-gray-800">
          Rizq <span className="font-light">ventures</span>
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <a href="/#" className="hover:text-gray-900">
          Home
        </a>
        <a href="/#" className="hover:text-gray-900">
          Posts
        </a>
        <a href="/#" className="hover:text-gray-900">
          Jobs
        </a>
        <a href="/#" className="hover:text-gray-900">
          About Us
        </a>
        <a
          href="/#"
          className="text-emerald-500 border-b-2 border-emerald-500 pb-1"
        >
          Mentors
        </a>
      </nav>
      <div className="flex items-center gap-4">
        <button className="text-sm font-medium text-gray-700 hover:text-black">
          Login
        </button>
        <button className="text-sm font-medium px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600">
          Sign Up
        </button>
      </div>
    </div>
  </header>
);

const NetworkBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const options = {
    fullScreen: {
      // attach canvas to <body>, full viewport size
      enable: true,
      zIndex: -1, // keep it behind page content
    },
    background: {
      color: {
        value: "#ffffff", // base white like your design
      },
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: { value: "#34d399" },
      links: {
        color: "#34d399",
        distance: 150,
        enable: true,
        opacity: 0.35,
        width: 1,
      },
      collisions: { enable: false },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: true,
        speed: 1.3,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 60,
      },
      opacity: { value: 0.4 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  return <Particles id="tsparticles" init={particlesInit} options={options} />;
}

// ----------------- MAIN PAGE -----------------
export default function MentorPage() {
  const [searchTop, setSearchTop] = useState("");
  const [searchMentors, setSearchMentors] = useState("");
  const [activeExpertise, setActiveExpertise] = useState("Software Engineering");

  const filteredProfiles = mentorProfiles
    .slice(0, 15)
    .filter((m) => {
      const text = (m.name + " " + m.role).toLowerCase();
      const q = searchMentors.toLowerCase();
      const matchesSearch = !q || text.includes(q);
      const matchesExpertise = activeExpertise ? m.role === activeExpertise : true;
      return matchesSearch && matchesExpertise;
    });

  return (
    <div className="relative min-h-screen bg-white-transparent overflow-hidden">
      <NetworkBackground />
      <Navbar />

      <main className="relative z-10">
        {/* ---------- HERO TOP SECTION ---------- */}
        <section className="max-w-6xl mx-auto px-4 pt-16 xl:px-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6 sm:mb-7 text-gray-900">
            Ask Directly
            <br />
            to the{" "}
            <span className="text-emerald-500" style={{ letterSpacing: 0 }}>
              Experts
            </span>
          </h1>
          <button className="mt-2 sm:mt-4 bg-emerald-500 text-white font-bold py-2 px-8 rounded-xl text-lg hover:bg-emerald-600">
            FIND A MENTOR
          </button>

          {/* Search / Category / Go pills */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 max-w-3xl">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 rounded-full bg-emerald-100 px-6 py-2 font-semibold outline-none text-sm border-none"
              value={searchTop}
              onChange={(e) => setSearchTop(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category"
              className="rounded-full bg-emerald-100 px-6 py-2 font-semibold outline-none text-sm border-none sm:max-w-xs"
            />
            <button className="rounded-full font-bold px-10 py-2 bg-emerald-200 hover:bg-emerald-300 text-sm">
              Go
            </button>
          </div>
        </section>

        {/* ---------- FIND A MENTOR + STORIES ---------- */}
        <section className="max-w-6xl mx-auto px-4 mt-10 xl:px-0">
          <h2 className="font-bold text-2xl">Find a Mentor</h2>
          <p className="mb-4 mt-1 text-gray-500 text-sm max-w-xl">
            Connect with experienced professionals who can guide you towards your goals.
          </p>

          {/* Inner green search bar */}
          <div className="flex items-center bg-emerald-50 rounded-xl px-4 py-2 gap-3 max-w-xl mb-6">
            <span className="text-gray-400 text-lg">🔍</span>
            <input
              type="text"
              className="bg-transparent flex-1 outline-none text-sm px-1"
              placeholder="Search for mentors by name, skill, or industry"
            />
          </div>

          {/* Three story cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {heroStories.map((m) => (
              <article
                key={m.title}
                className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={m.image}
                  alt={m.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-gray-900">{m.title}</h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">{m.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- MENTOR CATEGORIES ---------- */}
        <section className="max-w-6xl mx-auto px-4 mt-12 xl:px-0">
          <h2 className="text-lg font-bold mb-3">Mentor Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {mentorCategories.map((c) => (
              <div
                key={c.title}
                className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-6 text-center flex flex-col items-center shadow-xs"
              >
                <span className="text-2xl mb-2">{c.icon}</span>
                <span className="font-semibold text-sm text-gray-900">{c.title}</span>
                <span className="mt-1 text-[11px] text-gray-500">{c.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- UPCOMING EVENTS ---------- */}
        <section className="max-w-6xl mx-auto px-4 mt-12 xl:px-0">
          <h2 className="text-lg font-bold mb-2">Upcoming Mentorship Events</h2>
          <div className="bg-emerald-50 rounded-xl p-5 max-w-2xl">
            <p className="text-xs text-gray-500 mb-1">Webinar</p>
            <p className="text-sm font-semibold text-gray-900">
              Effective Communication Strategies
            </p>
            <p className="mt-1 text-xs text-gray-600 leading-relaxed">
              Join us for a webinar on improving your communication skills with industry experts.
            </p>
            <button className="mt-3 px-4 py-1.5 rounded-full bg-white text-gray-800 text-xs font-semibold border border-gray-200 hover:bg-gray-100">
              Register Now
            </button>
          </div>
        </section>

        {/* ---------- COMMUNITY + WHY BECOME A MENTOR ---------- */}
        <section className="max-w-6xl mx-auto px-4 mt-12 mb-16 xl:px-0 space-y-10">
          <div>
            <h2 className="text-lg font-bold mb-1">Community Forum</h2>
            <p className="text-xs text-gray-600 max-w-2xl">
              Engage with mentors and peers in our community forum. Ask questions, share insights, and
              connect with others.
            </p>
            <button className="mt-3 px-4 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600">
              Go to Forum
            </button>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-1">Why Become a Mentor?</h2>
            <p className="text-xs text-gray-600 max-w-3xl">
              Share your expertise, give back to the community, and help shape the next generation of
              professionals. Become a mentor and make a difference.
            </p>
            <button className="mt-3 px-4 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600">
              Become a Mentor
            </button>
          </div>
        </section>

        {/* ---------- MENTORS GRID (SECOND IMAGE TOP) ---------- */}
        <section className="mt-10 mb-16">
          <div className="w-full flex justify-center">
            <div className="w-full max-w-5xl bg-white/95 rounded-2xl shadow-lg border border-gray-100 px-10 pt-6 pb-8">
              {/* Search bar */}
              <div className="w-full mb-4">
                <input
                  type="text"
                  placeholder="Search mentors by name or expertise"
                  className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  value={searchMentors}
                  onChange={(e) => setSearchMentors(e.target.value)}
                />
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap items-center justify-start gap-2 mb-6">
                {expertiseTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveExpertise(tab)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium border ${
                      activeExpertise === tab
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Avatars grid: 3 rows x 5 columns */}
              <div className="grid grid-cols-5 justify-items-center gap-x-10 gap-y-10 mb-6">
                {filteredProfiles.map((m) => (
                  <div
                    key={m.name}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-2 shadow-md">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-sm font-semibold text-gray-800">
                      {m.name}
                    </div>
                    <div className="text-[11px] text-gray-500">{m.role}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-6 py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600">
                  Request Mentorship
                </button>
                <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 text-sm font-semibold border border-gray-200 hover:bg-gray-200">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- FOR MENTORSHIP CARD (SECOND IMAGE BOTTOM) ---------- */}
        <section className="max-w-6xl mx-auto px-4 mb-24 xl:px-0">
          <div className="bg-white/95 rounded-2xl shadow-lg border border-gray-100 px-6 sm:px-10 py-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 flex justify-center">
              <div className="rounded-2xl overflow-hidden bg-gray-100 max-w-sm w-full shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=500&q=80"
                  alt="Mentor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <h2 className="text-xl font-bold mb-2 text-gray-800">For Mentorship</h2>
              <p className="text-sm text-gray-600 mb-6">
                Got questions about the Landing Page UI Kit? Our team is here to help. Contact us for quick and friendly support.
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full h-11 rounded-full border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-300"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full h-11 rounded-full border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-300"
                />
                <button className="mt-2 px-6 py-2.5 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
