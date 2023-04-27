window.addEventListener('load', function() {
    const randomizeArtButton = document.getElementById('randomizeArtButton');
    const previousButton=document.getElementById('previous');
    const nextButton=document.getElementById('next');
    const saveButton=document.getElementById('saveCanvas');

    const canvas = document.getElementById('canvas4');
    const ctx = canvas.getContext('2d');

    //canvas.width = window.innerWidth/1.5;
    canvas.height = window.innerHeight/1.5;
    canvas.width = canvas.height;

    //drawing background
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.fillStyle = "#EAEFE9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    let previousStack=[];
    let nextStack=[];

    const palette={
        1:"#E70503", //red
        2:"#0300AD", //blue
        3:"#FDDE06", //yellow
        4:"#050103" //black
    }

    function saveState(){
        let state = ctx.getImageData(0, 0, canvas.width, canvas.height);
        previousStack.push(state);
        console.log('State saved:', state);
    }

    randomizeArtButton.addEventListener('click', function() {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 10;
        ctx.fillStyle = "#EAEFE9";
        console.log("randomizeArtButton clicked");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        createDeStijl();
        saveState();
    });
    //previous button
    previousButton.addEventListener('click', function() {
        if(previousStack.length>0){
            console.log("previousButton clicked");
            nextStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            let state = previousStack.pop();
            ctx.putImageData(state, 0, 0);
        }
    });
    //next button
    nextButton.addEventListener('click', function() {
        if(nextStack.length>0){
            console.log("nextButton clicked");
            previousStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            let state = nextStack.pop();
            ctx.putImageData(state, 0, 0);
        }
    });


    saveButton.addEventListener('click', function() {
        const format=document.querySelector('#format').value;
        const dataURL=canvas.toDataURL(format);
        const link=document.createElement('a');
        link.download=`my-image.${format}`;
        link.href=dataURL;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
    });


    function getRandomColor(){
        const colorIndex=Math.floor(Math.random() * Object.keys(palette).length) + 1;
        return palette[colorIndex];
    }

    function createDeStijl(){
// Set line thickness and color
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#000000';

        console.log("canvas width is:"+canvas.width);
        console.log("canvas height is:"+canvas.height);

        //set space between lines
        const spaceBetweenLinesX = canvas.width/6;
        const spaceBetweenLinesY = canvas.height/6;

        console.log("spaceBetweenLinesX is:"+spaceBetweenLinesX);
        console.log("spaceBetweenLinesY"+spaceBetweenLinesY);

        const horizontalLinesArray = [];
        const verticalLinesArray = [];

        horizontalLinesArray.push(0);//add the first line
        verticalLinesArray.push(0);//add the first line


        // Draw random horizontal lines
        const maxHorizontalLines =canvas.height/spaceBetweenLinesY;
        //maximum areas for horizontal lines is the canvas height divided by the space between lines


        console.log("maxHorizontalLines is:"+maxHorizontalLines);

        //const numHorizontalLines = Math.floor(Math.random() * maxHorizontalLines) + 1;//random number between 1 and maxHorizontalLines
        //console.log("numHorizontalLines is:"+numHorizontalLines);

        const numHorizontalDivisions= Math.floor(Math.random() * maxHorizontalLines) + 1;//random number between 1 and maxHorizontalLines
        console.log("numHorizontalDivisions is:"+numHorizontalDivisions);

        //here we define how many areas there will be so if there is 1 division there
        //will be two areas and two lines
        const areaWidthY = canvas.height/(numHorizontalDivisions+1);//calculating areas width
        console.log("areaWidthY is:"+areaWidthY);
        let y = 0;
        let startpointy = 0;
        for (let i = 0; i <= numHorizontalDivisions; i++) {//loop through the number of lines
            //defining the y value of the line
            //for example 
            //canvas is 300 and there is 3 divisions
            //first line should fall between 0 and 100
            //second line should fall between 101 and 200
            //third line should fall between 201 and 300
            
            y = Math.floor(Math.random() *(startpointy+areaWidthY-startpointy)) + startpointy;
            //the minimum should be startpointy
            //the maximum should be startpointy+areaWidthY

            startpointy=startpointy+areaWidthY;// we add the areaWidthY to the startpoint so the next line will fall in the next area
            
            horizontalLinesArray.push(y);//add the y value to the array
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
}

// Draw random vertical lines
const maxVerticalLines = canvas.width/spaceBetweenLinesX;

console.log("maxVerticalLines is:"+maxVerticalLines);


//const numVerticalLines = Math.floor(Math.random() * maxVerticalLines) + 1;
//console.log("numVerticalLines is:"+numVerticalLines);

const numVerticalDivisions = Math.floor(Math.random() * maxVerticalLines) + 1;//random number between 1 and maxHorizontalLines
console.log("numVerticalDivisions is:"+numVerticalDivisions);

const areaWidthX = canvas.width/(numVerticalDivisions+1);//calculating areas width
let startpointx = 0;
let x = 0;
for (let i = 0; i < numVerticalDivisions; i++) {
    x = Math.floor(Math.random() *(startpointx+areaWidthX-startpointx)) + startpointx;
    //the minimum should be startpointx
    //the maximum should be startpointx+areaWidthX

    startpointx=startpointx+areaWidthX;// we add the areaWidthX to the startpoint so the next line will fall in the next area
    verticalLinesArray.push(x);//add the y value to the array
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, canvas.height);
  ctx.stroke();
}

horizontalLinesArray.push(canvas.height);//add the last line
verticalLinesArray.push(canvas.width);//add the last line
console.log(horizontalLinesArray);
console.log(verticalLinesArray);

let num_of_rect=(horizontalLinesArray.length-1)*(verticalLinesArray.length-1)/2;


for(let n=0;n<num_of_rect;n++){
    console.log("Rectangle");
    console.log("n is:"+n);
    let y_int=Math.floor(Math.random() * (horizontalLinesArray.length-1));//random number between 0 and horizontalLinesArray.length-1
    let x_int=Math.floor(Math.random() * (verticalLinesArray.length-1));
    console.log(y_int);
    console.log(x_int);
    ctx.fillStyle = "#ff0000";
    if(y_int===horizontalLinesArray.length-1){//if the last line is selected go back
        y_int=y_int-1;
    }
    if(x_int===verticalLinesArray.length-1){//if the last line is selected go back
        x_int=x_int-1;
    }

    color=getRandomColor();
    ctx.fillStyle=color;
    ctx.strokeStyle="black";
    console.log("color is:"+color);
    
    //start point x,y,width,height
    ctx.fillRect(verticalLinesArray[x_int], horizontalLinesArray[y_int], verticalLinesArray[x_int+1]-verticalLinesArray[x_int], horizontalLinesArray[y_int+1]-horizontalLinesArray[y_int]);
    ctx.strokeRect(verticalLinesArray[x_int], horizontalLinesArray[y_int], verticalLinesArray[x_int+1]-verticalLinesArray[x_int], horizontalLinesArray[y_int+1]-horizontalLinesArray[y_int]);
    //ctx.strokeRect(horizontalLinesArray[y_int], verticalLinesArray[x_int], horizontalLinesArray[y_int+1], verticalLinesArray[x_int+1]);
    //ctx.fillRect(horizontalLinesArray[y_int], verticalLinesArray[x_int], horizontalLinesArray[y_int+1], verticalLinesArray[x_int+1]);
    console.log("horizontalLinesArray[y_int] is:"+horizontalLinesArray[y_int]);
    console.log("verticalLinesArray[x_int] is:"+verticalLinesArray[x_int]);
    console.log("horizontalLinesArray[y_int+1] is:"+horizontalLinesArray[y_int+1]);
    console.log("verticalLinesArray[x_int+1] is:"+verticalLinesArray[x_int+1]);

    
}

}


});