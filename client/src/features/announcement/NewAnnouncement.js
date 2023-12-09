import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import "../../style/AnnouncementForm.css"
import { useAddNewAnnouncementMutation } from "./announcementApiSlice";
import useAuth from "../../hooks/useAuth";



const NewUserForm = () => {

    const [addNewAnnouncement, {
        isLoading,
        isSuccess,
    }] = useAddNewAnnouncementMutation()

    const {username} = useAuth();
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [announcement, setAnnouncement] = useState('')



    const titleRef = useRef();
    const announcementRef = useRef();

    useEffect(() => {
        titleRef.current.focus();
      }, []);

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setAnnouncement('')
            navigate('/home/announcements')
        }
    }, [isSuccess, navigate])
    const goBack = (e) => {
        navigate("/home/announcements");
    }
    const saveAnnouncement = async (e) => {
        e.preventDefault()
        if (!isLoading) {
           await addNewAnnouncement({username:username , title:title, announceInformation: announcement , announcementTime: Date.now() } )
        }
    }

    const content = (
        <div className="announcement-containter">  
            <button onClick={goBack} class="go-back-announcements"> <i class="bi bi-arrow-left"></i></button>
            <h1 id="newAnnouncement">Make New Announcement</h1>

            <form className="announcement-form" onSubmit={saveAnnouncement}>
                <label htmlFor="title"> Title: </label>
                <textarea
                    className="announcement-label"
                    type="text"
                    id="title"
                    ref={titleRef}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                />
                <label htmlFor="announcement"> Announcement: </label>
                <textarea
                    className="announcement-content-input"
                    type="text"
                    id="announcement"
                    ref={announcementRef}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    value={announcement}
                    required
                />
                <div class="button-container">
                    <button class="announcement-submit-button">Confirm</button>
                </div>
            </form>
        </div>
    )

    return content
}
export default NewUserForm