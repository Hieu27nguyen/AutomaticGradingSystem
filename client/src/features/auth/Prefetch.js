import { store } from '../../app/store'
import { annnouncementsApiSlice } from '../announcement/announcementApiSlice';
import { problemsApiSlice } from '../problems/problemsApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { scoreboardApiSlice } from '../scoreboards/scoreboardsApiSlice';
import { competitionsApiSlice } from '../competitions/competitionApiSlice';
import { translationsApiSlice } from '../translations/translationsApiSlice';
import { submissionsApiSlice } from '../submissions/submissionsApiSlice';

const Prefetch = () => {
    const {username} = useAuth();
    useEffect(() => {
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const problems = store.dispatch(problemsApiSlice.endpoints.getProblems.initiate())
        const announcements = store.dispatch(annnouncementsApiSlice.endpoints.getAnnouncements.initiate())
        const scoreboards = store.dispatch(scoreboardApiSlice.endpoints.getScoreboard.initiate(username))
        const competitions = store.dispatch(competitionsApiSlice.endpoints.getCompetitions.initiate())
        const translations = store.dispatch(translationsApiSlice.endpoints.getAllTranslations.initiate())
        const submissions = store.dispatch(submissionsApiSlice.endpoints.getSubmissions.initiate())
        return () => {
            users.unsubscribe()
            problems.unsubscribe()
            announcements.unsubscribe()
            scoreboards.unsubscribe()
            competitions.unsubscribe()
            translations.unsubscribe()
            submissions.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch
