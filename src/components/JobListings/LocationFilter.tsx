// components/JobListings/LocationFilter.tsx
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface LocationFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const LocationFilter: React.FC<LocationFilterProps> = ({ value, onChange }) => {
  const locations = ['Pune', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'];

  return (
    <div className="space-y-2">
      <h3 className="text-base font-semibold text-gray-900">Location</h3>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-700"
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default LocationFilter;
