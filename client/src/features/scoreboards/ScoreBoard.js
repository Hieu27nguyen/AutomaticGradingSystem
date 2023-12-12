import React, { useEffect, useState } from 'react';
import ScoreboardEntry from './ScoreBoardEntry';
import { scoreboardApiSlice, useGetScoreboardQuery } from './scoreboardsApiSlice';
import { useGetProblemsQuery } from '../problems/problemsApiSlice';
import { useGetCompetitionsQuery } from '../competitions/competitionApiSlice';
import useAuth from '../../hooks/useAuth';
import { store } from '../../app/store'

const ScoreBoard = ({ handleScoreboardItemClick }) => {
    const { username, roles } = useAuth();
    const { data: competitionData } = useGetCompetitionsQuery(); //Must have competetion data, assuming there is always one in the data
    let { data: scoreboardData, isSuccess, error, isLoading } = useGetScoreboardQuery(username);
    const [problemsData, setProblemsData] = useState({ ids: [], entities: {} });
    const { data: initialProblemsData } = useGetProblemsQuery();

    //Refetch score board every time users 
    useEffect(() => {
        const scoreboards = store.dispatch(scoreboardApiSlice.endpoints.getScoreboard.initiate(
            username,
            { subscribe: false, forceRefetch: true }
        ))

    }, [])

    //Fetch problems
    useEffect(() => {
        if (initialProblemsData) {
            setProblemsData(initialProblemsData);
        }
    }, [initialProblemsData]);

    if (!problemsData) {
        // Handle loading state or return a placeholder
        return <div className='scoreboard-entry placeholder'>Loading problem for scoreboard...</div>;
    }


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading scoreboard data. Please try again.</div>;
    }

    // Render Competetion Info when fetched succesffully
    let competitionContent;
    if (competitionData && competitionData[0].duration !== 0) {
        // Calculate competition time
        const startTime = new Date(competitionData[0].processTimeStart);
        const endTime = new Date(
            (startTime.getTime() + competitionData[0].duration * 3600000)
        );
        const isCompetitionInProgress = new Date(Date.now()) < endTime.getTime();
        competitionContent = (
            <>
                <div>
                    <h2 className="competition-header">
                        <span className="time left">
                            <span className="label">Start: </span>
                            {startTime.toString()}
                        </span>
                        <span className="contest-name">Scoreboard: <br />
                            {competitionData[0].name}</span>
                        <span className="time right">
                            <span className="label">End: </span>
                            {endTime.toString()}
                        </span>
                    </h2>
                </div>
                <div className='competition-progress'>
                    <span>{isCompetitionInProgress ? `Contest is in duration` : 'Contest is over'}</span>
                </div>
            </>
        );
        //Case when fetch failed
    } else if (!competitionData) {
        competitionContent = (
            <>
                <div>
                    <h2 className="competition-header">
                        <span className="contest-name">Scoreboard <br />
                        </span>
                    </h2>
                </div>
                <div className='competition-err'>
                    <span>{`Contest is not yet started`}</span>
                </div>
            </>
        );
    }

    let content;
    if (isSuccess) {
        const { currentRank, scoreboard } = scoreboardData;

        const entries = scoreboard.map(entry => (
            <ScoreboardEntry
                key={entry._id}
                // value={console.log(entry._id)}
                entry={entry}
                problems={problemsData}
            />
        ));

        content = (
            <div className="scoreboard">
                {competitionContent}
                {/* Only display current role of a contestant */}
                {(roles.includes('CONTESTANT') && currentRank !== -1) &&
                    <p id="currentRank" className='current-rank-message'> Your current rank is {currentRank} </p>
                }
                <div className='scoreboard-entry'>
                    <table className='scoreboard-table'>
                        <thead key="thead">
                            <tr>
                                {/* <th >Rank</th>
                                <th >Contestant</th>
                                <th >Total Solved</th>
                                <th >Total Score</th> */}

                                <th className="scoreboard-stat">Rank</th>
                                <th className="scoreboard-stat">Contestant</th>
                                <th className="scoreboard-stat">Total Solved</th>
                                <th className="scoreboard-stat">Total Score</th>

                                {Object.entries(problemsData.entities).map((problem, index) => (
                                    <th key={problem ? problem[1].name : "problemTitle_" + index} className="scoreboardProblemName">
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


