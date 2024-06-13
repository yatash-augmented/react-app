import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import List from './pages/list';

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [loadedItems, setLoadedItems] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<Dashboard favorites={favorites} />} />
      <Route 
        path="/list" 
        element={<List favorites={favorites} setFavorites={setFavorites} loadedItems={loadedItems} setLoadedItems={setLoadedItems} />} 
      />
    </Routes>
  );
};

export default App;
