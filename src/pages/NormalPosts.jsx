// import React, { useEffect, useState } from "react";
// import { BellIcon, PlusIcon, MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/outline";
// import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";

// const PAGE_SIZE = 10;
// const TOTAL_POSTS = 87;
// const TONES = ["peach", "beige", "mint"];
// const BASE_POST = { role: "Software Engineer", name: "Rizq User", text: "Excited to share a recent project helping users track daily expenses and reach financial goals." };

// function makePost(i) {
//   const idx = i + 1;
//   const tone = TONES[i % TONES.length];
//   return {
//     id: idx,
//     role: idx % 3 === 1 ? "Software Engineer" : idx % 3 === 2 ? "Marketing Specialist" : "Environmental Consultant",
//     name: `User ${idx}`,
//     text:
//       idx % 3 === 1
//         ? BASE_POST.text
//         : idx % 3 === 2
//         ? "Just completed a workshop on SEO, content, and social strategies—excited to apply the insights."
//         : "Joined a startup focused on sustainable energy; eager to contribute to a greener future.",
//     tone,
//   };
// }

// function buildDatabase(total) {
//   return Array.from({ length: total }, (_, i) => makePost(i));
// }

// const MOCK_DB = buildDatabase(TOTAL_POSTS);

// function addMockPost({ role, name, text, tone }) {
//   const item = {
//     id: MOCK_DB.length + 1,
//     role: role || "Software Engineer",
//     name: name || `User ${MOCK_DB.length + 1}`,
//     text: text || BASE_POST.text,
//     tone: tone || TONES[(MOCK_DB.length + 1) % TONES.length],
//   };
//   MOCK_DB.unshift(item);
//   return item;
// }

// function mockFetchPosts({ page, limit, query }) {
//   return new Promise((resolve) => {
//     const start = (page - 1) * limit;
//     const end = start + limit;
//     const filtered = query
//       ? MOCK_DB.filter(
//           (p) =>
//             p.name.toLowerCase().includes(query.toLowerCase()) ||
//             p.role.toLowerCase().includes(query.toLowerCase()) ||
//             p.text.toLowerCase().includes(query.toLowerCase())
//         )
//       : MOCK_DB;
//     const items = filtered.slice(start, end);
//     setTimeout(() => resolve({ items, total: filtered.length }), 250);
//   });
// }

// function PlaceholderImage({ tone = "peach" }) {
//   const tones = { peach: "bg-rose-100", beige: "bg-amber-50", mint: "bg-emerald-100" };
//   return (
//     <div className={`w-72 h-44 rounded-xl ${tones[tone]} overflow-hidden relative`}>
//       <div className="absolute inset-y-0 left-1/2 w-px bg-black/10" />
//       <div className="absolute inset-y-6 left-1/2 -translate-x-1/2 w-1 bg-black/60 rounded" />
//     </div>
//   );
// }

// function PostCard({ role, name, text, tone }) {
//   return (
//     <div className="flex items-start justify-between gap-6 py-10 border-b border-gray-100">
//       <div className="max-w-2xl">
//         <p className="text-sm text-gray-500">{role}</p>
//         <p className="font-semibold text-gray-900">{name}</p>
//         <p className="mt-2 text-sm text-gray-600 leading-relaxed">{text}</p>
//       </div>
//       <PlaceholderImage tone={tone} />
//     </div>
//   );
// }

// function Navbar({ onAddClick }) {
//   return (
//     <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100">
//       <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="h-8 w-8 rounded-full bg-emerald-600 grid place-items-center text-white font-bold">R</div>
//           <span className="text-lg font-semibold">
//             <span className="text-emerald-600">Rizq</span> ventures
//           </span>
//         </div>
//         <nav className="hidden md:flex items-center gap-8 text-sm">
//           <a className="text-gray-600 hover:text-gray-900" href="#">Home</a>
//           <a className="text-gray-900 font-medium" href="#">Posts</a>
//           <a className="text-gray-600 hover:text-gray-900" href="#">Jobs</a>
//           <a className="text-gray-600 hover:text-gray-900" href="#">About Us</a>
//           <a className="text-gray-600 hover:text-gray-900" href="#">Mentors</a>
//         </nav>
//         <div className="flex items-center gap-4">
//           <button onClick={onAddClick} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Add">
//             <PlusIcon className="h-5 w-5 text-gray-700" />
//           </button>
//           <div className="relative">
//             <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Notifications">
//               <BellIcon className="h-5 w-5 text-gray-700" />
//             </button>
//             <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-medium text-white">5</span>
//           </div>
//           <UserCircleIcon className="h-8 w-8 text-gray-400" />
//         </div>
//       </div>
//     </header>
//   );
// }

