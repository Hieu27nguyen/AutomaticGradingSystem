import React from 'react';
import { useSelector } from 'react-redux';
import { useGetUsersQuery } from "../features/users/usersApiSlice"
import { useGetProblemsQuery } from '../features/problems/problemsApiSlice';


const ScorePage = () => {
    const users = useSelector(useGetUsersQuery);
    const problems = useSelector(useGetProblemsQuery);
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div>
            <h2>Score Page</h2>
            <table className="score-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Time Working</th>
                        <th>Attempt</th>
                        {problems.map((_, idx) => (
                            <th key={idx}>{alphabets[idx]}</th>
                        ))}
                        <th>Total= time/ attempt</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, idx) => (
                        <tr key={user.id}>
                            <td>{idx + 1}</td> 
                            <td>{user.name}</td>
                            <td>{user.timeWorking}</td> 
                            <td>{user.attempt}</td> 
                            {problems.map((problem) => (
                                <td key={problem.id}>
                                    
                                    {user.scores[problem.id] || '-'}
                                </td>
                            ))}
                            <td>
                                {Object.values(user.scores).reduce((acc, score) => acc + score, 0)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScorePage;
