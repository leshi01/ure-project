import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    tableContainer: {
      maxWidth: 600,
      margin: 'auto',
      marginTop: 50,
    },
    title: {
      textAlign: 'center',
      marginBottom: 20,
    },
    totalRow: {
      fontWeight: 'bold',
    },
});


function Receipt({receiptElements}){
    const classes = useStyles();

  
    let total = 0;

    receiptElements.map((element) => {
        total += element.totalPrice;
    })

  
    return (
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Typography variant="h5" className={classes.title}>
          Online Receipt
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Element Name</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receiptElements.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.count}</TableCell>
                <TableCell align="right">${item.totalPrice.toFixed(2)}</TableCell>
                <TableCell align="right">${(item.count * item.totalPrice).toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow className={classes.totalRow}>
              <TableCell colSpan={3}>Total Price</TableCell>
              <TableCell align="right">${total.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default Receipt;