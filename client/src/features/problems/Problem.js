
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProblemById, useDeleteProblemMutation } from './problemsApiSlice'
import "../../style/ProblemList.css"


const Problem = ({ problemId, isChecked= false, setIsChecked }) => {

    const problem = useSelector(state => selectProblemById(state, problemId))
    const navigate = useNavigate()
    const [deleteProlem] = useDeleteProblemMutation();
    
    if (problem) {
        
        const handleEdit = () => navigate(`/home/problems/${problemId}`)
        

        const handleDelete = async () => {
            await deleteProlem({id: problemId})
        }
        const handleCheckBox = () => {
            setIsChecked(!isChecked)
        }
        return (

            <div className='problem'>
            <div className='problem-checkbox'>
                <input type='checkbox' checked={isChecked} onChange={handleCheckBox}></input>
            </div>
            <div className={`problem-card ${isChecked ? 'highlight' : ''}`}>
                <div className='problem-info'>
                    <p className='problemName'>{problem.name}</p>
                    <p className='description'>{problem.description}</p>
                </div>
                
                <div className='problem-action'>
                    <button className='edit-button' onClick={handleEdit}><i className="bi bi-pencil-fill"></i></button>
                    <button className='delete-button' onClick={handleDelete}><i className="bi bi-trash3"></i></button>
                </div>

            </div>
        </div>
         
            
        )

    } else 
    return null
}
export default Problem