import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Productos from './components/Productos';
import Admin from './components/Admin';
import Contactanos from './components/Contactanos';
import Facturacion from './components/Facturacion';
import './style.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/contactanos" element={<Contactanos />} />
      <Route path="/facturacion" element={<Facturacion />} />
    </Routes>
  </Router>
);

export default App;
