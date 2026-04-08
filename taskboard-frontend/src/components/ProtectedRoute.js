import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roleRequired }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Wrong role
  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}