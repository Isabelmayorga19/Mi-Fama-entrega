import React, { useState, useEffect } from 'react';
import '../style.css';

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
    previewImage: ''
  });

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    setProducts(productosGuardados);
  }, []);

  const login = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'administrador' && password === '1234') {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const logout = () => {
    setLoggedIn(false);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        image: file,
        previewImage: URL.createObjectURL(file),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const agregarProducto = (e) => {
    e.preventDefault();

    const imagenURL = formData.image ? URL.createObjectURL(formData.image) : formData.previewImage;
    const nuevoProducto = {
      id: Date.now(),
      nombre: formData.name,
      precio: parseFloat(formData.price),
      descripcion: formData.description,
      imagen: imagenURL
    };

    const nuevosProductos = [...products, nuevoProducto];
    setProducts(nuevosProductos);
    localStorage.setItem('productos', JSON.stringify(nuevosProductos));

    resetForm();
    alert('Producto agregado con éxito');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      image: null,
      previewImage: ''
    });
    document.getElementById('product-image').value = '';
    setIsEditing(false);
    setEditingId(null);
  };

  const eliminarProducto = (id) => {
    const productosActualizados = products.filter(p => p.id !== id);
    setProducts(productosActualizados);
    localStorage.setItem('productos', JSON.stringify(productosActualizados));
    alert('Producto eliminado');
  };

  const editarProducto = (producto) => {
    setFormData({
      name: producto.nombre,
      price: producto.precio,
      description: producto.descripcion,
      image: null,
      previewImage: producto.imagen
    });
    setIsEditing(true);
    setEditingId(producto.id);
  };

  const actualizarProducto = (e) => {
    e.preventDefault();

    const imagenURL = formData.image ? URL.createObjectURL(formData.image) : formData.previewImage;

    const productoActualizado = {
      id: editingId,
      nombre: formData.name,
      precio: parseFloat(formData.price),
      descripcion: formData.description,
      imagen: imagenURL
    };

    const productosActualizados = products.map(p =>
      p.id === editingId ? productoActualizado : p
    );

    setProducts(productosActualizados);
    localStorage.setItem('productos', JSON.stringify(productosActualizados));

    resetForm();
    alert('Producto actualizado con éxito');
  };

  return (
    <>
      {!loggedIn ? (
        <div className="login-container" id="login-section">
  <h2>Iniciar Sesión</h2>
  <input id="username" placeholder="Usuario" type="text" />
  <input id="password" placeholder="Contraseña" type="password" />
  <button onClick={login}>Entrar</button>
  {error && <p id="login-error">{error}</p>}

  <div className="inicio-link">
    <a href="/">Ir a Inicio</a>
  </div>
</div>

      ) : (
        <div className="admin-panel">
          <h2>Bienvenido, Administrador</h2>
          <button onClick={logout}>Cerrar Sesión</button>
          <hr />
          <h3>{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h3>
          <form onSubmit={isEditing ? actualizarProducto : agregarProducto}>
            <input
              name="name"
              placeholder="Nombre del producto"
              type="text"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
            <input
              name="price"
              placeholder="Precio"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleFormChange}
              required
            />
            <textarea
              name="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleFormChange}
              required
            />
            <input
              name="image"
              id="product-image"
              accept="image/*"
              type="file"
              onChange={handleFormChange}
            />
            {formData.previewImage && (
              <img src={formData.previewImage} alt="Preview" width="100" />
            )}
            <button type="submit">{isEditing ? 'Actualizar Producto' : 'Agregar Producto'}</button>
            {isEditing && (
              <button type="button" onClick={resetForm} style={{ marginLeft: '10px' }}>
                Cancelar
              </button>
            )}
          </form>

          <hr />
          <h3>Lista de Productos</h3>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <strong>{product.nombre}</strong> - ${product.precio} <br />
                <em>{product.descripcion}</em><br />
                <img src={product.imagen} alt={product.nombre} width="100" /><br />
                <button onClick={() => editarProducto(product)}>Editar</button>
                <button onClick={() => eliminarProducto(product.id)} style={{ marginLeft: '10px' }}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Admin;

