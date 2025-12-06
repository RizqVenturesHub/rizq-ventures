// pages/MentorPage.tsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import NetworkBackground from '../components/NetworkBackground';
import Header from '../components/Header'; // ADDED: shared header
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

// ----------------- INTERFACES -----------------
interface HeroStory {
  image: string;
  title: string;
  desc: string;
}

interface MentorCategory {
  icon: string;
  title: string;
  desc: string;
}

interface MentorProfile {
  name: string;
  role: string;
  image: string;
}

// ----------------- DATA -----------------
const heroStories: HeroStory[] = [
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
    title: "From Intern to CEO: Sarah's Journey",
    desc: "Sarah Chen's story of growth and leadership, guided by mentorship.",
  },
  {
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80",
    title: "David's Mentorship: Building a Tech Startup",
    desc: "David Lee's experience in creating a successful tech company with mentor support.",
  },
  {
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=600&q=80",
    title: "Maria's Impact: Transforming a Marketing Strategy",
    desc: "Maria Rodriguez's success in revitalizing a marketing approach with guidance.",
  },
];

const mentorCategories: MentorCategory[] = [
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

const expertiseTabs: string[] = [
  "Software Engineering",
  "Product Management",
  "Data Science",
  "Marketing",
  "Design",
];

const mentorProfiles: MentorProfile[] = [
  { name: "Fahim Khan", role: "Software Engineering", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&q=80" },
  { name: "Benjamin Hayes", role: "Product Management", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80" },
  { name: "Aisha Rahman", role: "Data Science", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=80" },
  { name: "Samuel Reed", role: "Marketing", image: "https://images.unsplash.com/photo-1552053566-35c9e1e96c79?w=300&q=80" },
  { name: "Zainab Malik", role: "Design", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&q=80" },
  { name: "Elijah Bennett", role: "Software Engineering", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=80" },
  { name: "Nadia Ali", role: "Product Management", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&q=80" },
  { name: "Grayson Cole", role: "Data Science", image: "https://images.unsplash.com/photo-1552053566-35c9e1e96c79?w=300&q=80" },
  { name: "Aaliyah Siddiqui", role: "Marketing", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&q=80" },
  { name: "Jackson Reed", role: "Design", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&q=80" },
  { name: "Hafiz Ahmed", role: "Software Engineering", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&q=80" },
  { name: "Carter Hayes", role: "Product Management", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80" },
  { name: "Mariam Hassan", role: "Data Science", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=80" },
  { name: "Henry Cole", role: "Marketing", image: "https://images.unsplash.com/photo-1552053566-35c9e1e96c79?w=300&q=80" },
  { name: "Lina Ibrahim", role: "Design", image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=300&q=80" },
];

// ----------------- MAIN PAGE -----------------
const MentorPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchTop, setSearchTop] = useState<string>("");
  const [searchMentors, setSearchMentors] = useState<string>("");
  const [activeExpertise, setActiveExpertise] = useState<string>("Software Engineering");

  const filteredProfiles = mentorProfiles
    .slice(0, 15)
    .filter((m) => {
      const text = (m.name + " " + m.role).toLowerCase();
      const q = searchMentors.toLowerCase();
      const matchesSearch = !q || text.includes(q);
      const matchesExpertise = activeExpertise ? m.role === activeExpertise : true;
      return matchesSearch && matchesExpertise;
    });

  const handleAuthAction = (action: () => void, actionName: string) => {
    if (isAuthenticated) {
      action();
    } else {
      toast.error('Please login to ' + actionName, {
        duration: 3000,
        position: 'top-center',
        icon: '🔒',
      });
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <NetworkBackground className="min-h-screen">
      <Toaster />
      <Header /> {/* CHANGED: using shared Header instead of local Navbar */}

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-4 pt-16 xl:px-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6 sm:mb-7 text-gray-900">
            Ask Directly
            <br />
            to the{" "}
            <span className="text-emerald-500" style={{ letterSpacing: 0 }}>
              Experts
            </span>
          </h1>
          <button 
            onClick={() => handleAuthAction(() => {
              const mentorsSection = document.getElementById('mentors-grid');
              if (mentorsSection) {
                mentorsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 'find a mentor')}
            className="mt-2 sm:mt-4 bg-emerald-500 text-white font-bold py-2 px-8 rounded-xl text-lg hover:bg-emerald-600"
          >
            FIND A MENTOR
          </button>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 max-w-3xl">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 rounded-full bg-white/70 backdrop-blur-sm px-6 py-2 font-semibold outline-none text-sm border border-gray-200"
              value={searchTop}
              onChange={(e) => setSearchTop(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category"
              className="rounded-full bg-white/70 backdrop-blur-sm px-6 py-2 font-semibold outline-none text-sm border border-gray-200 sm:max-w-xs"
            />
            <button className="rounded-full font-bold px-10 py-2 bg-emerald-500 text-white hover:bg-emerald-600 text-sm">
              Go
            </button>
          </div>
        </section>

        {/* FIND A MENTOR + STORIES */}
        <section className="max-w-6xl mx-auto px-4 mt-10 xl:px-0">
          <h2 className="font-bold text-2xl">Find a Mentor</h2>
          <p className="mb-4 mt-1 text-gray-700 text-sm max-w-xl">
            Connect with experienced professionals who can guide you towards your goals.
          </p>

          <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-xl px-4 py-2 gap-3 max-w-xl mb-6 border border-gray-200">
            <span className="text-gray-400 text-lg">🔍</span>
            <input
              type="text"
              className="bg-transparent flex-1 outline-none text-sm px-1"
              placeholder="Search for mentors by name, skill, or industry"
            />
          </div>

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
                  <p className="mt-1 text-xs text-gray-600 leading-relaxed">{m.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* MENTOR CATEGORIES */}
        <section className="max-w-6xl mx-auto px-4 mt-12 xl:px-0">
          <h2 className="text-lg font-bold mb-3">Mentor Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {mentorCategories.map((c) => (
              <div
                key={c.title}
                onClick={() => handleAuthAction(() => {
                  toast.success(`Showing ${c.title} mentors`);
                }, `view ${c.title} mentors`)}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-6 text-center flex flex-col items-center shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <span className="text-2xl mb-2">{c.icon}</span>
                <span className="font-semibold text-sm text-gray-900">{c.title}</span>
                <span className="mt-1 text-[11px] text-gray-600">{c.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section className="max-w-6xl mx-auto px-4 mt-12 xl:px-0">
          <h2 className="text-lg font-bold mb-2">Upcoming Mentorship Events</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 max-w-2xl border border-gray-200">
            <p className="text-xs text-gray-600 mb-1">Webinar</p>
            <p className="text-sm font-semibold text-gray-900">
              Effective Communication Strategies
            </p>
            <p className="mt-1 text-xs text-gray-700 leading-relaxed">
              Join us for a webinar on improving your communication skills with industry experts.
            </p>
            <button 
              onClick={() => handleAuthAction(() => {
                toast.success('Registration successful!');
              }, 'register for events')}
              className="mt-3 px-4 py-1.5 rounded-full bg-white text-gray-800 text-xs font-semibold border border-gray-300 hover:bg-gray-50"
            >
              Register Now
            </button>
          </div>
        </section>

        {/* COMMUNITY + WHY BECOME A MENTOR */}
        <section className="max-w-6xl mx-auto px-4 mt-12 mb-16 xl:px-0 space-y-10">
          <div>
            <h2 className="text-lg font-bold mb-1">Community Forum</h2>
            <p className="text-xs text-gray-700 max-w-2xl">
              Engage with mentors and peers in our community forum. Ask questions, share insights, and
              connect with others.
            </p>
            <button 
              onClick={() => handleAuthAction(() => {
                navigate('/forum');
              }, 'access the forum')}
              className="mt-3 px-4 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600"
            >
              Go to Forum
            </button>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-1">Why Become a Mentor?</h2>
            <p className="text-xs text-gray-700 max-w-3xl">
              Share your expertise, give back to the community, and help shape the next generation of
              professionals. Become a mentor and make a difference.
            </p>
            <button 
              onClick={() => handleAuthAction(() => {
                navigate('/become-mentor');
              }, 'become a mentor')}
              className="mt-3 px-4 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600"
            >
              Become a Mentor
            </button>
          </div>
        </section>

        {/* MENTORS GRID */}
        <section id="mentors-grid" className="mt-10 mb-16">
          <div className="w-full flex justify-center px-4">
            <div className="w-full max-w-5xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 px-6 sm:px-10 pt-6 pb-8">
              <div className="w-full mb-4">
                <input
                  type="text"
                  placeholder="Search mentors by name or expertise"
                  className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-300"
                  value={searchMentors}
                  onChange={(e) => setSearchMentors(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap items-center justify-start gap-2 mb-6">
                {expertiseTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveExpertise(tab)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium border transition ${
                      activeExpertise === tab
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-items-center gap-x-6 gap-y-8 mb-6">
                {filteredProfiles.map((m) => (
                  <div
                    key={m.name}
                    onClick={() => handleAuthAction(() => {
                      toast.success(`Viewing ${m.name}'s profile`);
                    }, 'view mentor profiles')}
                    className="flex flex-col items-center text-center cursor-pointer hover:opacity-80 transition"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-2 shadow-md">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-800">
                      {m.name}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-gray-600">{m.role}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => handleAuthAction(() => {
                    navigate('/messages');
                  }, 'request mentorship')}
                  className="px-6 py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600"
                >
                  Request Mentorship
                </button>
                <button 
                  onClick={() => handleAuthAction(() => {
                    toast.success('Opening mentor profile...');
                  }, 'view profiles')}
                  className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 text-sm font-semibold border border-gray-300 hover:bg-gray-200"
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FOR MENTORSHIP CARD */}
        <section className="max-w-6xl mx-auto px-4 mb-24 xl:px-0">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 px-6 sm:px-10 py-10 flex flex-col md:flex-row gap-8 items-center">
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
              <p className="text-sm text-gray-700 mb-6">
                Got questions about mentorship? Our team is here to help. Contact us for quick and friendly support.
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full h-11 rounded-full border border-gray-300 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-300"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full h-11 rounded-full border border-gray-300 px-4 text-sm outline-none focus:ring-2 focus:ring-emerald-300"
                />
                <button 
                  onClick={() => handleAuthAction(() => {
                    toast.success('Request submitted successfully!');
                  }, 'submit this form')}
                  className="mt-2 px-6 py-2.5 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </NetworkBackground>
  );
};

export default MentorPage;
