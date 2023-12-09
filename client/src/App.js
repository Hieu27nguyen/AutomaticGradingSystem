
import { Routes, Route } from 'react-router-dom';
import './style/App.css';
import Login from './features/auth/Login';

import CompetitionsList from './features/competitions/CompetitionsList';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import Prefetch from './features/auth/Prefetch'
import useTitle from './hooks/useTitle';
import Missing404 from './Missing404';
import { ROLES } from './config/roles';
import UsersList from './features/users/UserList';
import EditUser from './features/users/EditUser'
import NewUser from './features/users/NewUser'
import ProblemsList from './features/problems/ProblemsList';
import NewProblem from './features/problems/NewProblem';
import WelcomePage from './features/home/WelcomePage';
import EditProblem from './features/problems/EditProblem';
import SubmissionList from './features/submissions/submissionList';
import NewSubbmision from './features/submissions/NewSubmission';
import TranslatePage from './features/translations/TranslationPage';
import ScoreBoard from './features/scoreboards/ScoreBoard';
import Layout from './components/Layout';
import DashLayout from './components/DashLayout'
import AnnouncementList from './features/announcement/AnnouncementList';
import NewAnnouncement from './features/announcement/NewAnnouncement';
import FullAnnouncement from './features/announcement/FullAnnouncement';
function App() {

  useTitle('Automatic Grading Contest')
  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route path="/login" element={<Login />} />

          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />} >
            <Route element={<Prefetch />}>
              <Route path="home" element={<DashLayout />}>
                <Route index element={<WelcomePage />} />

                {/* <Route path="submissions">
                  <Route index element={<SubmissionList />} />
                  <Route path="new" element={<NewSubbmision />} />
                </Route> */}
                <Route path="translations">
                  <Route index element={<TranslatePage />} />
                </Route>

                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path=":id" element={<EditUser />} />
                  <Route path="new" element={<NewUser />} />
                </Route>

                <Route path="problems">
                  <Route index element={<ProblemsList />} />
                  <Route path=":id" element={<EditProblem />} />
                  <Route path="new" element={<NewProblem />} />
                </Route>

                <Route path="submissions">
                  <Route index element={<SubmissionList />} />
                  <Route path="new/:problemID" element={<NewSubbmision />} />
                  <Route path="new" element={<NewSubbmision />} />
            
                </Route>

                <Route path="competitions">
                  <Route index element={<CompetitionsList />} />
                </Route>

                <Route path="translations">
                  <Route index element={<TranslatePage />} />
                </Route>

                <Route path="scoreboards">
                  <Route index element={<ScoreBoard />} />
                </Route>

                <Route path="announcements">
                  <Route index element={<AnnouncementList />} />
                  <Route path=":id" element={<FullAnnouncement />} />
                  <Route path="new" element={<NewAnnouncement />} />
                </Route>


              </Route>
            </Route>
          </Route>
        </Route>
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>

        </Route>
      </Route>
      <Route path="*" element={<Missing404 />} />
    </Routes>




  )
}


export default App;
