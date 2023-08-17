

import { useSelector } from 'react-redux'
import { selectAllProblems, selectProblemById } from './problemsApiSlice'



const Problem = ({ problemID }) => {
    const problem = useSelector(state => selectProblemById(state, problemID))

    if (problem) {
        return (
            <tr className="table__row problem">
                <td className={`table__cell `}>{problem.name}</td>
                <td className={`table__cell `}>{problem.description}</td>
            </tr>
            
        )

    } else 
    return null
}
export default Problem