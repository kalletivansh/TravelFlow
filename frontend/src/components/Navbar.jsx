import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        TravelFlow
      </div>

      <div className="navbar-links">
        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/trips">
          Trips
        </NavLink>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;