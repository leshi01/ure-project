import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Agreement from './Agreement';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons, } from '@mui/x-data-grid';
import { saveMenuData, exportMenuData, importMenuData, resetMenuData } from '../utils/dataManager';


function DataGridDisplay({ menuItems, menuChange }) {
    const [rows, setRows] = useState(menuItems);
    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState("");
    const [rowModesModel, setRowModesModel] = React.useState({});

    // Function to update rows and save to localStorage
    const updateRowsAndSave = (newRows) => {
        setRows(newRows);
        saveMenuData(newRows);
        menuChange(newRows);
    };


    const handleOpen = (id) => {
        setOpen(true);
        setDeleteId(id);
    }
    const handleClose = () => setOpen(false);

    const handleAdd = () => {
        const id = rows.length + 1;
        const newRows = [...rows, { id, name: 'new', price: 0, description: 'No', category: 'All' }];
        updateRowsAndSave(newRows);
    };

    const handleDelete = () => {
        const updatedRowsDelete = rows.filter((row) => row.id !== deleteId);

        const updatedRowsId = updatedRowsDelete.map((row) => {
          if (row.id > deleteId) {
            return { ...row, id: row.id - 1 }; 
          }
          return row;
        });
      
        updateRowsAndSave(updatedRowsId);
        handleClose();
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        const newRows = rows.map((row) => (row.id === newRow.id ? updatedRow : row));
        updateRowsAndSave(newRows);
        return updatedRow;
    };
    
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleExport = () => {
        exportMenuData(rows);
    };

    const handleImport = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                try {
                    const importedData = await importMenuData(file);
                    updateRowsAndSave(importedData);
                    alert('Data imported successfully!');
                } catch (error) {
                    alert('Error importing data: ' + error.message);
                }
            }
        };
        fileInput.click();
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all data to the original state? This cannot be undone.')) {
            const originalData = resetMenuData();
            updateRowsAndSave(originalData);
            alert('Data has been reset to original state.');
        }
    };

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
                <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                    <Button color="primary" startIcon={<AddIcon />} onClick={handleAdd}>
                        Add record
                    </Button>
                    <Button variant="outlined" onClick={handleExport}>
                        Export Data
                    </Button>
                    <Button variant="outlined" onClick={handleImport}>
                        Import Data
                    </Button>
                    <Button variant="outlined" color="warning" onClick={handleReset}>
                        Reset to Original
                    </Button>
                </Box>
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