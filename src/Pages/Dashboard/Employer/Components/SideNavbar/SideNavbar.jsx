import React, { useState } from 'react';
import { PlusCircle, UserCircle, LogOut, Menu } from 'lucide-react';
import './SideNavbar.css';

const SideNavbar = ({ onPostJobClick, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (action) => {
    if (action) {
      action();
    }
    setIsOpen(false);
  };

  return (
    <>
      <button className="menu-toggle" onClick={toggleMenu}>
        <Menu size={24} />
      </button>
      <nav className={`side-navbar ${isOpen ? 'active' : ''}`}>
        <div className="nav-header">
          <h2>Employer Dashboard</h2>
        </div>
        <div className="nav-buttons">
          <button 
            className="nav-button post-job" 
            onClick={() => handleNavClick(onPostJobClick)}
          >
            <PlusCircle />
            <span>Post New Job</span>
          </button>
          <button className="nav-button">
            <UserCircle />
            <span>Update Profile</span>
          </button>
          <button 
            className="nav-button logout" 
            onClick={() => handleNavClick(onLogout)}
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default SideNavbar;