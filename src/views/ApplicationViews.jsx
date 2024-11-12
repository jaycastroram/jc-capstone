import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../components/nav/NavBar';
import WelcomeScreen from './WelcomeScreen';
import BreweriesList from '../components/breweries/BreweriesList';
import BrewDetails from '../components/breweries/BrewDetails'; // Import BrewDetails component

const ApplicationView = ({ isLoggedIn }) => {
  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/breweries" element={<BreweriesList />} />
        <Route path="/brewery/:id" element={<BrewDetails isLoggedIn={isLoggedIn} />} /> {/* New route */}
      </Routes>
    </div>
  );
};

export default ApplicationView;
