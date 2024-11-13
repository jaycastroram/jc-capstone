import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../components/nav/NavBar';
import WelcomeScreen from './WelcomeScreen';
import BreweriesList from '../components/breweries/BreweriesList';
import BrewDetails from '../components/breweries/BrewDetails';
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';

const ApplicationView = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<WelcomeScreen isLoggedIn={isLoggedIn}/>} />
        <Route path="/breweries" element={<BreweriesList />} />
        <Route path="/brewery/:id" element={<BrewDetails isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default ApplicationView;
