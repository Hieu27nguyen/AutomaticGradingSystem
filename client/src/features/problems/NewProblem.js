import { useAddNewProblemMutation } from "./problemsApiSlice"
import { useState, useRef, useEffect } from "react"
import '../../style/ProblemForm.css'


const NewProblem = () => {

    const [problemName, setProblemName] = useState('')
    const [problemDescription, setProblemDescription] = useState('')
    const [problemTest, setProblemTest] = useState('')
    const problemRef = useRef();
   

    const onSaveProblemManual = () => {

    }

    const fileInput = new FormData();
    const onSaveProblemUpload = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            const fileInput = e.target.elements["problems"].files[0];
            console.log('File Name:', fileInput.name);
            console.log('File Size:', fileInput.size);
            console.log('File Type:', fileInput.type);
            formData.append("problem", fileInput);
            try {
                const response = await fetch('/problems' , {
                    method: "POST",
                    body: formData
                });

                const parsedResponse = await response.json();
                if (response.ok) {
                    alert("File uploaded");
                } else {
                    console.error("Some error occur")
                }
            }
            catch (env) {
                console.error(e.message)
            }

    }

    return (
        <div className="form-body">
        <div className="upload">
            <h2>UPLOAD PROBLEMS</h2>
            <form onSubmit={onSaveProblemUpload}>
                <input type="file" name="problems"/> 
                <input type="submit" value="Submit" /> 
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
    
                <label htmlFor="problemTest">Test:</label>
                <textarea
                    className="problemTest-label"
                    id="problemTest"
                    ref={problemRef}
                    autoComplete="off"
                    onChange={(e) => setProblemTest(e.target.value)}
                    value={problemTest}
                    required
                ></textarea>
                <button className="problem-button">Confirm</button>
            </form>
        </div>
    </div>
    
    )
}

export default NewProblem