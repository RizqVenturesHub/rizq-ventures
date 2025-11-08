// import React plus hooks for state and effects
import React, { useEffect, useState } from "react";
// import a few outline icons for header and search
import { BellIcon, PlusIcon, MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/outline";

// set a constant for items per page (10 requested)
const PAGE_SIZE = 10;
// define how many mock posts exist in the in‑memory “database”
const TOTAL_POSTS = 87;

// create a small pool of tones to rotate visuals
const TONES = ["peach", "beige", "mint"];

// create one base post template that will be cloned and varied
const BASE_POST = {
  role: "Software Engineer",
  name: "Rizq User",
  text:
    "Excited to share a recent project helping users track daily expenses and reach financial goals.",
};

// function to generate a single mock record from an index
function makePost(i) {
  // compute a display index (1‑based)
  const idx = i + 1;
  // compute a rotating tone value
  const tone = TONES[i % TONES.length];
  // return the synthesized record with slight variations
  return {
    id: idx,
    role: idx % 3 === 1 ? "Software Engineer" : idx % 3 === 2 ? "Marketing Specialist" : "Environmental Consultant",
    name: `User ${idx}`,
    text:
      idx % 3 === 1
        ? BASE_POST.text
        : idx % 3 === 2
        ? "Just completed a workshop on SEO, content, and social strategies—excited to apply the insights."
        : "Joined a startup focused on sustainable energy; eager to contribute to a greener future.",
    tone,
  };
}

// function that builds the entire in‑memory dataset once
function buildDatabase(total) {
  // generate an array [0..total-1] and map to posts
  return Array.from({ length: total }, (_, i) => makePost(i));
}

// hold a module‑level cache of the mock data
const MOCK_DB = buildDatabase(TOTAL_POSTS);

// helper that simulates an async paginated API call
function mockFetchPosts({ page, limit, query }) {
  // return a Promise to mimic network behavior
  return new Promise((resolve) => {
    // compute the zero‑based start index from page and limit
    const start = (page - 1) * limit;
    // compute the end index (non‑inclusive)
    const end = start + limit;
    // filter by query if provided (searches name, role, and text)
    const filtered = query
      ? MOCK_DB.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.role.toLowerCase().includes(query.toLowerCase()) ||
            p.text.toLowerCase().includes(query.toLowerCase())
        )
      : MOCK_DB;
    // slice the requested window for this page
    const items = filtered.slice(start, end);
    // simulate latency so the UI can show loaders
    setTimeout(() => resolve({ items, total: filtered.length }), 350);
  });
}

// tiny visual placeholder to mimic the right‑side post image
function PlaceholderImage({ tone = "peach" }) {
  // map tone to Tailwind background
  const tones = { peach: "bg-rose-100", beige: "bg-amber-50", mint: "bg-emerald-100" };
  // render a rounded panel with subtle center accents
  return (
    <div className={`w-72 h-44 rounded-xl ${tones[tone]} overflow-hidden relative`}>
      {/* faint center line */}
      <div className="absolute inset-y-0 left-1/2 w-px bg-black/10" />
      {/* stronger center strip */}
      <div className="absolute inset-y-6 left-1/2 -translate-x-1/2 w-1 bg-black/60 rounded" />
    </div>
  );
}

// card for one post item
function PostCard({ role, name, text, tone }) {
  // render text on left and image placeholder on right
  return (
    <div className="flex items-start justify-between gap-6 py-10 border-b border-gray-100">
      {/* left text column */}
      <div className="max-w-2xl">
        {/* role label */}
        <p className="text-sm text-gray-500">{role}</p>
        {/* author name */}
        <p className="font-semibold text-gray-900">{name}</p>
        {/* body text */}
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{text}</p>
      </div>
      {/* right image placeholder */}
      <PlaceholderImage tone={tone} />
    </div>
  );
}

