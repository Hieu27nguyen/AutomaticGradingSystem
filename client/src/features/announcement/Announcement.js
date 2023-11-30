
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAnnouncementById } from './announcementApiSlice';
import '../../style/AnnouncementList.css'
import "bootstrap-icons/font/bootstrap-icons.css";
const Announcement = ({ announcementId }) => {

    const announcement = useSelector(state => selectAnnouncementById(state, announcementId))
    console.log(announcement);
    const formattedDate = new Date(announcement.announcementTime).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
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
                        <p className='time'>
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
