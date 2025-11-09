// hooks/signup/useSignupForm.ts
import { useState } from "react";

export function useSignupForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    headline: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      password: "",
      headline: "",
      location: "",
    });
  };

  return {
    formData,
    handleChange,
    resetForm,
  };
}
