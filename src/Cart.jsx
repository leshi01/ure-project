
import React, { useState } from 'react';
import CartIcon from './CartIcon';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import CartElements from './CartElements';



function Cart({totalItems, setTotalItems, elements, handlesetElements}){

    let total = 0;
    
    const handleDelete = (index, element) => {
        
        handlesetElements(index);
        
        if(totalItems > 0){
            setTotalItems(totalItems-element.count);
        }
    };


    return(
        <div className="cart-container">
            <div className='cart-header'>
                <CartIcon totalItems={totalItems} />
                <p className='cart-header-text'>Shoping Cart</p>
                
            </div>
            <Divider />
            
            {elements.map((element, index) => (
                

                <div className='cart-element' key={index}>
                    <p className='cart-element-text'>
                    <b> Name:</b> {element.name} <br/> <b> Amount:</b> {element.count}<br/> <b> Price:</b> ${element.totalPrice}
                    </p>
                    
                    <Tooltip title="Delete">
                        <IconButton sx={{marginLeft: 47, marginTop: -18}} onClick={() => handleDelete(index, element)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>   
                </div>
            ))}

            {elements.map((element) => {
                total += element.totalPrice;
            })}

            <Divider sx={{marginTop: 3}}/>
            <footer className='cart-footer'>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                        m: 1,
                        width: 230,
                        height: 50,
                        marginLeft: 4,
                        marginTop: 2,
                        fontSize:35,
                        fontFamily: "'Times New Roman', Times, serif",
                        textAlign: "center",
                        },
                    }}
                    >

                    <Paper elevation={3}> <b>Total: ${total}</b> </Paper>
                    
                </Box>
                <Button variant="contained" size='small' color="success" sx={{ maxHeight: 50, minWidth:100, borderRadius: 10, marginTop: 2,marginLeft:7}}>
                    Order
                </Button>
            </footer>
        </div>
    );
}

export default Cart