// function SearchBar({ value, onChange }) {
//   return (
//     <div className="mx-auto max-w-6xl px-6">
//       <div className="mt-6">
//         <div className="relative">
//           <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search"
//             value={value}
//             onChange={(e) => onChange(e.target.value)}
//             className="w-full rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// function CreatePostModal({ open, onClose, onCreate }) {
//   const [role, setRole] = useState("Software Engineer");
//   const [name, setName] = useState("");
//   const [text, setText] = useState("");
//   const [tone, setTone] = useState("peach");

//   return (
//     <Dialog open={open} onClose={onClose} className="relative z-50">
//       <div className="fixed inset-0 bg-black/40" />
//       <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
//         <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
//           <DialogTitle className="text-lg font-semibold">Create post</DialogTitle>
//           <Description className="text-sm text-gray-500 mt-1">Fill details and create a temporary post.</Description>
//           <div className="mt-4 grid gap-3">
//             <label className="text-sm">Role</label>
//             <select value={role} onChange={(e) => setRole(e.target.value)} className="h-10 rounded-lg border border-gray-300 px-3">
//               <option>Software Engineer</option>
//               <option>Marketing Specialist</option>
//               <option>Environmental Consultant</option>
//             </select>
//             <label className="text-sm mt-2">Name</label>
//             <input value={name} onChange={(e) => setName(e.target.value)} className="h-10 rounded-lg border border-gray-300 px-3" />
//             <label className="text-sm mt-2">Text</label>
//             <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} className="rounded-lg border border-gray-300 px-3 py-2" />
//             <label className="text-sm mt-2">Tone</label>
//             <select value={tone} onChange={(e) => setTone(e.target.value)} className="h-10 rounded-lg border border-gray-300 px-3">
//               <option value="peach">Peach</option>
//               <option value="beige">Beige</option>
//               <option value="mint">Mint</option>
//             </select>
//           </div>
//           <div className="mt-6 flex justify-end gap-3">
//             <button onClick={onClose} className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">Cancel</button>
//             <button
//               onClick={() => {
//                 onCreate({ role, name, text, tone });
//               }}
//               className="h-10 px-4 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
//             >
//               Create
//             </button>
//           </div>
//         </DialogPanel>
//       </div>
//     </Dialog>
//   );
// }

// export default function NormalPosts() {
//   const [page, setPage] = useState(1);
//   const [query, setQuery] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isCreateOpen, setIsCreateOpen] = useState(false);

//   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

//   useEffect(() => {
//     setLoading(true);
//     setError("");
//     mockFetchPosts({ page, limit: PAGE_SIZE, query })
//       .then(({ items, total }) => {
//         setPosts(items);
//         setTotal(total);
//         setLoading(false);
//       })
//       .catch((e) => {
//         setError(e.message || "Failed to load posts");
//         setLoading(false);
//       });
//   }, [page, query]);

//   const prev = () => setPage((p) => Math.max(1, p - 1));
//   const next = () => setPage((p) => Math.min(totalPages, p + 1));

//   return (
//     <div className="min-h-screen bg-white text-gray-900">
//       <Navbar onAddClick={() => setIsCreateOpen(true)} />
//       <main className="mx-auto max-w-6xl px-6">
//         <SearchBar value={query} onChange={(v) => { setPage(1); setQuery(v); }} />

//         {error && <div className="mt-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

