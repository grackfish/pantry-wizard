import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import PreparableRecipesTable from './PreparableRecipesTable.js';
import SavedRecipesTable from './SavedRecipesTable.js';

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
  const [searchPreparableRecipesQuery, setSearchPreparableRecipesQuery] = React.useState(''); // For filtering preparable recipes
  const [preparableRecipes, setPreparableRecipes] = React.useState([]); // Data for preparable recipes
  const [searchSavedRecipesQuery, setSearchSavedRecipesQuery] = React.useState(''); // For filtering all saved recipes
  const [savedRecipes, setSavedRecipes] = React.useState([]); // Data for all saved recipes

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

  // Filtered data for tables
  const filteredPreparableRecipes = preparableRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchPreparableRecipesQuery.toLowerCase())
  );

  const filteredSavedRecipes = savedRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchSavedRecipesQuery.toLowerCase())
  );

  // Handle search submit for preparable recipes
  const handleSearchSubmitP = () => {
    // Fetch saved recipes data from backend
    fetch('/api/savedrecipes')
      .then((response) => response.json())
      .then((data) => {
        setPreparableRecipes(data.owned || []);
        setSavedRecipes(data.explore || []);
      });
  };

  // Handle search submit for all saved recipes
  const handleSearchSubmitS = () => {
    // Fetch saved recipes data from backend
    fetch('/api/savedrecipes')
    .then((response) => response.json())
    .then((data) => {
      setPreparableRecipes(data.owned || []);
      setSavedRecipes(data.explore || []);
    });
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
            My Recipes
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
        <p>Your Preparable Recipes</p>

        <TextField
          label="Search Preparable Recipes"
          variant="outlined"
          fullWidth
          value={searchPreparableRecipesQuery}
          onChange={(e) => setSearchPreparableRecipesQuery(e.target.value)}
          sx={{ marginBottom: 2, backgroundColor: 'white', borderRadius: 1 }}
        />
        {/* Submit Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={handleSearchSubmitP}
            sx={{ width: '60%', marginBottom: 2, backgroundColor: '#4CAF50' }}
          >
            Submit Search
          </Button>
        </Box>
        <PreparableRecipesTable rows={filteredPreparableRecipes} />

        <Typography variant="h6" gutterBottom style={{ marginTop: '50px' }}>
          All Your Saved Recipes
        </Typography>
        <TextField
          label="Search All Saved Recipes"
          variant="outlined"
          fullWidth
          value={searchSavedRecipesQuery}
          onChange={(e) => setSearchSavedRecipesQuery(e.target.value)}
          sx={{ marginBottom: 2, backgroundColor: 'white', borderRadius: 1 }}
        />
        {/* Submit Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={handleSearchSubmitS}
            sx={{ width: '60%', marginBottom: 2, backgroundColor: '#4CAF50'}}
          >
            Submit Search
          </Button>
        </Box>
        <SavedRecipesTable rows={filteredSavedRecipes} />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
