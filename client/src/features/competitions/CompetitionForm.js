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

const CompetitionForm = ({ onSubmit, initialData, isJudge }) => {
  const currentDate = getCurrentDate();
  const currentTime = getCurrentTime();
  const [name, setName] = useState('');
  const [date, setDate] = useState(currentDate);
  const [timeStarted, setTime] = useState(currentTime);
  const [duration, setDuration] = useState(5);
  const [memLimit, setMemLimit] = useState();
  const [timeLimit, setTimeLimit] = useState();
  const [paused, setPaused] = useState(false); 
  const [extended, setExtended] = useState(false); 
  const [pausedTime, setPausedTime] = useState(''); 
  const [extendedTime, setExtendedTime] = useState(''); 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Pre-fill form with initialData if available
    if (initialData) {
      setName(initialData.name || 'a');
      setDate(initialData.date || currentDate);
      setTime(initialData.timeStarted || currentTime);
      setDuration(initialData.duration || 5);
      setMemLimit(initialData.memLimit || 0);
      setTimeLimit(initialData.timeLimit || 0);
      setPaused(initialData.paused || false);
      setExtended(initialData.extended || false);
      setPausedTime(initialData.pausedTime || '');
      setExtendedTime(initialData.extendedTime || '');
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
    if (!timeStarted) {
      errors.timeStarted = 'Event time is required';
    }
    if (!duration) {
      errors.duration = 'Event duration is required';
    }
  
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
  
      const event = {
        name,
        date,
        timeStarted,
        duration,
        memLimit,
        timeLimit,
        paused,
        extended,
        pausedTime,
        extendedTime,
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
            value={timeStarted}
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
        {isJudge && (
          <>
            <div className="form-group">
              <label htmlFor="Paused" className="form-label">Paused:</label>
              <input
                type="checkbox"
                id="Paused"
                checked={paused}
                className="form-input"
                onChange={() => setPaused(!paused)}
              />
            </div>
            {paused && (
              <div className="form-group">
                <label htmlFor="PausedTime" className="form-label">Paused Time:</label>
                <input
                  type="time"
                  id="PausedTime"
                  value={pausedTime}
                  className="form-input"
                  onChange={(e) => setPausedTime(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="Extended" className="form-label">Extended:</label>
              <input
                type="checkbox"
                id="Extended"
                checked={extended}
                className="form-input"
                onChange={() => setExtended(!extended)}
              />
            </div>
            {extended && (
              <div className="form-group">
                <label htmlFor="ExtendedTime" className="form-label">Extended Time:</label>
                <input
                  type="time"
                  id="ExtendedTime"
                  value={extendedTime}
                  className="form-input"
                  onChange={(e) => setExtendedTime(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="MemLimit" className="form-label">Judge0 Memory Limit (KB):</label>
              <input
                type="number"
                id="MemLimit"
                value={memLimit}
                className="form-input"
                onChange={(e) => setMemLimit(parseInt(e.target.value, 10))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="TimeLimit" className="form-label">Judge0 Time Limit (s):</label>
              <input
                type="number"
                id="TimeLimit"
                value={timeLimit}
                className="form-input"
                onChange={(e) => setTimeLimit(parseInt(e.target.value, 10))}
              />
            </div>
          </>
        )}
        <button type="submit" className="custom-button">Submit</button>
      </form>
    </div>
  );
};

export default CompetitionForm;


