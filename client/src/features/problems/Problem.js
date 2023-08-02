import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectProblemById } from './problemsApiSlice'

//temporary server: npx json-server -p 3500 -w temp_data\db.json

const Problem = ({ problemID }) => {
    const problem = useSelector(state => selectProblemById(state, problemID))
    console.log("Inside problem", problemID, problem);
    const navigate = useNavigate()
    
    if (problem) {
        // const handleEdit = () => navigate(`/dash/users/${problemID}`)

        // const userRolesString = user.roles.toString().replaceAll(',', ', ')

        return (
            <tr className="table__row problem">
                <td className={`table__cell `}>{problem.name}</td>
                <td className={`table__cell `}>{problem.description}</td>
                {/* <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td> */}
            </tr>
            
        )

    } else 
    return null
}
export default Problem