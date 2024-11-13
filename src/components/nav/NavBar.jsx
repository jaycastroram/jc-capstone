import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("AleTrail_user"); // Remove user data from localStorage
    setIsLoggedIn(false); // Update the state to reflect the logged-out status
    navigate("/login"); // Redirect to the home page
  };

  return (
    <nav className="navbar">
      <h1 className="navbar__title">Ale Trail</h1>
      <ul className="navbar__links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/breweries">Breweries</Link></li>
        <li><Link to="/recommended">Recommended</Link></li>
        <li><Link to="/checklist">Checklist</Link></li>
        {isLoggedIn && <li><Link to="/profile">Profile</Link></li>}
        <li>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="navbar__button">
              Log Out
            </button>
          ) : (
            <Link to="/login" className="navbar__button">
              Log In
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
