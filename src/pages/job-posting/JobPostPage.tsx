import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import FileUpload from '../../components/FileUpload';
import Header from '../../components/Header';
import { jobEndpoints } from '../../services/endpoints';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Mock components - replace with your actual components

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-600">
    © 2025 Company Name. All rights reserved.
  </footer>
);

// Types
interface FormData {
  jobTitle: string;
  description: string;
  location: string;
  salaryMin: string;
  salaryMax: string;
  currency: string;
  skills: string;
  education: string;
  experience: string;
  jobType: string;
  deadline: string;
  jdFile: File | null;
}

const JobPostPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: '',
    description: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    currency: 'INR',
    skills: '',
    education: '',
    experience: '',
    jobType: 'Full Time',
    deadline: '',
    jdFile: null,
  });

  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showJobTypeDropdown, setShowJobTypeDropdown] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const jobTypeDropdownRef = useRef<HTMLDivElement>(null);

  const currencies = ['INR', 'USD', 'EUR', 'GBP'];
  const jobTypes = ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship'];

  const currencySymbols: Record<string, string> = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!formData.jobTitle.trim()) {
      toast.error('Please enter a job title');
      return;
    }

    try {
      const payload: any = {
        title: formData.jobTitle,
        description: formData.description,
        location: formData.location,
        salaryMin: formData.salaryMin,
        salaryMax: formData.salaryMax,
        currency: formData.currency,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
        education: formData.education,
        experience: formData.experience,
        jobType: formData.jobType,
        deadline: formData.deadline || undefined,
      };

      // If JD file provided, send as multipart/form-data
      let resp;
      if (formData.jdFile) {
        const fd = new FormData();
        Object.keys(payload).forEach((k) => {
          const v = (payload as any)[k];
          if (v !== undefined) fd.append(k, typeof v === 'object' ? JSON.stringify(v) : v);
        });
        fd.append('jdFile', formData.jdFile);
        resp = await jobEndpoints.createJob(fd as any);
      } else {
        resp = await jobEndpoints.createJob(payload);
      }

      toast.success('Job posted successfully');
      // Redirect to job listings
      navigate('/job-listings');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to create job');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex justify-center items-start py-10 px-4">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-primary-light px-10 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-10">
            Job Posting
          </h1>

          <div className="space-y-8">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="Enter job title"
                className="w-full border-b border-gray-300 focus:border-primary outline-none py-2 text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe the role, responsibilities, and expectations"
                className="w-full border-b border-gray-300 focus:border-primary outline-none py-2 text-sm resize-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, Country or Remote"
                className="w-full border-b border-gray-300 focus:border-primary outline-none py-2 text-sm"
              />
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range
              </label>
              <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
                <input
                  type="text"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleInputChange}
                  placeholder="Min"
                  className="flex-1 outline-none text-sm"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="text"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleInputChange}
                  placeholder="Max"
                  className="flex-1 outline-none text-sm"
                />
                <div className="relative" ref={currencyDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                    className="flex items-center gap-1 px-3 py-1 border border-primary-light rounded-full text-xs text-gray-700 hover:bg-primary-light"
                  >
                    <span className="text-primary">{currencySymbols[formData.currency]}</span>
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  </button>
                  {showCurrencyDropdown && (
                    <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {currencies.map(currency => (
                        <button
                          key={currency}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, currency }));
                            setShowCurrencyDropdown(false);
                          }}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-primary-light first:rounded-t-lg last:rounded-b-lg"
                        >
                          {currencySymbols[currency]} {currency}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Required Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Skills
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="React, Java, Communication..."
                className="w-full border-b border-gray-300 focus:border-primary outline-none py-2 text-sm"
              />
            </div>

            {/* Education Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education Level
              </label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                placeholder="Bachelor's, Master's, etc."
                className="w-full border-b border-gray-300 focus:border-primary outline-none py-2 text-sm"
              />
            </div>

            {/* Experience Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Year
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="e.g. 2-4 years"
                className="w-full border-b border-gray-300 focus:border-primary outline-none py-2 text-sm"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <div className="relative" ref={jobTypeDropdownRef}>
                <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                  <span className="text-sm text-gray-600">{formData.jobType}</span>
                  <button
                    type="button"
                    onClick={() => setShowJobTypeDropdown(!showJobTypeDropdown)}
                    className="flex items-center gap-1 px-3 py-1 border border-primary-light rounded-full text-xs text-gray-700 hover:bg-primary-light"
                  >
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  </button>
                </div>
                {showJobTypeDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {jobTypes.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, jobType: type }));
                          setShowJobTypeDropdown(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-primary-light first:rounded-t-lg last:rounded-b-lg"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Deadline + Upload JD */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline
                </label>
                <div className="flex items-center border-b border-gray-300 pb-2 h-10">
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="flex-1 text-sm text-gray-600 outline-none h-full 
                 [color-scheme:light] date-input-primary"
                  />
                </div>
              </div>

              {/* Upload JD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload JD
                </label>
                <FileUpload
                  file={formData.jdFile}
                  onFileChange={(file) => setFormData(prev => ({ ...prev, jdFile: file }))}
                  acceptedTypes=".pdf,.doc,.docx"
                  maxSizeMB={5}
                  placeholder="PDF, DOC up to 5 MB"
                  error={uploadError}
                  onError={setUploadError}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                className="w-full h-11 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary-dark1 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobPostPage;
