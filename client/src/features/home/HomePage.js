import React, { useState } from 'react';
import { useSendLogoutMutation } from '../auth/authApiSlice'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation();

  const {username, roles} = useAuth();

  const [activeTab, setActiveTab] = useState('Home');
  const navigate = useNavigate();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const loggingOut = () => {
    sendLogout();
    navigate('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Home':
        return <h2>Welcome to the Home Page, {username}!</h2>;
      case 'Competitions':
        return <h2>Competitions Avaiable </h2>;
      case 'Manage Contestants':
        return <h2>Contestants Info</h2>;
      case 'Profile':
        return <h2>Profile </h2>;
      default:
        return null;
    }
  };

  const renderProfileDropdown = () => {
    return (
      <div className="profile-dropdown">
        <button onClick={() => handleTabClick('Profile')}>Profile</button>
        <button
          className="icon-button"
          title="Logout"
          onClick={loggingOut}
        >
          Logout
        </button>

      </div>

    );
  };

  return (
    <div className="home-page">
      <nav>
        <ul>
          <li className={activeTab === 'Home' ? 'active' : ''}>
            <button onClick={() => handleTabClick('Home')}>Home</button>
          </li>
          <li className={activeTab === 'Competitions' ? 'active' : ''}>
            <button onClick={() => handleTabClick('Competitions')}>Competitions</button>
          </li>
          <li className={activeTab === 'Manage Contestants' ? 'active' : ''}>
            <button onClick={() => handleTabClick('Manage Contestants')}>Manage Contestants</button>
          </li>
        </ul>
        {renderProfileDropdown()}
      </nav>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default HomePage;
