// DashLayout.js
import React from 'react';
import DashHeader from './DashHeader';
import DashFooter from './DashFooter';

const DashLayout = ({ activeTab, handleTabClick, renderTabContent, loggingOut }) => {
  return (
    <div className="home-page">
      <DashHeader activeTab={activeTab} handleTabClick={handleTabClick} />
      <div className="tab-content">
        {renderTabContent()}
      </div>
      <DashFooter loggingOut={loggingOut} />
    </div>
  );
};

export default DashLayout;
