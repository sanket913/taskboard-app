import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./pages/Auth";
import "./styles/main.css";

function App() {
  return (
    <Router>
      <Routes>

        {/* AUTH PAGE (Login + Signup Flip) */}
        <Route path="/" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />

        {/*USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roleRequired="User">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/*ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="Admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        {/*INVALID ROUTE REDIRECT */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;