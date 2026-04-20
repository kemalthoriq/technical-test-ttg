function isValidEmail(email) {
  const polaemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return polaemail.test(email);
}

function handleSubmit(event) {

  event.preventDefault();

  const nama       = document.getElementById('nama').value.trim();
  const email      = document.getElementById('email').value.trim();
  const password   = document.getElementById('password').value;
  const konfirmasi = document.getElementById('konfirmasi').value;

  document.getElementById('namaError').textContent       = '';
  document.getElementById('emailError').textContent      = '';
  document.getElementById('passwordError').textContent   = '';
  document.getElementById('konfirmasiError').textContent = '';
  document.getElementById('successMsg').textContent      = '';

  let isValid = true;

  if (nama === '') {
    document.getElementById('namaError').textContent = 'Nama lengkap tidak boleh kosong';
    isValid = false;
  }

  if (email === '') {
    document.getElementById('emailError').textContent = 'Email tidak boleh kosong';
    isValid = false;
  } else if (!isValidEmail(email)) {
    document.getElementById('emailError').textContent = 'Format email tidak valid';
    isValid = false;
  }

  if (password.length < 8) {
    document.getElementById('passwordError').textContent = 'Password minimal 8 karakter';
    isValid = false;
  }

  if (konfirmasi !== password) {
    document.getElementById('konfirmasiError').textContent = 'Konfirmasi password tidak cocok';
    isValid = false;
  }

  if (isValid) {
    document.getElementById('successMsg').textContent = 'Pendaftaran Berhasil';
  }
}

document.getElementById('registrationForm').addEventListener('submit', handleSubmit);
