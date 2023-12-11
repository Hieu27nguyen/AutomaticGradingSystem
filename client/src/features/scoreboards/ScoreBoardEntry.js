import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectScoreboardById } from './scoreboardsApiSlice';
import { useGetProblemsQuery } from '../problems/problemsApiSlice';
import useAuth from '../../hooks/useAuth';
import '../../style/ScoreBoard.css';

const ScoreboardEntry = ({ entry }) => {
    const scoreboardEntry = entry;
    const { username } = useAuth();
    const currentRank = username  === scoreboardEntry.username ? 'current-rank' : '';
    if (!scoreboardEntry) {
        // Handle loading state or return a placeholder
        return <div className='scoreboard-entry placeholder'>Loading...</div>;
    }
    return (

        <tr className={currentRank}>
            <td className="scoreboard-stat">
                {scoreboardEntry.rank}
            </td >
            <td className="scoreboard-stat">
                {scoreboardEntry.username}
            </td >
            <td className="scoreboard-stat">
                {scoreboardEntry.problemSolved}
            </td >
            <td className="scoreboard-stat">
                {scoreboardEntry.totalScore}
            </td>
            {scoreboardEntry.problemStatistic.map((problem, index) => (
                <td key={index} className={
                    problem.accepted ? 'accepted-attempts-cell' :
                        (problem.attempts > 0) ? 'rejected-attempts-cell' : 'non-attempts-cell'
                }>

                    {problem.attempts}/{problem.score === 0 && !problem.accepted? '--' : problem.score}

                </td>
            ))}
        </tr>

    );
};

export default ScoreboardEntry;







