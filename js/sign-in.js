(() => {
  'use strict';

  const form = document.getElementById('signInForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.querySelector('.toggle-password');
  const serverError = document.getElementById('serverError');

  const validEmail = 'test@example.com';
  const validPassword = 'Password';

  // Toggle password visibility
  togglePasswordBtn?.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    const icon = togglePasswordBtn.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Hide previous server error message
    serverError.classList.add('d-none');

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    // Validate against hardcoded credentials
    if (emailInput.value.trim() === validEmail && passwordInput.value === validPassword) {
      alert('Signed in successfully!');
      window.location.href = 'index.html'; // Redirect after successful sign-in
    } else {
      serverError.textContent = 'Invalid email or password.';
      serverError.classList.remove('d-none');
    }
  });
})();
