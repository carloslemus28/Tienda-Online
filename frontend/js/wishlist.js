document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Debes iniciar sesión para ver tu wishlist.');
    window.location.href = 'login.html';
    return;
  }

  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const contenedor = document.getElementById('wishlist-container');

  if (wishlist.length === 0) {
    contenedor.innerHTML = "<p style='text-align:center; width:100%'>No hay productos en tu wishlist</p>";
    return;
  }

  for (let id of wishlist) {
    try {
      const res = await fetch(`http://localhost:3000/api/productos/${id}`);
      const prod = await res.json();

      const card = document.createElement('div');
      card.className = 'producto-card';
      card.innerHTML = `
        <button class="wishlist-btn active" onclick="eliminarDeWishlist(${prod.id}, this)">
          <i class="fas fa-heart"></i>
        </button>
        <img src="assets/img/${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>$${prod.precio}</p>
      `;
      contenedor.appendChild(card);
    } catch (err) {
      console.error('Error al cargar wishlist:', err);
    }
  }
});

// Eliminar de wishlist
function eliminarDeWishlist(id, btn) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist = wishlist.filter(pid => pid !== id);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  btn.parentElement.remove();

  if (wishlist.length === 0) {
    document.getElementById('wishlist-container').innerHTML = "<p style='text-align:center; width:100%'>No hay productos en tu wishlist</p>";
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