
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProblemById, useDeleteProblemMutation } from './problemsApiSlice'



const Problem = ({ problemId, isChecked= false, setIsChecked }) => {

    const problem = useSelector(state => selectProblemById(state, problemId))
    const navigate = useNavigate()
    const [deleteProlem] = useDeleteProblemMutation();
    
    if (problem) {
        
        const handleEdit = () => navigate(`/problems/${problemId}`)
        

        const handleDelete = async () => {
            await deleteProlem({id: problemId})
        }
        const handleCheckBox = () => {
            setIsChecked(!isChecked)
        }
        return (

            <div className='user'>
            <div className='user-checkbox'>
                <input type='checkbox' checked={isChecked} onChange={handleCheckBox}></input>
            </div>
            <div className={`user-card ${isChecked ? 'highlight' : ''}`}>
                <div className='user-info'>
                    <p className='username'>{problem.name}</p>
                    <p className='roles'>{problem.description}</p>
                </div>
                <div className='user-action'>
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