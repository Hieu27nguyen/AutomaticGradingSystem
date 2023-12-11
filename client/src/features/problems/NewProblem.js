import { useAddNewProblemMutation } from "./problemsApiSlice"
import { useState, useRef, useEffect } from "react"
import '../../style/ProblemForm.css'

import { useNavigate } from "react-router-dom"


const NewProblem = () => {

    const [problemName, setProblemName] = useState('')
    const [problemDescription, setProblemDescription] = useState('')
    const [problemTest, setProblemTest] = useState('')
    const [judgeProgram, setJudgeProgram] = useState('')
    const problemRef = useRef();



    const [storeTestCase, setStoreTestCase] = useState([]);
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')

    const [isSwitchChecked, setIsSwitchChecked] = useState(false);




    let reader;
    let inputReader;
    const [addNewProblem, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewProblemMutation()

    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            setProblemName('')
            setProblemDescription('')
            setProblemTest('')
            setJudgeProgram('')
            setStoreTestCase([])
            navigate('/home/problems')
        }
    }, [isSuccess], navigate)
    const handleFileChosen = (file) => {
        reader = new FileReader();
        reader.onloadend = handleFileRead;
        reader.readAsText(file);
    }
    const handleFileRead = (e) => {
        try {
        const content = JSON.parse(reader.result);
        setProblemName(content.name);
        setProblemDescription(content.description);

        //parse test cases
        if (Array.isArray(content.test)) {
            setStoreTestCase([...storeTestCase, ...content.test]);
        } else {
            setStoreTestCase([...storeTestCase, content.test]);
        }


        if (content.judgeProgram) {
            setIsSwitchChecked(!isSwitchChecked);
            setJudgeProgram(content.judgeProgram);
            
        }
    } catch (error) {
        console.error("Error parsing JSON file", error);
        alert('File is not valid. Please make sure to use JSON file and the format is correct!')
    }
    }
    const handleSwitchChange = () => {
        setIsSwitchChecked(!isSwitchChecked);
    };
    const uploadProblem = async (e) => {
        e.preventDefault();
        if (!isLoading) {
            const problemData = {
                name: problemName,
                description: problemDescription,
                test: problemTest,
            };
            if (judgeProgram) {
                problemData.judgeProgram = judgeProgram;
            }

            await addNewProblem(problemData);
        }

    };
    const handleTestCaseFile = (file) => {
        inputReader = new FileReader();
        inputReader.onloadend = handleInputRead;
        inputReader.readAsText(file);
    }

    const handleInputRead = (e) => {
        try {
            const content = JSON.parse(inputReader.result);
            console.log(content);
            if (Array.isArray(content)) {
                setStoreTestCase([...storeTestCase, ...content]);
            } else {
                setStoreTestCase([...storeTestCase, content]);
            }

        } catch (error) {
            console.error("Error parsing JSON file", error);
            alert('File is not valid. Please make sure to use JSON file and the format is correct!')

        }
    }
    const handleAddTestCase = () => {
        if (input.trim() !== '' && output.trim() !== '') {
            setStoreTestCase([...storeTestCase, { input, output }]);
            setInput('');
            setOutput('');
        }
    };
    const onSaveProblemManual = async (e) => {
        e.preventDefault();
        if (!isLoading) {
            const problemData = {
                name: problemName,
                description: problemDescription,
                test: storeTestCase,
            };
            if (judgeProgram) {
                problemData.judgeProgram = judgeProgram;
            }
       
            await addNewProblem(problemData);
        }
    };
    const errClass = (isError ) ? "errmsg" : "offscreen";
    const errContent = (error?.data?.message) ?? '' ; 
    return (
        <div className="form-body">
            <div className="upload">
                <h2>UPLOAD PROBLEMS</h2>
                <form >
                    <input type="file" name="problems" onChange={e => handleFileChosen(e.target.files[0])} />
                    <input type="submit" value="Submit" onClick={uploadProblem} />
                </form>
            </div>

            <div className="manual">
                <h2>ADD A PROBLEM</h2>
                <form className="problem-form" onSubmit={onSaveProblemManual}>
                    <label htmlFor="problemname">Name:</label>
                    <textarea
                        className="problemname-label"
                        id="problemname"
                        ref={problemRef}
                        autoComplete="off"
                        onChange={(e) => setProblemName(e.target.value)}
                        value={problemName}
                        required
                    ></textarea>

                    <label htmlFor="problemDescription">Description:</label>
                    <textarea
                        className="problemDescription-label"
                        id="problemDescription"
                        ref={problemRef}
                        autoComplete="off"
                        onChange={(e) => setProblemDescription(e.target.value)}
                        value={problemDescription}
                        required
                    ></textarea>

                    {/* <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" onChange={handleSwitchChange} id="flexSwitchCheckDefault" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{ display: 'inline' }}>  Judge Program</label>

                        <input className="judgeProgram" type="text" placeholder="Judge Program Details" value={judgeProgram} onChange={(e) => setJudgeProgram(e.target.value)} disabled={!isSwitchChecked} />

                    </div> */}

                    <div className="input-cases">
                        <label htmlFor="problemTest">Input Test Cases:</label>
                        <div className="test-case-input">
                            <div className="input-output-pair">
                                <input
                                    type="text"
                                    className="input-label"
                                    id="input"
                                    autoComplete="off"
                                    onChange={(e) => setInput(e.target.value)}
                                    value={input}
                                    placeholder="Enter an input"
                                />
                                <input
                                    type="text"
                                    className="output-label"
                                    id="output"
                                    autoComplete="off"
                                    onChange={(e) => setOutput(e.target.value)}
                                    value={output}
                                    placeholder="Enter an output"
                                />
                                <button type="button" onClick={handleAddTestCase}>Add</button>
                            </div>
                        </div>
                        {/* Display added test cases */}
                        {storeTestCase.length > 0 && (
                           <table className="testCases">
                           <thead>
                               <tr>
                                   <th>Test Case</th>
                                   <th>Input</th>
                                   <th>Output</th>
                               </tr>
                           </thead>
                           <tbody>
                               {storeTestCase.map((testCase, index) => (
                                   <tr key={index}>
                                       <td>{index + 1}</td>
                                       <td>{testCase.input}</td>
                                       <td>{testCase.output}</td>
                                   </tr>
                               ))}
                           </tbody>
                       </table>
                        )}

                        <label htmlFor="fileInput">Upload Test Case File:</label>
                        <form >
                            <input type="file" id="fileInput" name="problems" onChange={e => handleTestCaseFile(e.target.files[0])} />
                        </form>
                        <p className={errClass}>{errContent}</p>
                    </div>

                    <button className="problem-button">Confirm</button>
                </form>
            </div>
        </div>

    )
}

export default NewProblem