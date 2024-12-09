import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { Form } from 'react-router-dom';


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
  const [newRecipeName, setNewRecipeName] = React.useState('');
  const [newRecipeType, setNewRecipeType] = React.useState('');
  const [newRecipeCuisine, setNewRecipeCuisine] = React.useState('');
  const [newRecipeIngredients, setNewRecipeIngredients] = React.useState('');
  const [newRecipeInstructions, setNewRecipeInstructions] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState([]); // For removing selected rows
  const [showForm, setShowForm] = React.useState(false); // Control visibility of adding ingredient form 


  const handleAddRecipe = () => {
    if (newRecipeName.trim() && newRecipeType.trim() && newRecipeCuisine.trim() && newRecipeIngredients.trim() && newRecipeInstructions) {
      const newRecipe = {
        id: rows.length + 1,
        name: newRecipeName,
        type: newRecipeType,
        cuisine: newRecipeCuisine,
        ingredients: newRecipeIngredients,
        instructions: newRecipeInstructions
      };
      setRows([...rows, newRecipe]);
      // Reset input fields
      setNewRecipeName('');
      setNewRecipeType('');
      setNewRecipeCuisine('');
      setNewRecipeIngredients('');
      setNewRecipeInstructions('');
    } else {
      alert('All fields are required!');
    }
    setShowForm(false);
  };

  // Remove selected ingredients
  const handleDeleteSelected = () => {
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
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        {/* Create New Recipe Button */}
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
            Create Recipe
          </button>
        )}

        {/* Remove Recipes Button */}
        <button
          onClick={handleDeleteSelected}
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
          Remove Recipes
        </button>
      </div>

      <Dialog open={showForm} onClose={() => setShowForm(false)}>
        <DialogTitle>Create New Recipe</DialogTitle>
        <DialogContent>
          <TextField
            label="Recipe Name"
            fullWidth
            margin="dense"
            value={newRecipeName}
            onChange={(e) => setNewRecipeName(e.target.value)}
          />
          <TextField
            label="Type of Recipe"
            fullWidth
            margin="dense"
            value={newRecipeType}
            onChange={(e) => setNewRecipeType(e.target.value)}
          />
          <TextField
            label="Type of Cuisine"
            fullWidth
            margin="dense"
            value={newRecipeCuisine}
            onChange={(e) => setNewRecipeCuisine(e.target.value)}
          />
          <TextField
            label="Ingredients"
            fullWidth
            margin="dense"
            value={newRecipeIngredients}
            onChange={(e) => setNewRecipeIngredients(e.target.value)}
            multiline // Enables multiple lines
            minRows={2}
            sx={{
              '& .MuiInputBase-root': {
                padding: '16px',
              },
            }}
          />
          <TextField
            label="Instructions"
            fullWidth
            margin="dense"
            value={newRecipeInstructions}
            onChange={(e) => setNewRecipeInstructions(e.target.value)}
            multiline // Enables multiple lines
            minRows={5}
            sx={{
              '& .MuiInputBase-root': {
                padding: '16px',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddRecipe} color="primary">
            Save
          </Button>
          <Button onClick={() => setShowForm(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      

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
            noRowsLabel: 'No recipes saved. Create a new recipe or check out the explore tab to save some recipes and get started!',
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
