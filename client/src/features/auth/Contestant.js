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

  const problemList = [
    { id: 1, name: "Problem 1", difficulty: "Easy", score: 100 },
    { id: 2, name: "Problem 2", difficulty: "Medium", score: 200 },
    { id: 3, name: "Problem 3", difficulty: "Hard", score: 300 },
    // Add more problems as needed from database
  ];

  const scoreboardData = [
    { rank: 1, name: "Alice", score: 500 },
    { rank: 2, name: "Bob", score: 400 },
    { rank: 3, name: "Charlie", score: 350 },
    // Add more scoreboard entries as needed from database
  ];
  
  const contestInformationData = {
    title: "Sample Contest",
    date: "2023-08-15",
    duration: "2 hours",
    // Add more contest information fields as needed from database
  };

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
        {activeTab === 'Home' ? (
          <div>
            <h2>User Profile</h2>
            {/* Render the user profile data */}
            <p>Name: </p>
            <p>Email: </p>
            {/* Add more profile information as needed */}
          </div>
        ) : activeTab === 'Problems' ? (
          <div>
            <h2>List of Problems</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Difficulty</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {problemList.map((problem) => (
                  <tr key={problem.id}>
                    <td>{problem.id}</td>
                    <td>{problem.name}</td>
                    <td>{problem.difficulty}</td>
                    <td>{problem.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === 'Problems' ? (
          <div>
            {/* ... (existing code) */}
          </div>
        ) : activeTab === 'Scoreboard' ? (
          <div>
            <h2>Scoreboard</h2>
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {scoreboardData.map((entry) => (
                  <tr key={entry.rank}>
                    <td>{entry.rank}</td>
                    <td>{entry.name}</td>
                    <td>{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === 'Contest Information' ? (
          <div>
            <h2>Contest Information</h2>
            <p>Title: {contestInformationData.title}</p>
            <p>Date: {contestInformationData.date}</p>
            <p>Duration: {contestInformationData.duration}</p>
            {/* Add more contest information fields as needed */}
          </div>
        ) : (
          renderTabContent()
        )}
      </div>
    </div>
  );
};

export default Contestant;
