import * as React from 'react';
import Data from '../Data';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'price', headerName: 'Price', type: 'number', width: 150, editable: true },
    { field: 'description', headerName: 'Description', editable: true, width: 200 },
    { field: 'category', headerName: 'Category', sortable: true, width: 160 },
];

function DataGridDisplay(){
    return(
        <div className='data-grid'>
            <Box sx={{ height: 600, width: 1000}}>
                <DataGrid
                    rows={Data}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{ backgroundColor: "white", textAlign:"center"}}
                    
                />
            </Box>
        </div>
    );
}


export default DataGridDisplay