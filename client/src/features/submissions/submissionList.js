import { useState } from 'react';
import { useGetSubmissionsQuery, useDeleteSubmissionMutation } from "./submissionsApiSlice";
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
    const [deleteSubmission] = useDeleteSubmissionMutation();
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
    const { roles } = useAuth();
    const isJudge = roles.includes('JUDGE');
    const isAdmin = roles.includes('ADMIN');


    const handleCheckAll = () => {
        const { ids } = submissions;
        console.log(submissions)
        const updatedCheckboxes = {};
        const areAllChecked = !isCheckedAll;

        ids?.forEach(submissionId => {
            updatedCheckboxes[submissionId] = areAllChecked;
        });
        setSelectedCheckboxes(updatedCheckboxes);
        setIsCheckedAll(!isCheckedAll);
    };

    const handleDeleteAll = () => {
        const { ids } = submissions;

        ids?.forEach(submissionId => {
            if (selectedCheckboxes[submissionId] === true) {
                deleteSubmission({ id: submissionId });
            }
        });
    };

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const { ids } = submissions;

        const tableContent = ids?.length
            ? ids.map(submissionId =>
                <Submission
                    key={submissionId}
                    submissionId={submissionId}
                    isChecked={selectedCheckboxes[submissionId] || false}
                    setIsChecked={(newState) => {
                        const updatedSelectedCheckboxes = { ...selectedCheckboxes };
                        updatedSelectedCheckboxes[submissionId] = newState;
                        setSelectedCheckboxes(updatedSelectedCheckboxes);
                    }}
                />)
            : null;

        content = (
            <div>
                <div className="header">
                    <div className="titles">
                        <h2>Submission List</h2>
                        {/* <h4>{ids.length} Total</h4> */}
                    </div>
                    {!isJudge && !isAdmin && (
                    <button className="add_button" onClick={() => navigate("/newsubmission")}><i className="bi bi-file-earmark-code-fill"></i>Add Submission</button>
                    )}
                </div>

                <div className="body">
                    {ids.length >= 0 ? (
                        <div>
                            <div className="check-and-titles">
                                {isJudge && (
                                    <div className="check-all">
                                        <input type="checkbox" aria-label="Select All Submissions" checked={isCheckedAll} onChange={handleCheckAll}></input>
                                    </div>
                                )}
                                <div className="stable-titles">
                                    <div className="submission-info">
                                        <h3 className="problem">Problem ID</h3>
                                        <h3>Contestant</h3>
                                        <h3>Status</h3>
                                        <h3>Time Submitted</h3>
                                    </div>
                                    {isJudge && (
                                        <div className='submission-action'>
                                            {/* Ignore this edit-button */}
                                            <button className={`delete-button ${selectedCheckboxes}`} onClick={handleDeleteAll} ><i className="bi bi-trash3"></i></button>
                                        </div>
                                    )}
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

