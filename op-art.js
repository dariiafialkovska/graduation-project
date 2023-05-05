window.addEventListener('load',function(){
const canvas = document.getElementById("canvas4");
const ctx= canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

canvas.style.position='absolute';
canvas.style.left='50%';
canvas.style.top='50%';
canvas.style.transform='translate(-50%,-50%)';

//should be the 
let rect_size=Math.sqrt(canvas.width/2*canvas.width/2+canvas.height/2*canvas.height/2);
const rect_width = rect_size;
const rect_height = rect_size;
console.log(rect_size);
ctx.save();

function saveState(){
    let state = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undoStack.push(state);
    console.log('State saved:', state);
}

let undoStack=[];
let redoStack=[];
let spreadAngleRect=2;
let spreadRect=2;
let spreadCircle=2;
let checkeredRectSize=20;
let scale=2;

const slider_spreadAngleRect=this.document.getElementById('spreadAngleRect');
const label_spreadAngleRect=this.document.querySelector('[for="spreadAngleRect"]');
const slider_spreadCircle=this.document.getElementById('spreadCircle');
const label_spreadCircle=this.document.querySelector('[for="spreadCircle"]');
const slider_spreadRect=this.document.getElementById('spreadRect');
const label_spreadRect=this.document.querySelector('[for="spreadRect"]');
const slider_checkered=this.document.getElementById('checkered');
const label_checkered=this.document.querySelector('[for="checkered"]');
const slider_scale=this.document.getElementById('scale');
const label_scale=this.document.querySelector('[for="scale"]');


const clearButton = document.getElementById('clearCanvas');
const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');
const saveButton = document.getElementById('save');

slider_spreadAngleRect.addEventListener('change',function(e){
    ctx.restore();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    spreadAngleRect=e.target.value;
    updateSliders();
    middleAngledRectangle();

});

slider_spreadCircle.addEventListener('change',function(e){
    ctx.restore();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    spreadCircle=e.target.value;
    updateSliders();
    middleCircle();

});

slider_spreadRect.addEventListener('change',function(e){
    ctx.restore();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    spreadRect=e.target.value;
    updateSliders();
    middleRectangle();
});

slider_checkered.addEventListener('change',function(e){
    ctx.restore();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    checkeredRectSize=e.target.value;
    updateSliders();
    checkeredRectangle();
});

slider_scale.addEventListener('change',function(e){
    ctx.restore();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    scale=e.target.value;
    updateSliders();
    checkeredRectangle();
});


clearButton.addEventListener('click',function(){
    ctx.restore();
    ctx.clearRect(0,0,canvas.width,canvas.height);
});

function middleRectangle(){
    ctx.save();

    let numberofSeparations = spreadRect;
    let sizeofSeparations = canvas.width/numberofSeparations;
    let x1=canvas.width/2;
    let y1=canvas.height/2;
    let x2;
    let y2;
    let x3;
    let y3;
    //up side
    for(let i=0; i<numberofSeparations; i++){
        x2=i*sizeofSeparations;
        y2=0;
        x3=(i+1)*sizeofSeparations;
        y3=0;
        ctx.beginPath();
    
        // move to the first vertex
        ctx.moveTo(x1, y1);
    
        // draw lines to the other vertices
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        
        if(numberofSeparations%2==0){
        if(i%2==0){
            ctx.fillStyle = "white";
        }else{
            ctx.fillStyle = "black";
        }}
        else{
            if(i%2==0){
                ctx.fillStyle = "black";
            }else{
                ctx.fillStyle = "white";
            }
        }
        // fill the triangle
        ctx.fill();

    }
    //right side
    x2=canvas.width;
    x3=canvas.width;
    for(let i=0; i<numberofSeparations; i++){
        y2=i*sizeofSeparations;
        y3=(i+1)*sizeofSeparations;

        ctx.beginPath();
    
        // move to the first vertex
        ctx.moveTo(x1, y1);
    
        // draw lines to the other vertices
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
            if(i%2==0){
                ctx.fillStyle = "white";
            }else{
                ctx.fillStyle = "black";
            }

        // fill the triangle
        ctx.fill();
    }
    //down side
    y2=canvas.height;
    y3=canvas.height;
    for(let i=0; i<numberofSeparations; i++){
        x2=canvas.width-(i*sizeofSeparations);
        x3=canvas.width-((i+1)*sizeofSeparations);

        ctx.beginPath();

        // move to the first vertex
        ctx.moveTo(x1, y1);

        // draw lines to the other vertices
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        if(numberofSeparations%2==0){
            
            if(i%2==0){
                ctx.fillStyle = "white";
            }else{
                ctx.fillStyle = "black";
            }}
            else{
                if(i%2==0){
                    ctx.fillStyle = "black";
                }else{
                    ctx.fillStyle = "white";
                }
            }
        // fill the triangle
        ctx.fill();
    }
    //left side
    x2=0;
    x3=0;
    for(let i=0; i<numberofSeparations; i++){
        y2=canvas.height-(i*sizeofSeparations);
        y3=canvas.height-((i+1)*sizeofSeparations);

        ctx.beginPath();

        // move to the first vertex
        ctx.moveTo(x1, y1);

        // draw lines to the other vertices
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        if(i%2==0){
            ctx.fillStyle = "white";
        }else{
            ctx.fillStyle = "black";
        }
        // fill the triangle
        ctx.fill();
    }


    //inside rectangle
    let newRectWidth=canvas.width/2;
    let newRectHeight=canvas.height/2;
    let newRectX1=(canvas.width-newRectWidth)/2;
    let newRectY1=(canvas.height-newRectHeight)/2;
    let newRectX2=newRectX1+newRectWidth;
    let newRectY2=newRectY1+newRectHeight;

    sizeofSeparations=newRectWidth/numberofSeparations;
    //up side
    for(let i=0; i<numberofSeparations; i++){
        x2=i*sizeofSeparations+newRectX1;
        y2=newRectY1;
        x3=(i+1)*sizeofSeparations+newRectX1;
        y3=newRectY1;
        ctx.beginPath();
    
        // move to the first vertex
        ctx.moveTo(x1, y1);
    
        // draw lines to the other vertices
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        
        if(numberofSeparations%2==0){
        if(i%2==0){
            ctx.fillStyle = "black";
        }else{
            ctx.fillStyle = "white";
        }}
        else{
            if(i%2==0){
                ctx.fillStyle = "white";
            }else{
                ctx.fillStyle = "black";
            }
        }
        // fill the triangle
        ctx.fill();

    }
    //right side
    x2=newRectX2;
    x3=newRectX2;
    for(let i=0; i<numberofSeparations; i++){
        y2=i*sizeofSeparations+newRectY1;
        y3=(i+1)*sizeofSeparations+newRectY1;

        ctx.beginPath();
    
        // move to the first vertex
        ctx.moveTo(x1, y1);
    
        // draw lines to the other vertices
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
            if(i%2==0){
                ctx.fillStyle = "black";
            }else{
                ctx.fillStyle = "white";
            }

        // fill the triangle
        ctx.fill();
    }

    //down side
    y2=newRectY2;
    y3=newRectY2;
    for(let i=0; i<numberofSeparations; i++){
        x2=newRectX2-(i*sizeofSeparations);
        x3=newRectX2-((i+1)*sizeofSeparations);

        ctx.beginPath();

        // move to the first vertex
        ctx.moveTo(x1, y1);

        // draw lines to the other vertices
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        if(numberofSeparations%2==0){
            
            if(i%2==0){
                ctx.fillStyle = "black";
            }else{
                ctx.fillStyle = "white";
            }}
            else{
                if(i%2==0){
                    ctx.fillStyle = "white";
                }else{
                    ctx.fillStyle = "black";
                }
            }
        // fill the triangle
        ctx.fill();
    }
    //left side
    x2=newRectX1;
    x3=newRectX1;
    for(let i=0; i<numberofSeparations; i++){
        y2=newRectY2-(i*sizeofSeparations);
        y3=newRectY2-((i+1)*sizeofSeparations);

        ctx.beginPath();

        // move to the first vertex
        ctx.moveTo(x1, y1);

        // draw lines to the other vertices
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        if(i%2==0){
            ctx.fillStyle = "black";
        }else{
            ctx.fillStyle = "white";
        }
        // fill the triangle
        ctx.fill();
    }
        
}



function middleAngledRectangle(){
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(Math.PI/4);
    
    //ctx.fillRect(-rect_width/2, -rect_height/2, rect_width, rect_height);
    
    ctx.strokeStyle = "black";
    ctx.moveTo(0,0);
    ctx.lineTo(150,150);
    ctx.stroke();
    
    
    
    let numberofSeparations = spreadAngleRect;
    
    let nodesByWidth=rect_width/numberofSeparations;
    let nodesByHeight=rect_height/numberofSeparations;
    
    console.log(nodesByWidth);
    console.log(nodesByHeight);
    
    //center of rectangle
    let x1 = 0; 
    let y1 = 0;
    let y2 = 180;
    let y3 = 180;
    
    
    let y1outside = 357;
    //left down side
    for(let i=0; i<numberofSeparations; i++){
        let x2 = 180-(i*nodesByWidth);
        let x3 = 180-((i+1)*nodesByWidth);
        ctx.beginPath();
    
        // move to the first vertex
        ctx.moveTo(x1, y1);
    
        // draw lines to the other vertices
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        
        if(numberofSeparations%2==0){
        if(i%2==0){
            ctx.fillStyle = "white";
        }else{
            ctx.fillStyle = "black";
        }}
        else{
            if(i%2==0){
                ctx.fillStyle = "black";
            }else{
                ctx.fillStyle = "white";
            }
        }
        // fill the triangle
        ctx.fill();
    
        ctx.beginPath();
        ctx.moveTo(x1, y1outside);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
    
        if(numberofSeparations%2==0){

        if(i%2==0){
            ctx.fillStyle = "black";
        }else{
            ctx.fillStyle = "white";
        }}
        else{
            if(i%2==0){
                ctx.fillStyle = "white";
            }else{
                ctx.fillStyle = "black";
            }
        }

        ctx.fill();
    
    }
    
    x1outside = -357;
    x2 =-180;
    x3= -180;
    
    //left up side
    for(let i=0; i<numberofSeparations; i++){
        let y2 = 180-(i*nodesByWidth);
        let y3 = 180-((i+1)*nodesByWidth);
        ctx.beginPath();
    
        // move to the first vertex
        ctx.moveTo(x1, y1);
    
        // draw lines to the other vertices
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        
        if(i%2==0){
            ctx.fillStyle = "white";
        }else{
            ctx.fillStyle = "black";
        }
        // fill the triangle
        ctx.fill();
    
    
        ctx.beginPath();
        ctx.moveTo(x1outside, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
    
        if(i%2==0){
            ctx.fillStyle = "black";
        }else{
            ctx.fillStyle = "white";
        }
        ctx.fill();
    }
    
    y2=-180;
    y3=-180;
    y1outside = -357;
    
    //right up side
    for(let i=0; i<numberofSeparations; i++){
        let x2 = -180+(i*nodesByWidth);
        let x3 = -180+((i+1)*nodesByWidth);
        ctx.beginPath();
    
        // move to the first vertex
        ctx.moveTo(x1, y1);
    
        // draw lines to the other vertices
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        if(numberofSeparations%2==0){
        if(i%2==0){
            ctx.fillStyle = "white";
        }else{
            ctx.fillStyle = "black";
        }}
        else{
            if(i%2==0){
                ctx.fillStyle = "black";
            }else{
                ctx.fillStyle = "white";
            }
        }

        // fill the triangle
        ctx.fill();
    
        ctx.beginPath();
        ctx.moveTo(x1, y1outside);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
    
        if(numberofSeparations%2==0){

        if(i%2==0){
            ctx.fillStyle = "black";
        }else{
            ctx.fillStyle = "white";
        }}
        else{
            if(i%2==0){
                ctx.fillStyle = "white";
            }else{
                ctx.fillStyle = "black";
            }
        }
        ctx.fill();
    }
    
    x1outside = 357;
    x2=180;
    x3=180;
    //right down side
    for(let i=0; i<numberofSeparations; i++){
        let y2 = -180+(i*nodesByWidth);
        let y3 = -180+((i+1)*nodesByWidth);
        ctx.beginPath();
    
        // move to the first vertex
        ctx.moveTo(x1, y1);
    
        // draw lines to the other vertices
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
    
        if(i%2==0){
            ctx.fillStyle = "white";
        }else{
            ctx.fillStyle = "black";
        }
        // fill the triangle
        ctx.fill();
    
        ctx.beginPath();
        ctx.moveTo(x1outside, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
    
        if(i%2==0){
            ctx.fillStyle = "black";
        }else{
            ctx.fillStyle = "white";
        }
        ctx.fill();
    }
    
};

function middleCircle(){
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;
    let startAngle = 0;
    if(spreadCircle%2==1){
        spreadCircle++;
    }
    let angleSize=2*Math.PI/spreadCircle;

    let x1;
    let y1;
    let x2;
    let y2;
    let x3=0;
    let y3=0;

    console.log(startAngle);
    for(let i=0; i<spreadCircle; i++){
        console.log(startAngle);
        if((startAngle>=0)&&(startAngle<Math.PI/2)){
            x3=canvas.width;
            y3=canvas.height;
            console.log("1");
        }
        else if((startAngle>=Math.PI/2)&&(startAngle<Math.PI)){
            x3=0;
            y3=canvas.height;
            console.log("2");
        }
        else if((startAngle>=Math.PI)&&(startAngle<3*Math.PI/2)){
            x3=0;
            y3=0;
            console.log("3");
        }
        else if((startAngle>=3*Math.PI/2)&&(startAngle<=2*Math.PI)){
            x3=canvas.width;
            y3=0;
            console.log("4");
        }

        x1=centerX+radius*Math.cos(startAngle);
        y1=centerY+radius*Math.sin(startAngle);
        x2=centerX+radius*Math.cos(startAngle+angleSize);
        y2=centerY+radius*Math.sin(startAngle+angleSize);

        ctx.beginPath();
        ctx.moveTo(x3, y3);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);


        if(i%2==0){
            ctx.fillStyle = "black";
        }
        else{
            ctx.fillStyle = "white";
        }

        ctx.closePath();
        ctx.fill();

        if(i%2==0){
            ctx.fillStyle = "white";
        }
        else{
            ctx.fillStyle = "black";
        }


        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle+angleSize);
        ctx.closePath();
        startAngle+=angleSize;

        ctx.fill();

    }
  }
  
function checkeredRectangle(){
    ctx.restore();
    let number=parseInt(checkeredRectSize);
    const rectWidth = canvas.width/number; // width of each rectangle
    const rectHeight = canvas.width/number; // height of each rectangle
    console.log(rectWidth);
    console.log(rectHeight);
    // Loop through the rows of rectangles
    let i1=0;
    let j1=0;
    for (let i = 0; i < canvas.height; i += rectHeight) {
      // Loop through the columns of rectangles
      for (let j = 0; j < canvas.width; j += rectWidth) {
        // Alternate the fill color of each rectangle
        if ((i1 + j1) % 2 == 0) {
          ctx.fillStyle = 'white';
        } else {
          ctx.fillStyle = 'black';
        }
        // Draw the rectangle
        ctx.fillRect(j, i, rectWidth, rectHeight);
        j1=j1+1;
      }
      j1=0;
      i1=i1+1;

    }
    
    scale=parseInt(scale);
    if(scale>=checkeredRectSize){
        scale=checkeredRectSize-2;
    }

    if(scale%2==1 && checkeredRectSize%2==0){
        scale--;
        console.log( "scale is odd"+scale);
        if(scale==0){
            scale=2;
        }
    }
    else if(scale%2==0 && checkeredRectSize%2==1){
        console.log( "scale is even"+scale);
        scale--;
        if(scale==0){
            scale=2;
        }
    }

    let spredCheckered=parseInt(scale);
    let insideRectWidth=rectWidth*spredCheckered;
    let insideRectHeight=rectHeight*spredCheckered;

    let insideX1=(checkeredRectSize-scale)*rectWidth/2;
    let insideY1=(checkeredRectSize-scale)*rectHeight/2;

    let insideX2=insideX1+insideRectWidth;
    let insideY2=insideY1+insideRectHeight;
    i1=0;
    j1=0;
    for (let i = insideX1; i < insideY2; i += rectHeight/2) {
        // Loop through the columns of rectangles
        for (let j = insideX1; j < insideX2; j += rectWidth/2) {
          // Alternate the fill color of each rectangle
          if ((i1 + j1) % (2) === 0) {
            ctx.fillStyle = 'black';
          } else {
            ctx.fillStyle = 'white';
          }
          // Draw the rectangle
          ctx.fillRect(j, i, rectWidth/2, rectHeight/2);
            j1=j1+1;
        }
        j1=0;
        i1=i1+1;
      }
  
}




function updateSliders(){
    slider_spreadAngleRect.value=spreadAngleRect;
    label_spreadAngleRect.innerText='Spread: '+Number(spreadAngleRect);

    slider_spreadCircle.value=spreadCircle;
    label_spreadCircle.innerText='Spread: '+Number(spreadCircle);

    slider_spreadRect.value=spreadRect;
    label_spreadRect.innerText='Spread: '+Number(spreadRect);

    slider_checkered.value=checkeredRectSize;
    label_checkered.innerText='Size: '+Number(checkeredRectSize);

    slider_scale.value=scale;
    label_scale.innerText='Scale: '+Number(scale);
}


});