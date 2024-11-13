import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard.js';
import Explore from './Explore/Explore.js';
import Ingredients from './Ingredients/Ingredients.js';
import Recipes from './Recipes/Recipes.js';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </Router>
  );
}

export default Routing;