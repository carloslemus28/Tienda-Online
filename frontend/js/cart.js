document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Debes iniciar sesión para ver tu carrito.');
    window.location.href = 'login.html';
    return;
  }

  cargarCarrito();
});

async function cargarCarrito() {
  const contenedor = document.getElementById('carrito-items');
  const subtotalElem = document.getElementById('subtotal');
  const totalElem = document.getElementById('total');
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  contenedor.innerHTML = '';
  let subtotal = 0;

  for (const item of carrito) {
    try {
      const res = await fetch(`http://localhost:3000/api/productos/${item.id}`);
      const prod = await res.json();
      const cantidad = item.cantidad || 1;
      const totalProducto = prod.precio * cantidad;
      subtotal += totalProducto;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="assets/img/${prod.imagen}" alt="${prod.nombre}">
        <div class="cart-item-details">
          <h4>${prod.nombre}</h4>
          <p>${prod.descripcion}</p>
          <p>Precio: $${prod.precio}</p>
          <p>Cantidad: ${cantidad}</p>
        </div>
        <div class="cart-item-actions">
          <button onclick="reducirCantidad(${prod.id})" title="Reducir">
            <i class="fas fa-minus-circle"></i>
          </button>
          <button onclick="eliminarProducto(${prod.id})" title="Eliminar">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
      contenedor.appendChild(div);
    } catch (err) {
      console.error('Error al cargar producto:', err);
    }
  }

  subtotalElem.textContent = subtotal.toFixed(2);
  totalElem.textContent = subtotal.toFixed(2);
}

function reducirCantidad(id) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.map(item => {
    if (item.id === id && item.cantidad > 1) {
      item.cantidad -= 1;
    }
    return item;
  });
  localStorage.setItem('carrito', JSON.stringify(carrito));
  cargarCarrito();
}

function eliminarProducto(id) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(item => item.id !== id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  cargarCarrito();
}

document.getElementById('btn-vaciar').addEventListener('click', () => {
  if (confirm('¿Deseas vaciar todo el carrito?')) {
    localStorage.removeItem('carrito');
    cargarCarrito();
  }
});

document.getElementById('btn-finalizar').addEventListener('click', async () => {
  
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (usuario?.nombre === 'Invitado') {
    alert('Debes iniciar sesión para finalizar una compra.');
    window.location.href = 'index.html';
    return;
  }
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/ventas/finalizar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ carrito })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Compra finalizada con éxito');
      localStorage.removeItem('carrito');
      location.reload();
    } else {
      alert('Error: ' + data.error);
    }

  } catch (err) {
    console.error('Error al finalizar compra:', err);
    alert('Error al procesar la compra.');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const tooltip = document.getElementById('usuario-tooltip');
  const datos = localStorage.getItem('usuario');

  if (datos) {
    const usuario = JSON.parse(datos);
    tooltip.textContent = `${usuario.nombre} ${usuario.apellido}`;
  } else {
    tooltip.textContent = 'Iniciar Sesión';
  }

  document.getElementById('icono-usuario').addEventListener('click', () => {
    if (datos) {
      alert(`Bienvenido, ${JSON.parse(datos).nombre}`);
    } else {
      window.location.href = 'login.html';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const datos = localStorage.getItem('usuario');
  const spanNombre = document.getElementById('usuario-nombre');
  const iconoUsuario = document.getElementById('icono-usuario');
  const cerrarSesion = document.getElementById('cerrar-sesion');

  if (datos) {
    const usuario = JSON.parse(datos);
    spanNombre.textContent = `${usuario.nombre} ${usuario.apellido}`;
    cerrarSesion.classList.remove('hidden');
    cerrarSesion.addEventListener('click', () => {
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
      alert('Sesión cerrada correctamente');
      window.location.href = 'login.html';
    });
  } else {
    spanNombre.textContent = 'Mi Cuenta';
      iconoUsuario.addEventListener('click', () => {
        const datos = localStorage.getItem('usuario');

        if (!datos) {
          window.location.href = 'login.html';
        } else {
          const usuario = JSON.parse(datos);
          if (usuario.nombre === 'Invitado') {
            alert('Estás navegando como invitado. Inicia sesión para acceder a tu cuenta.');
            return;
          }

          window.location.href = 'login.html';
        }
      });
  }
});