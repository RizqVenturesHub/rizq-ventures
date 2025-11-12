// src/components/JobCard.js
import React from 'react';

const JobCardList = ({ job }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className="ml-4">
          <p className="text-xs text-gray-500">{job.postedDate}</p>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 cursor-pointer">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company} - {job.location}</p>
        </div>
      </div>
      <img src={job.imageUrl} alt={job.company} className="w-32 h-20 object-cover rounded-md" />
    </div>
  );
};

export default JobCardList;
