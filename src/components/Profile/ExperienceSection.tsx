// components/ExperienceSection.tsx
import React from 'react';
import { Building2 } from 'lucide-react';

interface Experience {
  id: string;
  period: string;
  title: string;
  company: string;
  companyLogo?: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <div className="bg-white rounded-lg shadow-md mt-6 p-8">
      <h2 className="text-2xl font-bold text-secondary mb-6">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="flex gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
              {exp.companyLogo ? (
                <img src={exp.companyLogo} alt={exp.company} className="w-full h-full object-cover rounded" />
              ) : (
                <Building2 className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">{exp.period}</p>
              <h3 className="text-lg font-bold text-secondary">{exp.title}</h3>
              <p className="text-gray-600">{exp.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
