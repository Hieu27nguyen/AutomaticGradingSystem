import React, { useState, useEffect } from 'react';
import EventInformation from './EventInformation';
import "../../style/Event.css"


const EventForm = ({ onCancel, onSubmit,initialData  }) => { 
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDuration, setEventDuration] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Use the initialData to pre-fill the form fields
  useEffect(() => {
    if (initialData) {
      setEventName(initialData.eventName);
      setEventDate(initialData.eventDate);
      setEventTime(initialData.eventTime);
      setEventDuration(initialData.eventDuration);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!eventName.trim()) {
      errors.eventName = 'Event name is required.';
    }
    if (!eventDate) {
      errors.eventDate = 'Event date is required.';
    }
    if (!eventTime) {
        errors.eventTime = "Event time is required";
    }
    if (!eventDuration) {
        errors.eventDuration = "Event duration is required";
    }

    if (Object.keys(errors).length === 0) {
        setIsSubmitted(true);
        const event = {
          eventName,
          eventDate,
          eventTime,
          eventDuration,
        };
        onSubmit(event); 
      }
  
    setFormErrors(errors);
  };

  return (
    <div className="event-input-form">
      <h2>Add Event</h2>
      {isSubmitted ? (
        <EventInformation
          eventName={eventName}
          eventDate={eventDate}
          eventTime={eventTime}
          eventDuration={eventDuration}
        />
      ) : (
<form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="eventName" className="form-label">Competition Name:</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="form-input"
          />
          {formErrors.eventName && <span className="form-error">{formErrors.eventName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="eventDate" className="form-label"> Date:</label>
          <input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="form-input"
          />
          {formErrors.eventDate && <span className="form-error">{formErrors.eventDate}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="eventTime" className="form-label"> Time:</label>
          <input
            type="time"
            id="eventTime"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            className="form-input"
          />
          {formErrors.eventTime && <span className="form-error">{formErrors.eventTime}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="eventDuration" className="form-label"> Duration:</label>
          <input
            type="text"
            id="eventDuration"
            value={eventDuration}
            onChange={(e) => setEventDuration(e.target.value)}
            className="form-input"
          />
          {formErrors.eventDuration && <span className="form-error">{formErrors.eventDuration}</span>}
        </div>
        <button type="submit" className="custom-button">Submit</button>
        <button type="button" onClick={onCancel} className="custom-button">Cancel</button>      </form>
      )}
    </div>
  );
};

export default EventForm;
