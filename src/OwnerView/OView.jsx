import * as React from 'react';
import DataGridDisplay from './DataGridDisplay';
import App from '../App';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';



  
function OView(){
    return(
        <>
            
            <Link to="/main">
                <Button variant="contained">Main</Button>
            </Link>
            <Routes>
                <Route path="/main" element={<App/>} />
            </Routes>

            
            <DataGridDisplay/>
        </>
    );
}


export default OView