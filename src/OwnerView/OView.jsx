import * as React from 'react';
import DataGridDisplay from './DataGridDisplay';
  
function OView({menuItems, menuChange, goToLoginPage}){

    return(
        <>   
            <button type='button' onClick={goToLoginPage}>LoginPage</button>
            <DataGridDisplay menuItems={menuItems} menuChange={menuChange}/>
        </>
    );
}


export default OView