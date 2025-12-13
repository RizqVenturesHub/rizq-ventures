// components/form/login/LoginForm.tsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import { useLoginForm } from "../../../hooks/login";
import PasswordInput from "../signup/PasswordInput";
import { authService } from "../../../services/authService";

export default function LoginForm() {
  const { email, setEmail, password, setPassword } = useLoginForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Valid credentials
  const VALID_EMAIL = "abc@gmail.com";
  const VALID_PASSWORD = "123456";

  // Get the redirect path from location state, default to Jobs page
  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const resp = await authService.login({ email, password });
      const { user, token, message } = resp;

      // Save in context (AuthContext will also persist to localStorage)
      login(user, token);

      toast.success(message || "Login successful!", {
        duration: 2000,
        position: "top-center",
        icon: "✅",
      });

      // Redirect to original path
      navigate(from, { replace: true });
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Login failed";
      setError(msg);
      toast.error(msg, { duration: 3000, position: "top-center", icon: "❌" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(""); // Clear error on input change
          }}
          placeholder="Enter your email address"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${error
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-primary focus:border-transparent"
            }`}
          required
          disabled={isLoading}
        />
      </div>

      {/* Password */}
      <div>
        <PasswordInput
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(""); // Clear error on input change
          }}
          disabled={isLoading}
          error={!!error}
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg ${isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary-dark"
          }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Logging in...
          </span>
        ) : (
          "Login"
        )}
      </button>

      {/* Demo Credentials Info */}
      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-xs">
        <p className="font-semibold mb-1">Demo Credentials:</p>
        <p>Email: abc@gmail.com</p>
        <p>Password: 123456</p>
      </div>

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
            disabled={isLoading}
          >
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
}
