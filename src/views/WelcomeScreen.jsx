import React from 'react';
import './WelcomeScreen.css';
import logo from '../assets/logo.png'; // Adjust the path if needed

const WelcomeScreen = () => {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <img src={logo} alt="Ale Trail Logo" className="logo" />
        <h1>Ale Trail</h1>
        <p className="tagline">Your Ultimate Brewery Checklist</p>
        <p>Discover and track your favorite breweries, explore recommendations, and create your own checklist of must-visit spots!</p>
        <button className="join-button">Join Now</button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
