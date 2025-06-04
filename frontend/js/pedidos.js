let pedidosFiltrados = [];
let paginaActual = 1;
const pedidosPorPagina = 10;

document.addEventListener('DOMContentLoaded', async () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (usuario?.nombre === 'Invitado') {
    alert('Los pedidos solo están disponibles para usuarios registrados.');
    window.location.href = 'index.html';
    return;
  }
  await cargarPedidos();
});

async function cargarPedidos() {
  try {
    const res = await fetch('http://localhost:3000/api/ventas');
    const pedidos = await res.json();
    pedidosFiltrados = pedidos;
    mostrarPedidos(1);
  } catch (err) {
    console.error('Error al cargar pedidos:', err);
  }
}

function mostrarPedidos(pagina = 1) {
  const contenedor = document.getElementById('pedidos-container');
  const paginacion = document.getElementById('paginacion-pedidos');

  contenedor.innerHTML = '';
  paginacion.innerHTML = '';
  paginaActual = pagina;

  const totalPaginas = Math.ceil(pedidosFiltrados.length / pedidosPorPagina);
  const inicio = (pagina - 1) * pedidosPorPagina;
  const paginados = pedidosFiltrados.slice(inicio, inicio + pedidosPorPagina);

  paginados.forEach(pedido => {
    const card = document.createElement('div');
    card.className = 'pedido-card';
    card.innerHTML = `
      <h4>Pedido #${pedido.id}</h4>
      <p>Fecha: ${new Date(pedido.fecha).toLocaleString()}</p>
      <p>Total: $${pedido.total}</p>
    `;
    card.addEventListener('click', () => mostrarDetalle(pedido.id));
    contenedor.appendChild(card);
  });

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === pagina) btn.classList.add('active');

    btn.addEventListener('click', () => mostrarPedidos(i));
    paginacion.appendChild(btn);
  }
}

function aplicarFiltro() {
  const desde = document.getElementById('fecha-desde').value;
  const hasta = document.getElementById('fecha-hasta').value;

  if (!desde || !hasta) {
    alert('Por favor selecciona ambas fechas.');
    return;
  }

  const desdeFecha = new Date(desde);
  const hastaFecha = new Date(hasta);
  hastaFecha.setHours(23, 59, 59);

  pedidosFiltrados = pedidosFiltrados.filter(p => {
    const fechaPedido = new Date(p.fecha);
    return fechaPedido >= desdeFecha && fechaPedido <= hastaFecha;
  });

  mostrarPedidos(1);
}

async function mostrarDetalle(pedidoId) {
  const modal = document.getElementById('pedido-modal');
  const content = document.getElementById('modal-content');

  try {
    const res = await fetch(`http://localhost:3000/api/ventas/${pedidoId}`);
    const productos = await res.json();

    content.innerHTML = `<h3>Detalle del Pedido #${pedidoId}</h3>`;
    productos.forEach(p => {
      content.innerHTML += `
        <div style="margin-bottom: 1rem;">
          <strong>${p.nombre}</strong> - ${p.cantidad} x $${p.precio_unitario}
        </div>
      `;
    });

    modal.classList.remove('hidden');
  } catch (err) {
    console.error('Error al mostrar detalle:', err);
  }
}

document.getElementById('pedido-modal').addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.add('hidden');
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('pedido-modal').classList.add('hidden');
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