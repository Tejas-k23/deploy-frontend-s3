import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateProperty from './pages/CreateProperty';
import PropertyListing from './pages/PropertyListing';
import PropertyDetails from './pages/PropertyDetails';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<PropertyListing />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/create" element={<CreateProperty />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
