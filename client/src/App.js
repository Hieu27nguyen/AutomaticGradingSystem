
import { Routes, Route } from 'react-router-dom';
import './style/App.css';
import Login from './features/auth/Login';
import HomePage from './features/home/HomePage';
import Problem from './features/problems/ProblemsList';
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
import SubmissionsList from './features/submissions/submissionList';
import NewSubmission from './features/submissions/NewSubmission';


function App() {

  useTitle('Automatic Grading Contest')
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      {/* Protected Routes */}
      <Route element={<PersistLogin />}>
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
          <Route element={<Prefetch />}>
          <Route path="users">
                <Route index element={<UsersList />} />
                <Route path=":id" element={<EditUser />}></Route>
              </Route>
              <Route path="/newuser" element={<NewUser />} />
              
              <Route path="problems">
                <Route index element={<ProblemsList />} />
              </Route>
              <Route path="submissions">
                <Route index element={<SubmissionsList />} />
              </Route>
              <Route path="/newsubmission" element={<NewSubmission/>} />
              <Route path="/newproblem" element={<NewProblem/>} />
              <Route path="/competitions" element={<CompetitionsList />} />

            <Route element={<RequireAuth allowedRoles={[ROLES.Judge, ROLES.Admin]} />}>
              <Route path="users">
                <Route index element={<UsersList />} />
                <Route path=":id" element={<EditUser />}></Route>
              </Route>
              <Route path="/newuser" element={<NewUser />} />
              
              <Route path="problems">
                <Route index element={<ProblemsList />} />
              </Route>
              <Route path="submissions">
                <Route index element={<SubmissionsList />} />
              </Route>
              <Route path="/newsubmission" element={<NewSubmission/>} />
              <Route path="/newproblem" element={<NewProblem/>} />
              <Route path="/competitions" element={<CompetitionsList />} />
            </Route>
            



          </Route>
        </Route>


      </Route> {/* End Protected Routes */}

      <Route path="*" element={<Missing404 />} />
    </Routes>

  )
}


export default App;
