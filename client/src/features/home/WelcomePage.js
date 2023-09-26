import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/WelcomePage.css'


const Welcome = () => {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/login');  // This assumes that your login route path is '/login'
    };

    return (
        <div className="welcome-background">            
            <div className="welcome-container">
                <h1 className="welcome-header">Welcome to AGS</h1>
                <button className="signin-button" onClick={handleSignInClick}>
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default Welcome;