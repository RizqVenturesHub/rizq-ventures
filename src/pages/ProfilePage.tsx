// pages/ProfilePage.tsx
import React, { useState } from 'react';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfileBanner from '../components/Profile/ProfileBanner';
import ProfileTabs from '../components/Profile/ProfileTabs';
import ExperienceSection from '../components/Profile/ExperienceSection';
import EducationSection from '../components/Profile/EducationSection';
import SkillsSection from '../components/Profile/SkillsSection';
import ProjectsSection from '../components/Profile/ProjectsSection';
import Footer from '../components/Footer';
import { useProfileData } from '../hooks/Profile/useProfileData';

const ProfilePage: React.FC = () => {
  const { profile, experiences, education, skills, projects, loading } = useProfileData();
  const [activeTab, setActiveTab] = useState('experience');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'experience':
        return <ExperienceSection experiences={experiences} />;
      case 'education':
        return <EducationSection education={education} />;
      case 'skills':
        return <SkillsSection skills={skills} />;
      case 'projects':
        return <ProjectsSection projects={projects} />;
      case 'connections':
        return (
          <div className="bg-white rounded-lg shadow-md mt-6 p-8">
            <h2 className="text-2xl font-bold text-secondary mb-6">Connections</h2>
            <p className="text-gray-600">You have {profile.connections} connections</p>
          </div>
        );
      default:
        return <ExperienceSection experiences={experiences} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader isAuthenticated={true} />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        <ProfileBanner
          name={profile.name}
          title={profile.title}
          company={profile.company}
          connections={profile.connections}
          profileCompletion={profile.profileCompletion}
          bannerImage={profile.bannerImage}
          profileImage={profile.profileImage}
        />
        
        <ProfileTabs onTabChange={setActiveTab} />
        
        {renderTabContent()}
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
