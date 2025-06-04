let productosFiltrados = [];
let currentPage = 1;
const productosPorPagina = 50;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('http://localhost:3000/api/productos');
    productosFiltrados = await res.json();
    cargarProductos(1);
  } catch (err) {
    console.error('Error al cargar productos iniciales:', err);
  }
});

async function cargarProductos(pagina = 1) {
  const contenedor = document.getElementById('productos-container');
  const pagination = document.getElementById('pagination');
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  contenedor.innerHTML = '';
  pagination.innerHTML = '';

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const inicio = (pagina - 1) * productosPorPagina;
  const paginados = productosFiltrados.slice(inicio, inicio + productosPorPagina);

  paginados.forEach(prod => {
    const isInWishlist = wishlist.includes(prod.id);
    const card = document.createElement('div');
    card.className = 'producto-card';
    card.innerHTML = `
      <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlist(${prod.id}, this)">
        <i class="fas fa-heart"></i>
      </button>
      <img src="assets/img/${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>$${prod.precio}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });

  renderPagination(totalPaginas, pagina);
}

function renderPagination(total, current) {
  const pagination = document.getElementById('pagination');

  for (let i = 1; i <= total; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === current) btn.classList.add('active');

    btn.addEventListener('click', () => {
      currentPage = i;
      cargarProductos(currentPage);
    });

    pagination.appendChild(btn);
  }
}

async function agregarAlCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  try {
    const res = await fetch(`http://localhost:3000/api/productos/${id}`);
    const prod = await res.json();
    const enCarrito = carrito.find(item => item.id === id);

    const cantidadEnCarrito = enCarrito ? enCarrito.cantidad : 0;

    if (prod.stock <= cantidadEnCarrito) {
      alert('No hay más stock disponible para este producto.');
      return;
    }

    if (enCarrito) {
      enCarrito.cantidad += 1;
    } else {
      carrito.push({ id, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarNotificacion('Producto agregado al carrito');

  } catch (err) {
    console.error('Error al validar stock:', err);
    alert('No se pudo validar el stock del producto');
  }
}

function toggleWishlist(id, btn) {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (usuario?.nombre === 'Invitado') {
    alert('Debes iniciar sesión para usar la wishlist.');
    window.location.href = 'index.html';
    return;
  }
    
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(pid => pid !== id);
    btn.classList.remove('active');
  } else {
    wishlist.push(id);
    btn.classList.add('active');
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

async function filtrarCategoria(categoria) {
  try {
    const res = await fetch('http://localhost:3000/api/productos');
    let productos = await res.json();

    productosFiltrados = (categoria === 'todas')
      ? productos
      : productos.filter(p => p.categoria === categoria);

    cargarProductos(1);
  } catch (err) {
    console.error('Error al filtrar categoría:', err);
  }
}

async function filtrarSubcategoria(subcategoria) {
  try {
    const res = await fetch('http://localhost:3000/api/productos');
    let productos = await res.json();

    productosFiltrados = productos.filter(p => p.subcategoria === subcategoria);
    cargarProductos(1);
  } catch (err) {
    console.error('Error al filtrar subcategoría:', err);
  }
}

function buscarProducto() {
  const input = document.getElementById('barra-busqueda').value.toLowerCase();
  const resultados = productosFiltrados.filter(p =>
    p.nombre.toLowerCase().includes(input)
  );

  productosFiltradosTemporal = resultados;
  renderBusqueda(1);
}

let productosFiltradosTemporal = [];

function renderBusqueda(pagina = 1) {
  const contenedor = document.getElementById('productos-container');
  const pagination = document.getElementById('pagination');
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  contenedor.innerHTML = '';
  pagination.innerHTML = '';

  const productos = productosFiltradosTemporal.length > 0 ? productosFiltradosTemporal : productosFiltrados;
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const inicio = (pagina - 1) * productosPorPagina;
  const paginados = productos.slice(inicio, inicio + productosPorPagina);

  paginados.forEach(prod => {
    const isInWishlist = wishlist.includes(prod.id);
    const card = document.createElement('div');
    card.className = 'producto-card';
    card.innerHTML = `
      <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlist(${prod.id}, this)">
        <i class="fas fa-heart"></i>
      </button>
      <img src="assets/img/${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>$${prod.precio}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === pagina) btn.classList.add('active');
    btn.addEventListener('click', () => renderBusqueda(i));
    pagination.appendChild(btn);
  }
}

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

function mostrarNotificacion(mensaje) {
  const noti = document.getElementById('notificacion');
  noti.textContent = mensaje;
  noti.classList.remove('oculto');
  noti.classList.add('visible');

  setTimeout(() => {
    noti.classList.remove('visible');
    noti.classList.add('oculto');
  }, 2000);
}
