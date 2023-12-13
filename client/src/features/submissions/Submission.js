import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSubmissionById } from './submissionsApiSlice';
import { selectProblemById } from '../problems/problemsApiSlice';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../../style/SubmissionForm.css';
import useAuth from '../../hooks/useAuth';

const useFetchSubmissionData = (submissionId) => {
    const submission = useSelector(state => selectSubmissionById(state, submissionId));
    const problemId = submission.problem;
    const problem = useSelector(state => selectProblemById(state, problemId));
    return { submission, problem };
};

const Submission = ({ submissionId }) => {
    const [submissionData, setSubmissionData] = useState(null);
    const [problemName, setProblemName] = useState(null);
    const { roles, username } = useAuth();
    const isJudge = roles.includes('JUDGE') || roles.includes('ADMIN');
    const { submission, problem } = useFetchSubmissionData(submissionId);

    useEffect(() => {
        setSubmissionData(submission);
        setProblemName(problem?.name);
    }, [submission, problem]);

    if (!submissionData) {
        return null;
    }

    if (submissionData) {

        if (isJudge || submissionData.user === username) {
            return (
                <div className='submission'>
                    <div className='submission-card'>
                        <div className='submission-info'>
                            <div className='info-item'>
                                <p className='ProblemID'>{problemName}</p>
                            </div>
                            <div className='info-item'>
                                <p className='contestantUser'>{submissionData.user}</p>
                            </div>
                            <div className='info-item'>
                                <p className='status'>{submissionData.status}</p>
                            </div>
                            <div className='info-item'>
                                <p className='time'>{new Date(submission.timeSubmitted).toUTCString()}</p>
                            </div>
                        </div>
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