//         {loading && !error && (
//           <div className="mt-6 space-y-8 animate-pulse">
//             <div className="flex items-start justify-between">
//               <div className="space-y-2 w-2/3">
//                 <div className="h-3 w-32 bg-gray-200 rounded" />
//                 <div className="h-4 w-48 bg-gray-200 rounded" />
//                 <div className="h-3 w-full bg-gray-200 rounded" />
//               </div>
//               <div className="w-72 h-44 rounded-xl bg-gray-200" />
//             </div>
//             <div className="flex items-start justify-between">
//               <div className="space-y-2 w-2/3">
//                 <div className="h-3 w-28 bg-gray-200 rounded" />
//                 <div className="h-4 w-40 bg-gray-200 rounded" />
//                 <div className="h-3 w-full bg-gray-200 rounded" />
//               </div>
//               <div className="w-72 h-44 rounded-xl bg-gray-200" />
//             </div>
//             <div className="flex items-start justify-between">
//               <div className="space-y-2 w-2/3">
//                 <div className="h-3 w-24 bg-gray-200 rounded" />
//                 <div className="h-4 w-36 bg-gray-200 rounded" />
//                 <div className="h-3 w-full bg-gray-200 rounded" />
//               </div>
//               <div className="w-72 h-44 rounded-xl bg-gray-200" />
//             </div>
//           </div>
//         )}

//         {!loading && !error && (
//           <section className="mt-4">
//             {posts.map((p) => (
//               <PostCard key={p.id} role={p.role} name={p.name} text={p.text} tone={p.tone} />
//             ))}
//           </section>
//         )}

//         <div className="mt-6 flex items-center justify-between">
//           <p className="text-sm text-gray-600">{((page - 1) * PAGE_SIZE) + 1} - {Math.min(page * PAGE_SIZE, total)} of {total}</p>
//           <nav className="inline-flex items-center gap-1" aria-label="Pagination">
//             <button onClick={prev} disabled={page === 1} className="px-3 h-9 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white disabled:opacity-50 hover:bg-gray-50">Previous</button>
//             {Array.from({ length: Math.min(Math.max(1, Math.ceil(total / PAGE_SIZE)), 5) }, (_, i) => {
//               const start = Math.max(1, Math.min(page - 2, Math.max(1, Math.ceil(total / PAGE_SIZE)) - 4));
//               const num = start + i;
//               return (
//                 <button
//                   key={num}
//                   onClick={() => setPage(num)}
//                   className={`px-3 h-9 rounded-lg border text-sm ${num === page ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`}
//                 >
//                   {num}
//                 </button>
//               );
//             })}
//             <button onClick={next} disabled={page === Math.max(1, Math.ceil(total / PAGE_SIZE))} className="px-3 h-9 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white disabled:opacity-50 hover:bg-gray-50">Next</button>
//           </nav>
//         </div>
//       </main>

//       <CreatePostModal
//         open={isCreateOpen}
//         onClose={() => setIsCreateOpen(false)}
//         onCreate={(data) => {
//           addMockPost(data);
//           setIsCreateOpen(false);
//           setPage(1);
//           setQuery("");
//         }}
//       />
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  BellIcon,
  ChatBubbleLeftRightIcon,
  PlusIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const PAGE_SIZE = 10;

function makePost(i) {
  const roles = ["Software Engineer", "Marketing Specialist", "Environmental Consultant"];
  const names = ["Sarah Chen", "David Lee", "Emily Rodriguez"];
  const texts = [
    "Excited to share my latest project helping users track daily expenses.",
    "Completed a workshop on SEO and social media strategies.",
    "Joined a startup focused on sustainable energy solutions.",
  ];
  const tones = ["bg-rose-100", "bg-amber-50", "bg-emerald-100"];
  return {
    id: i + 1,
    role: roles[i % roles.length],
    name: names[i % names.length] + " " + (i + 1),
    text: texts[i % texts.length],
    tone: tones[i % tones.length],
  };
}

function Placeholder({ tone }) {
  return (
    <div className={`w-72 h-44 rounded-xl ${tone} overflow-hidden relative`}>
      <div className="absolute inset-y-0 left-1/2 w-px bg-black/10" />
      <div className="absolute inset-y-6 left-1/2 -translate-x-1/2 w-1 bg-black/60 rounded" />
    </div>
  );
}

