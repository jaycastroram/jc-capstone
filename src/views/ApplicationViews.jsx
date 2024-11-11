import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../components/nav/NavBar';
import WelcomeScreen from './WelcomeScreen';
import BreweriesList from '../components/breweries/BreweriesList';

const ApplicationView = ({ isLoggedIn }) => {
  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/breweries" element={<BreweriesList />} />
        {/* Add more routes here as needed */}
      </Routes>
    </div>
  );
};

export default ApplicationView;
