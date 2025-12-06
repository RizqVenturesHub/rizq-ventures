// components/JobListings/DeadlineFilter.tsx
import React from 'react';
import { Calendar } from 'lucide-react';

interface DeadlineFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const DeadlineFilter: React.FC<DeadlineFilterProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-base font-semibold text-gray-900">Application Deadline</h3>
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2.5 pr-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
          placeholder="31 / 10 / 2025"
        />
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default DeadlineFilter;
