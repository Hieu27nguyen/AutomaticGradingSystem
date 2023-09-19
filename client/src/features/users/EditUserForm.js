import { useState, useEffect } from "react"
import { useUpdateUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
//import { ROLES } from "../../config/roles"
import '../../style/UserForm.css'
const USER_REGEX = /^[A-z][A-z0-9-_]{3,24}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{3,24}$/



const EditUserForm = ({ user }) => {
    const [updateUser, {
      
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const navigate = useNavigate()
    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [online] = useState(true)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess ) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/home')
        }
    }, [isSuccess, navigate])


    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, online }) 
        } else {
            await updateUser({ id: user.id, username, roles, online })
        }
    }

   

    // const options = Object.values(ROLES).map(role => {
    //     return (
    //         <option
    //             key={role}
    //             value={role}

    //         > {role}</option >
    //     )
    // })

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) 
    } else {
        canSave = [roles.length, validUsername].every(Boolean)
    }

    const errClass = (isError ) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
   

    const errContent = (error?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="register-form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit User</h2>
                   
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-24 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />
                 <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                           Confirm
                        </button>
                    </div>
            </form>
        </>
    )

    return content
}
export default EditUserForm