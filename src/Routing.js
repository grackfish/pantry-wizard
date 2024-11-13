import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '.App.js';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ingredients" element={<Ingredients />} />
      </Routes>
    </Router>
  );
}

export default Routing;