function PostCard({ role, name, text, tone }) {
  return (
    <div className="flex items-start justify-between gap-6 py-10 border-b border-gray-100">
      <div className="max-w-2xl">
        <p className="text-sm text-gray-500">{role}</p>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{text}</p>
      </div>
      <Placeholder tone={tone} />
    </div>
  );
}

function Navbar({ onAdd }) {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-emerald-600 grid place-items-center text-white font-bold">R</div>
          <span className="text-lg font-semibold">
            <span className="text-emerald-600">Rizq</span> ventures
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a className="text-gray-600 hover:text-gray-900" href="#">Home</a>
          <a className="text-gray-900 font-medium" href="#">Posts</a>
          <a className="text-gray-600 hover:text-gray-900" href="#">Jobs</a>
          <a className="text-gray-600 hover:text-gray-900" href="#">About Us</a>
          <a className="text-gray-600 hover:text-gray-900" href="#">Mentors</a>
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={onAdd} className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700" aria-label="Add">
            <PlusIcon className="h-5 w-5" />
          </button>

          <div className="relative">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Messages">
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-700" />
            </button>
            <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1.5 text-[11px] font-medium text-white">2</span>
          </div>

          <div className="relative">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Notifications">
              <BellIcon className="h-5 w-5 text-gray-700" />
            </button>
            <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-medium text-white">5</span>
          </div>

          <UserCircleIcon className="h-8 w-8 text-gray-400" />
        </div>
      </div>
    </header>
  );
}

export default function NormalPosts() {
  const [allPosts, setAllPosts] = useState(Array.from({ length: 87 }, (_, i) => makePost(i)));
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ role: "Software Engineer", name: "", text: "", tone: "bg-rose-100" });

  const filtered = allPosts.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.role.toLowerCase().includes(query.toLowerCase()) ||
      p.text.toLowerCase().includes(query.toLowerCase())
  );
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  const createPost = () => {
    const newPost = {
      id: allPosts.length + 1,
      role: form.role || "Software Engineer",
      name: form.name || `User ${allPosts.length + 1}`,
      text: form.text || "New post",
      tone: form.tone || "bg-rose-100",
    };
    setAllPosts([newPost, ...allPosts]);
    setOpen(false);
    setPage(1);
    setQuery("");
    setForm({ role: "Software Engineer", name: "", text: "", tone: "bg-rose-100" });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar onAdd={() => setOpen(true)} />

      <main className="mx-auto max-w-6xl px-6">
        <div className="mt-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => {
                setPage(1);
                setQuery(e.target.value);
              }}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 pl-4 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <section className="mt-4">
          {pageItems.map((p) => (
            <PostCard key={p.id} role={p.role} name={p.name} text={p.text} tone={p.tone} />
          ))}
        </section>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {start + 1} - {Math.min(start + PAGE_SIZE, total)} of {total}
          </p>
          <div className="inline-flex items-center gap-1">
            <button
              onClick={() => setPage((n) => Math.max(1, n - 1))}
              disabled={page === 1}
              className="px-3 h-9 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((n) => Math.min(totalPages, n + 1))}
              disabled={page === totalPages}
              className="px-3 h-9 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-semibold">Create post</h2>
              <div className="mt-4 grid gap-3">
                <label className="text-sm">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="h-10 rounded-lg border border-gray-300 px-3"
                >
                  <option>Software Engineer</option>
                  <option>Marketing Specialist</option>
                  <option>Environmental Consultant</option>
                </select>

                <label className="text-sm">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-10 rounded-lg border border-gray-300 px-3"
                />

                <label className="text-sm">Text</label>
                <textarea
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  rows={4}
                  className="rounded-lg border border-gray-300 px-3 py-2"
                />

                <label className="text-sm">Tone</label>
                <select
                  value={form.tone}
                  onChange={(e) => setForm({ ...form, tone: e.target.value })}
                  className="h-10 rounded-lg border border-gray-300 px-3"
                >
                  <option value="bg-rose-100">Peach</option>
                  <option value="bg-amber-50">Beige</option>
                  <option value="bg-emerald-100">Mint</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setOpen(false)} className="h-10 px-4 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={createPost} className="h-10 px-4 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
