import { useSelector } from 'react-redux';
import { selectAnnouncementById } from './announcementApiSlice';
import { useParams } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../../style/AnnouncementForm.css'
import { useNavigate } from 'react-router-dom';
const FullAnnouncement = () => {
    const { id } = useParams();
    
    const announcement = useSelector(state => selectAnnouncementById(state, id));
    const navigate = useNavigate();
    const goBack = (e) => {
        navigate("/home/announcements");
    }
    if (!announcement) {
      return <div>Announcement not found</div>;
    }
  
    return (
      <div>
       <button onClick={goBack} class="go-back-announcements"> <i class="bi bi-arrow-left"></i></button>
        <div className='full-announcement-container'>
        
        <h2>{announcement.title}</h2>
        <p>{announcement.announceInformation}</p>
      </div>
      </div>
      
    );
  };
  
  export default FullAnnouncement;