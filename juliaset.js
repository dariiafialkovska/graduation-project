const canvas = document.getElementById('juliaCanvas');
const ctx = canvas.getContext('2d');


const width = canvas.width;
const height = canvas.height;
const zoom = 1;//this for zoom
const xOffset = 0;//this for X offset
const yOffset = 0;//this for Y offset
const maxIterations = 200;//this for max iterations
//The maxIterations parameter determines the maximum number of iterations for each point in the fractal. Increasing this value will produce more detailed and complex patterns, but it may also increase the computational time.
const escapeRadius = 4;
// The escapeRadius parameter defines the threshold value at which a point is considered to have escaped the Julia Set. Adjusting this value can alter the overall shape and density of the fractal.
let juliaConstant = 0.355;
//Experiment with different complex numbers, such as changing the real and imaginary parts, to see how they affect the shape and complexity of the fractal.
const iterationPower = 2; // Change the power value as desired

function drawJuliaSet() {
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const a = (x / width - 0.5) * zoom + xOffset;
        const b = (y / height - 0.5) * zoom + yOffset;
  
        let zx = a;
        let zy = b;
  
        let iteration = 0;
  
        while (iteration < maxIterations) {
            const xTemp = Math.pow(zx, iterationPower) - Math.pow(zy, iterationPower) + 0.355;
            zy = 2 * zx * zy + 0.355;
            zx = xTemp;
          
            if (zx * zx + zy * zy > escapeRadius * escapeRadius) {
              break;
            }
          
            iteration++;
          }
  
        const intensity = iteration / maxIterations;
        const hue = (200 * intensity) % 360;
        const palette = ['#ff0000', '#00ff00', '#0000ff']; // Example color palette
        const colorIndex = iteration % palette.length;
        //const color = palette[colorIndex];
        function lerpColor(color1, color2, t) {
            const r = Math.round(color1.r * (1 - t) + color2.r * t);
            const g = Math.round(color1.g * (1 - t) + color2.g * t);
            const b = Math.round(color1.b * (1 - t) + color2.b * t);
            return `rgb(${r}, ${g}, ${b})`;
          }
          
          const color1 = { r: 255, g: 0, b: 0 }; // Example start color
          const color2 = { r: 0, g: 0, b: 255 }; // Example end color
          
          const color = lerpColor(color1, color2, intensity);
          

        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
  
  drawJuliaSet();