import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import { Modal as BaseModal } from '@mui/material'; 
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';


function DataGridDisplay({ menuItems, menuChange }) {
    const [rows, setRows] = useState(menuItems);
    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState("");

    const handleOpen = (id) => {
        setOpen(true);
        setDeleteId(id);
    }
    const handleClose = () => setOpen(false);

    const handleAdd = () => {
        const id = rows.length + 1;
        setRows([...rows, { id, name: '', price: '', description: '', category: '' }]);
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


    React.useEffect(() => {
        menuChange(rows);
    }, [rows, menuChange]);

    const columnsWithActions = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150, editable: true },
        { field: 'price', headerName: 'Price', type: 'number', width: 150, editable: true },
        { field: 'description', headerName: 'Description', editable: true, width: 300 },
        { field: 'category', headerName: 'Category', sortable: true, width: 160, editable: true },
        {
            field: 'actions',
            headerName: '',
            width: 50,
            sortable: false,
            renderCell: (params) => (
                <IconButton
                    variant="inherit"
                    color="primary"
                    onClick={() => handleOpen(params.row.id)}
                >
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <div className='data-grid'>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
            >
                <ModalContent sx={{display: "inline-block", width: 350 }}>
                    <h2 id="unstyled-modal-title" className="modal-title">
                        Do you agree to delete this element?
                    </h2>
                    <Button variant="text" sx={{ minWidth: 170}} onClick={handleDelete}>Yes</Button>
                    <Button variant="text" sx={{ minWidth: 170}} onClick={handleClose}>No</Button>
                </ModalContent>
            </Modal>
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


const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
      <div
        className={clsx({ 'base-Backdrop-open': open }, className)}
        ref={ref}
        {...other}
      />
    );
  });
  
  Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;
  
  const ModalContent = styled('div')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
      padding: 24px;
      color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  
      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }
  
      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `,
  );


export default DataGridDisplay;