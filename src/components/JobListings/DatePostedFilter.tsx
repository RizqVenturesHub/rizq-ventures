// components/JobListings/DatePostedFilter.tsx
import React from 'react';

interface DatePostedFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const DatePostedFilter: React.FC<DatePostedFilterProps> = ({ value, onChange }) => {
  const options = ['Past 24 hours', 'Past week', 'Past month'];

  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-gray-900">Date Posted</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="datePosted"
              checked={value === option}
              onChange={() => onChange(option)}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-2"
            />
            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DatePostedFilter;
