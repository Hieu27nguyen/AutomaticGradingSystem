import { useAddNewSubmissionMutation } from "./submissionsApiSlice";
import { useGetProblemsQuery } from "../problems/problemsApiSlice";
import { useState, useRef, useEffect  } from "react";
import '../../style/SubmissionForm.css';

const NewSubmission = () => {
    const [userId, setUserId] = useState('');
    const [userName, setUsername] = useState('');
    const [problemId, setProblemId] = useState('');
    const [submissionCode, setSubmissionCode] = useState('');
    const [languageId, setLanguageId] = useState(0);
    const [problemsData, setProblemsData] = useState({ ids: [], entities: {} });
    const submissionRef = useRef();

    const [addNewSubmission] = useAddNewSubmissionMutation();
    const { data: initialProblemsData } = useGetProblemsQuery();

    useEffect(() => {
        if (initialProblemsData) {
            setProblemsData(initialProblemsData);
        }
    }, [initialProblemsData]);

    const onSaveSubmissionManual = () => {
    }
    const onSaveSubmission = async (e) => {
        e.preventDefault();

        const newSubmissionData = {
            _id: userId,
            user: userName,
            problem: problemId,
            code: submissionCode,
            language_id: languageId,
        };

        try {
            const response = await addNewSubmission(newSubmissionData);

            if (response.data) {
                alert("Submission added successfully");
                // Clear form fields after successful submission
                setUserId('');
                setUsername('');
                setProblemId('');
                setSubmissionCode('');
                setLanguageId(0);
            } else {
                console.error("Some error occurred");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="form-body">
            <div className="upload">
                <h2>UPLOAD CODE FILE</h2>
                <form onSubmit={onSaveSubmission}>
                    <input type="file" name="problems" />
                    <input type="submit" value="Submit" />
                </form>
            </div>

            <div className="manual">
                <h2>ADD A SUBMISSION</h2>
                <form className="submission-form" onSubmit={onSaveSubmissionManual}>
                    <label htmlFor="userId">Contestant ID:</label>
                    <input
                        type="number"
                        id="userId"
                        ref={submissionRef}
                        autoComplete="off"
                        onChange={(e) => setUserId(e.target.value)}
                        value={userId}
                        required
                    />

                    <label htmlFor="userName">Contestant Username:</label>
                    <input
                        type="text"
                        id="userName"
                        ref={submissionRef}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        value={userName}
                        required
                    />

                    <label htmlFor="problemId">Problem ID:</label>
                    <select
                        id="problemId"
                        value={problemId}
                        onChange={(e) => setProblemId(e.target.value)}
                        required
                    >
                        <option value="">Select a Problem</option>
                        {problemsData.ids.map((id) => (
                            <option key={id} value={id}>
                                {`${id} - ${problemsData.entities[id]?.name}`}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="submissionCode">Code:</label>
                    <textarea
                        className="submissionCode-label"
                        id="submissionCode"
                        ref={submissionRef}
                        autoComplete="off"
                        onChange={(e) => setSubmissionCode(e.target.value)}
                        value={submissionCode}
                        required
                    ></textarea>

                    <label htmlFor="languageId">Language ID:</label>
                    <input
                        type="number"
                        id="languageId"
                        ref={submissionRef}
                        autoComplete="off"
                        onChange={(e) => setLanguageId(e.target.value)}
                        value={languageId}
                        required
                    />
                    <button className="submission-button">Confirm</button>
                </form>
            </div>
        </div>
    )
}
export default NewSubmission;