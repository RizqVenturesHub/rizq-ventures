// components/form/signup/PasswordInput.tsx
import React from "react";
import { usePasswordToggle } from "../../../hooks/signup";

interface PasswordInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({ name, value, onChange }: PasswordInputProps) {
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
          placeholder="Enter your password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          required
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Use 8 or more characters with a mix of letters, numbers & symbols
      </p>
    </div>
  );
}
