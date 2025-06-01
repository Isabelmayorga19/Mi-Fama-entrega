import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../style.css';

const Productos = () => {
  const { addToCart } = useCart();
  const [productosDinamicos, setProductosDinamicos] = useState([]);
  const [mensajeVisible, setMensajeVisible] = useState(false);

  useEffect(() => {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    setProductosDinamicos(productos);
  }, []);

  const productos = [
    { id: 1, nombre: 'Producto 1', descripcion: 'lomo', precio: 25000, imagen: '/imagenes/carne1.jpg' },
    { id: 2, nombre: 'Producto 2', descripcion: 'carne', precio: 30000, imagen: '/imagenes/carne2.jpg' },
    { id: 3, nombre: 'Producto 3', descripcion: 'filete', precio: 20000, imagen: '/imagenes/carne3.jpg' },
    { id: 4, nombre: 'Producto 4', descripcion: 'Descripción breve del producto', precio: 45000, imagen: '/imagenes/carne4.jpg' },
    { id: 5, nombre: 'Producto 5', descripcion: 'Descripción breve del producto', precio: 60000, imagen: '/imagenes/carne5.jpg' },
    { id: 6, nombre: 'Producto 6', descripcion: 'Descripción breve del producto', precio: 50000, imagen: '/imagenes/carne6.jpg' },
  ];

  const manejarAgregar = (producto) => {
    addToCart(producto);
    setMensajeVisible(true);
    setTimeout(() => setMensajeVisible(false), 2000);
  };

  return (
    <>
      <header>
        <div className="logo">
          <img alt="Logo de Mi Fama" className="logo-flotante" src="/imagenes/logo.png" />
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/facturacion">Facturación</Link></li>
            <li><Link to="/contactanos">Contacto</Link></li>
          </ul>
        </nav>
      </header>

      <section className="productos">
        <h2>Catálogo de Productos</h2>
        <div className="catalogo">
          {productos.map(producto => (
            <div key={producto.id} className="producto">
              <img src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p><strong>Precio:</strong> ${producto.precio.toLocaleString()}</p>
              <button className="btn-carrito" onClick={() => manejarAgregar(producto)}>
                Agregar al Carrito
              </button>
            </div>
          ))}

          {productosDinamicos.map(producto => (
            <div key={producto.id} className="producto">
              <img src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p><strong>Precio:</strong> ${parseInt(producto.precio).toLocaleString()}</p>
              <button className="btn-carrito" onClick={() => manejarAgregar(producto)}>
                Agregar al Carrito
              </button>
            </div>
          ))}
        </div>
      </section>

      {mensajeVisible && (
        <div className="mensaje-flotante">
           Se agregó a facturación
        </div>
      )}
    </>
  );
};

export default Productos;