document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');

  // Signature removed

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    let valid = true;
    form.querySelectorAll('.field__error').forEach(el => el.textContent = '');

    if (!data.name || String(data.name).trim().length < 2) { setError('name', 'Please enter your full name'); valid = false; }
    if (!data.sex) { setError('sex', 'Please select sex'); valid = false; }
    if (!data.age || Number.isNaN(Number(data.age))) { setError('age', 'Enter a valid age'); valid = false; }
    if (!data.contact || String(data.contact).trim().length < 7) { setError('contact', 'Enter a valid contact number'); valid = false; }
    if (!data.purpose || String(data.purpose).trim().length < 3) { setError('purpose', 'Please enter a purpose'); valid = false; }
    if (!data.pwd) { setError('pwd', 'Please select Yes or No'); valid = false; }

    if (!form.terms.checked) { alert('Please accept the terms & conditions.'); valid = false; }
    if (!valid) return;
    alert('Form submitted');
    form.reset();
    
  });

  function setError(name, message) {
    const field = form.querySelector(`[name="${name}"]`)?.closest('.field');
    const error = field?.querySelector('.field__error');
    if (error) error.textContent = message;
  }
});


