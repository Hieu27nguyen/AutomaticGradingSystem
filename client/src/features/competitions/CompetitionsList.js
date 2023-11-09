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
  const isAllowedToAddEvent = roles.includes('JUDGE') || roles.includes('ADMIN');

  const { data: competitionData } = useGetCompetitionsQuery();
  const [addNewCompetition] = useAddNewCompetitionMutation();
  const [updateCompetition] = useUpdateCompetitionMutation();

  const [editingContest, setEditingContest] = useState(false);
  const [contestData, setContestData] = useState(null);

  const handleContestClick = () => {
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
        />
      ) : contestData && !editingContest ? (
        <div className="event-information-wrapper">
          <CompetitionInformation
            name={contestData.name}
            time={contestData.time}
            date={contestData.date}
            duration={contestData.duration}
            onEdit={handleContestClick}
          />
        </div>
      ) : (
        <CompetitionForm onSubmit={handleFormSubmit} />
      )}
    </div>
  );
};

export default CompetitionsList;




