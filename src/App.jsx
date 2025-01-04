import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes'
import config from './Config';
import { createContext, useState } from 'react';

export const UserContext = createContext();

function App() {
  // Get this from localStorage
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      <Router>
        <AppRoutes userRole={user?.role?.roleName || ""} isLoggedIn={isLoggedIn} />
      </Router>
    </UserContext.Provider>
  )
}

export default App
