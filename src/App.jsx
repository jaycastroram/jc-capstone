import React, { useState, useEffect } from 'react';
import ApplicationView from './views/ApplicationViews';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check localStorage for logged-in status and user data when the app loads
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("AleTrail_user"));
    if (savedUser && savedUser.isLoggedIn) {
      setIsLoggedIn(true);
      setUser(savedUser); // Store user data in the `user` state
    }
  }, []);

  return (
    <div>
      <ApplicationView 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
        userId={user?.id} // Pass userId if user exists
      />
    </div>
  );
}

export default App;
