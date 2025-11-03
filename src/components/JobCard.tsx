// components/JobCard.tsx
import React from 'react';

interface JobCardProps {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
}

const JobCard: React.FC<JobCardProps> = ({ title, description, icon, iconBg }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mb-6`}>
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-secondary">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6">
        {description}
      </p>
      <button className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all">
        Apply <span>→</span>
      </button>
    </div>
  );
};

export default JobCard;
