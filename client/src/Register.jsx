import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <div className="image-container">
            <img
          src="https://static.vecteezy.com/system/resources/previews/006/697/635/original/seo-web-development-software-coding-and-programming-on-application-in-laptop-computer-devices-with-script-language-testing-and-graphical-icons-vector.jpg"
          alt="Coding and Programming"
        />
            </div>
            <div className="form-container">
                <h1>Register</h1>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="label-input-container">
                        <label htmlFor="name">Full name:</label>
                        <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
                    </div>
                    <div className="label-input-container">
                        <label htmlFor="email">Email:</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                    </div>
                    <div className="label-input-container">
                        <label htmlFor="password">Password:</label>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
            </div>
        </div>
    )
}
