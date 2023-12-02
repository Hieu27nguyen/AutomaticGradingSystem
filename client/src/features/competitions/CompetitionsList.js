import React, { useState, useEffect } from 'react';
import UWBuildingImage from '../../img/UW_image.jpg';
import CompetitionForm from './CompetitionForm';
import CompetitionInformation from './CompetitionInformation';
import useAuth from '../../hooks/useAuth';
import '../../style/Event.css';
import {
    useGetCompetitionsQuery,
    useAddNewCompetitionMutation,
    useUpdateCompetitionMutation,
} from './competitionApiSlice';

const CompetitionsList = () => {
    const { roles } = useAuth();

    const { data: competitionData } = useGetCompetitionsQuery();
    const [addNewCompetition] = useAddNewCompetitionMutation();
    const [updateCompetition] = useUpdateCompetitionMutation();

    const [editingContest, setEditingContest] = useState(false);
    const [contestData, setContestData] = useState(null);

    const handleContestClick = () => {
        setEditingContest(true);
    };

    const handleFormSubmit = (contestData) => {
        //Convert to UTC
        var hm = contestData.timeStarted;   // your input string
        var a = hm.split(':'); // split it at the colons
        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        var milisec = ((+a[0]) * 60 * 60 + (+a[1]) * 60) * 1000;
        var offset = new Date().getTimezoneOffset() * 60 * 1000;
   
        let date = new Date(contestData.date).getTime() + offset ;
        let newDate = new Date(date);
        newDate = new Date(newDate.getTime() + milisec);
 
        newDate = new Date(newDate.getTime());

        let toUTCTimeStarted = newDate.getHours() + ':' + newDate.getMinutes();

       
        const convertedToUTCData = {
            ...contestData,
            date: newDate,
            timeStarted: toUTCTimeStarted,
        }

        if (editingContest) {
            // Update contest if already exists
            updateCompetition({ ...convertedToUTCData });
        } else {
            // Create a new contest
            addNewCompetition(convertedToUTCData);
        }
        setEditingContest(false);
    };

    useEffect(() => {
        // Update the contestData state when competitionData changes
        if (competitionData && competitionData[0]) {
            setContestData(competitionData[0]);
        }
    }, [competitionData]);

    return (
        <div
            className="event-container"
            style={{
                backgroundImage: `url(${UWBuildingImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {contestData && editingContest ? (
                <CompetitionForm
                    onSubmit={handleFormSubmit}
                    initialData={contestData}
                    isJudge={roles.includes('JUDGE')}
                />
            ) : contestData && !editingContest ? (
                <div className="event-information-wrapper">
                    <CompetitionInformation
                        name={contestData.name}
                        timeStarted={contestData.timeStarted}
                        date={contestData.date}
                        duration={contestData.duration}
                        paused={contestData.paused}
                        extended={contestData.extended}
                        pausedTime={contestData.pausedTime}
                        extendedTime={contestData.extendedTime}
                        memLimit={contestData.memLimit}
                        timeLimit={contestData.timeLimit}
                        isJudge={roles.includes('JUDGE')}
                        onEdit={handleContestClick}
                    />
                </div>
            ) : (
                <CompetitionForm
                    onSubmit={handleFormSubmit}
                    isJudge={roles.includes('JUDGE')}
                />
            )}
        </div>
    );
};

export default CompetitionsList;




