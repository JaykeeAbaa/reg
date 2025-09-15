document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');

  // Signature canvas
  const canvas = document.getElementById('signature');
  const clearBtn = document.getElementById('clear-signature');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    let drawing = false;
    let rect = canvas.getBoundingClientRect();

    const getPoint = (e) => {
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      return { x, y };
    };

    const start = (e) => { drawing = true; ctx.beginPath(); const {x,y}=getPoint(e); ctx.moveTo(x,y); e.preventDefault(); };
    const move = (e) => { if (!drawing) return; const {x,y}=getPoint(e); ctx.lineTo(x,y); ctx.stroke(); e.preventDefault(); };
    const end = () => { drawing = false; };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', end);
    window.addEventListener('resize', () => { rect = canvas.getBoundingClientRect(); });

    clearBtn?.addEventListener('click', () => { ctx.clearRect(0,0,canvas.width,canvas.height); });
  }

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

    if (!valid) return;
    alert('Form submitted');
    form.reset();
    const ctx = document.getElementById('signature')?.getContext('2d');
    ctx?.clearRect(0,0,document.getElementById('signature').width,document.getElementById('signature').height);
  });

  function setError(name, message) {
    const field = form.querySelector(`[name="${name}"]`)?.closest('.field');
    const error = field?.querySelector('.field__error');
    if (error) error.textContent = message;
  }
});


