// components/DeadlineField.tsx
import React, { useRef } from 'react';
import { CalendarDays } from 'lucide-react';

interface DeadlineFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const DeadlineField: React.FC<DeadlineFieldProps> = ({ value, onChange }) => {
  const hiddenDateInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Deadline
      </label>

      <div className="relative">
        {/* Visible row (same structure as Upload JD) */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-2 h-10">
          <input
            type="text"
            name="deadline"
            value={value}
            readOnly
            placeholder="dd-mm-yyyy"
            className="flex-1 text-sm text-gray-600 outline-none placeholder-gray-400 h-full"
          />
          <button
            type="button"
            onClick={() =>
              hiddenDateInputRef.current?.showPicker?.() ??
              hiddenDateInputRef.current?.click()
            }
            className="ml-2 w-8 h-8 rounded-full border border-primary-light flex items-center justify-center text-primary hover:bg-primary-light"
          >
            <CalendarDays className="w-4 h-4" />
          </button>
        </div>

        {/* Hidden native date input (popup position is browser-controlled) */}
        <input
          ref={hiddenDateInputRef}
          type="date"
          className="hidden"
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => {
            const v = e.target.value; // yyyy-mm-dd
            if (!v) return;
            const [y, m, d] = v.split('-');
            const formatted = `${d}-${m}-${y}`;
            onChange(formatted);
          }}
        />
      </div>
    </div>
  );
};

export default DeadlineField;
