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

    const { data: competitionData, isSuccess, isLoading, isError } = useGetCompetitionsQuery();
    const [addNewCompetition] = useAddNewCompetitionMutation();
    const [updateCompetition] = useUpdateCompetitionMutation();

    const [editingContest, setEditingContest] = useState(false);
    const [contestData, setContestData] = useState(null);

    const handleContestClick = () => {
        if (roles.includes('JUDGE') || roles.includes('ADMIN'))
            setEditingContest(true);
    };

    const handleFormSubmit = (contestData) => {
        if (editingContest) {
            // Update contest if already exists
            updateCompetition({ ...contestData });
        } else {
            // Create a new contest
            addNewCompetition(contestData);
        }
        setEditingContest(false);
    };

    useEffect(() => {
        // Update the contestData state when competitionData changes
        if (competitionData && competitionData[0]) {
            setContestData(competitionData[0]);
        }
    }, [competitionData]);

    if (isLoading && roles.includes('CONTESTANT')) {
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
                <div className="event-input-form">
                    <h2>Loading... Competition is not yet started<br />
                        To be announced soon!
                    </h2>
                </div>
            </div>
        );
    } else if (isError && roles.includes('CONTESTANT')) {
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
                <div className="event-input-form">
                    <h2>Error!!, Loading... Competition is not yet started<br />
                        To be announced soon!
                    </h2>
                </div>
            </div>
        )
    }

    else if ( isSuccess || roles.includes('JUDGE')) {
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
                        isJudge={roles.includes('JUDGE') || roles.includes('ADMIN')}
                    />
                ) : contestData && !editingContest ? (
                    <div className="event-information-wrapper">
                        <CompetitionInformation
                            name={contestData.name}
                            duration={contestData.duration}
                            // paused={contestData.paused}
                            // extended={contestData.extended}
                            // pausedTime={contestData.pausedTime}
                            // extendedTime={contestData.extendedTime}
                            // memLimit={contestData.memLimit}
                            // timeLimit={contestData.timeLimit}
                            isJudge={roles.includes('JUDGE') || roles.includes('ADMIN')}
                            processTimeStart={contestData.processTimeStart}
                            onEdit={handleContestClick}
                        />
                    </div>
                ) : (
                    <CompetitionForm
                        onSubmit={handleFormSubmit}
                        isJudge={roles.includes('JUDGE') || roles.includes('ADMIN')}
                    />
                )}
            </div>
        );
    }
};

export default CompetitionsList;




