import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectScoreboardById } from './scoreboardsApiSlice';
import { useGetProblemsQuery } from '../problems/problemsApiSlice';
import '../../style/ScoreBoard.css';

const ScoreboardEntry = ({ entry, problems }) => {
    const scoreboardEntry = entry;
    let problemStatistic = new Map();
    scoreboardEntry.problemStatistic.forEach((problem, index) => {
        problemStatistic.set(problem.problemID, problem)
    });
  
    if (!scoreboardEntry) {
        // Handle loading state or return a placeholder
        return <div className='scoreboard-entry placeholder'>Loading...</div>;
    }

    return (

        <tr>
            <td>
                {scoreboardEntry.rank}
            </td>
            <td>
                {scoreboardEntry.username}
            </td>
            <td>
                {scoreboardEntry.problemSolved}
            </td>
            <td>
                {scoreboardEntry.totalScore}
            </td>

            {Object.entries(problems.entities).map((problem, index) => {
                const problemSubmissionStat = problemStatistic.get("" + problem[0].toString());

                //If the submission record exists then display it
                if (problemSubmissionStat) {
                    return <td key={index} className={problemSubmissionStat.accepted ? 'accepted-attempts-cell' : (problemSubmissionStat.attempts > 0) ? 'rejected-attempts-cell' : 'non-attempts-cell'}>
                        {problemSubmissionStat.attempts}/{problemSubmissionStat.score === 0 ? '--' : problemSubmissionStat.score}
                    </td>
                }
                else {
                    return <td key={index} className='non-attempts-cell'>
                        0/--
                    </td>
                }           
            })}




        </tr>

    );
};

export default ScoreboardEntry;







