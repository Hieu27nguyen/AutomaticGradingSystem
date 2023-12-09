import { useState, useEffect, useRef } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import "../../style/UserForm.css"


const USER_REGEX = /^[A-z][A-z0-9-_]{3,24}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{3,24}$/

const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('')
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
   

    const [roles, setRoles] = useState(["CONTESTANT"])
   

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
        setValidConfirmPassword(password === confirmPassword)
    }, [password, confirmPassword])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, confirmPassword])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/home/users')
        }
    }, [isSuccess, navigate])

    const goBack = (e) => {
        navigate("/home/users");
    }

    const canSave = [validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles })
        }
    }

    const errClass = (isError ) ? "errmsg" : "offscreen";
    const errContent = (error?.data?.message) ?? '' ; 


    const content = (
        <> 
             <button onClick={goBack} class="go-back-announcements"> <i class="bi bi-arrow-left"></i></button>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 id="add-contestant-h1">Add Contestant</h1>

            <form className="register-form" onSubmit={onSaveUserClicked}>
                <label htmlFor="username">
                    Username:
                    <i className={`bi bi-check-lg ${validUsername ? "valid" : "hide"}`}></i>
                    <i className={`bi bi-x-circle-fill ${validUsername || !username ? "hide" : "invalid"}`}></i>
                </label>
                <input
                    className="username-label"
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                    aria-invalid={validUsername ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && username && !validUsername ? "instructions" : "offscreen"}>
                <i className="bi bi-exclamation-square-fill" style={{ color: 'red', fontSize: '12px', marginRight: '10px' }} ></i>
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>


                <label htmlFor="password">
                    Password:
                    <i className={`bi bi-check-lg ${validPassword ? "valid" : "hide"}`} />
                    <i className={`bi bi-x-circle-fill ${validPassword || !password ? "hide" : "invalid"}`} />
                </label>
                <input
                    className="password-label"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
                <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                <i className="bi bi-exclamation-square-fill" style={{ color: 'red', fontSize: '12px', marginRight: '10px' }} ></i>
                    3 to 24 characters.<br>
                    </br>
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>


                <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <i className={`bi bi-check-lg ${validConfirmPassword && confirmPassword ? "valid" : "hide"}`} />
                    <i className={`bi bi-x-circle-fill ${validConfirmPassword || !confirmPassword ? "hide" : "invalid"}`} />
                </label>
                <input
                    className="confirm-password-label"
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                    aria-invalid={validConfirmPassword ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setConfirmPasswordFocus(true)}
                    onBlur={() => setConfirmPasswordFocus(false)}
                />
                <p id="confirmnote" className={confirmPasswordFocus && !validConfirmPassword ? "instructions" : "offscreen"}>
                <i className="bi bi-exclamation-square-fill" style={{ color: 'red', fontSize: '12px', marginRight: '10px' }} ></i>
                          Must match the first password input field.
                </p>
                
                <p className={errClass}>{errContent}</p>

                <button className="submit-button" disabled={!validUsername || !validPassword || !validConfirmPassword ? true : false}>Confirm</button>
            </form>

        </>
    )

    return content
}
export default NewUserForm