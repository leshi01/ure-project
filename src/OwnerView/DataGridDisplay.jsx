import React, { useState } from 'react';
import Data from '../Data';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';

function DataGridDisplay() {
    const [rows, setRows] = useState(Data);

    const handleAdd = () => {
        const id = rows.length + 1;
        setRows([...rows, { id, name: '', price: '', description: '', category: '' }]);
    };

    const handleDelete = (id) => {
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
    };

    const columnsWithActions = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150, editable: true },
        { field: 'price', headerName: 'Price', type: 'number', width: 150, editable: true },
        { field: 'description', headerName: 'Description', editable: true, width: 300 },
        { field: 'category', headerName: 'Category', sortable: true, width: 160 },
        {
            field: 'actions',
            headerName: '',
            width: 50,
            sortable: false,
            renderCell: (params) => (
                <IconButton
                    variant="inherit"
                    color="primary"
                    onClick={() => handleDelete(params.row.id)}
                >
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <div className='data-grid'>
            <Box sx={{ height: 500, width: 1000 }}>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleAdd}>
                    Add record
                </Button>
                <DataGrid
                    rows={rows}
                    columns={columnsWithActions}
                    pageSize={10}
                    sx={{ backgroundColor: "white", textAlign: "center" }}
                />
            </Box>
        </div>
    );
}

export default DataGridDisplay;