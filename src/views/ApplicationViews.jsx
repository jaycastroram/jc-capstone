import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from '../components/nav/NavBar';
import WelcomeScreen from './WelcomeScreen';
import BreweriesList from '../components/breweries/BreweriesList';
import BrewDetails from '../components/breweries/BrewDetails';
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import Checklist from '../components/checklists/ChecklistList';
import ProfileDetails from '../components/Profile/ProfileDetails';
import EditProfile from '../components/Profile/EditProfile';

const ApplicationView = ({ isLoggedIn, setIsLoggedIn, userId }) => {
  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<WelcomeScreen isLoggedIn={isLoggedIn}/>} />
        <Route path="/breweries" element={<BreweriesList />} />
        <Route path="/brewery/:id" element={<BrewDetails isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checklist" element={<Checklist userId={userId} />} />
        <Route path="/profile" element={<ProfileDetails userId={userId} />} />
        <Route path="/profile/edit" element={<EditProfile userId={userId} onUpdate={() => window.history.back()} />} />
      </Routes>
    </div>
  );
};

export default ApplicationView;
