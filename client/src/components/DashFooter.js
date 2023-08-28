import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';

const DashFooter = () => {
    const navigate = useNavigate();
    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
      }] = useSendLogoutMutation();
    const handleLogout = () => {
        sendLogout();
        navigate('/');
    };
    return (
        <nav>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default DashFooter;