// hooks/signup/usePasswordToggle.ts
import { useState } from "react";

export function usePasswordToggle() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return {
    showPassword,
    togglePassword,
  };
}
