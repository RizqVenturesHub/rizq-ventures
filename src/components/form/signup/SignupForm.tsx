// components/form/signup/SignupForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSignupForm } from "../../../hooks/signup";
import PasswordInput from "./PasswordInput";
import { authService } from "../../../services/authService";
import { useAuth } from "../../../context/AuthContext";

export default function SignupForm() {
  const { formData, handleChange } = useSignupForm();
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call backend signup
      const resp = await authService.signup(formData);
      const { user, token, message } = resp;

      // Save authenticated user
      login(user, token);

      toast.success(message || "Signup successful!", {
        duration: 2000,
        position: "top-center",
      });

      navigate('/', { replace: true });
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Signup failed';
      toast.error(msg, { duration: 3000, position: 'top-center' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your profile name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          required
        />
      </div>

      {/* Password */}
      <PasswordInput
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      {/* Headline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Headline
        </label>
        <input
          type="text"
          name="headline"
          value={formData.headline}
          onChange={handleChange}
          placeholder="e.g. Software Engineer at TechCorp"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Mumbai, India"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg mt-6"
      >
        Sign up
      </button>

      {/* Login Link */}
      <div className="text-center pt-2">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-primary hover:text-primary-dark font-semibold transition-colors underline"
          >
            Log in
          </button>
        </p>
      </div>
    </form>
  );
}
