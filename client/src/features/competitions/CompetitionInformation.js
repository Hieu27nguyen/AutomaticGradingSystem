import React from 'react';
import "../../style/Event.css"
import { getCurrentFormattedDate, formatTimeTo12HourClock } from './Utils';

const CompetitionInformation = ({ eventData, onEdit }) => {
  const formattedDate = getCurrentFormattedDate(eventData.eventDate);
  const formattedTime = formatTimeTo12HourClock(eventData.eventTime);
  
  return (
    <div className="white-box"> 
      <h3>Event Information</h3>
      <p><strong>Event Name:</strong><br /> {eventData.eventName}</p>
      <p><strong>Event Date:</strong><br /> {formattedDate}</p>
      <p><strong>Event Time:</strong><br /> {formattedTime}</p>
      <p><strong>Event Duration:</strong><br /> {eventData.eventDuration}</p>
      <button onClick={onEdit} className="custom-button">Edit</button>
    </div>
  );
};

export default CompetitionInformation;



