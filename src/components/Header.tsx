// components/Header.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rizqVenturesLogo from '../assets/Images/rizqVenturesLogo.png'

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    // Detect active section on scroll
    const handleScroll = () => {
      const sections = ['home', 'jobs', 'mentors', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = (section: string) => {
    return activeSection === section
      ? 'text-primary font-bold border-b-2 border-primary transition-colors pb-1'
      : 'text-gray-700 hover:text-primary transition-colors font-medium';
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <img
              src={rizqVenturesLogo}
              alt="Rizq Ventures Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-gray-800 text-xl font-bold">Rizq ventures</span>
          </div>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-8">
            <li>
              <a href="#home" className={navLinkClass('home')}>
                Home
              </a>
            </li>
            <li>
              <a href="/posts" className={navLinkClass('posts')}>
                Posts
              </a>
            </li>

            <li>
              <a href="#jobs" className={navLinkClass('jobs')}>
                Jobs
              </a>
            </li>
            <li>
              <a href="#about" className={navLinkClass('about')}>
                About Us
              </a>
            </li>
            <li>
              <a href="#mentors" className={navLinkClass('mentors')}>
                Mentors
              </a>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => navigate('/login')}
              className="border-2 border-primary text-primary px-6 py-2 rounded-lg font-medium hover:bg-primary-light transition-all"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-all"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
