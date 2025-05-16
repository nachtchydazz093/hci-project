(() => {
  'use strict';

  const form = document.getElementById('signUpForm');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const confirmPasswordFeedback = document.getElementById('confirmPasswordFeedback');
  const serverError = document.getElementById('serverError');

  // Password match validation on input
  confirmPassword.addEventListener('input', () => {
    confirmPassword.setCustomValidity('');
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity('Passwords do not match.');
      confirmPassword.classList.add('is-invalid');
      confirmPasswordFeedback.style.display = 'block';
    } else {
      confirmPassword.classList.remove('is-invalid');
      confirmPasswordFeedback.style.display = 'none';
    }
  });

  // Toggle password visibility for all toggle buttons
  document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const icon = button.querySelector('i');

      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      }
    });
  });

  // Form submission
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Reset custom messages and hide server error
    confirmPassword.setCustomValidity('');
    serverError.classList.add('d-none');

    // Validate password match
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity('Passwords do not match.');
      confirmPassword.classList.add('is-invalid');
      confirmPasswordFeedback.style.display = 'block';
    }

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    // Simulate server interaction
    const success = true; // Simulate success/failure
if (success) {
  alert('Account created successfully!');
  form.reset();
  form.classList.remove('was-validated');
  // Redirect to index.html after sign up
  window.location.href = 'index.html';
} else {
  serverError.classList.remove('d-none');
}

  });
})();
