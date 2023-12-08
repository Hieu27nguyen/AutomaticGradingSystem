import { useAddNewSubmissionMutation, useGetSubmissionLanguagesQuery } from "./submissionsApiSlice";
import { useGetProblemsQuery } from "../problems/problemsApiSlice";
import { useState, useEffect  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import '../../style/SubmissionForm.css';

const NewSubmission = () => {
    const chosenProblemID = useParams().problemID;
    
    const { username } = useAuth();
    const [problemId, setProblemId] = useState(chosenProblemID ? chosenProblemID : '');
    const [submissionCode, setSubmissionCode] = useState('');
    const [languageId, setLanguageId] = useState(62);
    const [problemsData, setProblemsData] = useState({ ids: [], entities: {} });
    const [submissionLanguages, setSubmissionLanguages] = useState([]);
    const navigate = useNavigate();

    const [addNewSubmission] = useAddNewSubmissionMutation();
    const { data: initialProblemsData } = useGetProblemsQuery();
    const { data: initialSubmissionLanguages } = useGetSubmissionLanguagesQuery();
    useEffect(() => {
        if (initialProblemsData) {
            setProblemsData(initialProblemsData);
        }
    }, [initialProblemsData]);

    useEffect(() => {
        if (initialSubmissionLanguages) {
            setSubmissionLanguages(initialSubmissionLanguages.entities);
        }
    }, [initialSubmissionLanguages]);



    const onSaveSubmission = async (e) => {
        e.preventDefault();
        const newSubmissionData = {
            user: username,
            problem: problemId,
            code: submissionCode,
            language_id: languageId,
        };

        try {
            const response = await addNewSubmission(newSubmissionData);

            if (response.data) {
                navigate('/home/submissions/');
                alert("Submission added successfully");
                // Clear form fields after successful submission
                setProblemId('');
                setSubmissionCode('');
                setLanguageId(0);
            } else {
                navigate('/home/submissions/');
                alert("Submission added unsuccessfully.\n" +
                    "The competition has ended or not yet started!.");
                console.error("Some error occurred");
                console.log(response);
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
                <form className="submission-form" onSubmit={onSaveSubmission}>
                    {/* <label htmlFor="userName">Contestant Username:</label> */}
                    {/* <input type="text" id="userName" value={username} readOnly /> */}

                    <label htmlFor="problemId">Problem Name:</label>
                    <select
                        id="problemId"
                        value={problemId}
                        onChange={(e) => setProblemId(e.target.value)}
                        required
                    >
                        <option value="">Select a Problem</option>
                        {problemsData.ids.map((id) => (
                            <option key={id} value={id}>
                                {`${problemsData.entities[id]?.name}`}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="submissionCode">Code:</label>
                    <textarea
                        className="submissionCode-label"
                        id="submissionCode"
                        value={submissionCode}
                        onChange={(e) => setSubmissionCode(e.target.value)}
                        required
                    ></textarea>

                    <label htmlFor="languageId">Language:</label>
                    {/* <input
                        type="number"
                        id="languageId"
                        value={languageId}
                        onChange={(e) => setLanguageId(e.target.value)}
                        required
                    /> */}
                    {/* Only display language list when fetched the supported list */}
                    {submissionLanguages && <select id="languageId" value={languageId} onChange={(e) => {setLanguageId(e.target.value)}} >
                        {Object.entries(submissionLanguages).map(language => {
                            return <option key={language[1].id} value={language[1].id}>{language[1].name}</option>
                        })
                        }
                    </select>}
                    <button className="submission-button" type="submit">Confirm</button>
                </form>
            </div>
        </div>
    )
}
export default NewSubmission;