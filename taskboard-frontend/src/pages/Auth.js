import { useState } from "react";
import { login, signup } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isFlipped, setIsFlipped] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User"
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(loginData);

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);

      res.role === "Admin"
        ? navigate("/admin")
        : navigate("/dashboard");

    } catch {
      alert("Login failed");
    }
  };

  const handleSignup = async () => {
    try {
      await signup(signupData);
      alert("Signup successful");
      setIsFlipped(false);
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-wrapper">

      <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>

        <div className="flip-inner">

          {/* LOGIN SIDE */}
          <div className="flip-front glass">

            <h2>Welcome Back 👋</h2>
            <p>Login to continue</p>

            <input
              placeholder="Email"
              onChange={e => setLoginData({ ...loginData, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={e => setLoginData({ ...loginData, password: e.target.value })}
            />

            <button className="primary" onClick={handleLogin}>
              Login
            </button>

            <p>
              Don’t have an account?{" "}
              <span onClick={() => setIsFlipped(true)} className="link">
                Signup
              </span>
            </p>

            <p className="signature">Made by <span>Sanket Prajapati</span></p>

          </div>

          {/* SIGNUP SIDE */}
          <div className="flip-back glass">

            <h2>Create Account 🚀</h2>
            <p>Start your journey</p>

            <input
              placeholder="Name"
              onChange={e => setSignupData({ ...signupData, name: e.target.value })}
            />

            <input
              placeholder="Email"
              onChange={e => setSignupData({ ...signupData, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={e => setSignupData({ ...signupData, password: e.target.value })}
            />

            <select onChange={e => setSignupData({ ...signupData, role: e.target.value })}>
              <option>User</option>
              <option>Admin</option>
            </select>

            <button className="primary" onClick={handleSignup}>
              Signup
            </button>

            <p>
              Already have an account?{" "}
              <span onClick={() => setIsFlipped(false)} className="link">
                Login
              </span>
            </p>

            <p className="signature">Made by <span>Sanket Prajapati</span></p>

          </div>

        </div>
      </div>
    </div>
  );
}