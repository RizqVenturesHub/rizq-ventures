// components/EducationSection.tsx
import React from 'react';
import { GraduationCap } from 'lucide-react';

interface Education {
  id: string;
  period: string;
  degree: string;
  institution: string;
  logo?: string;
}

interface EducationSectionProps {
  education: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  return (
    <div className="bg-white rounded-lg shadow-md mt-6 p-8">
      <h2 className="text-2xl font-bold text-secondary mb-6">Education</h2>
      <div className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="flex gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
              {edu.logo ? (
                <img src={edu.logo} alt={edu.institution} className="w-full h-full object-cover rounded" />
              ) : (
                <GraduationCap className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">{edu.period}</p>
              <h3 className="text-lg font-bold text-secondary">{edu.degree}</h3>
              <p className="text-gray-600">{edu.institution}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
