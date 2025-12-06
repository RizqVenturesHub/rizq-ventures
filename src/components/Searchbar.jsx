// src/components/SearchBar.js
import React from 'react';

const SearchBar = () => {
  return (
    <div className="relative mb-6">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4">
        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search"
        className="w-full py-3 pl-12 pr-4 text-gray-700 bg-green-50 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
      />
    </div>
  );
};

export default SearchBar;
