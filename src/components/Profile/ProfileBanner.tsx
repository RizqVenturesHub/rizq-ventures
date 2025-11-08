// components/ProfileBanner.tsx
import React from 'react';
import defaultProfile from '../../assets/Images/profile.png';

interface ProfileBannerProps {
  bannerImage?: string;
  profileImage?: string;
  name: string;
  title: string;
  company: string;
  connections: number;
  profileCompletion: number;
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({
  bannerImage,
  profileImage,
  name,
  title,
  company,
  connections,
  profileCompletion,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Banner Image */}
      <div className="h-48 bg-gradient-to-r from-orange-200 via-orange-100 to-orange-200 relative">
        {bannerImage ? (
          <img src={bannerImage} alt="Banner" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {/* Abstract art placeholder */}
            <svg className="w-full h-full" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="250" cy="120" rx="80" ry="100" fill="#D4A574" opacity="0.6" />
              <ellipse cx="350" cy="80" rx="60" ry="80" fill="#E8C4A0" opacity="0.7" />
              <path d="M 300 150 Q 320 100 350 120 T 400 160" stroke="#8B7355" strokeWidth="2" fill="none" />
            </svg>
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-8 pt-6 pb-6">
        {/* Profile Image - positioned just below banner */}
        <div className="flex items-center mb-4">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
            <img 
              src={profileImage || defaultProfile} 
              alt={name} 
              className="w-full h-full object-cover" 
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.src = defaultProfile;
              }}
            />
          </div>
        </div>

        <div className="mb-4">
          <h1 className="text-3xl font-bold text-secondary mb-1">{name}</h1>
          <p className="text-gray-600 text-lg">{title}</p>
          <p className="text-gray-500">{company}</p>
          <p className="text-primary text-sm mt-1">{connections} connections</p>
        </div>

        {/* Profile Completion */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Profile completion</span>
            <span className="text-sm font-bold text-gray-700">{profileCompletion}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-secondary to-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${profileCompletion}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
