import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {selectProblemById} from './problemsApiSlice'
import EditProblemForm from './EditProblemForm'

const EditProblem = () => {
    const { id } = useParams()

    const problem = useSelector(state => selectProblemById(state, id))
    
    const content = problem ? <EditProblemForm problem={problem} /> : <p>Loading...</p>

    return content
}
export default EditProblem