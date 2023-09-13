import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store= {store}>
   <BrowserRouter>
    <Routes>
      <Route path ="/*" element={<App />} />
    </Routes>
   </BrowserRouter>
   </Provider>
  </React.StrictMode>
);


