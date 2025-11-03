// components/MentorCard.tsx
import React from 'react';

interface MentorCardProps {
  name: string;
  role: string;
  company: string;
  description: string;
  image: string;
}

const MentorCard: React.FC<MentorCardProps> = ({ name, role, company, description, image }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-500 text-sm mb-1">{role}</p>
        <p className="text-gray-400 text-xs mb-4">@{company}</p>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MentorCard;
