import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CartElements from './CartElements';




function Element({name, price, description, updateTotalItems}){
    const [counter, setCounter] = React.useState(0);
    const [totalPrice, setTotalPrice] = React.useState(0);
    


    const handleMinus = () => {
        if(counter > 0){
            setCounter(counter - 1);
            setTotalPrice(totalPrice - price);
        }
    };
    
    const handlePlus = () => {
        setCounter(counter + 1);
        setTotalPrice(totalPrice + price);
    };

    const handleAdd = () => {
        if(counter > 0){
            CartElements.push({ name: name, count: counter, totalPrice: totalPrice });
            updateTotalItems(counter);
            setCounter(0);
            setTotalPrice(0);
            
        }
    };

    return(
        <div className='elements'>
            <Card className='element-component' variant="outlined" sx={{margin: 5, maxWidth: 300,backgroundColor: "lightgrey" }} >
                <Box sx={{ p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            ${price}
                        </Typography>
                    </Stack>
                    <Typography color="text.secondary" variant="body2">
                        {description}
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2}}>
                    <div className='main-footer'>
                        <div className='element-footer'>
                            <text className='element-text'><b>No:</b> {counter}</text>
                            <Button size="small" sx={{fontSize:15, maxWidth: '20px', marginTop: 0.5, minWidth: '30px'}} variant="outlined"  onClick={handlePlus}>+</Button>
                            <Button size="small" sx={{fontSize:15, marginLeft: 1, marginTop: 0.5, maxWidth: '20px', minWidth: '30px'}}  variant="outlined"  onClick={handleMinus}>-</Button>
                        </div>
                        <Button color="secondary"  sx={{color:"green", fontSize: 20, width: 50, marginLeft:5}} onClick={handleAdd}> Add </Button>
                        
                    </div>
                </Box>
            </Card>
        </div>
    );
}

Element.defaultProps = {
    name: "Not given",
    price: 0,
    description: "No description given."
}

export default Element