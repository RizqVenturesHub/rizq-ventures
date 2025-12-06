// pages/LandingPage.tsx
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import JobSection from '../components/JobSection';
import MentorSection from '../components/MentorSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div id="jobs"> {/* ENSURE: Jobs section has this ID */}
        <JobSection />
      </div>
      <MentorSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
