import React from 'react';
import './WelcomeScreen.css';
import logo from '../assets/logo.png'; // Adjust the path if needed
import { Link } from 'react-router-dom';

const WelcomeScreen = ({isLoggedIn}) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <img src={logo} alt="Ale Trail Logo" className="logo" />
        <h1>Ale Trail</h1>
        <p className="tagline">Your Ultimate Brewery Checklist</p>
        <p>Discover and track your favorite breweries, explore recommendations, and create your own checklist of must-visit spots!</p>
        {isLoggedIn ? (
        // Show "Search Breweries Near Me" if user is logged in
        <Link to="/breweries">
          <button className="join-button">Search Breweries Near Me</button>
        </Link>
      ) : (
        // Show "Join Me" button if user is not logged in
        <Link to="/register">
          <button className="join-button">Join Me</button>
        </Link>
      )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
