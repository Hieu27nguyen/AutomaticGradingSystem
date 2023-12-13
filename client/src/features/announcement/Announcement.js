
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAnnouncementById } from './announcementApiSlice';
import '../../style/AnnouncementList.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import useAuth from "../../hooks/useAuth"
import { useDeleteAnnouncementMutation } from './announcementApiSlice';
const Announcement = ({ announcementId }) => {


    
    const announcement = useSelector(state => selectAnnouncementById(state, announcementId))
    const {status} = useAuth();
    const formattedDate = new Date(announcement.announcementTime).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      const [deleteAnnouncement] = useDeleteAnnouncementMutation();
      const handleDelete = async () => {
        await deleteAnnouncement({id:announcementId}) ; 
      }
      const subText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
      };
        return (
            <div className='announcement'>  
                <div className={'announcement-card'}>
                    <div className='announcement-info'>
                    <Link to={`/home/announcements/${announcement.id}`} className='announcement-link'>
                        {announcement.title}
                    </Link>
                    <div className='announcement-content-container'>
                        <p className='announcement-content'>{subText(announcement.announceInformation, 100)}</p>
                        <button className={`delete-button ${status === 'CONTESTANT' ? 'hidden' : ''}`} onClick={handleDelete}><i className="bi bi-trash3"></i></button>
                        <p className={`time ${status !== 'CONTESTANT' ? 'hidden' : '' }`}>
                            <strong>Posted on:</strong> 
                            <br/>
                            {formattedDate} 
                            <br/>
                            <strong>By</strong>
                            <br/>
                            {announcement.username}
                            </p>
                    </div>
                    
                    </div>
                </div>
            </div>

        )
    } 


export default Announcement;
