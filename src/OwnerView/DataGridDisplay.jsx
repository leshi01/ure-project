import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Agreement from './Agreement';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons, } from '@mui/x-data-grid';


function DataGridDisplay({ menuItems, menuChange }) {
    const [rows, setRows] = useState(menuItems);
    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState("");
    const [rowModesModel, setRowModesModel] = React.useState({});


    const handleOpen = (id) => {
        setOpen(true);
        setDeleteId(id);
    }
    const handleClose = () => setOpen(false);

    const handleAdd = () => {
        const id = rows.length + 1;
        setRows([...rows, { id, name: 'new', price: 0, description: 'No', category: 'All' }]);
    };

    const handleDelete = () => {
        const updatedRowsDelete = rows.filter((row) => row.id !== deleteId);

        const updatedRowsId = updatedRowsDelete.map((row) => {
          if (row.id > deleteId) {
            return { ...row, id: row.id - 1 }; 
          }
          return row;
        });
      
        setRows(updatedRowsId);
        handleClose();
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };
    
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };


    React.useEffect(() => {
        menuChange(rows);
    }, [rows, menuChange]);

    const columnsWithActions = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150, editable: true },
        { field: 'price', headerName: 'Price', type: 'number', width: 150, editable: true },
        { field: 'description', headerName: 'Description', editable: true, width: 300 },
        { field: 'category', headerName: 'Category', sortable: true, width: 160, editable: true },
        { field: 'delete', headerName: '', width: 50, sortable: false,
            renderCell: (params) => (
                <IconButton variant="inherit" color="primary" onClick={() => handleOpen(params.row.id)} >
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <div className='data-grid'>
            <Agreement open={open} handleClose={handleClose} handleDelete={handleDelete}/>
            <Box sx={{ height: 500, width: 1000 }}>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleAdd}>
                    Add record
                </Button>
                <DataGrid
                    rows={rows}
                    columns={columnsWithActions}
                    pageSize={10}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    processRowUpdate={processRowUpdate}
                    sx={{ backgroundColor: "white", textAlign: "center" }}
                />
            </Box>
        </div>
    );
}

export default DataGridDisplay;