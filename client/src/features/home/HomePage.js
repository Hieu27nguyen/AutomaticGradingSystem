import React, { useState } from 'react';
import { useSendLogoutMutation } from '../auth/authApiSlice';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import UsersList from '../users/UserList';
import ProblemsList from '../problems/ProblemsList';
import '../../style/HomePage.css'
import CompetitionsList from '../competitions/CompetitionsList';

const HomePage = () => {
  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation();

  const { username, roles } = useAuth();
  

  const [activeTab, setActiveTab] = useState('Home');
  const navigate = useNavigate();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const loggingOut = () => {
    sendLogout();
    navigate('/');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Home':
        return <h2>Welcome to the Home Page, {username}!</h2>;
      case 'Competition':
        return <CompetitionsList/>;
      case 'Problems':
        return <ProblemsList />;
      case 'Scoreboards':
        return <h2>Scoreboards</h2>;
      case 'Manage Contestants':
        return <UsersList/>;
      case 'Problems Management':
        return <ProblemsList />;
      default:
        return null;
    }
  };

  const renderNavItems = () => {
    if (roles.includes('CONTESTANT')) {
      return (
        <ul>
          <li className={activeTab === 'Home' ? 'active' : ''}>
            <button className='home-button' onClick={() => handleTabClick('Home')}>Home</button>
          </li>
          <li className={activeTab === 'Problems' ? 'active' : ''}>
            <button className='home-button' onClick={() => handleTabClick('Problems')}>Problems</button>
          </li>
          <li className={activeTab === 'Scoreboards' ? 'active' : ''}>
            <button className='home-button' onClick={() => handleTabClick('Scoreboards')}>Scoreboards</button>
          </li>
          <li className={activeTab === 'Competitions' ? 'active' : ''}>
            <button className='home-button' onClick={() => handleTabClick('Competition')}>Competition</button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li className={activeTab === 'Home' ? 'active' : ''}>
            <button className='home-button' onClick={() => handleTabClick('Home')}>Home</button>
          </li>
          <li className={activeTab === 'Competitions' ? 'active' : ''}>
            <button className='home-button' onClick={() => handleTabClick('Competition')}>Competition</button>
          </li>
          <li className={activeTab === 'Manage Contestants' ? 'active' : ''}>
            <button className='home-button' onClick={() => handleTabClick('Manage Contestants')}>Manage Contestants</button>
          </li>
          <li className={activeTab === 'Problems Management' ? 'active' : ''}>
            <button className='home-button' onClick={() => handleTabClick('Problems Management')}>Problems Management</button>
          </li>
        </ul>
      );
    }
  };

  return (
    <div className="home-page">
      <nav>
        {renderNavItems()}
        <div className="profile-dropdown">
          <button className='home-button' onClick={() => handleTabClick('Profile')}>Profile</button>
          <button
            className="home-button"
            title="Logout"
            onClick={loggingOut}
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default HomePage;
