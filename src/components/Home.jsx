import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const Home = () => (
  <>
    <header>
      <div className="logo">
        <img
          alt="Logo de Mi Fama"
          className="logo-flotante"
          src="/imagenes/logo.png"
        />
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/facturacion">Facturación</Link></li>
          <li><Link to="/contactanos">Contáctanos</Link></li>
          <li><Link to="/admin">Administrador</Link></li>
        </ul>
      </nav>
    </header>

    <div className="section productos-destacados">
      <h2>Productos Destacados</h2>
      <div className="fila-productos">
        <div className="producto">
          <img
            alt="Producto 1"
            src="/imagenes/chorrizo.jpg"
          />
          <h3>Chorizo Casero</h3>
          <p>Delicioso chorizo artesanal, ideal para asados y comidas familiares.</p>
          <p><strong>Precio:</strong> $8.00 por libra</p>
        </div>

        <img
          alt="Logo de Mi Fama"
          src="/imagenes/logo.png"
        />

        <div className="producto">
          <img
            alt="Producto 2"
            src="/imagenes/costillas (1).jpg"
          />
          <h3>Costilla</h3>
          <p>Costillas de cerdo ahumadas lentamente para un sabor inigualable.</p>
          <p><strong>Precio:</strong> $12.50 por libra</p>
        </div>
      </div>

      <div className="boton-mas">
        <Link to="/productos">
          <button>Conocer más productos</button>
        </Link>
      </div>
    </div>
  </>
);

export default Home;
