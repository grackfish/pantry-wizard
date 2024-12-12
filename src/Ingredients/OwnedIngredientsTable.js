import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { Form } from 'react-router-dom';
import axios from 'axios';

const columns = [
  { field: 'name', headerName: 'Ingredient Name', width: 350 },
  { field: 'amount', headerName: 'Ingredient Amount', width: 300 },
  // { field: 'type', headerName: 'Ingredient Type', width: 300 },
  { field: 'expiration', headerName: 'Expiration', width: 200 },
];

export default function EventsGrid() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://127.0.0.1:5000/pantry/get/')
        .then((response) => setRows(response.data.payload))
        .catch((error) => console.error(error));
}, []);
  const [ingredientInput, setIngredientInput] = React.useState({ name: '', amount: '', type: '', expiration:'' });  // Allowing user to input ingredient data
  const [showForm, setShowForm] = React.useState(false); // Control visibility of adding ingredient form 
  const [selectedRows, setSelectedRows] = React.useState([]); // For removing selected rows

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setIngredientInput({ ...ingredientInput, [name]: value });
  };

  // Add an ingredient on form
  const handleAddIngredient = () => {
    if (ingredientInput.name && ingredientInput.amount && ingredientInput.type && ingredientInput.expiration) {
      const newRow = {
        id: rows.length + 1,
        ...ingredientInput,
      };

      const postData = {
        name: ingredientInput.name,
        amount: ingredientInput.amount,
        type: ingredientInput.type,
        expiration : ingredientInput.expiration,
      }

      setRows([...rows, newRow]);
      setIngredientInput({ name: '', amount: '', type: '' , expiration:'' });
      setShowForm(false);
      axios.post('http://127.0.0.1:5000/pantry/add/', postData)
            .then((response) => {
                console.log('Response from server:', response.data);
            })
            .catch((error) => console.error('Error during POST request:', error));
    } else {
      alert('Please fill in all fields.');
    }
  };

  // Remove selected ingredients
  const handleRemoveSelected = () => {
    if (selectedRows.length === 0) {
      alert('No ingredients selected.');
      return;
    }
    const remainingRows = rows.filter((row) => !selectedRows.includes(row.id));
    const deletedRows = rows.filter((row) => selectedRows.includes(row.id))
    axios.post('http://127.0.0.1:5000/pantry/delete/', deletedRows)
            .then((response) => {
                console.log('Response from server:', response.data);
            })
            .catch((error) => console.error('Error during POST request:', error));
    setRows(remainingRows);
    setSelectedRows([]);
  };

   

  React.useEffect(() => {
    axios.get('http://127.0.0.1:5000/pantry/get/')
        .then((response) => setRows(response.data.payload))
        .catch((error) => console.error(error));
}, []);


  return (
    <Box>
      {/* Make sure there is a gap between two buttons */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        {/* Add Ingredient Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
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
            Add New Ingredient
          </button>
        )}

        {/* Remove Selected Button */}
        <button
          onClick={handleRemoveSelected}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
          }}
        >
          Remove Selected Ingredients
        </button>
      </div>

      {/* Form for adding new ingredient */}
      {showForm && (
        <div>
          <Typography variant="h6">Add  Ingredient:</Typography>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '20px',
            }}
          >
            <input
              type="text"
              name="name"
              value={ingredientInput.name}
              onChange={handleInputChange}
              placeholder="Ingredient Name"
              style={{ padding: '10px', fontSize: '16px' }}
            />
            <input
              type="number"
              name="amount"
              value={ingredientInput.amount}
              onChange={handleInputChange}
              placeholder="Amount (e.g., 2)"
              style={{ padding: '10px', fontSize: '16px' }}
            />
            <input
              type="text"
              name="type"
              value={ingredientInput.type}
              onChange={handleInputChange}
              placeholder="Type (e.g., vegetable)"
              style={{ padding: '10px', fontSize: '16px' }}
            />
            <input
              type="date"
              name="expiration"
              value={ingredientInput.expiration}
              onChange={handleInputChange}
              placeholder="Expiration Date(e.g., 2022-12-31)"
              style={{ padding: '10px', fontSize: '16px' }}
            />
            <button
              type="button"
              onClick={handleAddIngredient}
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
              Add Ingredient
            </button>
          </form>
        </div>
      )}

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
          sorting: {
            sortModel: [{ field: 'name', sort: 'asc' }], // Default alphabetical sorting by 'name'
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        localeText={{
            noRowsLabel: 'No owned ingredients. Add some ingredients to start finding recipes!',
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
