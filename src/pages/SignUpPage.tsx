import { useState } from "react";
import "../signup.css";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signup-container">
      <canvas className="particles-bg" />

      <div className="signup-box">
        
        {/* LEFT EMPTY OR IMAGE */}
        <div className="signup-left">
          {/* Optional illustration */}
        </div>

        {/* RIGHT FORM */}
        <div className="signup-right">

          <h2 className="title">Sign up with your email address</h2>

          <label>Full name</label>
          <input type="text" placeholder="Enter your profile name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email address" />

          <label>Password</label>
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <span
              className="toggle-pass"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <p className="hint-text">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>

          <label>Headline</label>
          <input type="text" placeholder="e.g. Software Engineer at TechCorp" />

          <label>Location</label>
          <input type="text" placeholder="e.g. Mumbai, India" />

          {/* <div className="checkbox-row">
            <input type="checkbox" />
            <p>Share my registration data with content providers</p>
          </div> */}

          {/* <div className="captcha-box">
            <p>[Captcha Here]</p>
          </div> */}

          <button className="btn signup-btn">Sign up</button>

          <p className="no-account">
            Already have an account? <a href="/">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
