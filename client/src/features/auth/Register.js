import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [confirmpass, setConfirmPass] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="container">
            <div className="image-container">
            </div>
            <div className="form-container">

                <div className="header">
                    <h1 class="animation a1">Let's get you started!</h1>
				    <h3 class="animation a2">Sign up for an account</h3>
                </div>
                <div>
                <form className="form" onSubmit={handleSubmit}>
                   
                     
                        <input class="form-field animation a3" value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
                        <input class="form-field animation a3" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email" />
                        <input class="form-field animation a3" value={username} name="username" onChange={(e) => setUserName(e.target.value)} id="username" placeholder="Username" />
                        <input class="form-field animation a4" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" id="password" name="password" />
                        <input class="form-field animation a5" value={confirmpass} onChange={(e) => setConfirmPass(e.target.value)} type="password" placeholder="Confirm Password" id="password" name="password" />
                    
                        <input class ="form-field animation a5" type="submit" name="submit" value="REGISTER" />
                        <p className="animation a5" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</p>
                </form>
                </div>
              
            </div>
        </div>
    )
}
export default Register