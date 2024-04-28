import * as React from 'react';
import DataGridDisplay from './DataGridDisplay';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  
function OView({menuItems, menuChange, goToLoginPage}){
    console.log(menuItems);

    return(
        <>   

            <button type='button' onClick={goToLoginPage}>LoginPage</button>
            <DataGridDisplay menuItems={menuItems} menuChange={menuChange}/>
        </>
    );
}


export default OView