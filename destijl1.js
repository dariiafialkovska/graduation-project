window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas4');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth/1.5;
    canvas.height = window.innerHeight/1.5;

    //ctx.fillStyle = "#ff0000";
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = "#00ff00";
    //ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
    //ctx.fillStyle = "#0000ff";
    //ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    /*ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 100, 100);
    ctx.strokeRect(0, 0, 100, 100);
    ctx.strokeRect(100,100,200,100);
    ctx.strokeRect(200,0,100,100);
    ctx.strokeRect(300,200,100,100);
    ctx.strokeRect(400,300,100,100);
    ctx.strokeRect(500,400,100,100);*/

    let xpoints = [];
    let ypoints = [];

    let startx = 0;
    let starty = 0;

    /*
    function draw(number) {
        x_random = Math.floor(Math.random() * canvas.width);
        y_random = Math.floor(Math.random() * canvas.height);
        xpoints.push(x_random);
        ypoints.push(y_random);
        ctx.strokeRect(0,0,x_random,y_random);
        
    }
    draw(5);*/

    const colors = ['#FF0000', '#0000FF', '#FFFF00', '#00FF00', '#FF00FF'];

    // Set range of rows, columns, and cell sizes
    const numRows = Math.floor(Math.random() * 8) + 3; // between 3 and 10
    const numCols = Math.floor(Math.random() * 8) + 3; // between 3 and 10
    const minCellSize = 20;
    const maxCellSize = 70;
    
    // Calculate grid dimensions
    const gridWidth = canvas.width * 0.8;
    const gridHeight = canvas.height * 0.8;
    
    // Calculate cell sizes and padding to center grid in canvas
    const cellWidth = gridWidth / numCols;
    const cellHeight = gridHeight / numRows;
    const paddingX = (canvas.width - gridWidth) / 2;
    const paddingY = (canvas.height - gridHeight) / 2;
    
    // Draw the grid
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const x = paddingX + col * cellWidth + Math.random() * (cellWidth - minCellSize);
        const y = paddingY + row * cellHeight + Math.random() * (cellHeight - minCellSize);
        const width = minCellSize + Math.random() * (maxCellSize - minCellSize);
        const height = minCellSize + Math.random() * (maxCellSize - minCellSize);
        const color = colors[Math.floor(Math.random() * colors.length)];
        drawRect(x, y, width, height, color);
      }
    }
    
    // Function to draw a rectangle with a specified color and position
    function drawRect(x, y, width, height, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    }
});