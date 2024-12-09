import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

// BACKEND: refer to 'field' variable
const columns = [
  { field: 'name', headerName: 'Recipe Name', width: 325 },
  { field: 'type', headerName: 'Type of Recipe', width: 175 },
  { field: 'cuisine', headerName: 'Cuisine', width: 175 },
  { field: 'ingredients', headerName: 'Ingredients', width: 350 },
  { field: 'preparable', headerName: 'Preparable?', width: 125 },
];

export default function EventsGrid() {
  const [rows, setRows] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]); // For selected rows

  // Save selected recipes
  const handleSaveSelected = () => {
    if (selectedRows.length === 0) {
      alert('No recipes selected.');
      return;
    }
    
    return; // BACKEND TO-DO
  };

  return (
    <Box>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        {/* Save Recipes Button */}
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
          Save Selected Recipes
        </button>
      </div>

    <Box sx={{ height: 631, width: '99%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{ field: 'preparable', sort: 'desc' }], // Default show preparable recipes first
          },
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
            noRowsLabel: 'No recipes on website. Databases haven\'t been populated yet',
        }}
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection); // Update the selected rows state
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
