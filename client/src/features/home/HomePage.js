import React, { useState } from 'react';
import { useSendLogoutMutation } from '../auth/authApiSlice';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import UsersList from '../users/UserList';
import ProblemsList from '../problems/ProblemsList';
import DashLayout from '../../components/DashLayout'; // Use DashLayout


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
    navigate('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Home':
        return <h2>Welcome to the Home Page, {username}!</h2>;
      case 'Competitions':
        return <h2>Competitions Available</h2>;
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

  return (
    <DashLayout
      activeTab={activeTab}
      handleTabClick={handleTabClick}
      renderTabContent={renderTabContent}
      loggingOut={loggingOut}
    />
  );
};

export default HomePage;
