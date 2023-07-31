import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Contestant = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Home':
        return <h2>User profile</h2>;
      case 'Problems':
        return <h2>Lists of problems</h2>;
      case 'Scoreboard':
        return <h2>Highest scores for individual problems</h2>;
      case 'Contest Information':
        return <h2>Contest information</h2>;
      default:
        return null;
    }
  };

  // const renderProfileDropdown = () => {
  //   return (
  //     <div className="profile-dropdown">
  //       <button onClick={() => handleTabClick('Profile')}>Profile</button>
  //       <div className="dropdown-content">
  //         <button>Manage Profile Info</button>
  //         <button>Logout</button>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="home-page">
      <nav>
        <ul>
          <li className={activeTab === 'Home' ? 'active' : ''}>
            <button onClick={() => handleTabClick('Home')}>Home</button>
          </li>
          <li className={activeTab === 'Problems' ? 'active' : ''}>
            <button onClick={() => handleTabClick('Problems')}>Problems</button>
          </li>
          <li className={activeTab === 'Scoreboard' ? 'active' : ''}>
            <button onClick={() => handleTabClick('Scoreboard')}>Scoreboard</button>
          </li>
          <li className={activeTab === 'Contest Information' ? 'active' : ''}>
            <button onClick={() => handleTabClick('Contest Information')}>Contest Information</button>
          </li>
        </ul>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Contestant;
