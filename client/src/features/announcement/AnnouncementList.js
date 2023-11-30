
import Announcement from './Announcement';
import '../../style/AnnouncementList.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import { useGetAnnouncementsQuery } from "./announcementApiSlice";



const AnnouncementList = () => {
    const {
        data: announcements,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAnnouncementsQuery();

    const { status } = useAuth();


    const navigate = useNavigate();
   


    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = (
            <div className="announcementList-container">
                <div className="header">
                    <div className="titles">
                        <h2>Announcements</h2>
                    </div>

                    <button className="add_button" onClick={() => navigate("/home/announcements/new")}><i className="bi-person-plus-fill"></i>Make Announcement</button>
                </div>
                <div className="body">
                    <p className="no-contestant">No announcements found!</p>
                </div>   
            </div>
        )
    }

    if (isSuccess) {
        const { ids, entities: announcementsById } = announcements;

    // Sort the ids based on announcementTime in descending order
    const sortedIds = ids.slice().sort((a, b) => {
    const timeA = new Date(announcementsById[a].announcementTime);
    const timeB = new Date(announcementsById[b].announcementTime);
    return timeB - timeA;
    });

  const tableContent = sortedIds.map((announcementId) => (
    <Announcement key={announcementId} announcementId={announcementId} />
  ));


        content = (
            
            <div className="announcementList-container">
                <div className="announcementList-header">
                    <div className="titles">
                        <h2>Announcements</h2>
                    </div>

                    <button className={`add_button ${status === 'CONTESTANT' ? 'hidden' : ''}`} onClick={() => navigate("/home/announcements/new")}>Make Announcement</button>
                </div>

                <div className="announcementList-body">
                    {ids.length > 0 ? (
                        <div >
                            <div className="table-content">

                                {tableContent}
                            </div>
                        </div>
                    ) : (
                        <p className="no-announcement">No Announcement found!</p>
                    )}
                </div>

            </div>


        );
    }

    return content;
};

export default AnnouncementList;
