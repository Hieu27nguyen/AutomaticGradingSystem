import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import { useDeleteUserMutation } from './usersApiSlice'


const User = ({ userId }) => {
   
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    const userRolesString = user.roles.toString().toLowerCase().replaceAll(',', ', ');
    
    // Check if userRolesString contains "contestant"
    const hasContestantRole = userRolesString.includes('contestant');

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: deleerror
    }] = useDeleteUserMutation()

    const handleDelete = async () => {
        await deleteUser({ id: userId })
    }

    const handleEdit = () => {

    };

   
   
    if (hasContestantRole) {
        const handleEdit = () => navigate(`/users/${userId}`)

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <div className='user-card'>
                
                <div className='user-info'>
                    
                    <p className='username'>{user.username}</p>
                    <p className='roles'>{userRolesString}</p>
                </div>
                <div className='user-action'>
                    <button onClick={handleEdit}><i class="bi bi-pencil-fill"></i></button>
                    <button onClick={handleDelete}><i class="bi bi-trash3"></i></button>
                </div>
               
            </div>
        )
    } else {
        return null;
    }
}

export default User;
