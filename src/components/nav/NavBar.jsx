import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ isLoggedIn }) => {
  return (
    <nav className="navbar">
      <h1 className="navbar__title">Brewery Checklist</h1>
      <ul className="navbar__links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/breweries">Breweries</Link></li>
        <li><Link to="/recommended">Recommended</Link></li>
        <li><Link to="/checklist">Checklist</Link></li>
        {isLoggedIn && <li><Link to="/profile">Profile</Link></li>}
      </ul>
    </nav>
  );
};

export default NavBar;
