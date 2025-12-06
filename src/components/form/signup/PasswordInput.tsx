// components/form/signup/PasswordInput.tsx
import React from "react";
import { usePasswordToggle } from "../../../hooks/signup";

interface PasswordInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showHelper?: boolean;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
}

export default function PasswordInput({ 
  name, 
  value, 
  onChange,
  showHelper = true,
  disabled = false,
  error = false,
  placeholder = "Enter your password"
}: PasswordInputProps) {
  const { showPassword, togglePassword } = usePasswordToggle();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pr-16 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
            error
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-primary focus:border-transparent"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
          required
          disabled={disabled}
        />
        <button
          type="button"
          onClick={togglePassword}
          className={`absolute right-4 top-1/2 -translate-y-1/2 text-sm transition-colors ${
            disabled 
              ? "text-gray-400 cursor-not-allowed" 
              : "text-gray-500 hover:text-gray-700"
          }`}
          tabIndex={-1}
          disabled={disabled}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      {showHelper && !error && (
        <p className="text-xs text-gray-500 mt-2">
          Use 8 or more characters with a mix of letters, numbers & symbols
        </p>
      )}
    </div>
  );
}
