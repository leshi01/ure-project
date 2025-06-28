import React, { useState, useEffect } from 'react';
import CartIcon from './CartIcon';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import Receipt from './Receipt';
import OrderConfirmation from './OrderConfirmation';



function Cart({totalItems, setTotalItems, elements, handlesetElements}){

    const [receiptElements, setReceiptElements] = React.useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showOrderConfirm, setShowOrderConfirm] = useState(false);
    const [showReceipt, setshowReceipt] = useState(false);


    const updateReceipt = () =>{
        setReceiptElements(prevElements => [...prevElements, ...elements]);
    }


    let total = 0;
    
    const handleDelete = (index, element) => {
        handlesetElements(index);
        
        
        if(totalItems > 0){
            setTotalItems(totalItems-element.count);
        }
    };
    
    const emptyCartElements = () =>{
        elements.map((element, index) => (
            handleDelete(index, element)
        ))
    }

    const displayWarningAlert = () => {
        return (
            <div className='alert-div' >
                <Alert severity="warning"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => setShowAlert(false)}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                    
                    <AlertTitle>Warning</AlertTitle>
                    Your order list is empty.
                </Alert>
            </div>
        );
    }

    const doOrder = () => {
        updateReceipt();
        setshowReceipt(true);
        setTimeout(() => {
            emptyCartElements();
        }, 10);
    }

    const handleOrder = () =>{
        if(totalItems == 0){
            setShowAlert(true);
            setTimeout(() => {
            setShowAlert(false);
            }, 5000);
        }else{
            setShowOrderConfirm(true);
        }
    }

    return(

        <>
            {showAlert && displayWarningAlert()}
            {showOrderConfirm && <OrderConfirmation showOrderConfirm={showOrderConfirm} setShowOrderConfirm={setShowOrderConfirm} doOrder={doOrder}/>}
            
            <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1,
                    width: "30%",
                    height: 565,
                    top: 50,
                    position: 'fixed',
                    fontFamily: "'Times New Roman', Times, serif",
                    backgroundColor:"#76876f",
                    },
                }}
            >
                
            <Paper elevation={15} sx={{maxHeight: "100%", position: "static", overflow: "auto", top: 20,}}>
                <div className='cart-header'>
                    <CartIcon totalItems={totalItems} />
                    <p className='cart-header-text'>Main Order</p>
                    
                </div>
                <Divider />
                {showReceipt && <Receipt receiptElements={receiptElements}/>}
                
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
                <div className='cart-footer'>

                    <Paper elevation={10} sx={{fontSize:"250%",minWidth: "55%", maxHeight: "60%", marginTop: 2, marginLeft:4, textAlign:"center"}}> <b>Total: ${total.toFixed(1)}</b> </Paper>      

                    <Button variant="contained" size='small' color="success" onClick={handleOrder} sx={{fontSize:20, maxHeight: "60%", minWidth:"25%",marginTop: 2, marginLeft:4,  borderRadius: 7}}>
                        Order
                    </Button>

                </div>
            </Paper>

            </Box>
        </>
    );
}

export default Cart