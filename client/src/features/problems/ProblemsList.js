import { useGetProblemsQuery } from "./problemsApiSlice"
import Problem from './Problem'

const ProblemsList = () => {
    
    let {
        data: problems,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProblemsQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    // if (isError) {
    //     content = <p className="errmsg">{error?.data?.message}</p>
    // }
    isSuccess = true;
     problems = { ids: [1, 2], entities:[

        //Test 00
        //Testing duplicate problem id
        {
          _ids: 1,
          name: "Problem00",
          description: "yessir",
          judgeProgram: [{ input: "abc", output: "dfc" }],
        },
        {
            _ids:2,
          name: "Problem01",
          description: "nosir",
          judgeProgram: [{ input: "adb", output: "adsdv" }],
        }

    ]};

    if (isSuccess) {
        
    
        const { ids } = problems       

        const tableContent = ids?.length
            ? ids.map(problemId => <Problem key={problemId["name"]} problemId={problemId} />)
            : null

        content = (
            <table className="table table--problems">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th problem__name">Problem Name</th>
                        <th scope="col" className="table__th problem__roles">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default ProblemsList