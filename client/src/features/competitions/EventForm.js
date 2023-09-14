// import React, { useState } from 'react';

// const EventForm = ({ onClose }) => {
//   const [eventName, setEventName] = useState('');
//   const [eventDescription, setEventDescription] = useState('');
//   const [eventDate, setEventDate] = useState('');
//   const [eventTime, setEventTime] = useState('');
//   const [eventDuration, setEventDuration] = useState('');
//   const [eventLocation, setEventLocation] = useState('');
//   const [formErrors, setFormErrors] = useState({});

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const errors = {};
//     if (!eventName.trim()) {
//       errors.eventName = 'Event name is required.';
//     }
//     if (!eventDescription.trim()) {
//       errors.eventDescription = 'Event description is required.';
//     }
//     if (!eventDate) {
//       errors.eventDate = 'Event date is required.';
//     }
//     if (!eventTime) {
//         errors.eventTime = "Event time is required";
//     }
//     if (!eventDuration) {
//         errors.eventDuration = "Event duration is required";
//     }
//     if (!eventLocation) {
//         errors.eventLocation = "Event location is required";
//     }
//     setFormErrors(errors);
//   };

//   return (
//     <div className="event-input-form">
//       <h2>Add Event</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="eventName" className="form-label">Event Name:</label>
//           <input
//             type="text"
//             id="eventName"
//             value={eventName}
//             onChange={(e) => setEventName(e.target.value)}
//             className="form-input"
//           />
//           {formErrors.eventName && <span className="form-error">{formErrors.eventName}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="eventDescription" className="form-label">Event Description:</label>
//           <textarea
//             id="eventDescription"
//             value={eventDescription}
//             onChange={(e) => setEventDescription(e.target.value)}
//             className="form-input"
//             style={{ maxHeight: '200px', resize: 'vertical', overflowY: 'auto' }}
//           />
//           {formErrors.eventDescription && <span className="form-error">{formErrors.eventDescription}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="eventDate" className="form-label">Event Date:</label>
//           <input
//             type="date"
//             id="eventDate"
//             value={eventDate}
//             onChange={(e) => setEventDate(e.target.value)}
//             className="form-input"
//           />
//           {formErrors.eventDate && <span className="form-error">{formErrors.eventDate}</span>}
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="eventTime" className="form-label">Event Time:</label>
//           <input
//             type="time"
//             id="eventTime"
//             value={eventTime}
//             onChange={(e) => setEventTime(e.target.value)}
//             className="form-input"
//           />
//           {formErrors.eventTime && <span className="form-error">{formErrors.eventTime}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="eventDuration" className="form-label">Event Duration:</label>
//           <input
//             type="text"
//             id="eventDuration"
//             value={eventDuration}
//             onChange={(e) => setEventDuration(e.target.value)}
//             className="form-input"
//           />
//           {formErrors.eventDuration && <span className="form-error">{formErrors.eventDuration}</span>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="eventLocation" className="form-label">Event Location:</label>
//           <input
//             type="text"
//             id="eventLocation"
//             value={eventLocation}
//             onChange={(e) => setEventLocation(e.target.value)}
//             className="form-input"
//           />
//           {formErrors.eventLocation && <span className="form-error">{formErrors.eventLocation}</span>}
//         </div>
//         <button type="submit" className="custom-button">Submit</button>
//         <button type="button" onClick={onClose} className="custom-button">Cancel</button>
//       </form>
//     </div>
//   );
// };

// export default EventForm;


import React, { useState, useEffect } from 'react';
import EventInformation from './EventInformation';
import "../../style/Event.css"


const EventForm = ({ onCancel, onSubmit,initialData  }) => { 
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDuration, setEventDuration] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Use the initialData to pre-fill the form fields
  useEffect(() => {
    if (initialData) {
      setEventName(initialData.eventName);
      setEventDescription(initialData.eventDescription);
      setEventDate(initialData.eventDate);
      setEventTime(initialData.eventTime);
      setEventDuration(initialData.eventDuration);
      setEventLocation(initialData.eventLocation);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!eventName.trim()) {
      errors.eventName = 'Event name is required.';
    }
    if (!eventDescription.trim()) {
      errors.eventDescription = 'Event description is required.';
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
    if (!eventLocation) {
        errors.eventLocation = "Event location is required";
    }
    
    if (Object.keys(errors).length === 0) {
        // Store the input data and set the submission state to true
        setIsSubmitted(true);
        const event = {
          eventName,
          eventDescription,
          eventDate,
          eventTime,
          eventDuration,
          eventLocation,
        };
        onSubmit(event); // Call the onSubmit function here
      }
  
    setFormErrors(errors);
  };

  return (
    <div className="event-input-form">
      <h2>Add Event</h2>
      {isSubmitted ? (
        // Display the information panel after submission
        <EventInformation
          eventName={eventName}
          eventDescription={eventDescription}
          eventDate={eventDate}
          eventTime={eventTime}
          eventDuration={eventDuration}
          eventLocation={eventLocation}
        />
      ) : (
<form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="eventName" className="form-label">Event Name:</label>
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
          <label htmlFor="eventDescription" className="form-label">Event Description:</label>
          <textarea
            id="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="form-input"
            style={{ maxHeight: '200px', resize: 'vertical', overflowY: 'auto' }}
          />
          {formErrors.eventDescription && <span className="form-error">{formErrors.eventDescription}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="eventDate" className="form-label">Event Date:</label>
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
          <label htmlFor="eventTime" className="form-label">Event Time:</label>
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
          <label htmlFor="eventDuration" className="form-label">Event Duration:</label>
          <input
            type="text"
            id="eventDuration"
            value={eventDuration}
            onChange={(e) => setEventDuration(e.target.value)}
            className="form-input"
          />
          {formErrors.eventDuration && <span className="form-error">{formErrors.eventDuration}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="eventLocation" className="form-label">Event Location:</label>
          <input
            type="text"
            id="eventLocation"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            className="form-input"
          />
          {formErrors.eventLocation && <span className="form-error">{formErrors.eventLocation}</span>}
        </div>
        <button type="submit" className="custom-button">Submit</button>
        <button type="button" onClick={onCancel} className="custom-button">Cancel</button>      </form>
      )}
    </div>
  );
};

export default EventForm;
