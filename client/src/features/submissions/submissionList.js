import { useGetSubmissionsQuery } from "./submissionsApiSlice";
import Submission from './Submission';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import '../../style/SubmissionForm.css';

const SubmissionsList = () => {
    const {
        data: submissions,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSubmissionsQuery();
    const navigate = useNavigate();
    const { roles } = useAuth();
    const isJudge = roles.includes('JUDGE');
    const isAdmin = roles.includes('ADMIN');

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = (
            <div>
                <div className="header">
                    <div className="titles">
                        <h2>Submission List</h2>
                    </div>
                    {!isJudge && !isAdmin && (
                        <button className="add_button" onClick={() => navigate("/home/submissions/new")}><i className="bi bi-file-earmark-code-fill"></i>Add Submission</button>
                    )}
                </div>
                <p className="errmsg">{"No Submission Found!"}</p>
            </div>);
    }

    if (isSuccess) {
        const { ids } = submissions;

        const tableContent = ids?.length
            ? ids.map(submissionId =>
                <Submission
                    key={submissionId}
                    submissionId={submissionId}
                />)
            : null;

        content = (
            <div>
                <div className="header">
                    <div className="titles">
                        <h2>Submission List</h2>
                    </div>
                    {!isJudge && !isAdmin && (
                        <button className="add_button" onClick={() => navigate("/home/submissions/new")}><i className="bi bi-file-earmark-code-fill"></i>Add Submission</button>
                    )}
                </div>

                <div className="body">
                    {ids.length >= 0 ? (
                        <div>
                            <div className="check-and-titles">
                                <div className="stable-titles">
                                    <div className="submission-info">
                                        <h3 className="problem">Problem Name</h3>
                                        <h3>Contestant</h3>
                                        <h3>Status</h3>
                                        <h3>Time Submitted</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="stable-content">
                                {tableContent}
                            </div>
                        </div>
                    ) : (
                        <p className="no-contestant">No submissions found!</p>
                    )}
                </div>
            </div>
        );
    }

    return content;
};

export default SubmissionsList;

