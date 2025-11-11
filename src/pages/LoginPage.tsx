import { useEffect, useRef, useState } from "react";
import "../login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAPI } from "../api/auth";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // ✅ NEW — States to capture input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ NEW — Loader
  const [loading, setLoading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const navigate = useNavigate();

  // ✅ EMAIL FORMAT CHECK
  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  // ✅ LOGIN HANDLER
  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("All fields are required ❌");
    }

    if (!isValidEmail(email)) {
      return toast.error("Invalid email format ❌");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters ❌");
    }

    try {
      setLoading(true);
      const res = await loginAPI({ email, password });

      const token =
        res.data?.token ||
        res.data?.accessToken ||
        res.headers?.authorization?.replace(/^Bearer\s+/i, "");

      if (!token) {
        return toast.error("Token not received ❌");
      }

      localStorage.setItem("token", token);

      toast.success("Login successful ✅");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const DOT_COUNT = 200;
    const DOT_MIN_R = 3;
    const DOT_MAX_R = 5;
    const SPEED = 0.35;
    const LINK_DIST = 120;
    const LINK_ALPHA = 2;

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist <= LINK_DIST) {
            ctx.strokeStyle = `rgba(255,255,255,${
              LINK_ALPHA * (1 - dist / LINK_DIST)
            })`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = "rgba(255,255,255,0.9)";
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="login-container">
      <canvas ref={canvasRef} className="particles-bg" />

      <div className="login-box">
        <div className="login-left">
          <img
            src="public/illustration.png"
            alt="illustration"
            className="login-illustration"
          />
        </div>

        <div className="login-right">
          <h2 className="title">Login</h2>

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

          <p className="hint-text">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>

          <button
            className="btn login-btn"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <a className="forgot">Forgot your password</a>

          <p className="no-account">Don't have an account?</p>
          <button
            className="btn signup-btn"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
