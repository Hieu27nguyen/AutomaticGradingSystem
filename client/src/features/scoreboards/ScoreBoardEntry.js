import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectScoreboardById } from './scoreboardsApiSlice';
import { useGetProblemsQuery } from '../problems/problemsApiSlice';
import '../../style/ScoreBoard.css';

const ScoreboardEntry = ({ entry }) => {
  const scoreboardEntry = useSelector(state => selectScoreboardById(state, entry));
  const [problemsData, setProblemsData] = useState({ ids: [], entities: {} });
  const { data: initialProblemsData } = useGetProblemsQuery();
  
  useEffect(() => {
    if (initialProblemsData) {
      setProblemsData(initialProblemsData);
    }
  }, [initialProblemsData]);

  if (!scoreboardEntry || !problemsData) {
    // Handle loading state or return a placeholder
    return <div className='scoreboard-entry placeholder'>Loading...</div>;
  }

  return (
    <div className='scoreboard-entry'>
      <table className='scoreboard-table'>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Contestant</th>
            <th>Total Solved</th>
            <th>Total Score</th>
            {scoreboardEntry.problemStatistic.map((problem) => (
            <th key={problem.problemID}>
              {problemsData.entities[problem.problemID]?.name}
            </th>
            ))}
          </tr>
        </thead>
        <tbody>
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
              <td key={index} className={problem.accepted ? 'accepted-attempts-cell' : 'rejected-attempts-cell'}>
                {problem.attempts}/{problem.score === 0 ? '--' : problem.score}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreboardEntry;







