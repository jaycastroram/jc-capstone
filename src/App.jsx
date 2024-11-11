import React, { useState } from 'react';
import ApplicationView from './views/ApplicationViews';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Placeholder for login state

  return (
    <div>
      <ApplicationView isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
