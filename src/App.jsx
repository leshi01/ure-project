import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import CView from './ClientView/CView';
import OView from './OwnerView/OView';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Data from './Data';

function App() {
  const [userData, setUserData] = useState(Data);

  return (
    <Router>
      <div className='main-page'>
        <Stack direction="row" spacing={2} sx={{position: 'relative', left: "90%", top: 300}}>
          <Link to="/cview">
            <Button variant="contained">Client</Button>
          </Link>
          <Link to="/oview">
            <Button variant="contained">Administrator</Button>
          </Link>
        </Stack>

        <Routes>
          <Route path="/cview" element={<CView userData={userData} setUserData={setUserData} />} />
          <Route path="/oview/*" element={<OView userData={userData} setUserData={setUserData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
