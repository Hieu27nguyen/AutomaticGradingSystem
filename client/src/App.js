
import { Routes, Route } from 'react-router-dom';
import './style/App.css';
import Login from './features/auth/Login';
import HomePage from './features/home/HomePage';
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
import EditProblemForm from './features/problems/EditProblemForm';
import Layout from './components/Layout';
import DashLayout from './components/DashLayout'
function App() {

  useTitle('Automatic Grading Contest')
  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Login />} />
         <Route path='/test' element={<HomePage/>}></Route>
        <Route element={<PersistLogin />}>
          <Route path="/login" element={<Login />} />

          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />} >
            <Route element={<Prefetch />}>
              <Route path="home" element={<DashLayout />}>
                <Route index element={<WelcomePage />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.Judge, ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUser />} />
                  </Route>

                  <Route path="problems">
                    <Route index element={<ProblemsList />} />
                    <Route path=":id" element={<EditProblemForm />} />
                    <Route path="new" element={<NewProblem />} />
                  </Route>

                  <Route path="competitions">
                    <Route index element={<CompetitionsList />} />
                  </Route>
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




    // <Routes>
    //   <Route path="/" element={<Login />} />
    //   <Route path="/home" element={<HomePage />} />
    //   <Route path="/welcome" element={<WelcomePage/>}></Route>
    //   {/* Protected Routes */}
    //   <Route element={<PersistLogin />}>
    //     <Route path="/login" element={<Login />} />

    //     <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
    //       <Route element={<Prefetch />}>


    //         <Route element={<RequireAuth allowedRoles={[ROLES.Judge, ROLES.Admin]} />}>
    //           <Route path="users">
    //             <Route index element={<UsersList />} />
    //             <Route path=":id" element={<EditUser />}></Route>
    //           </Route>
    //           <Route path="/newuser" element={<NewUser />} />

    //            <Route path="problems">
    //             <Route index element={<ProblemsList />} />
    //           </Route>
    //           <Route path="/newproblem" element={<NewProblem/>} />
    //           <Route path="/competitions" element={<CompetitionsList />} />
    //         </Route>




    //       </Route>
    //     </Route>


    //   </Route> {/* End Protected Routes */}

    //   <Route path="*" element={<Missing404 />} />
    // </Routes>

  )
}


export default App;
