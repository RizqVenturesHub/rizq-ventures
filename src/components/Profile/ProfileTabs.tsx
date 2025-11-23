// components/ProfileTabs.tsx
import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface ProfileTabsProps {
  onTabChange?: (tabId: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('experience');

  const tabs: Tab[] = [
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md mt-6">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-6 py-4 font-medium transition-all ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
