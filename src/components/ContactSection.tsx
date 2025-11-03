// components/ContactSection.tsx
import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary-light to-white" id="contact">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">
          Let's get in touch!
        </h2>
        <p className="text-gray-600 mb-8">
          Got questions about the Landing Page UI Kit? Our team is here to help. Contact us for quick and friendly support.
        </p>
        
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-primary text-xl">📞</span>
            <span className="text-gray-700">+012 345 6789</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-primary text-xl">✉️</span>
            <span className="text-gray-700">Hello@animaapp.com</span>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all"
          >
            Submit
          </button>
        </form>

        {/* Social Links */}
        <div className="mt-8">
          <p className="text-gray-700 font-semibold mb-4">Connect with us</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              📷
            </a>
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              🌐
            </a>
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              💼
            </a>
            <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              🐦
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
