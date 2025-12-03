// components/form/login/LoginForm.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoginForm } from "../../../hooks/login";
import PasswordInput from "../signup/PasswordInput";

export default function LoginForm() {
  const { email, setEmail, password, setPassword } = useLoginForm();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", { email, password });
  };

  return (
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
      <PasswordInput
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

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

      {/* Sign Up Link */}
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
  );
}
