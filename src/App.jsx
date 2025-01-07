import { createContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRoutes from './Routes/AppRoutes';

export const UserContext = createContext();

// Function to retrieve user from localStorage
const getUserFromLocalStorage = () => {
  const savedUser = localStorage.getItem('user');
  return savedUser ? JSON.parse(savedUser) : null;
};

// Function to retrieve isLoggedIn from localStorage
const getIsLoggedInFromLocalStorage = () => {
  const savedLoggedIn = localStorage.getItem('isLoggedIn');
  return savedLoggedIn === 'true';
};

function App() {
  // Get this from localStorage
  const [user, setUser] = useState(getUserFromLocalStorage);
  const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedInFromLocalStorage);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      <Router>
        <AppRoutes userRole={user?.role?.roleName || ""} isLoggedIn={isLoggedIn} />
      </Router>
    </UserContext.Provider>
    //
  )
}

export default App
