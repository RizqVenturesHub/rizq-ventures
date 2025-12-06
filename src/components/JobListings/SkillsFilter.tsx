// components/JobListings/SkillsFilter.tsx
import React, { useState } from 'react';
import { X, Edit2 } from 'lucide-react';

interface SkillsFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const SkillsFilter: React.FC<SkillsFilterProps> = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange(value.filter(skill => skill !== skillToRemove));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !value.includes(newSkill.trim())) {
      onChange([...value, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Skills</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Edit2 className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {value.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm"
          >
            {skill}
            {isEditing && (
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="hover:text-red-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </span>
        ))}
      </div>

      {isEditing && (
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add skill..."
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAddSkill}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsFilter;
