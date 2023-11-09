import React, { useState, useEffect } from 'react';
import "../../style/Event.css";
import { getCurrentDate } from './Utils';

const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';

  // Format hours and minutes to 2 digits each
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
};

const CompetitionForm = ({ onCancel, onSubmit, initialData }) => {
  const currentDate = getCurrentDate();
  const currentTime = getCurrentTime();
  const [name, setName] = useState('');
  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState(currentTime);
  const [duration, setDuration] = useState(5);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Pre-fill form with initialData if available
    if (initialData) {
      setName(initialData.name || 'a');
      setDate(initialData.date || currentDate);
      setTime(initialData.time || currentTime);
      setDuration(initialData.duration || 5);
    }
  }, [initialData, currentDate, currentTime]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Event name is required.';
    }
    if (!date) {
      errors.date = 'Event date is required.';
    }
    if (!time) {
      errors.time = 'Event time is required';
    }
    if (!duration) {
      errors.duration = 'Event duration is required';
    }
  
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
  
      const event = {
        name,
        date,
        time,
        duration,
      };
      onSubmit(event);
    } else {
      // Set the formErrors state with the validation errors
      setFormErrors(errors);
    }
  };

  return (
    <div className="event-input-form">
      <h2>Contest Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Name" className="form-label">Contest Name:</label>
          <input
            type="text"
            id="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
          {formErrors.name && <p className="form-error">{formErrors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="Date" className="form-label"> Date:</label>
          <input
            type="date"
            id="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-input"
          />
          {formErrors.date && <p className="form-error">{formErrors.date}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="Time" className="form-label"> Time:</label>
          <input
            type="time"
            id="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="form-input"
          />
          {formErrors.time && <p className="form-error">{formErrors.time}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="Duration" className="form-label"> Duration(hour):</label>
          <input
            type="number"
            id="Duration"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10))}
            className="form-input"
          />
          {formErrors.duration && <p className="form-error">{formErrors.duration}</p>}
        </div>
        <button type="submit" className="custom-button">Submit</button>
      </form>
    </div>
  );
};

export default CompetitionForm;


