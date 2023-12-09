import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { Link } from 'react-router-dom';
import '../style/HomePage.css'
const DashHeader = () => {
  const [sendLogout] = useSendLogoutMutation();
  
  const { roles } = useAuth();

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('/home');

  const handleTabClick = (to) => {
    setActiveTab(to);
  };

  const loggingOut = () => {
    sendLogout();
    navigate('/');
  };

  const renderNavItems = () => {
    if (roles.includes('CONTESTANT')) {
      return (
        <ul>
          <li className={activeTab === '/home' ? 'active' : ''}>
            <Link to="/home" onClick={() => handleTabClick('/home')}> Home </Link>
          </li>
          <li className={activeTab === '/home/problems' ? 'active' : ''}>
            <Link to="/home/problems" onClick={() => handleTabClick('/home/problems')}>Problems</Link>
          </li>
          <li className={activeTab === 'Scoreboards' ? 'active' : ''}>
            <Link to="/home/scoreboards" onClick={() => handleTabClick('/home/scoreboards')}>  Scoreboards </Link>
          </li>
          <li className={activeTab === 'Competitions' ? 'active' : ''}>
            <Link to="/home/competitions" onClick={() => handleTabClick('/home/competitions')}> Competition </Link>
          </li>
          <li className={activeTab === '/home/submissions' ? 'active' : ''}>
            <Link to="/home/submissions" onClick={() => handleTabClick('/home/submissions')}> Submissions </Link>
          </li>
          <li className={activeTab === '/home/translations' ? 'active' : ''}>
            <Link to="/home/translations" onClick={() => handleTabClick('/home/translations')}> Translate </Link>
          </li>
          <li className={activeTab === '/home/announcements' ? 'active' : ''}>
            <Link to="/home/announcements" onClick={() => handleTabClick('/home/announcements')}> Announcements </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li className={activeTab === '/home' ? 'active' : ''}>
            <Link to="/home" onClick={() => handleTabClick('/home')}> Home </Link>
          </li>

          <li className={activeTab === '/home/competitions' ? 'active' : ''}>
            <Link to="/home/competitions" onClick={() => handleTabClick('/home/competitions')}> Competition </Link>
          </li>

          <li className={activeTab === '/home/users' ? 'active' : ''}>
            <Link to="/home/users" onClick={() => handleTabClick('/home/users')}>  Manage Contestants </Link>
          </li>

          <li className={activeTab === '/home/problems' ? 'active' : ''}>
            <Link to="/home/problems" onClick={() => handleTabClick('/home/problems')}>Problems Management </Link>
          </li>

          <li className={activeTab === '/home/submissions' ? 'active' : ''}>
            <Link to="/home/submissions" onClick={() => handleTabClick('/home/submissions')}> Submissions Management </Link>
          </li>

          <li className={activeTab === '/home/translations' ? 'active' : ''}>
            <Link to="/home/translations" onClick={() => handleTabClick('/home/translations')}> Translate </Link>
          </li>
          <li className={activeTab === '/home/announcements' ? 'active' : ''}>
            <Link to="/home/announcements" onClick={() => handleTabClick('/home/announcements')}> Announcements </Link>
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
        <Link to="/" onClick={loggingOut}>Logout </Link>
        </div>
      </nav>
    </div>
  );
};

export default DashHeader;