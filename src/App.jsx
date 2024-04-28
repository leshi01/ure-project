import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import Data from './Data';
import CView from './ClientView/CView';
import OView from './OwnerView/OView';

function App() {
  const [menuItems, setmenuItems] = React.useState(Data);
  const navigate = useNavigate();

  const menuChange = (newMenu) => {
    setmenuItems(newMenu);
  }

  const userLogIn = (name, pass) => {
    if (name === "admin" && pass === "admin") {
      navigate('/oview'); 
    }else{
      navigate('/cview'); 
    }
  }

  const goToLoginPage = () => {
    navigate('/loginPage'); 
  }

  return (
      <div className='main-page'>
        <Routes>
          <Route path="/loginPage" element={<SignIn userLogIn={userLogIn} />} />
          <Route path="/cview" element={<CView menuItems={menuItems} />} />
          <Route path="/oview/*" element={<OView menuItems={menuItems} menuChange={menuChange} goToLoginPage={goToLoginPage}/>} />
        </Routes>
      </div>
  );
}

export default App;
