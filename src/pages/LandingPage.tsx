// pages/LandingPage.tsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import JobSection from '../components/JobSection';
import MentorSection from '../components/MentorSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  const location = useLocation();

  // Handle hash navigation (e.g., /#jobs)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Header />
      <div id="home">
        <Hero />
      </div>
      <div id="jobs">
        <JobSection />
      </div>
      <div id="mentors">
        <MentorSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
