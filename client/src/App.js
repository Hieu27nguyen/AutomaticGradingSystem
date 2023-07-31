
import { Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
// import logo from './logo.svg';
import './style/App.css';
import Login from './features/auth/Login';
import HomePage from './features/auth/HomePage';
import Contestant from './features/auth/Contestant';


function App() {


  // return (
  //   <div className="App">
  //     {
  //       currentForm === "register" ? <Register onFormSwitch={toggleForm} /> : <Login onFormSwitch={toggleForm} />
  //     }
  //   </div>
  // );
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="home" element={<HomePage />} />
        <Route path="contestant" element={<Contestant />}>
        </Route>
      </Route>
    </Routes>
  )
}


export default App;
