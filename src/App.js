import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ActiveRoute from './components/ActiveRoute';
import Error from './pages/PageError';  
import UserProfil from './pages/UserProfil';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route element={<ActiveRoute />}>
          <Route path='/user-profil' element={<UserProfil />} />
        </Route>
        <Route path='*' element={<Error />} />  
      </Routes>
    </BrowserRouter>
  );
};


export default App;
