import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        if (parsedData.userData) {
          setUser(parsedData.userData);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("userData");
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
        localStorage.removeItem("userData");
      }
    }

    setLoading(false); // Mark as loaded
  }, []);

  if (loading) return <div>Loading...</div>; // Prevent flickering

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      <Router>
        <AppRoutes />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
