import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { Form } from 'react-router-dom';

const columns = [
  { field: 'name', headerName: 'Ingredient Name', width: 350 },
  { field: 'amount', headerName: 'Ingredient Amount', width: 300 },
  { field: 'type', headerName: 'Ingredient Type', width: 300 },
  { field: 'expiration', headerName: 'Expiration', width: 200 },
];

export default function EventsGrid() {
  const [rows, setRows] = React.useState([
    { id: 1, name: 'Carrot', amount: '5', type: 'Vegetable', expiration: '2024-12-31' },
    { id: 2, name: 'Apple', amount: '10', type: 'Fruit', expiration: '2024-12-15' },
    { id: 3, name: 'Milk', amount: '2 liters', type: 'Dairy', expiration: '2024-12-10' },
    { id: 4, name: 'Chicken', amount: '3 kg', type: 'Meat', expiration: '2024-12-20' },
    { id: 5, name: 'Cabbage', amount: '1', type: 'Vegetable', expiration: '2025-1-22' },
    { id: 6, name: 'Orange', amount: '2', type: 'Fruit', expiration: '2024-12-15' },
    { id: 7, name: 'Ketchup', amount: '1 liters', type: 'Condiments', expiration: '2024-12-02' },
    { id: 8, name: 'Peas', amount: '3 kg', type: 'Vegetable', expiration: '2024-12-20' },
    { id: 9, name: 'Salt', amount: '5', type: 'Condiment', expiration: '2024-12-31' },
    { id: 10, name: 'Spaghetti', amount: '1 kg', type: 'Grains', expiration: '2024-12-15' },
    { id: 11, name: 'Tomato', amount: '2', type: 'Vegetable', expiration: '2024-12-10' },
    { id: 12, name: 'Potato', amount: '3', type: 'Vegetable', expiration: '2024-12-20' },
    { id: 13, name: 'Lettuce', amount: '1', type: 'Vegetable', expiration: '2025-1-22' },
    { id: 14, name: 'Spinach', amount: '2', type: 'Vegetable', expiration: '2024-12-15' },
    { id: 15, name: 'Beef', amount: '1', type: 'Meat', expiration: '2024-12-02' },
    { id: 16, name: 'Pork', amount: '3', type: 'Meat', expiration: '2024-12-20' },
    { id: 17, name: 'Egg', amount: '12', type: 'Dairy', expiration: '2024-12-02' },
    { id: 18, name: 'Bread', amount: '3', type: 'Grains', expiration: '2024-12-20' },
    { id: 19, name: 'Flour', amount: '3 kg', type: 'Grains', expiration: '2024-12-20' },
    { id: 20, name: 'Sugar', amount: '1 kg', type: 'Condiments', expiration: '2024-12-02' },
    { id: 21, name: 'Butter', amount: '3', type: 'Dairy', expiration: '2024-12-20' },
    { id: 22, name: 'Tea', amount: '10', type: 'Drink', expiration: '2024-12-20' },
    { id: 23, name: 'Milk', amount: '1 gal', type: 'Drink', expiration: '2024-12-30' },
    { id: 24, name: 'Cheddar cheese', amount: '1 lb', type: 'Dairy', expiration: '2024-12-11' },
  ]);
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
    if (ingredientInput.name && ingredientInput.amount && ingredientInput.type) {
      const newRow = {
        id: rows.length + 1,
        ...ingredientInput,
      };
      setRows([...rows, newRow]);
      setIngredientInput({ name: '', amount: '', type: '' , expiration:'' });
      setShowForm(false);
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
    setRows(remainingRows);
    setSelectedRows([]);
  };

   

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
