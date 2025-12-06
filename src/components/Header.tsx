// components/Header.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, User, Plus, Bell } from 'lucide-react';
import rizqVenturesLogo from '../assets/Images/rizqVenturesLogo.png';
import { useAuth } from '../context/AuthContext';
import CreatePostModal from './CreatePostModal';

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [unreadMessages] = useState(3);
  const [unreadNotifications] = useState(5);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  // Scroll-based highlight for landing page
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

    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location.pathname]);

  // Route-based highlight
  useEffect(() => {
    const path = location.pathname;

    if (path === '/jobs') setActiveSection('jobs');
    else if (path === '/mentors') setActiveSection('mentors');
    else if (path === '/posts') setActiveSection('posts');
    else if (path === '/profile') setActiveSection('profile');
    else if (path === '/messages') setActiveSection('messages');
    else if (path === '/notifications') setActiveSection('notifications');
    else if (path === '/') setActiveSection('home');
  }, [location.pathname]);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  const navLinkClass = (section: string) =>
    activeSection === section
      ? 'text-primary font-bold border-b-2 border-primary pb-1 inline-block'
      : 'text-gray-700 hover:text-primary transition-colors font-medium';

  const isMessagesPage = location.pathname === '/messages';
  const isNotificationsPage = location.pathname === '/notifications';
  const isProfilePage = location.pathname === '/profile';

  // Plus is considered "active" when modal open OR on create pages
  const isCreatePage =
    location.pathname === '/create-post' || location.pathname === '/create-job';
  const isPlusActive = isCreatePage || isCreateModalOpen;

  const renderBadge = (count: number) => {
    if (count === 0) return null;
    return (
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
        {count > 9 ? '9+' : count}
      </span>
    );
  };

  const handleMentorsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/mentors');
  };

  const handleJobsClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isAuthenticated) {
      navigate('/jobs');
    } else {
      if (location.pathname === '/') {
        const jobsSection = document.getElementById('jobs');
        if (jobsSection) {
          jobsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        navigate('/#jobs');
      }
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate('/', { replace: true });
  };

  return (
    <>
      <nav className="bg-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img
                src={rizqVenturesLogo}
                alt="Rizq Ventures Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="text-gray-800 text-xl font-bold">
                Rizq <span className="text-primary">ventures</span>
              </span>
            </div>

            {/* Navigation Links */}
            <ul className="hidden md:flex items-center space-x-8">
              <li>
                <a href="/#home" className={navLinkClass('home')}>
                  Home
                </a>
              </li>

              {isAuthenticated && (
                <li>
                  <a href="/posts" className={navLinkClass('posts')}>
                    Posts
                  </a>
                </li>
              )}

              <li>
                <a
                  href={isAuthenticated ? '/jobs' : '/#jobs'}
                  onClick={handleJobsClick}
                  className={`${navLinkClass('jobs')} py-1`}
                >
                  Jobs
                </a>
              </li>
              <li>
                <a
                  href="/mentors"
                  onClick={handleMentorsClick}
                  className={`${navLinkClass('mentors')} py-1`}
                >
                  Mentors
                </a>
              </li>
            </ul>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  {/* Plus Icon - Create */}
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isPlusActive
                        ? 'bg-primary text-white'
                        : 'bg-primary-light hover:bg-primary-light3 text-primary'
                    }`}
                    title="Create"
                  >
                    <Plus
                      className={`w-5 h-5 ${
                        isPlusActive ? 'text-white' : 'text-primary'
                      }`}
                    />
                  </button>

                  {/* Notifications Icon */}
                  <button
                    onClick={() => navigate('/notifications')}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all relative ${
                      isNotificationsPage
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                    title="Notifications"
                  >
                    <Bell
                      className={`w-5 h-5 ${
                        isNotificationsPage ? 'text-white' : 'text-gray-600'
                      }`}
                    />
                    {!isNotificationsPage && renderBadge(unreadNotifications)}
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
                    <MessageCircle
                      className={`w-5 h-5 ${
                        isMessagesPage ? 'text-white' : 'text-gray-600'
                      }`}
                    />
                    {!isMessagesPage && renderBadge(unreadMessages)}
                  </button>

                  {/* Profile Icon + Dropdown */}
                  <div className="relative" ref={profileMenuRef}>
                    <button
                      onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isProfilePage
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                      }`}
                      title="Profile"
                    >
                      <User
                        className={`w-5 h-5 ${
                          isProfilePage ? 'text-white' : 'text-gray-600'
                        }`}
                      />
                    </button>

                    {isProfileMenuOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            navigate('/profile');
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          View Profile
                        </button>
                        <div className="h-px bg-gray-100 my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
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

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSelectNormalPost={() => {
          setIsCreateModalOpen(false);
          navigate('/create-post');
        }}
        onSelectJobPost={() => {
          setIsCreateModalOpen(false);
          navigate('/create-job');
        }}
      />
    </>
  );
};

export default Header;
