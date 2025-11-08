// pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NetworkBackground from "../components/NetworkBackground";
import illustration from "../assets/Images/illustration.png";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", { email, password });
  };

  return (
    <NetworkBackground className="min-h-screen">
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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Use 8 or more characters with a mix of letters, numbers & symbols
                </p>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
              >
                Login
              </button>

              {/* Forgot Password */}
              <div className="text-center">
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary-dark transition-colors"
                >
                  Forgot your password?
                </a>
              </div>

              {/* Sign Up Link - Changed to text link */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="text-primary font-semibold hover:text-primary-dark transition-colors underline"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </NetworkBackground>
  );
}
