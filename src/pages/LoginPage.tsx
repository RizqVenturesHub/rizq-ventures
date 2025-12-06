// pages/LoginPage.tsx
import React from "react";
import { Toaster } from "react-hot-toast";
import NetworkBackground from "../components/NetworkBackground";
import LoginForm from "../components/form/login";
import illustration from "../assets/Images/illustration.png";

export default function LoginPage() {
  return (
    <NetworkBackground className="min-h-screen">
      <Toaster /> {/* ADDED: Toast notifications */}
      
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-6xl flex bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          {/* Left Illustration */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center p-8 bg-gradient-to-br from-primary-light to-white">
            <img
              src={illustration}
              alt="illustration"
              className="max-w-md w-full h-auto object-contain"
            />
          </div>

          {/* Right Form Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-secondary mb-8">Login</h2>
            <LoginForm />
          </div>
        </div>
      </div>
    </NetworkBackground>
  );
}
