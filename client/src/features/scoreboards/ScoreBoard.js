import React, { useEffect } from 'react';
import ScoreboardEntry from './ScoreBoardEntry';
import { useGetScoreboardQuery } from './scoreboardsApiSlice';


const ScoreBoard = ({ handleScoreboardItemClick }) => {
  const { data: scoreboardData, isSuccess, error, isLoading } = useGetScoreboardQuery();
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
  const { ids } = scoreboardData ;

  const entries = ids.map(id => (
    <ScoreboardEntry
      key={id}
      entry={id}
    />
  ));

  content = (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      {entries}
    </div>
  )};
 return content;
};

export default ScoreBoard;


