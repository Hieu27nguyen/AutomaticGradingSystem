import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({ userId }) => {
   
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    const userRolesString = user.roles.toString().toLowerCase().replaceAll(',', ', ');
    

    // Check if userRolesString contains "contestant"
    const hasContestantRole = userRolesString.includes('contestant');

    if (hasContestantRole) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                </td>
            </tr>
        )
    } else {
        return null;
    }
}

export default User;