// top navigation bar
function Navbar() {
  // sticky header with brand, nav, and utilities
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100">
      {/* content row */}
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* brand mark */}
        <div className="flex items-center gap-3">
          {/* logo circle */}
          <div className="h-8 w-8 rounded-full bg-emerald-600 grid place-items-center text-white font-bold">R</div>
          {/* wordmark */}
          <span className="text-lg font-semibold">
            <span className="text-emerald-600">Rizq</span> ventures
          </span>
        </div>
        {/* nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {/* home */}
          <a className="text-gray-600 hover:text-gray-900" href="#">Home</a>
          {/* posts active */}
          <a className="text-gray-900 font-medium" href="#">Posts</a>
          {/* jobs */}
          <a className="text-gray-600 hover:text-gray-900" href="#">Jobs</a>
          {/* about */}
          <a className="text-gray-600 hover:text-gray-900" href="#">About Us</a>
          {/* mentors */}
          <a className="text-gray-600 hover:text-gray-900" href="#">Mentors</a>
        </nav>
        {/* actions */}
        <div className="flex items-center gap-4">
          {/* add */}
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Add">
            <PlusIcon className="h-5 w-5 text-gray-700" />
          </button>
          {/* notifications */}
          <div className="relative">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Notifications">
              <BellIcon className="h-5 w-5 text-gray-700" />
            </button>
            {/* badge */}
            <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-medium text-white">
              5
            </span>
          </div>
          {/* avatar */}
          <UserCircleIcon className="h-8 w-8 text-gray-400" />
        </div>
      </div>
    </header>
  );
}

// search bar under the navbar
function SearchBar({ value, onChange }) {
  // rounded search input with leading icon
  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* spacing */}
      <div className="mt-6">
        {/* icon wrapper */}
        <div className="relative">
          {/* icon */}
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          {/* input */}
          <input
            type="text"
            placeholder="Search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </div>
    </div>
  );
}

// export the paginated posts page
export default function NormalPosts() {
  // current page state (1‑based)
  const [page, setPage] = useState(1);
  // search query state
  const [query, setQuery] = useState("");
  // current page items
  const [posts, setPosts] = useState([]);
  // total items available (after filtering)
  const [total, setTotal] = useState(0);
  // loading indicator
  const [loading, setLoading] = useState(true);
  // error message holder
  const [error, setError] = useState("");

  // compute page count from total and page size
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // trigger data load on page or query change
  useEffect(() => {
    // mark loading true
    setLoading(true);
    // clear previous error
    setError("");
    // call the mock async fetcher
    mockFetchPosts({ page, limit: PAGE_SIZE, query })
      // on success, set items and total then unset loading
      .then(({ items, total }) => {
        setPosts(items);
        setTotal(total);
        setLoading(false);
      })
      // on failure, record the error and unset loading
      .catch((e) => {
        setError(e.message || "Failed to load posts");
        setLoading(false);
      });
  }, [page, query]);

  // go to previous page with clamping
  const prev = () => setPage((p) => Math.max(1, p - 1));
  // go to next page with clamping
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  // render the page layout
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* header */}
      <Navbar />
      {/* main area */}
      <main className="mx-auto max-w-6xl px-6">
        {/* search; reset page on new query */}
        <SearchBar value={query} onChange={(v) => { setPage(1); setQuery(v); }} />

        {/* error notice */}
        {error && (
          <div className="mt-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {/* loading skeletons */}
        {loading && !error && (
          <div className="mt-6 space-y-8 animate-pulse">
            <div className="flex items-start justify-between">
              <div className="space-y-2 w-2/3">
                <div className="h-3 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-48 bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
              </div>
              <div className="w-72 h-44 rounded-xl bg-gray-200" />
            </div>
            <div className="flex items-start justify-between">
              <div className="space-y-2 w-2/3">
                <div className="h-3 w-28 bg-gray-200 rounded" />
                <div className="h-4 w-40 bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
              </div>
              <div className="w-72 h-44 rounded-xl bg-gray-200" />
            </div>
            <div className="flex items-start justify-between">
              <div className="space-y-2 w-2/3">
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-36 bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
              </div>
              <div className="w-72 h-44 rounded-xl bg-gray-200" />
            </div>
          </div>
        )}

        {/* post list */}
        {!loading && !error && (
          <section className="mt-4">
            {posts.map((p) => (
              <PostCard
                key={p.id}
                role={p.role}
                name={p.name}
                text={p.text}
                tone={p.tone}
              />
            ))}
          </section>
        )}

        {/* pagination footer */}
        <div className="mt-6 flex items-center justify-between">
          {/* range info */}
          <p className="text-sm text-gray-600">
            {((page - 1) * PAGE_SIZE) + 1} - {Math.min(page * PAGE_SIZE, total)} of {total}
          </p>

          {/* controls */}
          <nav className="inline-flex items-center gap-1" aria-label="Pagination">
            <button
              onClick={prev}
              disabled={page === 1}
              className="px-3 h-9 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4));
              const num = start + i;
              return (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-3 h-9 rounded-lg border text-sm ${
                    num === page
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {num}
                </button>
              );
            })}

            <button
              onClick={next}
              disabled={page === totalPages}
              className="px-3 h-9 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
}
