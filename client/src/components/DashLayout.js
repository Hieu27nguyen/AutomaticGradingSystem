
import DashHeader from './DashHeader';
import DashFooter from './DashFooter';
import { Outlet } from 'react-router-dom'
import '../style/WelcomePage.css'
const DashLayout = ({ activeTab, handleTabClick, renderTabContent, loggingOut }) => {
  return (
  <>
   <DashHeader  />
   <div className="dash-container">
    <Outlet />
    </div>
    <DashFooter/>
  </>
     

  );
};

export default DashLayout;
