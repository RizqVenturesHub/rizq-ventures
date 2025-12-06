// src/pages/job-posting/NormalPostPage.tsx
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const NormalPostPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 flex justify-center items-start py-10 px-4">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-100 px-10 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#163567] text-center mb-10">
            Create Post
          </h1>

          <form className="space-y-8">
            {/* Post Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Title
              </label>
              <input
                type="text"
                placeholder="Enter post title"
                className="w-full border-b border-gray-300 focus:border-[#163567] outline-none py-2 text-sm"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-[#163567] mb-2">
                Content
              </label>
              <textarea
                rows={4}
                placeholder="Write your content here..."
                className="w-full border-b border-gray-300 focus:border-[#163567] outline-none py-2 text-sm resize-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                placeholder="Add tags separated by commas"
                className="w-full border-b border-gray-300 focus:border-[#163567] outline-none py-2 text-sm"
              />
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media Upload
              </label>
              <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                <span className="text-xs text-gray-400">
                  Upload image or video (optional)
                </span>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-[#163567]"
                >
                  ⬆️
                </button>
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full h-11 rounded-full bg-[#163567] text-white font-semibold text-sm hover:bg-[#10254a] transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NormalPostPage;
