import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please fill all fields ⚠️");
    }

    try {
      const res = await login({ email, password });

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);

      if (res.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch {
      alert("Login failed ");
    }
  };

  return (
    <div className="auth-wrapper">

      <div className="auth-card glass fade">

        {/* TITLE */}
        <h2 className="auth-title">Welcome Back 👋</h2>
        <p className="auth-sub">Login to continue your journey</p>

        {/* EMAIL */}
        <input
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          className="primary auth-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* SIGNUP LINK */}
        <p className="auth-footer">
          Don’t have an account?{" "}
          <Link to="/signup" className="link">
            Signup
          </Link>
        </p>

        {/* SIGNATURE */}
        <p className="signature">
          Made by <span>Sanket Prajapati</span>
        </p>

      </div>
    </div>
  );
}