// components/JobListings/SalaryRangeFilter.tsx
import React, { useState, useEffect } from 'react';

interface SalaryRangeFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const SalaryRangeFilter: React.FC<SalaryRangeFilterProps> = ({ value, onChange }) => {
  const [localMin, setLocalMin] = useState(value[0]);
  const [localMax, setLocalMax] = useState(value[1]);
  const maxSalary = 10000000;

  useEffect(() => {
    setLocalMin(value[0]);
    setLocalMax(value[1]);
  }, [value]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), localMax - 100000);
    setLocalMin(newMin);
    onChange([newMin, localMax]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), localMin + 100000);
    setLocalMax(newMax);
    onChange([localMin, newMax]);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return '₹1Cr+';
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const formatInputCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-gray-900">Salary Range</h3>
      
      {/* Display current range */}
      <div className="flex items-center justify-center">
        <span className="px-3 py-1.5 bg-primary text-white rounded-full text-xs font-semibold">
          {formatCurrency(localMax)}
        </span>
      </div>

      {/* Dual Range Slider */}
      <div className="relative pt-2 pb-1">
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-2 bg-primary rounded-full"
            style={{
              left: `${(localMin / maxSalary) * 100}%`,
              right: `${100 - (localMax / maxSalary) * 100}%`,
            }}
          />
        </div>
        
        {/* Min Slider */}
        <input
          type="range"
          min="0"
          max={maxSalary}
          step="100000"
          value={localMin}
          onChange={handleMinChange}
          className="absolute w-full h-2 top-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
        />
        
        {/* Max Slider */}
        <input
          type="range"
          min="0"
          max={maxSalary}
          step="100000"
          value={localMax}
          onChange={handleMaxChange}
          className="absolute w-full h-2 top-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
        />
      </div>

      {/* Min and Max Input Fields - FIXED */}
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={`₹${formatInputCurrency(localMin)}`}
            readOnly
            className="w-full px-2 py-2 text-xs text-center border border-gray-200 rounded-lg bg-gray-50 truncate"
          />
        </div>
        <span className="text-gray-400 text-sm flex-shrink-0">—</span>
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={localMax >= maxSalary ? '₹80,00,000+' : `₹${formatInputCurrency(localMax)}`}
            readOnly
            className="w-full px-2 py-2 text-xs text-center border border-gray-200 rounded-lg bg-gray-50 truncate"
          />
        </div>
      </div>
    </div>
  );
};

export default SalaryRangeFilter;
