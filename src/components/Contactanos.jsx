import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const Contactanos = () => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Formulario enviado con éxito. Bienvenido, ${formData.name}!`);
    setFormData({ name: '', id: '', email: '', phone: '' });
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

      <div className="background-image">
        <div className="container">
          <h1>Regístrate y sé parte de nuestra familia</h1>

          <div className="accordion-container">
            <div className="accordion-item">
              <input hidden id="accordion-1" type="checkbox" />
              <label className="accordion-header" htmlFor="accordion-1">Sobre Nosotros</label>
              <div className="accordion-content">
                <p>
                  Somos una empresa comprometida con la innovación y el servicio al cliente. Fundada en 2020,
                  nuestra misión es ofrecer productos de calidad con la mejor atención.
                </p>
              </div>
            </div>

            <div className="accordion-item">
              <input hidden id="accordion-2" type="checkbox" />
              <label className="accordion-header" htmlFor="accordion-2">Regístrate</label>
              <div className="accordion-content">
                <form id="register-form" onSubmit={handleSubmit}>
                  <label htmlFor="name">Nombre:</label>
                  <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />

                  <label htmlFor="id">Cédula:</label>
                  <input id="id" name="id" type="text" value={formData.id} onChange={handleChange} required />

                  <label htmlFor="email">Correo:</label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />

                  <label htmlFor="phone">Número de Contacto:</label>
                  <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />

                  <button type="submit">Enviar</button>
                </form>
              </div>
            </div>

            <div className="accordion-item">
              <input hidden id="accordion-3" type="checkbox" />
              <label className="accordion-header" htmlFor="accordion-3">Contáctanos</label>
              <div className="accordion-content">
                <p>
                  Si tienes alguna pregunta o necesitas asistencia, estamos aquí para ayudarte. Contáctanos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactanos;
