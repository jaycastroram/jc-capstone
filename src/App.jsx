import React, { useState, useEffect } from 'react';
import ApplicationView from './views/ApplicationViews';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage for logged-in status when the app loads
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("AleTrail_user"));
    if (user && user.isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <ApplicationView isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default App;
