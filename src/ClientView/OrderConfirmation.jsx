import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function OrderConfirmation({showOrderConfirm, setShowOrderConfirm, doOrder}){
    const [open, setOpen] = React.useState(showOrderConfirm);

    

    const handleClose = () => {
        setOpen(false);
        setShowOrderConfirm(false);
    };

    const handleAgree = () => {
        handleClose();
        doOrder();
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{ textAlign:"center"}}
            >
                <DialogTitle >{"Order confirmation"}</DialogTitle>
                <DialogContent >
                <DialogContentText  id="alert-dialog-slide-description">
                    Do you agree on making this order?
                </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display:"flex", marginRight:8}}>
                    <Button color="secondary" onClick={handleClose}>Disagree</Button>
                    <Button color="success" onClick={handleAgree}>Agree</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );

}

export default OrderConfirmation