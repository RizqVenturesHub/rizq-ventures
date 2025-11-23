// components/Header.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, User, Plus, Bell } from 'lucide-react';
import rizqVenturesLogo from '../assets/Images/rizqVenturesLogo.png';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [unreadNotifications, setUnreadNotifications] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
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

  const isMessagesPage = location.pathname === '/messages';

  const renderBadge = (count: number) => {
    if (count === 0) return null;
    return (
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
        {count > 9 ? '9+' : count}
      </span>
    );
  };

  // CHANGED: Always navigate to /mentors page
  const handleMentorsClick = () => {
    navigate('/mentors');
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
              <a href="/#home" className={navLinkClass('home')}>
                Home
              </a>
            </li>
            <li>
              <a href="/posts" className={navLinkClass('posts')}>
                Posts
              </a>
            </li>
            <li>
              <a href="/#jobs" className={navLinkClass('jobs')}>
                Jobs
              </a>
            </li>
            <li>
              <a href="/#about" className={navLinkClass('about')}>
                About Us
              </a>
            </li>
            <li>
              <button
                onClick={handleMentorsClick}
                className={`${navLinkClass('mentors')} bg-transparent border-none cursor-pointer p-0`}
              >
                Mentors
              </button>
            </li>
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Plus Icon - Create New Post */}
                <button
                  className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center hover:bg-primary-light2 transition-all"
                  title="Create Post"
                >
                  <Plus className="w-5 h-5 text-primary" />
                </button>

                {/* Notifications Icon */}
                <button
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all relative"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {renderBadge(unreadNotifications)}
                </button>

                {/* Messages Icon */}
                <button
                  onClick={() => navigate('/messages')}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all relative ${
                    isMessagesPage
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                  title="Messages"
                >
                  <MessageCircle className="w-5 h-5" />
                  {!isMessagesPage && renderBadge(unreadMessages)}
                </button>

                {/* Profile Icon */}
                <button
                  onClick={() => navigate('/profile')}
                  className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-all"
                  title="Profile"
                >
                  <User className="w-5 h-5 text-gray-600" />
                </button>
              </>
            ) : (
              <>
                {/* Login and Signup Buttons */}
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
