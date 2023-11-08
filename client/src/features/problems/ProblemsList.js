import { useGetProblemsQuery, useDeleteUserMutation, useDeleteProblemMutation } from "./problemsApiSlice"
import Problem from './Problem'
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProblemsList = () => {
    
    const {
        data: problems,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProblemsQuery()
    const navigate = useNavigate();
    const [deleteProlem] = useDeleteProblemMutation();
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

    const handleCheckAll = () => {
        const { ids } = problems;
        console.log(problems)
        const updatedCheckboxes = {};
        const areAllChecked = !isCheckedAll;
      
        ids?.forEach(problemId => {
          updatedCheckboxes[problemId] = areAllChecked;
        });
        setSelectedCheckboxes(updatedCheckboxes);
        setIsCheckedAll(!isCheckedAll);
      };

    const handleDeleteAll = () => {
        const { ids } = problems;

        ids?.forEach(problemId => {
            if ( selectedCheckboxes[problemId] === true) {
                deleteProlem({ id: problemId })
            }
        });
    }




    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }
   

    if (isSuccess) {
        
    
        const { ids } = problems       

        const tableContent = ids?.length
            ? ids.map(problemId => 
            <Problem key={problemId} 
                problemId={problemId}
                isChecked={selectedCheckboxes[problemId] || false}
                setIsChecked={(newState) => {
                    const updatedSelectedCheckboxes = { ...selectedCheckboxes };
                    updatedSelectedCheckboxes[problemId] = newState;
                    setSelectedCheckboxes(updatedSelectedCheckboxes);
                }}
                 />)
            : null

        content = (
            <div>
            <div className="header">
                <div className="titles">
                    <h2>Problem List</h2>
                    <h4>{} Total</h4>
                </div>

                <button className="add_button" onClick={() => navigate("/newproblem")}><i className="bi bi-file-earmark-code-fill"></i>Add Problem</button>
            </div>

            <div className="body">
                {2 > 0 ? (
                    <div >
                        <div className="check-and-titles">

                            <div className="check-all">
                                <input type="checkbox" aria-label="Select All Problems" checked={isCheckedAll} onChange={handleCheckAll} ></input>
                            </div>
                            <div className="table-titles">
                                <div className="user-info">
                                    <h3 className="user">Problem Name</h3>
                                    <h3 >Description</h3>
                                </div>
                                <div className='user-action'>
                                    {/*Ignore this edit-button */}
                                    <button className='edit-button' disabled style={{ color: 'transparent', backgroundColor: 'transparent', border: 'none', cursor: 'default' }}><i className="bi bi-pencil-fill"></i></button>
                                    {/*Ignore this edit-button */}
                                    
                                    <button className={`delete-button ${selectedCheckboxes}`} onClick={handleDeleteAll} ><i className="bi bi-trash3"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="table-content">
                            {tableContent}
                        </div>
                    </div>
                ) : (
                    <p className="no-contestant">No problems found!</p>
                )}
            </div>

        </div>

        )
    }

    return content
}
export default ProblemsList