import { useEffect, useRef, useState } from "react";
import "../login.css";
import { useNavigate } from "react-router-dom";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    // settings — tune for your exact look
    const DOT_COUNT = 200;        // how many dots
    const DOT_MIN_R = 3;       // min radius
    const DOT_MAX_R = 5;       // max radius
    const SPEED = 0.35;          // dot speed
    const LINK_DIST = 120;       // max distance to draw a line
    const LINK_ALPHA = 2;     // line opacity

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      // set actual canvas pixels for crispness
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // re-seed particles so they fill the space nicely
      seedParticles();
    };

    const seedParticles = () => {
      particles = Array.from({ length: DOT_COUNT }).map(() => ({
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(-SPEED, SPEED),
        vy: rand(-SPEED, SPEED),
        r: rand(DOT_MIN_R, DOT_MAX_R),
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      // move + bounce
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;
      }

      // lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist <= LINK_DIST) {
            ctx.strokeStyle = `rgba(255,255,255,${LINK_ALPHA * (1 - dist / LINK_DIST)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // dots
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    // init
    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(step);

    // cleanup
    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="login-container">
      {/* Dynamic Dots Canvas */}
      <canvas ref={canvasRef} className="particles-bg" />

      <div className="login-box">
        {/* Left Illustration */}
        <div className="login-left">
          <img
            src="public\illustration.png"
            alt="illustration"
            className="login-illustration"
          />
        </div>

        {/* Right Section Form */}
        <div className="login-right">
          <h2 className="title">Login</h2>

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

          {/* <div className="checkbox-row">
            <input type="checkbox" />
            <p>Share my registration data with content providers</p>
          </div> */}

          {/* <div className="captcha-box">[Captcha Here]</div> */}

          <button className="btn login-btn">Login</button>

          <a href="#" className="forgot">Forgot your password</a>

          <p className="no-account">Don't have an account?</p>
          <button className="btn signup-btn" onClick={() => navigate("/signup")}>
          Sign up</button>

        </div>
      </div>
    </div>
  );
}
