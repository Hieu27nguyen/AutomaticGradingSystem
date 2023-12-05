import { useSelector } from 'react-redux';
import { selectSubmissionById, useDeleteSubmissionMutation } from './submissionsApiSlice';
import { selectProblemById } from '../problems/problemsApiSlice'; 
import "bootstrap-icons/font/bootstrap-icons.css";
import '../../style/SubmissionForm.css';
import useAuth from '../../hooks/useAuth';

const Submission = ({ submissionId, isChecked = false, setIsChecked }) => {
    const submission = useSelector(state => selectSubmissionById(state, submissionId));
    const problem = useSelector(state => selectProblemById(state, submission.problem)); 
    const [deleteSubmission] = useDeleteSubmissionMutation();
    const { roles, username } = useAuth();
    const isJudge = roles.includes('JUDGE');

    if (submission) {
        const handleDelete = async () => {
            await deleteSubmission({ id: submissionId });
        };

        const handleCheckBox = () => {
            setIsChecked(!isChecked);
        };

        if (isJudge || submission.user === username) {
            return (
                <div className='submission'>
                    {isJudge && (
                        <div className='submission-checkbox'>
                            <input type='checkbox' checked={isChecked} onChange={handleCheckBox}></input>
                        </div>
                    )}
                    <div className={`submission-card ${isChecked ? 'highlight' : ''}`}>
                        <div className='submission-info'>
                            <div className='info-item'>
                                <p className='ProblemID'>{problem.name}</p>
                            </div>
                            <div className='info-item'>
                                <p className='contestantUser'>{submission.user}</p>
                            </div>
                            <div className='info-item'>
                                <p className='status'>{submission.status}</p>
                            </div>
                            <div className='info-item'>
                                <p className='time'>{new Date (submission.timeSubmitted).toUTCString()}</p>
                            </div>
                        </div>
                        {isJudge && (
                            <div className='submission-action'>
                                <button className='delete-button' onClick={handleDelete}><i className="bi bi-trash3"></i></button>
                            </div>
                        )}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    } else {
        return null;
    }
};

export default Submission;

