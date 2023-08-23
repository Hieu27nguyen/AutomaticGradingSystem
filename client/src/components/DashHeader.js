import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import UsersList from '../features/users/UserList';
import ProblemsList from '../features/problems/ProblemsList';

const DashHeader = ({ activeTab, handleTabClick }) => {
    // const [sendLogout, {
    //     isLoading,
    //     isSuccess,
    //     isError,
    //     error
    // }] = useSendLogoutMutation();

    const { username, userRoles } = useAuth();
    const navigate = useNavigate();

    return (
        <nav>
            <ul>
                <li className={activeTab === 'Home' ? 'active' : ''}>
                    <button onClick={() => handleTabClick('Home')}>Home</button>
                </li>
                <li className={activeTab === 'Problems' ? 'active' : ''}>
                    <button onClick={() => handleTabClick('Problems')}>Problems</button>
                </li>
                <li className={activeTab === 'Scoreboards' ? 'active' : ''}>
                    <button onClick={() => handleTabClick('Scoreboards')}>Scoreboards</button>
                </li>
                <li className={activeTab === 'Competitions' ? 'active' : ''}>
                    <button onClick={() => handleTabClick('Competitions')}>Competitions</button>
                </li>
            </ul>
        </nav>
    );
};

export default DashHeader;