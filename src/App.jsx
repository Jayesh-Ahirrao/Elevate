import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const { employer } = JSON.parse(storedUserData);
      setUser(employer);
      setIsLoggedIn(true);
      console.log("User is logged in:", employer);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      <Router>
        <AppRoutes userRole={user?.roleName || ""} isLoggedIn={isLoggedIn} />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
