// pages/PostsPage.tsx
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PAGE_SIZE = 10;
const TOTAL_POSTS = 87;
const TONES = ["peach", "beige", "mint"];

const BASE_POST = {
  role: "Software Engineer",
  name: "Rizq User",
  text: "Excited to share a recent project helping users track daily expenses and reach financial goals.",
};

function makePost(i: number) {
  const idx = i + 1;
  const tone = TONES[i % TONES.length];
  return {
    id: idx,
    role:
      idx % 3 === 1
        ? "Software Engineer"
        : idx % 3 === 2
        ? "Marketing Specialist"
        : "Environmental Consultant",
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

function buildDatabase(total: number) {
  return Array.from({ length: total }, (_, i) => makePost(i));
}

const MOCK_DB = buildDatabase(TOTAL_POSTS);

interface FetchParams {
  page: number;
  limit: number;
  query: string;
}

function mockFetchPosts({ page, limit, query }: FetchParams) {
  return new Promise<{ items: any[]; total: number }>((resolve) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    const filtered = query
      ? MOCK_DB.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.role.toLowerCase().includes(query.toLowerCase()) ||
            p.text.toLowerCase().includes(query.toLowerCase())
        )
      : MOCK_DB;
    const items = filtered.slice(start, end);
    setTimeout(() => resolve({ items, total: filtered.length }), 350);
  });
}

interface PlaceholderImageProps {
  tone?: string;
}

function PlaceholderImage({ tone = "peach" }: PlaceholderImageProps) {
  const tones: Record<string, string> = {
    peach: "bg-rose-100",
    beige: "bg-amber-50",
    mint: "bg-emerald-100",
  };
  return (
    <div className={`w-72 h-44 rounded-xl ${tones[tone]} overflow-hidden relative`}>
      <div className="absolute inset-y-0 left-1/2 w-px bg-black/10" />
      <div className="absolute inset-y-6 left-1/2 -translate-x-1/2 w-1 bg-black/60 rounded" />
    </div>
  );
}

interface PostCardProps {
  role: string;
  name: string;
  text: string;
  tone: string;
}

function PostCard({ role, name, text, tone }: PostCardProps) {
  return (
    <div className="flex items-start justify-between gap-6 py-10 border-b border-gray-100">
      <div className="max-w-2xl">
        <p className="text-sm text-gray-500">{role}</p>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{text}</p>
      </div>
      <PlaceholderImage tone={tone} />
    </div>
  );
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="mt-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
}

export default function PostsPage() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    setLoading(true);
    setError("");
    mockFetchPosts({ page, limit: PAGE_SIZE, query })
      .then(({ items, total }) => {
        setPosts(items);
        setTotal(total);
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e.message || "Failed to load posts");
        setLoading(false);
      });
  }, [page, query]);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header/>
      
      <main className="mx-auto max-w-6xl px-6 pb-12">
        <SearchBar
          value={query}
          onChange={(v) => {
            setPage(1);
            setQuery(v);
          }}
        />

        {error && (
          <div className="mt-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {loading && !error && (
          <div className="mt-6 space-y-8 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start justify-between">
                <div className="space-y-2 w-2/3">
                  <div className="h-3 w-32 bg-gray-200 rounded" />
                  <div className="h-4 w-48 bg-gray-200 rounded" />
                  <div className="h-3 w-full bg-gray-200 rounded" />
                </div>
                <div className="w-72 h-44 rounded-xl bg-gray-200" />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <section className="mt-4">
            {posts.map((p) => (
              <PostCard key={p.id} role={p.role} name={p.name} text={p.text} tone={p.tone} />
            ))}
          </section>
        )}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {(page - 1) * PAGE_SIZE + 1} - {Math.min(page * PAGE_SIZE, total)} of {total}
          </p>

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
                      ? "border-primary bg-primary-light text-primary-dark"
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

      <Footer />
    </div>
  );
}
