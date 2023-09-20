import React, { useState, useEffect } from 'react';
import UWBuildingImage from '../../img/UW_image.jpg';
import CompetitionForm from './CompetitionForm';
import CompetitionInformation from './CompetitionInformation';
import useAuth from '../../hooks/useAuth';
import '../../style/Event.css';
import {
  useGetCompetitionsQuery,
} from './competitionApiSlice';

const CompetitionsList = () => {
  const { roles } = useAuth();
  const isAllowedToAddEvent = roles.includes('JUDGE') || roles.includes('ADMIN');

  const [eventData, setEventData] = useState(null); // To store submitted or fetched event data
  const [isEditing, setIsEditing] = useState(false); // To control edit mode

  const { data: competitionData, isError, isLoading } = useGetCompetitionsQuery();

  // useEffect to fetch event data
  useEffect(() => {
    // If the data is fetched successfully, set in eventData
    if (!isLoading && !isError && competitionData) {
      setEventData(competitionData);
    }
  }, [isLoading, isError, competitionData]);

  const handleEventSubmit = (eventData) => {
    setEventData(eventData);
    setIsEditing(false); // Exit edit mode after submission
  };

  const handleEditClick = () => {
    setIsEditing(true); // Enter edit mode
  };

  const handleEditCancel = () => {
    setIsEditing(false); // Exit edit mode without saving changes
  };

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
      {eventData && !isEditing ? (
        // Display event information panel after submission or fetch
        <div className="event-information-wrapper">
          <CompetitionInformation
            eventData={eventData}
            onEdit={handleEditClick}
          />
        </div>
      ) : (
        // Display the input form if eventData is null
        <CompetitionForm
          onSubmit={handleEventSubmit}
          onCancel={handleEditCancel}
          initialData={eventData}
        />
      )}
    </div>
  );
};

export default CompetitionsList;



