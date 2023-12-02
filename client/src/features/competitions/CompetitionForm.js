import React, { useState, useEffect } from 'react';
import "../../style/Event.css";

const CompetitionForm = ({ onSubmit, initialData, isJudge }) => {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState(5);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [processTimeStart, setProcessTimeStart] = useState('');
    const [localTime, setLocalTime] = useState('');
    //A function to convert to local time
    const convertToLocalTime = (UTCtime) => {
        if (!UTCtime) {
            return '';
        }
        const res = new Date(UTCtime);
        res.setMinutes(res.getMinutes() - res.getTimezoneOffset());

        return res.toISOString();
    }

    useEffect(() => {
        // Pre-fill form with initialData if available
        if (initialData) {
            setName(initialData.name || 'a');
            setDuration(initialData.duration || 5);
            setProcessTimeStart(initialData.processTimeStart || '');
            setLocalTime(convertToLocalTime(initialData.processTimeStart || ''));
        }else{
            setProcessTimeStart(Date.now());
            setLocalTime(convertToLocalTime(Date.now()));
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (!name.trim()) {
            errors.name = 'Event name is required.';
        }
        if (!duration) {
            errors.duration = 'Event duration is required';
        }

        if (Object.keys(errors).length === 0) {
            setIsSubmitted(true);

            const event = {
                name,
                duration,
                processTimeStart,
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
                    <label htmlFor="processedTime" className="form-label"> Contest Start Time:</label>
                    <input type="datetime-local" id="processedCompetitionTime"
                        value={localTime.slice(0, 16)}
                        onChange={(e) => {
                            setLocalTime(convertToLocalTime(e.target.value));
                            setProcessTimeStart(e.target.value);
                        }}
                        className="form-input"
                    />
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


