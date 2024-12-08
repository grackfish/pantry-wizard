import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TextField } from '@mui/material';
import { Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const drawerWidth = 240;

const routes = {
  Dashboard: '/',
  'My Ingredients': '/ingredients',
  'My Recipes': '/recipes',
  'Explore Recipes': '/explore',
};

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchTab, setSearchTab] = React.useState('ingredients'); // To switch between ingredient and recipe search
  const [category, setCategory] = React.useState('all');
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const gotoIngredient = () => {
    navigate('/ingredients');  // Navigate to the ingredients page
  };

  const gotoRecipe = () => {  
    navigate('/recipes');  // Navigate to the recipe page
  };

  const gotoExplore = () => {
    navigate('/explore');  // Navigate to the explore page
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTabChange = (event, newTab) => {
    setSearchTab(newTab);
    setSearchQuery(''); // Clear the search query when switching tabs
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log('Searching for:', searchQuery, 'in category:', category, 'under tab:', searchTab);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ backgroundColor: '#222222' }} >
        <p style={{fontSize: '25px', margin: '0px'}} >Pantry Wizard</p>
      </Toolbar>
      <Divider/>
      <List>
        {['Dashboard', 'My Ingredients', 'My Recipes', 'Explore Recipes'].map((text, index) => (
          <ListItem key={text} disablePadding>
          <ListItemButton component={Link} to={routes[text]}>
            <ListItemText primary={text} />
          </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: '#555555', borderWidth: '1px' }}/>
      <List>
        {['Profile', 'Preferences', 'Settings'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{ color: 'white' }}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#222222',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth, 
              backgroundColor: '#222222', 
              color: 'white' 
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth, 
              backgroundColor: '#222222', 
              color: 'white' 
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, backgroundColor: 'black', color: 'white', minHeight: '100vh' }}
      >
        <Toolbar />
        <Typography sx={{ marginBottom: 2, fontSize: '20px', textAlign: 'center' }}>
          Welcome to Pantry Wizard!
        </Typography>

        {/* Ingredent Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // Stack items vertically on small screens, horizontally on larger screens
            gap: 2, // space between items
          }}
        >
      {/* Left Section: Ingredients introducing will modify this secion later */}
      <Box sx={{ flex: 1, textAlign: 'center' , background: '#333333'}}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Don't forget to check your pantry! Ensure you have: 
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          THIS SECTION IS TBD
        </Typography>
        <List sx={{ textAlign: 'center', margin: '0 auto' }}>
          <ListItem disablePadding>
            <ListItemText primary="Needed condiment" sx={{ textAlign: 'center' }} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Fresh vegetables" sx={{ textAlign: 'center' }} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Meat and protein" sx={{ textAlign: 'center' }} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Dairy products" sx={{ textAlign: 'center' }} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Grains" sx={{ textAlign: 'center' }} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Fruit" sx={{ textAlign: 'center' }} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Sweets" sx={{ textAlign: 'center' }} />
          </ListItem>
        </List>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Stay stocked up for your next meal!
        </Typography>
      </Box>

  {/* Right Section: Go to My Ingredients Button */}
  <Box sx={{ flex: 1, textAlign: 'center', background: '#333333'}}>
    <Typography variant="h6" sx={{ marginBottom: 2 }}>
      Ingredients Reminder
    </Typography>
    <Typography sx={{ marginBottom: 2 }}>
      Display the ingredients that are going to expire soon
    </Typography>
    <Box sx={{ textAlign: 'center' }}>
      <button
        type="button"
        onClick={gotoIngredient}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
        }}
      >
        Go to My Ingredients
      </button>
    </Box>
  </Box>
</Box>

{/* Search Section */}
<Box
  sx={{
    backgroundImage: 'url(https://assets.wfcdn.com/im/60937445/resize-h445%5Ecompr-r85/2118/211817780/Richboro+Peel+%26+Stick+Abstract+Roll.jpg)',
    color: 'Black',
    padding: 3,
    borderRadius: '20px',
    marginTop: 4,
    marginBottom: 3,
    textAlign: 'center',
  }}
>
  {/* Search Tab */}
  <Typography sx={{ marginTop: 2, textAlign: 'left', fontSize: 40 }}>
    Searching for:
  </Typography>
  <Box sx={{ display: 'flex', justifyContent: 'left', color: 'white' }}>
    <Tabs value={searchTab} onChange={handleTabChange} sx={{ color: 'white' }}>
      <Tab label="Ingredients" value="ingredients" color="white" />
      <Tab label="Recipes" value="recipes" color="white" />
    </Tabs>
  </Box>

  {/*Dropdown for Category (only when Ingredients tab is selected) */}
  {searchTab === 'ingredients' && (
    <Box sx={{ textAlign: 'left', marginTop: 2, marginBottom: 3 }}>
      <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
        <InputLabel id="category-select-label" sx={{ color: 'white' }}>Ingredient Type</InputLabel>
        <Select
          labelId="category-select-label"
          value={category}
          onChange={handleCategoryChange}
          label="Ingredient Type"
          sx={{ backgroundColor: 'white', color: 'black' }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="condiments">Condiment</MenuItem>
          <MenuItem value="vegetables">Vegetables</MenuItem>
          <MenuItem value="meat">Meat</MenuItem>
          <MenuItem value="dairy">Dairy</MenuItem>
          <MenuItem value="grains">Grains</MenuItem>
          <MenuItem value="fruits">Fruits</MenuItem>
          <MenuItem value="sweet">Sweet</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )}

  {/* Search Input */}
  <Box sx={{ textAlign: 'left', marginBottom: 3 }}>
    <TextField
      label={`Search for ${searchTab}`}
      variant="outlined"
      value={searchQuery}
      onChange={handleSearchChange}
      sx={{ width: '60%' }}
    />
  </Box>

  {/* Submit Button */}
  <Box sx={{ textAlign: 'left' }}>
    <Button
      variant="contained"
      color="primary"
      onClick={handleSearchSubmit}
      sx={{ width: '60%', marginTop: 2 }}
    >
      Search
    </Button>
  </Box>
</Box>

{/* New Recipe Section */}
    <Box
    sx={{
      backgroundColor: '#333333',
      color: 'white',
      padding: 3,
      borderRadius: '20px',
      marginTop: 4,
      marginBottom: 3,
      textAlign: 'center',
    }}
  >
      <Typography variant="h6" sx={{ marginTop: 2 , textAlign: 'middle', fontSize:25}}>
        New Recipe Ideas
      </Typography>
      <Typography>
       display the recipes that are popular or recommended
      </Typography>
      <Box sx={{ textAlign: 'center' }}>
        <button
          type="button"
          onClick={gotoExplore}
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
          Explore New Recipes
        </button>
      </Box>
    </Box>

{/* Recent Saved Recipes Section */}
    <Box
    sx={{
      backgroundImage: 'url(https://assets.wfcdn.com/im/60937445/resize-h445%5Ecompr-r85/2118/211817780/Richboro+Peel+%26+Stick+Abstract+Roll.jpg)',
      color: 'Black',
      padding: 3,
      borderRadius: '20px',
      marginTop: 4,
      marginBottom: 3,
      textAlign: 'center',
    }}
  >
      <Typography variant="h6" sx={{ marginTop: 2 , textAlign: 'left', fontSize:25}}>
        Recent Saved Recipes
      </Typography>
      <Typography>
        Your recently saved recipes will be displayed here
      </Typography>
      <Box sx={{ textAlign: 'center' }}>
        <button
          type="button"
          onClick={gotoRecipe}
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
          Go to My Recipes
        </button>
      </Box>
    </Box>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
