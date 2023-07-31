
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'


const Login = () => {

  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
        userRef.current.focus()
    }, [])

  useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
          const { accessToken } = await login({ username, password }).unwrap()
          dispatch(setCredentials({ accessToken }))
          setUsername('')
          setPassword('')
          navigate('/home')
      } catch (err) {
          if (!err.status) {
              setErrMsg('No Server Response');
          } else if (err.status === 400) {
              setErrMsg('Missing Username or Password');
          } else if (err.status === 401) {
              setErrMsg('Unauthorized');
          } else {
              setErrMsg(err.data?.message);
          }
          errRef.current.focus();
      }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

  const errClass = errMsg ? "errmsg" : "offscreen"




  const content = (
    <div className="container">
            
            <div className="image-container">
               
            </div>

            <div className="form-container">

                <div className="header">
				<h1 className="animation a1">Welcome to AGS</h1>
				<h3 className="animation a2">Log in to your account</h3>
			</div>

            <div>
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                <form className="form" onSubmit={handleSubmit}>
                        <input className="form-field animation a3" value={username} type="text" placeholder="Username" id="username" ref={userRef} onChange={handleUserInput} autoComplete="off" required />
                        <input className="form-field animation a4" value={password}  type="password" placeholder="Password" id="password" onChange={handlePwdInput} required  />
                        <input className ="form-field animation a5" type="submit" name="submit" value="LOGIN" />
                      
                </form>
            </div>

                
                
            </div>
        </div>
  )
  return content;
}

export default Login