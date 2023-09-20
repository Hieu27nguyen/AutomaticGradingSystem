
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import { useDeleteUserMutation } from './usersApiSlice'
import "bootstrap-icons/font/bootstrap-icons.css";

const User = ({ userId, isChecked = false, setIsChecked }) => {

    const user = useSelector(state => selectUserById(state, userId))
    
   

    const navigate = useNavigate()
    
    
    const userRolesString = user.roles.toString().toLowerCase().replaceAll(',', ', ');

    // Check if userRolesString contains "contestant"
    const hasContestantRole = userRolesString.includes('contestant');

    const [deleteUser] = useDeleteUserMutation()

    const handleDelete = async () => {
        await deleteUser({ id: userId })
    }

    const handleEdit = () => navigate(`/users/${userId}`)

    const handleCheckBox = () => {  
        setIsChecked(!isChecked)
    }

    if (hasContestantRole) {
        return (


            <div className='user'>
                <div className='user-checkbox'>
                    <input type='checkbox' checked={isChecked} onChange={handleCheckBox}></input>
                </div>
                <div className={`user-card ${isChecked ? 'highlight' : ''}`}>
                    <div className='user-info'>
                        <p className='username'>{user.username}</p>
                        <p className='roles'>{userRolesString}</p>
                    </div>
                    <div className='user-action'>
                        <button className='edit-button' onClick={handleEdit}><i class="bi bi-pencil-fill"></i></button>
                        <button className='delete-button' onClick={handleDelete}><i class="bi bi-trash3"></i></button>
                    </div>

                </div>
            </div>

        )
    } else {
        return null;
    }
}

export default User;
