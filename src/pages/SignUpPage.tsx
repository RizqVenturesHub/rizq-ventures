import { useState } from "react";
import "../signup.css";
import { toast } from "react-toastify";
import { registerAPI } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  // ✅ form states
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ EMAIL VALIDATION
  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  // ✅ SIGNUP HANDLER
  const handleSignup = async () => {
    if (!name || !email || !password) {
      return toast.error("Full name, email & password are required ❌");
    }

    if (!isValidEmail(email)) {
      return toast.error("Invalid email address ❌");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters ❌");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match ❌");
    }

    try {
      setLoading(true);

      await registerAPI({
        name,
        email,
        password,
        headline,
        location,
      });

      toast.success("Signup successful ✅");

      setTimeout(() => navigate("/login"), 800);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <canvas className="particles-bg" />

      <div className="signup-box">
        {/* LEFT OPTIONAL */}
        <div className="signup-left" />

        {/* RIGHT */}
        <div className="signup-right">
          <h2 className="title">Sign up with your email address</h2>

          <label>Full name</label>
          <input
            type="text"
            placeholder="Enter your profile name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-pass"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* ✅ Confirm Password */}
          <label>Confirm Password</label>
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <p className="hint-text">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>

          <label>Headline</label>
          <input
            type="text"
            placeholder="e.g. Software Engineer at TechCorp"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />

          <label>Location</label>
          <input
            type="text"
            placeholder="e.g. Mumbai, India"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button
            className="btn signup-btn"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>

          <p className="no-account">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
