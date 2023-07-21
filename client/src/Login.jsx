import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="container">
            
            <div className="image-container">
               
            </div>

            <div className="form-container">

                <div class="header">
				<h1 class="animation a1">Welcome to AGS</h1>
				<h3 class="animation a2">Log in to your account</h3>
			</div>

            <div>
                <form className="form" onSubmit={handleSubmit}>
                        <input class="form-field animation a3" value={email} onChange={(e) => setEmail(e.target.value)}  type="text" placeholder="Username" id="username" name="username" />
                        <input class="form-field animation a4" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" id="password" name="password" />
                        <div id="message"></div>
                        <input class ="form-field animation a5" type="submit" name="submit" value="LOGIN" />
                        <p className="animation a5" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</p>
                </form>
            </div>

                
                
            </div>
        </div>
    )
}
