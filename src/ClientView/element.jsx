import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';


function Element({name, price, description, updateTotalItems, elements}){
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
            updateTotalItems(counter);
            setCounter(0);
            setTotalPrice(0);

            if(elements.length === 0){
                elements.push({ name: name, count: counter, totalPrice: totalPrice });
            }
            else{
                let found = false;
                {elements.map((item) => {
                    if (item.name === name) {
                        item.count += counter;
                        item.totalPrice += totalPrice;
                        found = true;
                    }
                })}
                if (!found) {
                    elements.push({ name: name, count: counter, totalPrice: totalPrice });
                }
            }
            
        }
    };

    return(
        <Paper elevation={15} sx={{
                        position: "relative",
                        left:"85%",
                        top: 650,
                        marginBottom: 10,
                        width:"50%",
                    }}>
            <Card className='element-component' variant="outlined" sx={{maxWidth: "100%", backgroundColor:"#d3d3d3" }} >
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
                        <Paper elevation={15} sx={{height: 44, width: 150,fontWeight: 'bold', fontFamily:""}}>
                            <Typography sx={{position: "relative", top: "10%", fontSize: 18}}><b>No:</b> {counter}</Typography>
                            <Button size="small" sx={{position: "relative", left: 110,top:-22 ,fontSize:15, maxWidth: '20px',  minWidth: '30px'}} variant="outlined"  onClick={handlePlus}>+</Button>
                            <Button size="small" sx={{position: "relative", left: 40,top:-22 ,fontSize:15,  maxWidth: '20px', minWidth: '30px'}}  variant="outlined"  onClick={handleMinus}>-</Button>
                        </Paper>
                        <Button color="secondary"  sx={{color:"green", fontSize: 20, width: 50, marginLeft:5}} onClick={handleAdd}> Add </Button>
                        
                    </div>
                </Box>
            </Card>
        </Paper>
    );
}

Element.defaultProps = {
    name: "Not given",
    price: 0,
    description: "No description given."
}

export default Element