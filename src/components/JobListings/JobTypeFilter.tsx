// components/JobListings/JobTypeFilter.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface JobTypeFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const JobTypeFilter: React.FC<JobTypeFilterProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const jobTypes = ['Full Time', 'Part Time', 'Contract', 'Internship'];

  const handleToggle = (type: string) => {
    if (value.includes(type)) {
      onChange(value.filter(t => t !== type));
    } else {
      onChange([...value, type]);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-base font-semibold text-gray-900"
      >
        Job Type
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      
      {isOpen && (
        <div className="space-y-2 pt-2">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={value.includes(type)}
                onChange={() => handleToggle(type)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                {type}
              </span>
            </label>
          ))}
        </div>
      )}
      
      {!isOpen && value.length > 0 && (
        <p className="text-xs text-gray-500">{value.length} selected</p>
      )}
    </div>
  );
};

export default JobTypeFilter;
