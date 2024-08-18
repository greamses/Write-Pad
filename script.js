document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let painting = false;
  let penColor = '#000';
  let penSize = 5;
  let isErasing = false;

  // Resize the canvas to fit its container
  const resizeCanvas = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Start and stop painting
  const startPosition = (e) => {
    painting = true;
    draw(e);
  };

  const endPosition = () => {
    painting = false;
    ctx.beginPath();
  };

  // Draw on the canvas
  const draw = (e) => {
    if (!painting) return;

    ctx.lineWidth = penSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isErasing ? '#fff' : penColor;

    const rect = canvas.getBoundingClientRect();
    let x, y;
    if (e.type.includes('mouse')) {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    } else if (e.type.includes('touch')) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  // Event listeners for mouse and touch events
  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);
  canvas.addEventListener('mousemove', draw);

  canvas.addEventListener('touchstart', startPosition);
  canvas.addEventListener('touchend', endPosition);
  canvas.addEventListener('touchmove', draw);

  // Toolbar toggle
  const toggleToolbarBtn = document.querySelector('.toggle-toolbar');
  const toolbar = document.querySelector('.toolbar');
  toggleToolbarBtn.addEventListener('click', () => {
    toolbar.classList.toggle('show');
    toggleToolbarBtn.classList.toggle('active');
  });

  // Color picker
  const colorPickerDivs = document.querySelectorAll('.color-picker div');
  colorPickerDivs.forEach(div => {
    div.addEventListener('click', () => {
      penColor = div.getAttribute('data-color');
      isErasing = false;
      colorPickerDivs.forEach(d => d.style.border = '2px solid #ffd700');
      div.style.border = '4px solid #000';
    });
  });

  // Pen size picker
  const penSizeInput = document.getElementById('penSize');
  penSizeInput.addEventListener('change', (e) => {
    penSize = e.target.value;
  });

  // Eraser
  const eraseBtn = document.getElementById('eraseBtn');
  eraseBtn.addEventListener('click', () => {
    isErasing = true;
  });

  // Clear button
  const clearBtn = document.getElementById('clearBtn');
  clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Flip card functionality
  const flipBtns = document.querySelectorAll('.flip-btn');
  const card = document.querySelector('.card');
  flipBtns.forEach(flipBtn => {
    flipBtn.addEventListener('click', () => {
      card.style.transform = card.style.transform === 'rotateY(180deg)' ? '' : 'rotateY(180deg)';
    });
  });

  // Calculator functionality
  const calcDisplay = document.getElementById('calc-display');
  const calcButtons = document.querySelectorAll('#calc-buttons button');
  let calcExpression = '';

  calcButtons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.innerText;
      if (value === '=') {
        try {
          calcExpression = eval(calcExpression);
        } catch {
          calcExpression = 'Error';
        }
      } else if (value === 'C') {
        calcExpression = '';
      } else {
        calcExpression += value;
      }
      calcDisplay.value = calcExpression;
    });
  });
});