const canvas = document.getElementById('lorenzCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

const sigmaInput = document.getElementById('sigma');
const rhoInput = document.getElementById('rho');
const betaInput = document.getElementById('beta');
const animateCheckbox = document.getElementById('animate');
const drawOnceButton = document.getElementById('draw-once');
const drawLinesCheckbox = document.getElementById('draw-lines');

let sigma = parseFloat(sigmaInput.value);
let rho = parseFloat(rhoInput.value);
let beta = parseFloat(betaInput.value);
let intervalId;

function lorenz(x, y, z) {
  const dx = sigma * (y - x);
  const dy = x * (rho - z) - y;
  const dz = x * y - beta * z;
  return [dx, dy, dz];
}

let prevX, prevY;

function drawLine(x, y, size, color) {
  if(drawLinesCheckbox.checked) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  if (prevX !== undefined && prevY !== undefined) {
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  prevX = x;
  prevY = y;}
  else{
    drawPoint(x, y, size, color);
  }
}


function drawPoint(x, y, size, color) {
    if(drawLinesCheckbox.checked) {
        drawLine(x, y, size, color);
    }else{
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();
    }
  
}

function animateLorenz() {
  console.log('Animating');
  let x = 0.01;
  let y = 0;
  let z = 0;
  let dt = 0.01;
  let color = 'black';

  intervalId= setInterval(() => {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < 10000; i++) {
      const [dx, dy, dz] = lorenz(x, y, z);
      x += dx * dt;
      y += dy * dt;
      z += dz * dt;
      const xPixel = (x / 30) * width + width / 2;
      const yPixel = (-y / 30) * height + height / 2;
      //drawLine(xPixel, yPixel, xPixel + 1, yPixel + 1, color, 0.1);
      drawPoint(xPixel, yPixel, 1, color);
      color = `rgb(${Math.floor(xPixel % 255)}, ${Math.floor(yPixel % 255)}, 150)`;
    }
  }, 100);
}

function drawLorenz() {
  let x = 0.01;
  let y = 0;
  let z = 0;
  let dt = 0.01;// This parameter determines the time step used in the numerical simulation. Lower values of dt result in a more accurate simulation, but also require more computational resources.
  let color = 'black';

  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < 10000; i++) {
    const [dx, dy, dz] = lorenz(x, y, z);
    x += dx * dt;
    y += dy * dt;
    z += dz * dt;
    const xPixel = (x / 30) * width + width / 2;
    const yPixel = (-y / 30) * height + height / 2;
    drawLine(xPixel, yPixel, 1, color);
    //drawPoint(xPixel, yPixel, 1, color);
    color = `rgb(${Math.floor(xPixel % 255)}, ${Math.floor(yPixel % 255)}, 150)`;
  }
}

animateCheckbox.addEventListener('change', () => {
  if (!animateCheckbox.checked) {
    clearInterval(intervalId);
  }else{
    animateLorenz();
  }
});

drawOnceButton.addEventListener('click', () => {
  drawLorenz();
});

sigmaInput.addEventListener('input', () => {
  sigma = parseFloat(sigmaInput.value);
});

rhoInput.addEventListener('input', () => {
  rho = parseFloat(rhoInput.value);
});

betaInput.addEventListener('input', () => {
  beta = parseFloat(betaInput.value);
});
