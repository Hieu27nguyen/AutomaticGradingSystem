import { useGetProblemsQuery } from "./problemsApiSlice"
import Problem from './Problem'

const ProblemsList = () => {
    
    const {
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
   

    if (isSuccess) {
        
    
        const { ids } = problems       

        const tableContent = ids?.length
            ? ids.map(problemId => <Problem key={problemId} problemId={problemId} />)
            : null

        content = (
            <table className="table table--problems">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th problem__name">Problem Name</th>
                        <th scope="col" className="table__th problem__roles">Description</th>
                        <th scope="col" className="table__th user__edit"></th>
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