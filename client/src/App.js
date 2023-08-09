
import {Routes ,Route} from 'react-router-dom';
import Layout from "./components/Layout";
import './style/App.css';
import Login from './features/auth/Login';
import HomePage from './features/home/HomePage';
import Problem from './features/problems/ProblemsList';
import useTitle from './hooks/useTitle';
import Missing404 from './Missing404';



function App() {
  // return (
  //   <div className="App">
  //     {
  //       currentForm === "register" ? <Register onFormSwitch={toggleForm} /> : <Login onFormSwitch={toggleForm} />
  //     }
  //   </div>
  // );
  useTitle('Automatic Grading Contest')
  return (
    <Routes>
      <Route exact path="/" element={<Layout/>}>
        <Route index element = {<Login/>} />
        <Route path="home" element={<HomePage/>}/>
      
      </Route>
      <Route exact path="/problem" element={<Problem/>} />
      <Route path="*" element={<Missing404 />}/>  Always redirected to homepage if requested a missing resources
    </Routes>
  )
}


export default App;
