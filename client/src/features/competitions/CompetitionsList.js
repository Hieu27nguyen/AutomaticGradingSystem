// import React, { useState } from 'react';
// import UWBuildingImage from "../../img/UW_image.jpg";
// import EventInputForm from './EventForm';
// import useAuth from '../../hooks/useAuth';

// const CompetitionsList = () => {
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const { roles } = useAuth();

//   const isAllowedToAddEvent = roles.includes('JUDGE') || roles.includes('ADMIN');

//   const handleButtonClick = () => {
//     setIsFormVisible(true);
//   };

//   const handleCloseForm = () => {
//     setIsFormVisible(false);
//   };

//   return (
//     <div className="event-container" style={{ backgroundImage: `url(${UWBuildingImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
//       {isAllowedToAddEvent && !isFormVisible && (
//         <button type="Add Event" onClick={handleButtonClick} className="custom-button">Add Event</button>
//       )}
//       {isFormVisible && <EventInputForm onClose={handleCloseForm} />}
//     </div>
//   );
// };

// export default CompetitionsList;
import React, { useState } from 'react';
import UWBuildingImage from "../../img/UW_image.jpg";
import EventForm from './EventForm';
import EventInformation from './EventInformation';
import useAuth from '../../hooks/useAuth';
import "../../style/Event.css"

const CompetitionsList = () => {
  const { roles } = useAuth();
  const isAllowedToAddEvent = roles.includes('JUDGE') || roles.includes('ADMIN');

  const [eventData, setEventData] = useState(null); // To store submitted event data
  const [isEditing, setIsEditing] = useState(false); // To control edit mode

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
    <div className="event-container" style={{ backgroundImage: `url(${UWBuildingImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      {eventData && !isEditing ? (
        // Display event information panel after submission
        <div className="event-information-wrapper"> {/* Add this wrapper div */}
        <EventInformation
          eventData={eventData}
          onEdit={handleEditClick}
        />
        </div>
      ) : (
        // Display the input form (EventForm) and pass the submit handler
        <EventForm onSubmit={handleEventSubmit}
        onCancel={handleEditCancel} 
        initialData={eventData}
        />
      )}
    </div>
  );
};

export default CompetitionsList;


