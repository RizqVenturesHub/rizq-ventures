// components/JobListings/JobCard.tsx
import React from 'react';
import { MapPin, Briefcase, Clock } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  image: string;
  type: string;
  experience: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row">
        {/* Job Image */}
        <div className="w-full sm:w-64 h-48 sm:h-auto flex-shrink-0">
          <img
            src={job.image}
            alt={job.company}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Job Details */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm text-primary font-medium mb-1">Posted {job.postedDate}</p>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
              <p className="text-gray-600 text-sm">{job.company}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{job.experience}</span>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors">
              Apply Now
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
