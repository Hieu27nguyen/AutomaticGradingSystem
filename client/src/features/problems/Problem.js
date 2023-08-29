
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProblemById } from './problemsApiSlice'



const Problem = ({ problemId }) => {

    const problem = useSelector(state => selectProblemById(state, problemId))
    const navigate = useNavigate()

    
    if (problem) {
        const handleEdit = () => navigate(`/dash/users/${problemId}`)
        const cellStatus = problem.active ? '' : 'table__cell--inactive'

        return (
            
            <tr className="table__row problem">
                <td className={`table__cell ${cellStatus} `}>{problem.name}</td>
                <td className={`table__cell ${cellStatus} `}>{problem.description}</td>
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

    } else 
    return null
}
export default Problem