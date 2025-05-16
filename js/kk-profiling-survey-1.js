(() => {
  'use strict';

  const form = document.getElementById('kkSurveyForm');
  const sexRadios = form.querySelectorAll('input[name="sex"]');
  const sexFeedback = document.getElementById('sexFeedback');
  const birthDateInput = document.getElementById('birthDate');
  const ageInput = document.getElementById('age');

  // Calculate Age function
  function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // Update age input value based on birthDate input
  function updateAge() {
    const birthDate = new Date(birthDateInput.value);
    if (birthDateInput.value && !isNaN(birthDate)) {
      const age = calculateAge(birthDate);
      ageInput.value = age > 0 ? age : '';
    } else {
      ageInput.value = '';
    }
  }

  // Calculate age on birthDate change
  birthDateInput.addEventListener('change', updateAge);

  // Also update age if page loads with a pre-filled birthDate value
  if (birthDateInput.value) {
    updateAge();
  }

  // Hide sex feedback when any radio selected
  sexRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if ([...sexRadios].some(r => r.checked)) {
        sexFeedback.style.display = 'none';
      }
    });
  });

  // Form validation and submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate sex radio buttons
    if (![...sexRadios].some(r => r.checked)) {
      sexFeedback.style.display = 'block';
      isValid = false;
    } else {
      sexFeedback.style.display = 'none';
    }

    // Validate native HTML5 constraints
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      isValid = false;
    }

    // Extra check for age (should be positive)
    if (!ageInput.value || Number(ageInput.value) <= 0) {
      ageInput.setCustomValidity('Invalid age');
      isValid = false;
      form.classList.add('was-validated');
    } else {
      ageInput.setCustomValidity('');
    }

    if (!isValid) {
      // Show browser validation UI
      form.reportValidity();
      return;
    }

    // Proceed on success: redirect to next page
    alert('Personal Information validated! Moving to Demographic Characteristics page...');
    window.location.href = 'kk-profiling-survey-2.html';
  });
})();
