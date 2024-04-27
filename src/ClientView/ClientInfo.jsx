import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';


function ClientInfo(){
    return(
        <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: "30%",
                height: 500,
                top: 100,
                left: "68%",
                position: 'fixed',
                fontFamily: "'Times New Roman', Times, serif",
                },
            }}
        >
            <Paper elevation={15} sx={{maxHeight: "100%", position: "static", overflow: "auto", top: 20,}}>

                <div className='cart-header' style={{height: "17%"}}>
                    <p className='cart-header-text' >Client Information</p>                    
                </div>
                <Divider />


            <div className='client-textfield'>
                <br></br>
                <TextField
                    required
                    id="filled-required"
                    label="Name"
                    variant="filled"
                />
                <br></br>
                <TextField
                    required
                    id="filled-required"
                    label="Table number"
                    variant="filled"
                />
                <br></br>
                <TextField
                    required
                    id="filled-number"
                    label="Number of people"
                    type="number"
                    variant="filled"
                    inputProps={{ min: 0 }}
                />
                <br></br>
                <TextField
                    id="filled-helperText"
                    label="Description"
                    variant="filled"
                />
            </div>  
                
            </Paper>
        </Box>
    );
}

export default ClientInfo