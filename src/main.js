let carrito = [];


document.querySelectorAll('.btn-carrito').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const nombre = button.getAttribute('data-nombre');
        const precio = parseFloat(button.getAttribute('data-precio'));

        
        const productoExistente = carrito.find(item => item.id === id);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ id, nombre, precio, cantidad: 1 });
        }

        
        mostrarMensaje(`${nombre} agregado al carrito`);

        
        actualizarCarrito();
    });
});


function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    if (carritoItems) {
        carritoItems.innerHTML = ''; 

        let total = 0;

        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            
            carritoItems.innerHTML += `
                <tr>
                    <td>${item.nombre}</td>
                    <td>$${item.precio.toFixed(2)}</td>
                    <td>${item.cantidad}</td>
                    <td>$${subtotal.toFixed(2)}</td>
                </tr>
            `;
        });

        
        const totalElement = document.getElementById('total');
        if (totalElement) {
            totalElement.innerText = total.toFixed(2);
        }
    }

    
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


document.addEventListener('DOMContentLoaded', () => {
   const productosAlmacenados = JSON.parse(localStorage.getItem("productos")) || [];
    const catalogo = document.querySelector(".catalogo");

    productosAlmacenados.forEach((p, index) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <p><strong>Precio:</strong> $${p.precio.toFixed(2)}</p>
            <button class="btn-carrito" data-id="${100 + index}" data-nombre="${p.nombre}" data-precio="${p.precio}">Agregar al Carrito</button>
        `;
        catalogo.appendChild(div);
    });


    

    
    document.querySelectorAll('.btn-carrito').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const nombre = button.getAttribute('data-nombre');
            const precio = parseFloat(button.getAttribute('data-precio'));
            const productoExistente = carrito.find(item => item.id === id);
            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({ id, nombre, precio, cantidad: 1 });
            }
            mostrarMensaje(`${nombre} agregado al carrito`);
            actualizarCarrito();
        });
    });
});


function mostrarMensaje(mensaje) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = 'mensaje-confirmacion';
    mensajeDiv.innerText = mensaje;

    
    document.body.appendChild(mensajeDiv);

    
    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000);
}


const btnPagar = document.getElementById('btn-pagar');
if (btnPagar) {
    btnPagar.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('Tu carrito está vacío.');
        } else {
            alert('Gracias por tu compra. Procediendo al pago...');
            carrito = []; 
            localStorage.removeItem('carrito'); 
            actualizarCarrito(); 
        }
    });
}


const btnExportarPDF = document.getElementById('btn-exportar-pdf');
if (btnExportarPDF) {
    btnExportarPDF.addEventListener('click', () => {
        
        if (carrito.length === 0) {
            alert('Tu carrito está vacío. No se puede generar una factura.');
            return;
        }

        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        
        doc.setFontSize(18);
        doc.text('Factura de Compra', 20, 20);

        
        let startY = 40; 
        doc.setFontSize(12);
        doc.text('Detalles de los productos:', 20, startY);
        startY += 10;

        
        doc.setFont('helvetica', 'bold');
        doc.text('Producto', 20, startY);
        doc.text('Precio', 90, startY);
        doc.text('Cantidad', 120, startY);
        doc.text('Subtotal', 160, startY);
        startY += 10;

        
        doc.setFont('helvetica', 'normal');

        
        let total = 0;
        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            doc.text(item.nombre, 20, startY);
            doc.text(`$${item.precio.toFixed(2)}`, 90, startY);
            doc.text(`${item.cantidad}`, 120, startY);
            doc.text(`$${subtotal.toFixed(2)}`, 160, startY);
            startY += 10;

            
            if (startY > 270) {
                doc.addPage();
                startY = 20;
            }
        });

        
        startY += 10;
        doc.setFont('helvetica', 'bold');
        doc.text(`Total: $${total.toFixed(2)}`, 20, startY);

        
        doc.save('Factura_de_Compra.pdf');
    });
}


document.querySelectorAll(".accordion").forEach(button => {
    button.addEventListener("click", () => {
        const content = button.nextElementSibling;

        
        document.querySelectorAll(".content").forEach(c => {
            if (c !== content) c.classList.remove("active");
        });

        
        content.classList.toggle("active");

        
        if (content.classList.contains("active")) {
            content.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});


let productos = [];

function login() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value;

    if (user === "administrador" && pass === "1234") {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("admin-section").style.display = "block";
        renderProductos();
    } else {
        document.getElementById("login-error").innerText = "Usuario o contraseña incorrectos";
    }
}

function logout() {
    document.getElementById("admin-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("login-error").innerText = "";
    productos = [];
    renderProductos();
}

function agregarProducto(event) {
  event.preventDefault();

  const nombre = document.getElementById("product-name").value.trim();
    const precio = parseFloat(document.getElementById("product-price").value);
    const descripcion = document.getElementById("product-desc").value.trim();
    const imagenInput = document.getElementById("product-image");
    const imagen = imagenInput.files[0];

    if (nombre && !isNaN(precio) && descripcion && imagen) {
        const reader = new FileReader();
        reader.onload = function () {
            const imagenDataURL = reader.result;

            productos.push({ nombre, precio, descripcion, imagen: imagenDataURL });
            guardarProductos(); 
            renderProductos();
        };
        reader.readAsDataURL(imagen);

        document.getElementById("product-form").reset();
    }


}

function renderProductos() {
    const lista = document.getElementById("product-list");
    lista.innerHTML = "";

    if (productos.length === 0) {
        lista.innerHTML = "<li>No hay productos agregados.</li>";
        return;
    }

    productos.forEach((p, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}" style="width: 100px;">
    <strong>${p.nombre}</strong><br/>
    <span>Precio: $${p.precio.toFixed(2)}</span><br/>
    <span>${p.descripcion}</span><br/>
    <button onclick="editarProducto(${index})">Editar</button>
    <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        lista.appendChild(li);
    renderProductosEnCatalogo(); 


    });
}

function eliminarProducto(index) {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
        productos.splice(index, 1);
        guardarProductos();
        renderProductos();
    }
}

function editarProducto(index) {
    const p = productos[index];
    document.getElementById("product-name").value = p.nombre;
    document.getElementById("product-price").value = p.precio;
    document.getElementById("product-desc").value = p.descripcion;

    productos.splice(index, 1); 
    guardarProductos();
    renderProductos();
}


function renderProductosEnCatalogo() {
    const contenedor = document.getElementById("catalogo-productos");
    if (!contenedor) return;

    
    contenedor.querySelectorAll(".producto.admin").forEach(el => el.remove());

    productos.forEach((p, index) => {
        const div = document.createElement("div");
        div.className = "producto admin";
        div.innerHTML = `
            <img src="imagenes/default.jpg" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <p><strong>Precio:</strong> $${p.precio.toLocaleString()}</p>
            <button class="btn-carrito" data-id="admin-${index}" data-nombre="${p.nombre}" data-precio="${p.precio}">
                Agregar al Carrito
            </button>
        `;
        contenedor.appendChild(div);
    });

    
    document.querySelectorAll('.btn-carrito').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const nombre = button.getAttribute('data-nombre');
            const precio = parseFloat(button.getAttribute('data-precio'));

            const productoExistente = carrito.find(item => item.id === id);
            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({ id, nombre, precio, cantidad: 1 });
            }

            mostrarMensaje(`${nombre} agregado al carrito`);
            actualizarCarrito();
        });
    });
}


function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function cargarProductos() {
    const guardados = localStorage.getItem("productos");
    productos = guardados ? JSON.parse(guardados) : [];
}


