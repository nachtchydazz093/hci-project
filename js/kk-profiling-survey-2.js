document.addEventListener('DOMContentLoaded', () => {
  // Cache elements that exist in your HTML
  const attendedAssemblyRadios = document.getElementsByName('attendedAssembly');
  const kkAssemblyYesDetails = document.getElementById('kkAssemblyYesDetails');
  const kkAssemblyNoDetails = document.getElementById('kkAssemblyNoDetails');

  const scholarshipRadios = document.getElementsByName('scholarshipBeneficiary');
  const scholarshipDetailsInput = document.getElementById('scholarshipDetails');

  const employmentStatusSelect = document.getElementById('employmentStatus');
  const employmentDetailsDiv = document.getElementById('employmentDetails');

  const skillOtherCheckbox = document.getElementById('skillOther');
  const skillOtherText = document.getElementById('skillOtherText');

  const govAssistOthersCheckbox = document.getElementById('assistOthers');
  const govAssistOtherText = document.getElementById('govAssistOtherText');

  const disabilityRadios = document.getElementsByName('disability');
  const disabilityDetailsInput = document.getElementById('disabilityDetails');

  const youthOrgRadios = document.getElementsByName('memberYouthOrg');
  const youthOrgNameInput = document.getElementById('youthOrgName');

  const socialOthersCheckbox = document.getElementById('socialOthers');
  const socialOthersText = document.getElementById('socialOthersText');

  // Signature Pad setup (assuming you still use it)
  const canvas = document.getElementById('signaturePad');
  const clearBtn = document.getElementById('clearSignatureBtn');
  const uploadInput = document.getElementById('uploadSignature');
  const signaturePreview = document.getElementById('signaturePreview');
  let signaturePad;

  // Resize canvas for crisp drawing
  function resizeCanvas() {
    if (!canvas) return;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    const ctx = canvas.getContext('2d');
    ctx.scale(ratio, ratio);
  }
  resizeCanvas();
  if (canvas) {
    signaturePad = new SignaturePad(canvas);
  }
  window.addEventListener('resize', () => {
    resizeCanvas();
    if (signaturePad) signaturePad.clear();
  });

  // Toggle visibility helper
  function toggleVisibility(el, show) {
    if (!el) return;
    if (show) {
      el.classList.remove('d-none');
      el.disabled = false;
    } else {
      el.classList.add('d-none');
      el.disabled = true;
      if ('value' in el) el.value = '';
      if (el.type === 'checkbox' || el.type === 'radio') el.checked = false;
    }
  }

  // -- Attended Assembly radios toggle
  if (attendedAssemblyRadios.length && kkAssemblyYesDetails && kkAssemblyNoDetails) {
    attendedAssemblyRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        toggleVisibility(kkAssemblyYesDetails, radio.value === 'Yes');
        toggleVisibility(kkAssemblyNoDetails, radio.value === 'No');
      });
    });
  }

  // -- Scholarship Beneficiary radios toggle
  if (scholarshipRadios.length && scholarshipDetailsInput) {
    scholarshipRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        toggleVisibility(scholarshipDetailsInput, radio.value === 'Yes');
      });
    });
  }

  // -- Employment Status toggle employment details div
  if (employmentStatusSelect && employmentDetailsDiv) {
    employmentStatusSelect.addEventListener('change', () => {
      const val = employmentStatusSelect.value;
      if (val === 'Employed' || val === 'Self-Employed') {
        toggleVisibility(employmentDetailsDiv, true);
      } else {
        toggleVisibility(employmentDetailsDiv, false);
      }
    });
  }

  // -- Skill Other checkbox toggle text input
  if (skillOtherCheckbox && skillOtherText) {
    skillOtherCheckbox.addEventListener('change', () => {
      toggleVisibility(skillOtherText, skillOtherCheckbox.checked);
    });
  }

  // -- Government Assistance Others checkbox toggle text input
  if (govAssistOthersCheckbox && govAssistOtherText) {
    govAssistOthersCheckbox.addEventListener('change', () => {
      toggleVisibility(govAssistOtherText, govAssistOthersCheckbox.checked);
    });
  }

  // -- Disability radios toggle text input
  if (disabilityRadios.length && disabilityDetailsInput) {
    disabilityRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        toggleVisibility(disabilityDetailsInput, radio.value === 'Yes');
      });
    });
  }

  // -- Youth Org Member radios toggle text input
  if (youthOrgRadios.length && youthOrgNameInput) {
    youthOrgRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        toggleVisibility(youthOrgNameInput, radio.value === 'Yes');
      });
    });
  }

  // -- Social Media Others checkbox toggle text input
  if (socialOthersCheckbox && socialOthersText) {
    socialOthersCheckbox.addEventListener('change', () => {
      toggleVisibility(socialOthersText, socialOthersCheckbox.checked);
    });
  }

  // -- Clear signature button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (signaturePad) signaturePad.clear();
      if (signaturePreview) signaturePreview.innerHTML = '';
      if (uploadInput) uploadInput.value = '';
    });
  }

  // -- Upload signature image preview
  if (uploadInput) {
    uploadInput.addEventListener('change', () => {
      const file = uploadInput.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => {
          if (signaturePreview) signaturePreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Signature" class="img-fluid rounded" />`;
          if (signaturePad) signaturePad.clear();
        };
        reader.readAsDataURL(file);
      } else {
        if (signaturePreview) signaturePreview.innerHTML = '';
      }
    });
  }

  // Form submit handling (basic example, add your validation here)
  const form = document.getElementById('kkSurveyForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Example: basic HTML5 validation check
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      // You can add custom validations here if needed

      // On success, show alert and redirect
      alert('Thank you for completing the survey! Redirecting to homepage...');
      window.location.href = 'index.html';
    });
  }
});
