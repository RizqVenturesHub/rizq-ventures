// pages/SignupPage.tsx
import React from "react";
import NetworkBackground from "../components/NetworkBackground";
import SignupForm from "../components/form/signup";

export default function SignupPage() {
  return (
    <NetworkBackground className="min-h-screen">
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-secondary mb-8 text-center">
            Sign up with your email address
          </h2>
          <SignupForm />
        </div>
      </div>
    </NetworkBackground>
  );
}
