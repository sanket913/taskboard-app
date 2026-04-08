import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">

      <div
        className="nav-logo"
        onClick={() => navigate("/dashboard")}
      >
        TASK-BOARD
      </div>

      <div className="nav-right">

        <button
          className="nav-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}