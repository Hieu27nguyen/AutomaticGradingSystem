
import { Routes, Route } from 'react-router-dom';
import './style/App.css';
import Login from './features/auth/Login';
import HomePage from './features/home/HomePage';
import Problem from './features/problems/ProblemsList';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import Prefetch from './features/auth/Prefetch'
import useTitle from './hooks/useTitle';
import Missing404 from './Missing404';
import { ROLES } from './config/roles';
import UsersList from './features/users/UserList';
import EditUser from './features/users/EditUser'
import NewUser from './features/users/NewUser'
//import Register from './features/users/Register';


function App() {
 
  useTitle('Automatic Grading Contest')
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Protected Routes */}
      <Route element={<PersistLogin />}>
      <Route path="/login" element={<Login />} />
      
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
          <Route element={<Prefetch />}>
            <Route path="/home" element={<HomePage />} />
            
            <Route element={<RequireAuth allowedRoles={[ROLES.Judge, ROLES.Admin]} />}>
              <Route path="users">
                <Route index element= {<UsersList/>} />
                <Route path=":id" element={<EditUser/>}></Route>
              </Route>
              <Route path="/newuser" element={<NewUser/>}/>
              <Route path="/problems" element={<Problem />} />
            </Route>
          
          
          
          </Route>
        </Route>


      </Route> {/* End Protected Routes */}

      <Route path="*" element={<Missing404 />} />
    </Routes>

  )
}


export default App;
