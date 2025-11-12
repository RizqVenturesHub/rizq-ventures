import React, { useState } from 'react';

const SKILLS = ['React', 'Java', 'Python'];

const Filters = ({ selectedSkills, setSelectedSkills }) => {
  const [location, setLocation] = useState('Pune');
  const [jobType, setJobType] = useState('');
  const [expLevel, setExpLevel] = useState('');
  const [salaryMin, setSalaryMin] = useState(0);
  const [salaryMax, setSalaryMax] = useState(800000);
  const [datePosted, setDatePosted] = useState('24h');
  const [deadline, setDeadline] = useState('31 / 10 / 2025');

  function toggleSkill(skill) {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  }

  return (
    <aside className="w-full lg:w-1/4 bg-white rounded-xl p-8 border space-y-7 shadow-sm">
      {/* Location */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">Location</label>
        <select
          className="w-full rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={location}
          onChange={e => setLocation(e.target.value)}
        >
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
        </select>
      </div>

      {/* Job Type */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">Job Type</label>
        <select
          className="w-full rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={jobType}
          onChange={e => setJobType(e.target.value)}
        >
          <option value="">Filter by Full Time, Part Time, Contract, Internship</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      {/* Experience Level */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">Experience Level</label>
        <select
          className="w-full rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={expLevel}
          onChange={e => setExpLevel(e.target.value)}
        >
          <option value="">Entry, Mid, Senior</option>
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      {/* Salary Range */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">Salary Range</label>
        <div className="flex items-center mt-3 space-x-2">
          <input
            type="range"
            min="0"
            max="800000"
            value={salaryMin}
            onChange={e => setSalaryMin(Number(e.target.value))}
            className="w-32 accent-green-500"
          />
          <span className="text-green-600 font-bold">₹{salaryMin.toLocaleString()}</span>
        </div>
        <div className="flex items-center mt-1 space-x-2">
          <input
            type="range"
            min="0"
            max="800000"
            value={salaryMax}
            onChange={e => setSalaryMax(Number(e.target.value))}
            className="w-32 accent-green-500"
          />
          <span className="text-green-600 font-bold">₹{salaryMax.toLocaleString()}</span>
        </div>
      </div>

      {/* Date Posted */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">Date Posted</label>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="date"
              value="24h"
              checked={datePosted === '24h'}
              onChange={e => setDatePosted(e.target.value)}
            /> Past 24 hours
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="date"
              value="week"
              checked={datePosted === 'week'}
              onChange={e => setDatePosted(e.target.value)}
            /> Past week
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="date"
              value="month"
              checked={datePosted === 'month'}
              onChange={e => setDatePosted(e.target.value)}
            /> Past month
          </label>
        </div>
      </div>

      {/* Deadline */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">Application Deadline</label>
        <input
          type="text"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          className="w-full rounded-md border-gray-300 py-2 px-3 text-gray-700"
        />
      </div>
      
      {/* Skills */}
      <div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Skills</span>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {SKILLS.map(skill => (
            <button
              key={skill}
              type="button"
              className={`px-3 py-1 rounded-full ${
                selectedSkills.includes(skill)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              } border border-gray-200 transition-colors`}
              onClick={() => toggleSkill(skill)}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filters;
