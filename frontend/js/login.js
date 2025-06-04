document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();

  const correo = document.getElementById('correo').value.trim();
  const contrasena = document.getElementById('contrasena').value;

  try {
    const res = await fetch('http://localhost:3000/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contrasena })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      alert('Inicio de sesión exitoso');
      window.location.href = 'index.html';
    } else {
      alert((data.error || 'Credenciales incorrectas'));
    }

  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    alert('Error de conexión con el servidor.');
  }
});
document.getElementById('btn-invitado').addEventListener('click', () => {
  const invitado = {
    nombre: 'Invitado',
    apellido: '',
    correo: 'invitado@demo.com'
  };

  localStorage.setItem('usuario', JSON.stringify(invitado));
  localStorage.setItem('token', 'invited-access');
  alert('Has ingresado como invitado');
  window.location.href = 'index.html';
});
