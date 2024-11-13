import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '.App.js';
import Ingredients from '.Ingredients.js';
import Recipes from '.Recipes.js';
import Explore from '.Explore.js';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </Router>
  );
}

export default Routing;