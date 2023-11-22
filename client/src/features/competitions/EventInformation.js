import React from 'react';
import "../../style/Event.css"

const EventInformation = ({ eventData, onEdit }) => {

  const eventDate = new Date(eventData.eventDate);
  const eventTime = new Date(`1970-01-01T${eventData.eventTime}`);

  const formattedDate = eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = eventTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  

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

export default EventInformation;



