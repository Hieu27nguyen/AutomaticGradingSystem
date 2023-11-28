import { useState, useEffect } from "react"
import { useUpdateProblemMutation } from "./problemsApiSlice"
import { useNavigate } from "react-router-dom"

import '../../style/EditProblem.css'

const EditProblemForm = ({problem}) => {

  const [updateProblem, {
      
    isSuccess,
    isError,
    error
}] = useUpdateProblemMutation()


  const navigate = useNavigate()
  const [problemName, setproblemName] = useState(problem.name);
  const [description,setDescription] = useState(problem.description);
  const [test, setTest] = useState(problem.test || []);

  useEffect(() => {
    if (isSuccess ) {
        setproblemName('')
        setDescription('')
        setTest([]);
        navigate('/home/problems')
    }
  }, [isSuccess, navigate])


  const errClass = (isError ) ? "errmsg" : "offscreen"
  const errContent = (error?.data?.message) ?? ''

  const onTestInputChange = (index, value) => {
    setTest((prevTest) => prevTest.map((item, i) => (i === index ? { ...item, input: value } : item))
    );
  };
  
  const onTestOutputChange = (index, value) => {
    setTest((prevTest) => prevTest.map((item, i) => (i === index ? { ...item, output: value } : item))
    );
  };


  const onSaveProblemClick = async (e) => {
    e.preventDefault();
    await updateProblem({id:problem.id,name:problemName,description:description,test:test});
  }



  const content = (
    <>
        <p className={errClass}>{errContent}</p>

        <form className="edit-problem-form" onSubmit={e => e.preventDefault()}>
            <div className="form__title-row">
                <h2>Edit Problem</h2>
               
            </div>
            <label className="form__label" htmlFor="problemName">
                Problem Name: </label>
            <textarea
                className={`form__input`}
                id="problemName"
                name="problemName"
                type="text"
                autoComplete="off"
                value={problemName}
                required                
                onChange={(e)=> {setproblemName(e.target.value)}}
            />

            <label className="form__label" htmlFor="description">
                Description: </label>
            <textarea
                className={`form__input-description`}
                id="description"
                name="description"
                type="text"
                autoComplete="off"
                required
                value={description}
                onChange={(e) => {setDescription(e.target.value)}}
            />
            
            <div className="form__label">Test Cases:</div>
        {test && Array.isArray(test) && test.length > 0 && (
          <ul>
            {test.map((testCase, index) => (
              <li key={index}>
                <div>
                  <label>Input:</label>
                  <input
                    className="test_info"
                    type="text"
                    value={testCase.input}
                    onChange={(e) => onTestInputChange(index, e.target.value)}
                  />
                </div>
                <div>
                  <label>Output:</label>
                  <input
                    className="test_info"
                    type="text"
                    value={testCase.output}
                    onChange={(e) => onTestOutputChange(index, e.target.value)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}

           
             <div className="form__action-buttons">
                   <button
                        className="icon-button"
                        title="Save"
                        onClick={onSaveProblemClick}
                    > 
                       Confirm
                    </button>
                </div>
        </form>
    </>
)

return content
}

export default EditProblemForm