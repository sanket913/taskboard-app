import { useState } from "react";
import { signup } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      return alert("Please fill all fields ");
    }

    try {
      await signup({ name, email, password, role });
      alert("Signup successful ");
      navigate("/login");
    } catch {
      alert("Signup failed ");
    }
  };

  return (
    <div className="auth-wrapper">

      <div className="auth-card glass fade">

        <h2 className="auth-title">Create Account 🚀</h2>
        <p className="auth-sub">Start managing your tasks like a pro</p>

        <input
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        <button className="primary auth-btn" onClick={handleSignup}>
          Create Account
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>

        {/*SIGNATURE */}
        <p className="signature">
          Made by <span>Sanket Prajapati</span>
        </p>

      </div>
    </div>
  );
}