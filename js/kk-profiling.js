document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('agreeCheckbox');
  const proceedBtn = document.getElementById('proceedBtn');

  checkbox.addEventListener('change', () => {
    proceedBtn.disabled = !checkbox.checked;
  });

  document.getElementById('consentForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default submission always

    if (!checkbox.checked) {
      alert('Please agree to the terms before proceeding.');
    } else {
      // Redirect to the first page of KK Profiling Survey
      window.location.href = 'kk-profiling-survey-1.html';
    }
  });
});
