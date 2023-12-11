import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectScoreboardById } from './scoreboardsApiSlice';
import { useGetProblemsQuery } from '../problems/problemsApiSlice';
import '../../style/ScoreBoard.css';

const ScoreboardEntry = ({ entry }) => {
    const scoreboardEntry = entry;
  
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
            {scoreboardEntry.problemStatistic.map((problem, index) => (
                <td key={index} className={
                    problem.accepted ? 'accepted-attempts-cell' :
                        (problem.attempts > 0) ? 'rejected-attempts-cell' : 'non-attempts-cell'
                }>

                    {problem.attempts}/{problem.score === 0 ? '--' : problem.score}

                </td>
            ))}
        </tr>

    );
};

export default ScoreboardEntry;







