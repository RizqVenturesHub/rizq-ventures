import React, { useState } from 'react';
import JobCardList from './JobCardList';
import SearchBar from '../Searchbar';

const ITEMS_PER_PAGE = 2; // Adjust as needed (based on your design)

const JobListings = ({ jobs }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const jobsToShow = jobs.slice(startIdx, endIdx);

  function gotoPage(pageNum) {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
  }

  return (
    <section className="w-full lg:w-3/4">
      <h1 className="text-3xl font-semibold text-gray-800 mt-2 mb-1">Job Listings</h1>
      <p className="mb-5 text-gray-500">Explore opportunities that match your skills and career goals.</p>
      {/* Place SearchBar here if you have it */}
      <SearchBar />
      <div className="flex gap-5 mb-4">
        <button className="font-medium text-green-600 border-b-2 border-green-600 pb-1">Most Recent</button>
        <button className="font-medium text-gray-500">Companies</button>
      </div>
      <div className="space-y-6">
        {jobsToShow.map((job, idx) => <JobCardList job={job} key={idx} />)}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-8 items-center space-x-2">
        <button
          className="p-2 text-gray-500 hover:text-gray-700"
          onClick={() => gotoPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {[...Array(totalPages).keys()].map(num => (
          <button
            key={num + 1}
            className={`px-4 py-2 rounded-md ${currentPage === num + 1 ? "bg-green-500 text-white" : "bg-white text-gray-700 hover:bg-gray-200"}`}
            onClick={() => gotoPage(num + 1)}
          >{num + 1}</button>
        ))}
        <button
          className="p-2 text-gray-500 hover:text-gray-700"
          onClick={() => gotoPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default JobListings;
