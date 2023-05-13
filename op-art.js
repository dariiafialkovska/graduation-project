window.addEventListener('load',function(){
const canvas = document.getElementById("canvas4");
const ctx= canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

canvas.style.position='absolute';
canvas.style.left='50%';
canvas.style.top='50%';
canvas.style.transform='translate(-50%,-50%)';

let color1 = '#000000';
let color2 = '#ffffff';

//should be the 
let rect_size=Math.sqrt(canvas.width/2*canvas.width/2+canvas.height/2*canvas.height/2);
const rect_width = rect_size;
const rect_height = rect_size;
console.log(rect_size);
ctx.save();

function saveState(){
    let state = ctx.getImageData(0, 0, canvas.width, canvas.height);
    previousStack.push(state);
    console.log('State saved:', state);
}

let previousStack=[];
let nextStack=[];
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
const slider_color1=this.document.getElementById('colorOne');
const label_color1=this.document.querySelector('[for="colorOne"]');
const slider_color2=this.document.getElementById('colorTwo');
const label_color2=this.document.querySelector('[for="colorTwo"]');
const randomDuoColorButton=this.document.getElementById('randomDuoColor');

const clearButton = document.getElementById('clearCanvas');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const saveButton = document.getElementById('saveCanvas');

slider_spreadAngleRect.addEventListener('change',function(e){
    ctx.restore();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    spreadAngleRect=e.target.value;
    updateSliders();
    middleAngledRectangle();
    saveState();
});

slider_spreadCircle.addEventListener('change',function(e){
    ctx.restore();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    spreadCircle=e.target.value;
    updateSliders();
    middleCircle();
    saveState();

});

slider_spreadRect.addEventListener('change',function(e){
    ctx.restore();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    spreadRect=e.target.value;
    updateSliders();
    middleRectangle();
    saveState();
});

slider_checkered.addEventListener('change',function(e){
    ctx.restore();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    checkeredRectSize=e.target.value;
    updateSliders();
    checkeredRectangle();
    saveState();
});

slider_scale.addEventListener('change',function(e){
    ctx.restore();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    scale=e.target.value;
    updateSliders();
    checkeredRectangle();
    saveState();
});


clearButton.addEventListener('click',function(){
    ctx.restore();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    saveState();
});

previousButton.addEventListener('click',function(){
    if(previousStack.length>0){
        nextStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        let state = previousStack.pop();
        ctx.putImageData(state, 0, 0);
    }  
});

nextButton.addEventListener('click',function(){
    if(nextStack.length>0){
        previousStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        let state = nextStack.pop();
        ctx.putImageData(state, 0, 0);
    }
});

saveButton.addEventListener('click',function(){
    const format=document.querySelector('#format').value;
    const dataURL=canvas.toDataURL(format);
    const link=document.createElement('a');
    link.download=`my-image.${format}`;
    link.href=dataURL;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

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
            ctx.fillStyle = color1;
        }else{
            ctx.fillStyle = color2;
        }}
        else{
            if(i%2==0){
                ctx.fillStyle = color2;
            }else{
                ctx.fillStyle = color1;
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
                ctx.fillStyle = color1;
            }else{
                ctx.fillStyle = color2;
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
                ctx.fillStyle = color1;
            }else{
                ctx.fillStyle = color2;
            }}
            else{
                if(i%2==0){
                    ctx.fillStyle = color2;
                }else{
                    ctx.fillStyle = color1;
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
            ctx.fillStyle = color1;
        }else{
            ctx.fillStyle = color2;
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
            ctx.fillStyle = color2;
        }else{
            ctx.fillStyle = color1;
        }}
        else{
            if(i%2==0){
                ctx.fillStyle = color1;
            }else{
                ctx.fillStyle = color2;
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
                ctx.fillStyle = color2;
            }else{
                ctx.fillStyle = color1;
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
                ctx.fillStyle = color2;
            }else{
                ctx.fillStyle = color1;
            }}
            else{
                if(i%2==0){
                    ctx.fillStyle = color1;
                }else{
                    ctx.fillStyle = color2;
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
            ctx.fillStyle = color2;
        }else{
            ctx.fillStyle = color1;
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
    
    ctx.strokeStyle = color2;
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
    //y2=
    
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
            ctx.fillStyle = color1;
        }else{
            ctx.fillStyle = color2;
        }}
        else{
            if(i%2==0){
                ctx.fillStyle = color2;
            }else{
                ctx.fillStyle = color1;
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
            ctx.fillStyle = color2;
        }else{
            ctx.fillStyle = color1;
        }}
        else{
            if(i%2==0){
                ctx.fillStyle = color1;
            }else{
                ctx.fillStyle = color2;
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
            ctx.fillStyle = color1;
        }else{
            ctx.fillStyle = color2;
        }
        // fill the triangle
        ctx.fill();
    
    
        ctx.beginPath();
        ctx.moveTo(x1outside, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
    
        if(i%2==0){
            ctx.fillStyle = color2;
        }else{
            ctx.fillStyle = color1;
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
            ctx.fillStyle = color1;
        }else{
            ctx.fillStyle = color2;
        }}
        else{
            if(i%2==0){
                ctx.fillStyle = color2;
            }else{
                ctx.fillStyle = color1;
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
            ctx.fillStyle = color2;
        }else{
            ctx.fillStyle = color1;
        }}
        else{
            if(i%2==0){
                ctx.fillStyle = color1;
            }else{
                ctx.fillStyle = color2;
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
            ctx.fillStyle = color1;
        }else{
            ctx.fillStyle = color2;
        }
        // fill the triangle
        ctx.fill();
    
        ctx.beginPath();
        ctx.moveTo(x1outside, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
    
        if(i%2==0){
            ctx.fillStyle = color2;
        }else{
            ctx.fillStyle = color1;
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
            ctx.fillStyle = color2;
        }
        else{
            ctx.fillStyle = color1;
        }

        ctx.closePath();
        ctx.fill();

        if(i%2==0){
            ctx.fillStyle = color1;
        }
        else{
            ctx.fillStyle = color2;
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
          ctx.fillStyle = color1;
        } else {
          ctx.fillStyle = color2;
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
            ctx.fillStyle = color2;
          } else {
            ctx.fillStyle = color1;
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
    slider_color1.value=color1;
    slider_color2.value=color2;
    label_color1.innerText='Color 1: '+color1;  
    label_color2.innerText='Color 2: '+color2;

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

    slider_color1.addEventListener('change',function(){
        color1=slider_color1.value;
        console.log(color1);
    });

    slider_color2.addEventListener('change',function(){
        color2=slider_color2.value;
        console.log(color2);
    });




    randomDuoColorButton.addEventListener('click',function(){
        let r1=Math.floor(Math.random()*255);
        let g1=Math.floor(Math.random()*255);
        let b1=Math.floor(Math.random()*255);
        let r2=Math.floor(Math.random()*255);
        let g2=Math.floor(Math.random()*255);
        let b2=Math.floor(Math.random()*255);
        color1='rgb('+r1+','+g1+','+b1+')';
        color2='rgb('+r2+','+g2+','+b2+')';
        console.log(color1);
        console.log(color2);
    });

    const widthPatternSelect=document.querySelector('#widthPattern');   
    const heightPatternSelect=document.querySelector('#heightPattern');
   
    const deletePatternButton=document.getElementById('deletePattern');
    const savePatternButton=document.getElementById('savePattern');
    const patternContainer=document.getElementById('pattern-container');
    const patternBtn=document.getElementById('patternBtn');
    let patternCanvas=document.getElementById('patternCanvas');
    const format1=document.querySelector('#format1').value;
    const formatstyle=document.getElementById('format1');
    patternBtn.addEventListener('click',function(){
        patternCanvas=createPattern(patternCanvas);
        patternContainer.appendChild(patternCanvas);
    });
    
    function createPattern(patternCanvas){
        let widthOfPattern=widthPatternSelect.value;
        let heightOfPattern=heightPatternSelect.value;
        deletePatternButton.style.display='block';       
        savePatternButton.style.display='block';
        formatstyle.style.display='block';
        
        const patternCtx = patternCanvas.getContext('2d');
        let eachPatternWidth;
        let eachPatternHeight;
        if(widthOfPattern>heightOfPattern){//if the pattern is wider than it is tall, then let height stay the same width will be adjusted
            patternCanvas.height=canvas.height;
            eachPatternHeight=canvas.height/heightOfPattern;
            eachPatternWidth=eachPatternHeight;
            patternCanvas.width=eachPatternWidth*widthOfPattern;


        }else if(widthOfPattern<heightOfPattern){//if the pattern is taller than it is wide, then let width stay the same height will be adjusted
            patternCanvas.width=canvas.width;
            eachPatternWidth=canvas.width/widthOfPattern;
            eachPatternHeight=eachPatternWidth;
            patternCanvas.height=eachPatternHeight*heightOfPattern;
        }else if(widthOfPattern==heightOfPattern){//if the pattern is a square, then let width and height stay the same
            patternCanvas.width=canvas.width;
            patternCanvas.height=canvas.height;
            eachPatternWidth=canvas.width/widthOfPattern;
            eachPatternHeight=eachPatternWidth;
        }
        for(let i=0; i<widthOfPattern; i++){
            for(let j=0; j<heightOfPattern; j++){
                patternCtx.drawImage(canvas, 0,0,canvas.width,canvas.height,eachPatternWidth*i,eachPatternHeight*j,eachPatternWidth,eachPatternHeight);
            }
        }
        patternCanvas.style.display='block';
        return patternCanvas;
        
    }
    

    deletePatternButton.addEventListener('click',function(){
        patternContainer.removeChild(patternContainer.lastElementChild);
        deletePatternButton.style.display='none';
        savePatternButton.style.display='none';
        formatstyle.style.display='none';

    });

    savePatternButton.addEventListener('click',function(){
        const dataURL=patternCanvas.toDataURL(format1);
        const link=document.createElement('a');
        link.download=`my-pattern.${format1}`;
        link.href=dataURL;
    
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
    });

});