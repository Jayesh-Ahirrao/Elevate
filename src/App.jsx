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

    if (storedUserData) { // Check if there's data in localStorage
      try {
        const parsedData = JSON.parse(storedUserData);
        const { token, userData } = parsedData; // Access token and userData

        if (userData) { // Check if userData exists
          setUser(userData);
          setIsLoggedIn(true);          
          console.log("User is logged in:", userData);
        } else {
          console.warn("No userData found in localStorage, clearing storage.");
          localStorage.removeItem("userData"); // Clear invalid data
        }

      } catch (error) {
        console.error("Error parsing userData from localStorage:", error);
        localStorage.removeItem("userData"); // Clear corrupted data
      }
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