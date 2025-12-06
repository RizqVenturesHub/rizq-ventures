// src/pages/job-posting/JobPostPage.tsx
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const JobPostPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 flex justify-center items-start py-10 px-4">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-100 px-10 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#163567] text-center mb-10">
            Job Posting
          </h1>

          <form className="space-y-8">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>
              <input
                type="text"
                placeholder="Enter job title"
                className="w-full border-b border-gray-300 focus:border-[#163567] outline-none py-2 text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#163567] mb-2">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Describe the role, responsibilities, and expectations"
                className="w-full border-b border-gray-300 focus:border-[#163567] outline-none py-2 text-sm resize-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="City, Country or Remote"
                className="w-full border-b border-gray-300 focus:border-[#163567] outline-none py-2 text-sm"
              />
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range
              </label>
              <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
                <input
                  type="text"
                  placeholder="e.g. 8,00,000 - 12,00,000"
                  className="flex-1 outline-none text-sm"
                />
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-full text-xs text-gray-700"
                >
                  ₹
                </button>
              </div>
            </div>

            {/* Required Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Skills
              </label>
              <input
                type="text"
                placeholder="React, Java, Communication..."
                className="w-full border-b border-gray-300 focus:border-[#163567] outline-none py-2 text-sm"
              />
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education Level
              </label>
              <input
                type="text"
                placeholder="Bachelor's, Master's, etc."
                className="w-full border-b border-gray-300 focus:border-[#163567] outline-none py-2 text-sm"
              />
            </div>

            {/* Experience Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Year
              </label>
              <input
                type="text"
                placeholder="e.g. 2-4 years"
                className="w-full border-b border-gray-300 focus:border-[#163567] outline-none py-2 text-sm"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                <span className="text-sm text-gray-600">Full Time</span>
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-full text-xs text-gray-700"
                >
                  ▼
                </button>
              </div>
            </div>

            {/* Deadline + Upload JD */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline
                </label>
                <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                  <span className="text-xs text-gray-400">Select date</span>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-[#163567]"
                  >
                    📅
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload JD
                </label>
                <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                  <span className="text-xs text-gray-400">PDF, DOC up to 5 MB</span>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-[#163567]"
                  >
                    ⬆️
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
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

export default JobPostPage;
