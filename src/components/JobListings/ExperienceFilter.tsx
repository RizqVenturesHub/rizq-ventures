// components/JobListings/ExperienceFilter.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const ExperienceFilter: React.FC<ExperienceFilterProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const levels = ['Entry', 'Mid', 'Senior'];

  const handleToggle = (level: string) => {
    if (value.includes(level)) {
      onChange(value.filter(l => l !== level));
    } else {
      onChange([...value, level]);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-base font-semibold text-gray-900"
      >
        Experience Level
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      
      {isOpen && (
        <div className="space-y-2 pt-2">
          {levels.map((level) => (
            <label key={level} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={value.includes(level)}
                onChange={() => handleToggle(level)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                {level}
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

export default ExperienceFilter;
