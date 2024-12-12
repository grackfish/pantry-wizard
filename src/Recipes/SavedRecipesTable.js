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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function EventsGrid() {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    axios.get('http://127.0.0.1:5000/recipes/get/')
        .then((response) => setRows(response.data.payload))
        .catch((error) => console.error(error));
}, []);

  const [newRecipeName, setNewRecipeName] = React.useState('');
  const [newRecipeType, setNewRecipeType] = React.useState('');
  const [newRecipeCuisine, setNewRecipeCuisine] = React.useState('');
  const [newRecipeIngredients, setNewRecipeIngredients] = React.useState('');
  const [newRecipeInstructions, setNewRecipeInstructions] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState([]); // For removing selected rows
  const [showForm, setShowForm] = React.useState(false); // Control visibility of adding ingredient form 
  const [selectedRecipe, setSelectedRecipe] = React.useState(null);
  const navigate = useNavigate(); // React Router navigate hook


  const handleAddRecipe = () => {
    if (newRecipeName.trim() && newRecipeType.trim() && newRecipeCuisine.trim() && newRecipeIngredients.trim() && newRecipeInstructions.trim()) {
      const payload = {
        name: newRecipeName,
        type: newRecipeType,
        cuisine: newRecipeCuisine,
        ingredients: newRecipeIngredients,
        instructions: newRecipeInstructions,
      };

      axios.post('http://127.0.0.1:5000/recipes/add/', payload)
            .then((response) => {
                console.log('Response from server:', response.data);
                const newRecipe = {
                  id: response.data.id,
                  name: newRecipeName,
                  type: newRecipeType,
                  cuisine: newRecipeCuisine,
                  ingredients: newRecipeIngredients,
                  instructions: newRecipeInstructions,
                }
                setRows([...rows, newRecipe]);
            })
            .catch((error) => console.error('Error during POST request:', error));

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
    console.log(selectedRows);
    if (selectedRows.length === 0) {
      alert('No ingredients selected.');
      return;
    }
    
    const remainingRows = rows.filter((row) => !selectedRows.includes(row.id));
    const deletedRows = rows.filter((row) => selectedRows.includes(row.id));
    axios.post('http://127.0.0.1:5000/recipes/delete/', deletedRows)
            .then((response) => {
                console.log('Response from server:', response.data);
            })
            .catch((error) => console.error('Error during POST request:', error));
    setRows(remainingRows);
    setSelectedRows([]);
  };

  const handleOpenRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseDialog = () => {
    setSelectedRecipe(null);
  };


  // BACKEND: refer to 'field' variable
const columns = [
  { field: 'name', headerName: 'Recipe Name', width: 250 },
  { field: 'type', headerName: 'Type of Recipe', width: 175 },
  { field: 'cuisine', headerName: 'Cuisine', width: 175 },
  { field: 'ingredients', headerName: 'Ingredients', width: 350 },
  { field: 'preparable', headerName: 'Preparable?', width: 125 },
  // Add a column for adding buttons to view recipe
  {
    field: 'view',
    headerName: 'View Recipe',
    width: 150,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenRecipe(params.row)}
      >
        View Recipe
      </Button>
    ),
  },
];

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
            label="Cuisine"
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
            noRowsLabel: 'No recipes saved. Check out the explore tab to save some recipes and get started!',
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
    {/* Recipe Detail Dialog */}
    <Dialog open={selectedRecipe !== null} onClose={handleCloseDialog}>
        <DialogTitle>Recipe Details</DialogTitle>
        <DialogContent>
          {selectedRecipe && (
            <Box>
              <Typography variant="body1">Name: {selectedRecipe.name}</Typography>
              <Typography variant="body1">Type: {selectedRecipe.type}</Typography>
              <Typography variant="body1">Cuisine: {selectedRecipe.cuisine}</Typography>
              <Typography variant="body1">Ingredients: {selectedRecipe.ingredients}</Typography>
              <Typography variant="body1">Instructions: {selectedRecipe.instructions}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box> 
    
  );
}
