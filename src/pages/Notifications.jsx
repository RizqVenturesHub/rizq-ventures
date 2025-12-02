// src/pages/NotificationsPage.jsx
import React, { useState } from "react";

// ----------------- MOCK DATA -----------------
const initialNotifications = [
  {
    id: 1,
    title: "New job matching your profile",
    desc: "A new Frontend Developer role has been posted on Rizq Connect.",
    time: "5 min ago",
    category: "Jobs",
    isRead: false,
  },
  {
    id: 2,
    title: "Mentor replied to your question",
    desc: "Your assigned mentor has responded in the community forum.",
    time: "30 min ago",
    category: "Mentorship",
    isRead: false,
  },
  {
    id: 3,
    title: "Application status updated",
    desc: "Your application for “React Intern” has moved to Screening.",
    time: "Yesterday",
    category: "Jobs",
    isRead: true,
  },
  {
    id: 4,
    title: "New post in your feed",
    desc: "Someone you follow shared a new article about career growth.",
    time: "2 days ago",
    category: "Posts",
    isRead: true,
  },
];

const filterTabs = ["All", "Unread", "Jobs", "Mentorship", "Posts"];

// ----------------- NAVBAR (same style) -----------------
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
          Notifications
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

// ----------------- MAIN PAGE -----------------
export default function NotificationsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        isRead: true,
      }))
    );
  };

  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isRead: !n.isRead } : n
      )
    );
  };

  const filtered = notifications.filter((n) => {
    const text = (n.title + " " + n.desc + " " + n.category).toLowerCase();
    const q = search.toLowerCase();

    const matchesSearch = !q || text.includes(q);

    const matchesFilter =
      activeFilter === "All"
        ? true
        : activeFilter === "Unread"
        ? !n.isRead
        : n.category === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Navbar />

      <main className="relative z-10">
        {/* ---------- PAGE HEADER ---------- */}
        <section className="max-w-6xl mx-auto px-4 pt-16 xl:px-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight mb-4 text-gray-900">
            Notifications
          </h1>
          <p className="text-sm text-gray-600 max-w-xl mb-4">
            Stay updated with job alerts, mentor replies, and activity from your Rizq Ventures
            network — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-600">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              <span>{unreadCount} unread notifications</span>
            </div>
            <button
              onClick={handleMarkAllRead}
              className="text-xs font-semibold px-4 py-1.5 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              Mark all as read
            </button>
          </div>
        </section>

        {/* ---------- SEARCH + FILTER CARD ---------- */}
        <section className="max-w-6xl mx-auto px-4 mt-8 xl:px-0">
          <div className="bg-white/95 rounded-2xl shadow-lg border border-gray-100 px-6 py-5">
            {/* Search bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1 flex items-center bg-gray-50 rounded-full px-4 py-2 gap-2">
                <span className="text-gray-400 text-lg">🔍</span>
                <input
                  type="text"
                  placeholder="Search notifications by keyword, type, or source"
                  className="bg-transparent flex-1 outline-none text-sm px-1"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium border ${
                    activeFilter === tab
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- NOTIFICATIONS LIST ---------- */}
        <section className="max-w-6xl mx-auto px-4 mt-6 mb-20 xl:px-0">
          <div className="bg-white/95 rounded-2xl shadow-lg border border-gray-100 px-6 py-5">
            {filtered.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm font-semibold text-gray-800 mb-1">
                  You’re all caught up!
                </p>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  There are no notifications matching your current filters. Check back later for
                  new updates.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {filtered.map((n) => (
                  <li key={n.id}>
                    <button
                      onClick={() => handleToggleRead(n.id)}
                      className={`w-full text-left flex items-start gap-4 py-4 transition ${
                        n.isRead ? "bg-white" : "bg-emerald-50"
                      } hover:bg-emerald-100/60 rounded-xl px-3 -mx-3`}
                    >
                      <div className="pt-1">
                        <span
                          className={`inline-block h-2.5 w-2.5 rounded-full ${
                            n.isRead ? "bg-gray-300" : "bg-emerald-500"
                          }`}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {n.title}
                          </p>
                          <span className="text-[11px] text-gray-400">
                            {n.time}
                          </span>
                        </div>

                        <p className="text-xs text-gray-600 leading-relaxed mb-1">
                          {n.desc}
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex px-2 py-0.5 rounded-full bg-gray-100 text-[11px] font-medium text-gray-700">
                            {n.category}
                          </span>
                          {!n.isRead && (
                            <span className="inline-flex px-2 py-0.5 rounded-full bg-emerald-100 text-[11px] font-semibold text-emerald-700">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
