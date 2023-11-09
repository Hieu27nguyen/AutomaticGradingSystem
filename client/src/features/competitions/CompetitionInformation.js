import React from 'react';
import "../../style/Event.css"
import { getCurrentFormattedDate, formatTimeTo12HourClock } from './Utils';

const CompetitionInformation = ({ name, time, date, duration, onEdit }) => {
  const formattedDate = getCurrentFormattedDate(date);
  const formattedTime = formatTimeTo12HourClock(time);
  
  return (
    <div className="white-box"> 
      <h3>Contest Information</h3>
      <p><strong>Contest Name:</strong><br /> {name}</p>
      <p><strong>Date:</strong><br /> {formattedDate}</p>
      <p><strong>Time:</strong><br /> {formattedTime}</p>
      <p><strong>Duration(hour):</strong><br /> {duration}</p>
      <button onClick={onEdit} className="custom-button">Edit</button>
    </div>
  );
};

export default CompetitionInformation;



