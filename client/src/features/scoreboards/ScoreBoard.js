import React, { useEffect, useState } from 'react';
import ScoreboardEntry from './ScoreBoardEntry';
import { useGetScoreboardQuery } from './scoreboardsApiSlice';
import { useGetProblemsQuery } from '../problems/problemsApiSlice';
import useAuth from '../../hooks/useAuth';
import { current } from '@reduxjs/toolkit';

const ScoreBoard = ({ handleScoreboardItemClick }) => {
    const { username, roles } = useAuth();
    const { data: scoreboardData, isSuccess, error, isLoading } = useGetScoreboardQuery(username);
    useEffect(() => {
    }, [scoreboardData]);
    const [problemsData, setProblemsData] = useState({ ids: [], entities: {} });
    const { data: initialProblemsData } = useGetProblemsQuery();

    useEffect(() => {
        if (initialProblemsData) {
            setProblemsData(initialProblemsData);
        }
    }, [initialProblemsData]);

    if (!problemsData) {
        // Handle loading state or return a placeholder
        return <div className='scoreboard-entry placeholder'>Loading...</div>;
    }


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading scoreboard data. Please try again.</div>;
    }
    let content;
    if (isSuccess) {
        const { currentRank, scoreboard } = scoreboardData;
        const entries = scoreboard.map(entry => (
            <ScoreboardEntry
                key={entry._id}
                // value={console.log(entry._id)}
                entry={entry}
            />
        ));

        content = (
            <div className="scoreboard">
                <h2>Scoreboard</h2>
                {/* Only display current role of a contestant */}
                {(roles.includes('CONTESTANT') && currentRank != -1) &&
                    <p id="currentRank"> Your current rank is {currentRank} </p>
                }
                <div className='scoreboard-entry'>
                    <table className='scoreboard-table'>
                        <thead key="thead">
                            <tr>
                                <th>Rank</th>
                                <th>Contestant</th>
                                <th>Total Solved</th>
                                <th>Total Score</th>
                                {Object.entries(problemsData.entities).map((problem, index) => (
                                    <th key={problem?problem[1].name: "problemTitle_" + index } className="scoreboardProblemName">
                                        {problem[1].name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {entries}

                        </tbody>
                    </table>
                </div>
            </div>
        )
    };
    return content;
};

export default ScoreBoard;


