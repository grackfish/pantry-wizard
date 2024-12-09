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
  const [rows, setRows] = React.useState([
    { id: 1, name: 'Simple Salad', type: 'Salad', cuisine: 'None', ingredients: 'Cheese, lettuce, ranch', preparable: '', instructions: 'Combine all ingredients and mix'},
    { id: 2, name: 'Pizza', type: 'Main', cuisine: 'Italian', ingredients: 'Flour, yeast, water, salt, tomato sauce, mozzarella cheese', preparable: '', instructions: 'Mix dough ingredients and let rise for an hour. Preheat oven to 400 degrees. Assemble pizza and cook for 20 minutes.'},
    { id: 3, name: 'Blueberry Pie', type: 'Dessert', cuisine: 'American', ingredients: 'Flour, water, butter, salt, blueberries, corn starch,  sugar', preparable: '', instructions: 'Mix dough ingredients in food processer until the consistency of wet sand. Roll out into a half inch disks and refrigerate dough. While dough is chilling, preheat oven to 375 degrees. Cook filling ingredients on stovetop over medium heat. Remove dough from fridge and place in pie dish. Add filling and cook for 40 minutes or until done.'},
    { id: 4, name: 'Greek Salad', type: 'Salad', cuisine: 'Greek', ingredients: 'Lettuce, olives, feta cheese, onion, tomato. ', preparable: '', instructions: 'Chop vegetables and toss to combine'},
    { id: 5, name: 'Pasta', type: 'Main', cuisine: 'Italian', ingredients: 'Pasta, tomato sauce, water', preparable: '', instructions: 'Boil a sufficient amount of water on stove. Add pasta and cook per box instructions. Add sauce and wallow in despair at the only meal you can afford.'},
    { id: 6, name: 'Toast', type: 'Breakfast', cuisine: 'None', ingredients: 'Bread', preparable: '', instructions: 'Put bread in toaster for desired amount of time.'},
    { id: 7, name: 'Omelette', type: 'Breakfast', cuisine: 'French', ingredients: 'Eggs, butter, tomato, peppers, spinach, garlic, onion, cheese', preparable: '', instructions: 'Chop vegetables. Sautee onion and garlic in butter, then add other vegetables and cook for two more minutes. Remove vegetables into bowl. Put mixed eggs in pan and cook until becoming opaque. Add vegetables and cheese and fold egg over top. Cook until egg is done.'},
    { id: 8, name: 'Milk tea', type: 'Drink', cuisine: 'Asian', ingredients: 'milk, tea, sugar', preparable: '', instructions: 'Boil tea and strain. Add in milk and sugar. Mix well and enjoy.'},
    { id: 9, name: 'Strawberry Smoothie', type: 'Drink', cuisine: 'None', ingredients: 'Strawberry, milk', preparable: '', instructions: 'Rinse and chop strawberries. Add milk and chopped strawberries to a blender and blend until desired consistency.'},

  ]);
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
