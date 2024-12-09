import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, TextField } from '@mui/material';
import { Form } from 'react-router-dom';

// BACKEND: refer to 'field' variable
const columns = [
  { field: 'name', headerName: 'Ingredient Name', width: 350 },
  { field: 'amount', headerName: 'Ingredient Amount', width: 300 },
  { field: 'type', headerName: 'Ingredient Type', width: 300 },
  { field: 'expiration', headerName: 'Expiration', width: 200 },
];

export default function EventsGrid() {
  const [rows, setRows] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]); // For selected rows

  // Save selected ingredients
  const handleSaveSelected = () => {
    if (selectedRows.length === 0) {
      alert('No ingredients selected.');
      return;
    }
    
    return; // BACKEND TO-DO
  };

  return (
    <Box>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        {/* Save Ingredients Button */}
        <button
          onClick={handleSaveSelected}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
          }}
        >
          Save Selected Ingredients
        </button>
      </div>

    <Box sx={{ height: 631, width: '99%' }}>
 
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        localeText={{
            noRowsLabel: 'No ingredients on website. Databases haven\'t been populated yet',
        }}
        sx={{
          '& .MuiDataGrid-cell': {
            color: 'white', // Set content text color to white
          },
          '& .MuiDataGrid-columnHeader': {
            color: 'inherit', // Keep column header color as is
          },
          '& .MuiDataGrid-footerCell': {
            color: 'inherit', // Keep footer cell color as is
          },
          '& .MuiDataGrid-footer': {
            color: 'white', // Set footer text color to white
          },
          '& .MuiDataGrid-cell:hover': {
            backgroundColor: 'gray !important', // Cell hover background color
          },
          '& .MuiCheckbox-root': {
            color: 'white !important', // Checkbox color for rows
          },
          '& .MuiDataGrid-columnHeader .MuiCheckbox-root': {
            color: 'inherit !important', // Keep checkbox color in header as is
          },
          '& .MuiDataGrid-cell .MuiCheckbox-root': {
            color: 'white !important', // Ensure checkboxes in cells are white
          },
          '& .MuiIconButton-root': {
            color: 'white !important', // Pagination arrow icon color
          },
          '& .MuiPagination-root': {
            color: 'white !important', // Pagination text color
          },
          '& .MuiPaginationItem-root': {
            color: 'white !important', // Pagination item text color
          },
          '& .MuiTablePagination-root': {
            color: 'white !important', // Set the footer text color to white
          },
          '& .MuiDataGrid-overlay': {
            color: 'white', // Set "No rows" text color to white
          },
          // Highlight entire row on hover
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'gray !important', // Highlight row color
          },
          // Sorting arrow icons color
          '& .MuiDataGrid-columnHeader .MuiSvgIcon-root': {
            color: 'black !important', // Sorting arrow icon color
          },
        }}
      />
    </Box>
    </Box>
  );
}
