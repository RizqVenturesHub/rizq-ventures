// components/JobCard.tsx - Cleaner approach with state
import React, { useState } from 'react';
import { MapPin, Briefcase, Clock, Building2 } from 'lucide-react';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  description: string;
  companyLogo?: string;
  postedDate?: string;
  salary?: string;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  jobType,
  experienceLevel,
  description,
  companyLogo,
  postedDate,
  salary,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300">
      {/* Header with Company Logo */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {companyLogo && !imageError ? (
            <img 
              src={companyLogo} 
              alt={company} 
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <Building2 className="w-6 h-6 text-gray-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-secondary mb-1 truncate">{title}</h3>
          <p className="text-gray-600 font-medium">{company}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          <span>{jobType}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{experienceLevel}</span>
        </div>
      </div>

      {salary && (
        <div className="mb-3">
          <span className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            {salary}
          </span>
        </div>
      )}

      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        {postedDate && (
          <span className="text-xs text-gray-500">{postedDate}</span>
        )}
        <button className="text-primary font-semibold hover:text-primary-dark transition-colors flex items-center gap-2">
          View Details
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default JobCard;
