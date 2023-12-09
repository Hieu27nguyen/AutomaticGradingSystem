import React, { useEffect } from 'react';
import ScoreboardEntry from './ScoreBoardEntry';
import { useGetScoreboardQuery } from './scoreboardsApiSlice';
import useAuth from '../../hooks/useAuth';
import { current } from '@reduxjs/toolkit';

const ScoreBoard = ({ handleScoreboardItemClick }) => {
    const {username, roles} = useAuth();
    const { data: scoreboardData, isSuccess, error, isLoading } = useGetScoreboardQuery(username);
    useEffect(() => {
    }, [scoreboardData]);

    

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
                {entries}
            </div>
        )
    };
    return content;
};

export default ScoreBoard;


