// src/pages/LandingPage.tsx
import Header from '../components/Header';
import Hero from '../components/Hero';
import JobSection from '../components/JobSection';
import MentorSection from '../components/MentorSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <JobSection />
      <MentorSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default LandingPage;

// Force module status under isolatedModules if needed:
export {};
