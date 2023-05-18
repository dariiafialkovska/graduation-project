// Get the canvas element
const canvas = document.getElementById('canvas8');
const ctx = canvas.getContext('2d');

// Define the canvas size
const width = canvas.width;
const height = canvas.height;

// Set the maximum number of iterations
const maxIterations = 200;

// Define the hue range variables
const hueRangeStart = 100; // Start value of the hue range
const hueRangeEnd = 1000; // End value of the hue range

const exponent = 2; // The exponent of the Mandelbrot set

// Define the zoom parameters
let scale = 1;
let translateX = 0;
let translateY = 0; // Controls the rate of zoom

// Define the center point of the fractal
let centerX = -0.5;
let centerY = 0;



// Define the function to check if a point is in the Mandelbrot set
function isInMandelbrotSet(x, y) {
    let real = 0;
    let imaginary = 0;
  
    for (let i = 0; i < maxIterations; i++) {
        const realTemp = real;
        const imaginaryTemp = imaginary;
    
        for (let j = 0; j < exponent - 1; j++) {
          const tempReal = real * realTemp - imaginary * imaginaryTemp;
          const tempImaginary = real * imaginaryTemp + imaginary * realTemp;
    
          real = tempReal;
          imaginary = tempImaginary;
        }
    
        real += x;
        imaginary += y;
    
        if (real * real + imaginary * imaginary > 4) {
          return i; // Return the number of iterations
        }
      }
    return maxIterations; // Point is inside the set
  }


// Function to handle the zoom
function handleZoom(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    const scaleFactor = event.deltaY > 0 ? 1.1 : 0.9;
  
    const xNormalized = (x / width) * 2 - 1;
    const yNormalized = (y / height) * 2 - 1;
  
    translateX -= (xNormalized * (1 / scale - 1 / (scale * scaleFactor))) / 2;
    translateY -= (yNormalized * (1 / scale - 1 / (scale * scaleFactor))) / 2;
    scale *= scaleFactor;
  
    // Re-render the fractal with the updated scale and translation
    renderFractal();
  }
  
  function renderFractal(){
    ctx.clearRect(0, 0, width, height);
    // Iterate over all the pixels in the canvas
    for (let pixelX = 0; pixelX < width; pixelX++) {
        for (let pixelY = 0; pixelY < height; pixelY++) {
        // Convert pixel coordinates to the corresponding point in the complex plane
        const x = (pixelX - width / 2) * 4 / width;
        const y = (pixelY - height / 2) * 4 / height;
    
        // Check the number of iterations for the point
        const iterations = isInMandelbrotSet(x, y);
    
        // Map the number of iterations to a color within the user-defined hue range
        const hue = iterations === maxIterations ? hueRangeStart : (iterations / maxIterations) * (hueRangeEnd - hueRangeStart) + hueRangeStart;
        const saturation = 1;
        const lightness = iterations === maxIterations ? 0 : 0.5;
    
        // Set the color of the pixel
        ctx.fillStyle = `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%)`;
    
        // Draw the pixel
        ctx.fillRect(pixelX, pixelY, 1, 1);
        }
    }  // Iterate over all the pixels in the canvas
    for (let pixelX = 0; pixelX < width; pixelX++) {
      for (let pixelY = 0; pixelY < height; pixelY++) {
        // Convert pixel coordinates to the corresponding point in the complex plane
        const x = (pixelX - width / 2) / (width / 4);
        const y = (pixelY - height / 2) / (height / 4);
  
        // Check the number of iterations for the point
        const iterations = isInMandelbrotSet(x, y);
  
        // Map the number of iterations to a color
        const hue = iterations === maxIterations ? 0 : (iterations / maxIterations) * 360;
        const saturation = 1;
        const lightness = iterations === maxIterations ? 0 : 0.5;
  
        // Set the color of the pixel
        ctx.fillStyle = `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%)`;
  
        // Draw the pixel
        ctx.fillRect(pixelX, pixelY, 1, 1);
      }
    }

  }

// Attach the zoom event listener to the canvas
canvas.addEventListener('wheel', handleZoom);

// Initial rendering of the fractal
renderFractal();