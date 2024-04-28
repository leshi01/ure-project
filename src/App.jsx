import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Data from './Data';
import CView from './ClientView/CView';
import OView from './OwnerView/OView';

function App() {
  const [userData, setUserData] = React.useState(Data);

  const userLogIn = (name, pass) => {
    if (name === "admin" && pass === "admin") {
      window.location.href = '/oview'; 
    }else{
      window.location.href = '/cview';
    }
  }

  return (
    <Router>
      <div className='main-page'>
        <Routes>
          <Route path="/" element={<SignIn userLogIn={userLogIn}  />} />
          <Route path="/cview" element={<CView userData={userData} setUserData={setUserData} />} />
          <Route path="/oview/*" element={<OView userData={userData} setUserData={setUserData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
