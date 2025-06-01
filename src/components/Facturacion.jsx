import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Facturacion = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const calcularSubtotal = (producto) => producto.precio;
  const total = cart.reduce((acc, item) => acc + calcularSubtotal(item), 0);

  const handlePago = () => {
    alert('Gracias por su compra. Total: $' + total.toLocaleString());
    clearCart();
  };

  const imprimirFactura = () => {
    const contenido = document.getElementById('factura').innerHTML;
    const ventana = window.open('', '', 'width=800,height=600');
    ventana.document.write(`
      <html>
        <head>
          <title>Factura - Mi Fama</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            h2, h3 { text-align: center; }
          </style>
        </head>
        <body>
          <h2>Factura - Mi Fama</h2>
          <p>Fecha: ${new Date().toLocaleDateString()}</p>
          ${contenido}
        </body>
      </html>
    `);
    ventana.document.close();
    ventana.focus();
    ventana.print();
    ventana.close();
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

      <section className="carrito" id="carrito">
        <h2>Carrito de Compras y Facturación</h2>

        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <>
            {   }
            <div id="factura">
              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((producto, index) => (
                    <tr key={index}>
                      <td>{producto.nombre}</td>
                      <td>${producto.precio.toLocaleString()}</td>
                      <td>${calcularSubtotal(producto).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3>Total: ${total.toLocaleString()}</h3>
            </div>

            {      }
            <div className="acciones">
              <button onClick={() => cart.forEach(p => removeFromCart(p.id))}>Eliminar Todo</button>
              <button onClick={handlePago}>Proceder al Pago</button>
              <button onClick={imprimirFactura}>Imprimir Factura</button>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Facturacion;
