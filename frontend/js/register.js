document.getElementById('form-registro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const contrasena = document.getElementById('contrasena').value;

  if (!validarCorreo(correo)) {
    alert('Correo no válido.');
    return;
  }

  if (contrasena.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres.');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/usuarios/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, correo, contrasena })
    });

    if (res.ok) {
      alert('Registro exitoso. Inicia sesión.');
      window.location.href = 'login.html';
    } else {
      const data = await res.json();
      alert('Error: ' + (data.error || 'No se pudo registrar.'));
    }
  } catch (err) {
    console.error(err);
    alert('Error al conectarse con el servidor.');
  }
});

function validarCorreo(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}
