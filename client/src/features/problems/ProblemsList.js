import { useGetProblemsQuery } from "./problemsApiSlice"
import Problem from './Problem'

const ProblemsList = () => {
    // problems = "Problem": [
    //     {
    //       "id": "1",
    //       "name": "problemA",
    //       "description": "Just a temporary problem with normal test cases\nSample input:\n1234\n\nSample Output:\n1",
    //       "judgeProgram": "",
    //       "tests": [
    //         {
    //           "input": "1",
    //           "output": "1234"
    //         },
    //         {
    //           "input": "2",
    //           "output": "2341"
    //         }
    //       ]
    //     },
    //     {
    //       "id": "2",
    //       "name": "problemB",
    //       "description": "Just a temporary problem with a judging program\nSample input:\n2\n\nSample Output:\n4",
    //       "judgeProgram": "const judgingFunction = (problemInput, contestantOutput) => { return true };",
    //       "tests": [
    //         {
    //           "input": "2"
    //         },
    //         {
    //           "input": "4"
    //         }
    //       ]
    //     }
    let {
        data: problems,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProblemsQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }
    // problems = problems.entities.undefined;
    console.log("Problem", problems);

    if (isSuccess) {
        console.log(problems.entities)
        content = (
            // <ul>
            //     {problems.map((item) => (
            //         <label
                
            //         >{item.name}</label>
            //     ))}
            // </ul>
            <>Hello Problem</>
        )
        // const { ids } = problems       

        // const tableContent = ids?.length
        //     ? ids.map(problemId => <Problem key={problemId["name"]} problemId={problemId} />)
        //     : null

        // content = (
        //     <table className="table table--problems">
        //         <thead className="table__thead">
        //             <tr>
        //                 <th scope="col" className="table__th problem__name">Problem Name</th>
        //                 <th scope="col" className="table__th problem__roles">Description</th>
        //                 <th scope="col" className="table__th problem__edit">Edit</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {tableContent}
        //         </tbody>
        //     </table>
        // )
    }

    return content
}
export default ProblemsList