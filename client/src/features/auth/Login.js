
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';

import usePersist from '../../hooks/usePersist';
import useTitle from '../../hooks/useTitle';
import useAuth from '../../hooks/useAuth';
import contestImage from "../../img/Photo_Contest_2022.jpg";

const Login = () => {
    useTitle('Automatic Grading System')
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [persist, setPersist] = usePersist();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const existingAuth = useAuth();

    const [login, { isLoading }] = useLoginMutation()
    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const goBackToHomePage = () => {    
        navigate('/home');
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            goBackToHomePage();
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Incorrect Username or Password. Please try again or contact your contest\'s admin.');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const errVisibility = errMsg === '' ? "hidden" : "visible";

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    let animationDelay = 2;
    let getAnimationDelay = () => {
        animationDelay += 0.1;
        return animationDelay + "s";
    }

    const content = (
        <div className="container">

            <div className="image-container" style={{ backgroundImage: `url(${contestImage})`, backgroundSize: 'cover' }}>
            </div>

            {/* User already logged in */}
            {existingAuth.username !== undefined ?
                <div>
                    <div className="form-container" style={{display:'flex'}}>
                        <div className="header">
                            <h1 className="animation" style={{ animationDelay: getAnimationDelay() }}>Welcome to AGS</h1>
                            <h3 className="animation" style={{ animationDelay: getAnimationDelay() }}>You have already logged in, {existingAuth.username}</h3>
                        </div>
                        <input className="form-field animation" type="submit" name="submit"
                            value="Click here to go to the homepage" ref={userRef} 
                            style={{
                                animationDelay: getAnimationDelay()
                            }} 
                            onClick= {goBackToHomePage}
                        />
                    </div>
                </div>
                :
                /*New User Logging in */
                <div className="form-container">
                    <div className="header">
                        <h1 className="animation" style={{ animationDelay: getAnimationDelay() }}>Welcome to AGS</h1>
                        <h3 className="animation" style={{ animationDelay: getAnimationDelay() }}>Log in to your account</h3>
                    </div>

                    <div>
                        <form className="form" onSubmit={handleSubmit}>

                            <input className="form-field animation"
                                value={username} type="text" placeholder="Username" id="username" ref={userRef}
                                onChange={handleUserInput} autoComplete="off" required
                                style={{ animationDelay: getAnimationDelay() }}
                            />

                            <input className="form-field animation"
                                value={password} type="password" placeholder="Password" id="password"
                                onChange={handlePwdInput} required
                                style={{ animationDelay: getAnimationDelay() }}
                            />
                            <label htmlFor="persist" className="animation" style={{ display: "flex", animationDelay: getAnimationDelay() }}>
                                <input
                                    type="checkbox"
                                    className="animation"
                                    id="persist"
                                    onChange={handleToggle}
                                    checked={persist}
                                />
                                <h5 className="animation">Keep logging in</h5>
                            </label>

                            <p ref={errRef} className="errMsg" aria-live="assertive"
                                style={{ visibility: errVisibility }}>
                                {errMsg}
                            </p>
                            <input className="form-field animation" type="submit" name="submit" value="LOGIN" style={{ animationDelay: getAnimationDelay() }} />

                        </form>
                    </div>
                </div>
            }
        </div>
    )
    return content;
}

export default Login