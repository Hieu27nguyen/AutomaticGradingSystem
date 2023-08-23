import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashFooter = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/');
    };
    return (
        <nav>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default DashFooter;