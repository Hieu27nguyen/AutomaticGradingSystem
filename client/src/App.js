
import { Routes, Route } from 'react-router-dom';
import './style/App.css';
import Login from './features/auth/Login';
import HomePage from './features/home/HomePage';
import Problem from './features/problems/ProblemsList';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import User from './features/users/UserList';
import Prefetch from './features/auth/Prefetch'
import useTitle from './hooks/useTitle';
import Missing404 from './Missing404';
import { ROLES } from './config/roles';




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
            {/* <Route path="/home" element={<HomePage />} /> */}
            
            <Route element={<RequireAuth allowedRoles={[ROLES.Judge, ROLES.Admin]} />}>
              <Route path="/users" element={<User />} />
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
