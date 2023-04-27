window.addEventListener('load',function(){
    const canvas=document.getElementById('canvas3');
    const ctx= canvas.getContext('2d');
    
    //here we full the canvas up to window sizes
    canvas.width=window.innerWidth/1.5;
    canvas.height=window.innerHeight/1.5;

    let rect_width=50;
    let rect_height=100;
    let rect_spread;
    let no_of_rect=0;

    let min_Size=50;
    let max_Size=100;

    function saveState(){
        let state = ctx.getImageData(0, 0, canvas.width, canvas.height);
        undoStack.push(state);
        console.log('State saved:', state);
    }


    let undoStack=[];
    let redoStack=[];

    saveState();
    const randomizeArtButton= document.getElementById('randomizeArt');
    const addTriangleButton= document.getElementById('addTriangle');
    const addRectButton= document.getElementById('addRect');
    const addLineButton=this.document.getElementById('addLine');
    const addStrokeCircleButton=this.document.getElementById('addStrokeCircle');
    const addFullCircleButton=this.document.getElementById('addFullCircle');
    const addHalfCircleButton=this.document.getElementById('addHalfCircle');
    const automaticButton=this.document.getElementById('automaticAdd');
    const stopButton= this.document.getElementById('stopAdd');
    const clearButton=this.document.getElementById('clearCanvas');
    const saveButton=this.document.getElementById('saveCanvas');
    
    const undoButton=this.document.getElementById('undoButton');
    const redoButton=this.document.getElementById('redoButton');
    const createArtButton=this.document.getElementById('createArt');
    const paletteDropdown=this.document.getElementById('palette');
    const backgroundDropdown=this.document.getElementById('background');

    const backgrounds={
        1:['rgb(243, 241, 210)'],
        2:['#F0EFE5'],
        3:['#DCDCDC'],
        4:['#E4CF95'],
        5:['#C2B9A9']
    }
    
    function updateBackground(value1){
        saveState();
        //const selectedColor=backgroundDropdown.value;
        const selectedColor=value1;
        const backgroundColor=backgrounds[selectedColor];
        if(backgroundColor){
            canvas.style.backgroundColor=backgroundColor;
            ctx.fillStyle=backgroundColor;
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }
    }

    //backgroundDropdown.addEventListener('change',updateBackground);
    //updateBackground();

    backgroundDropdown.addEventListener('change',function(){
        updateBackground(backgroundDropdown.value);
    });

    const palettes={
        1:['#15102F','#D53232','#F6D912'],//blue red yellow
        2:['#151425','#9E8629','#A6281C'],
        3:['#312A16','#86490B','#CB8113'],
        4:['#150F09','#F3EDD8','#413856','#F0AD3A']
    }
    let currentPalette=1;

    function updatePalette(value1){
        console.log(paletteDropdown.value)
        //const selectedPalette=paletteDropdown.value;
        const selectedPalette=value1;
        if(selectedPalette in palettes){
            currentPalette=selectedPalette;
        }
    }

//    paletteDropdown.addEventListener('change',updatePalette);

    paletteDropdown.addEventListener('change',function(){
        updatePalette(paletteDropdown.value);
    });

    function getRandomColor(){
        const colors=palettes[currentPalette];
        const colorIndex=Math.floor(Math.random()*colors.length);
        return colors[colorIndex];
    }

    function getRandomPalette(){
        const paletteIndex=Math.floor(Math.random()*Object.keys(palettes).length)+1;
        return paletteIndex;
    }
    function getRandomBackground(){
        const backgroundIndex=Math.floor(Math.random()*Object.keys(backgrounds).length)+1;
        return backgroundIndex;
    }

    //randomize art
    var functions=[randomizeRectangle,randomizeTriangle,randomizeLine,randomizeStrokeCricle,randomizeFullCircle,randomizeHalfCircle];
    function randomNumber(n){
        return Math.floor(Math.random()*n);
    }
    randomizeArtButton.addEventListener('click',function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        paletteDropdown.value=getRandomPalette();
        updatePalette(paletteDropdown.value);
        backgroundDropdown.value=getRandomBackground();
        updateBackground(backgroundDropdown.value);
        for(let i=0;i<5;i++){
        functions[randomNumber(functions.length)]();
        }
    });

    //rectangles

    function create_rectangle(x,y,rect_width,rect_height){
        saveState();
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle=color;
        ctx.fillRect(x,y,rect_width,rect_height);
        ctx.stroke();
        ctx.translate(x,y);
        ctx.restore();
        console.log('rectangle created');
        
    }

    function randomizeRectangle(){
        x_pos=Math.random()*canvas.width;
        y_pos=Math.random()*canvas.height;
        rect_width=Math.floor(Math.random()*(max_Size-min_Size+1))+min_Size;
        rect_height=Math.floor(Math.random()*(max_Size-min_Size+1))+min_Size;
        //rect_width=Math.random()*70 +30;
        //rect_height=Math.random()*70 +30; //how much smaller
        rect_spread =Math.random()*20+30; //spreading gradient
        color=getRandomColor();
        //color= 'hsl('+ Math.random()*360+',60%,60%';
        create_rectangle(x_pos,y_pos,rect_width,rect_height);
    }


    addRectButton.addEventListener('click',function(){
        randomizeRectangle();
    });

    //triangles

    function create_triangle(p1x,p1y,p2x,p2y,p3x,p3y){
        saveState();
        ctx.save();
        ctx.beginPath();
        console.log('p1x: '+p1x+' p1y: '+p1y+' p2x: '+p2x+' p2y: '+p2y+' p3x: '+p3x+' p3y: '+p3y)
        ctx.moveTo(p1x,p1y);
        ctx.lineTo(p2x,p2y);
        ctx.lineTo(p3x,p3y);
        ctx.fillStyle=color;
        ctx.fill();
        console.log('triangle created');
    }
    
    function randomizeTriangle(){
        size=Math.floor(Math.random()*(max_Size-min_Size+1))+min_Size;
        p1x=Math.random()*canvas.width+50;
        p1y=Math.random()*canvas.height+50;
        p2x=Math.random()*p1x+100;
        p2y=Math.random()*p2x+100;
        p3x=Math.random()*70+Math.abs(p1x-p2x);
        p3y=Math.random()*70+Math.abs(p1y-p2y);
        color=getRandomColor();
        //color= 'hsl('+ Math.random()*360+',60%,60%';
        create_triangle(p1x,p1y,p2x,p2y,p3x,p3y)
    }

    addTriangleButton.addEventListener('click',function(){
        randomizeTriangle();
    });

    //lines
    function randomizeLine(){
        saveState();
        ctx.save();
        p1x=Math.random()*canvas.width;
        p1y=Math.random()*canvas.height;
        p2x=Math.random()*p1x+50;
        p2y=Math.random()*p2x+50; 
        ctx.beginPath();
        ctx.moveTo(p1x,p1y);
        ctx.lineTo(p2x,p2y);
        ctx.lineWidth=12;
        ctx.strokeStyle=getRandomColor();
        ctx.stroke();
        console.log('line created');
    }

    addLineButton.addEventListener('click',function(){
            randomizeLine();
        });


    //stroke circle
    function randomizeStrokeCricle(){
        saveState();
        ctx.save();
        //X,Y,RADIUS,START ANGLE,END ANGLE
        p1x=Math.random()*canvas.width;
        p2x=Math.random()*canvas.height;
        size=Math.random()*100+50;
        ctx.beginPath();
        ctx.arc(p1x,p2x,size,0,2*Math.PI);
        ctx.lineWidth=12;
        ctx.strokeStyle=getRandomColor();
        ctx.stroke();
        
        console.log('stroke circle created');
    }

    addStrokeCircleButton.addEventListener('click',function(){
        randomizeStrokeCricle();
    });

    //full circle
    function randomizeFullCircle(){
        saveState();
        ctx.save();
        //X,Y,RADIUS,START ANGLE,END ANGLE
        p1x=Math.random()*canvas.width;
        p2x=Math.random()*canvas.height;
        size=Math.random()*100+50;
        ctx.fillStyle=getRandomColor();
        ctx.beginPath();
        ctx.arc(p1x,p2x,size,0,2*Math.PI);
        ctx.fill();
        //ctx.stroke();
        //saveState();
        console.log('full circle created');
    }


    addFullCircleButton.addEventListener('click',function(){
        randomizeFullCircle();
    });


    //half circle
    function randomizeHalfCircle(){
        saveState();
        ctx.save();
        //X,Y,RADIUS,START ANGLE,END ANGLE
        p1x=Math.random()*canvas.width;
        p2x=Math.random()*canvas.height;
        size=Math.random()*100+50;
        //angle
        angle=Math.random()*Math.PI+100;
        ctx.fillStyle=getRandomColor();
        ctx.beginPath();
        ctx.arc(p1x,p2x,size,angle,Math.PI);
        ctx.fill();
        //ctx.stroke();
        //saveState();
        console.log('half circle created');
    }

    addHalfCircleButton.addEventListener('click',function(){
        randomizeHalfCircle();
    });

    stopButton.disabled=true;
    var timer;
    automaticButton.addEventListener('click', function(){
        timer=setInterval(function(){
            for(let i=0;i<10;i++){
                randomizeRectangle();}
        },1000);
        automaticButton.disabled=true;
        stopButton.disabled=false;
    });

    
    stopButton.addEventListener('click',function(){
        clearInterval(timer);
        automaticButton.disabled=false;
        stopButton.disabled=true;
    });

    //clear button
    clearButton.addEventListener('click',function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
    });

    
    //undo button
    undoButton.addEventListener('click',function(){
        if(undoStack.length>0){
            console.log("undo");
            redoStack.push(ctx.getImageData(0,0,canvas.width,canvas.height));
            let state=undoStack.pop();
            ctx.putImageData(state,0,0);       
    }
    });
    //redo button
    redoButton.addEventListener('click',function(){
        if(redoStack.length>0){
        console.log("redo");
        undoStack.push(ctx.getImageData(0,0,canvas.width,canvas.height));
        let state=redoStack.pop();
        ctx.putImageData(state,0,0);    
    }
    });
    //save button

    saveButton.addEventListener('click',()=>{
        //Get the selected file format
        
        const format=document.querySelector('#format').value;
        //Convert the canvas to a data URL
        const dataURL=canvas.toDataURL(`image/${format}`);

        //Create a link element
        const link=document.createElement('a');

        link.download=`my-image.${format}`;
        link.href=dataURL;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
    });

    const numberOfCanvases=parseInt(this.document.getElementById('numberCanvases').value);
    const backgroundDropdown1=document.querySelector('#background1');
    const paletteDropdown1=document.querySelector('#palette1');
    const numberButton=document.querySelector('#number');
    const sizeVariationButton=document.querySelector('#sizeVariation');
    //create art
    createArtButton.addEventListener('click',function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
        updateBackground(backgroundDropdown1.value);

        updatePalette(paletteDropdown1.value);

        console.log(numberButton.value);
        for(let i=0;i<numberButton.value;i++){
            functions[randomNumber(functions.length)]();
        }
        console.log(sizeVariationButton.value);

        switch(sizeVariationButton.value){
            case '1'://constant
                min_Size=100;
                max_Size=100;
                break;
            case '2'://variable
                min_Size=10;
                max_Size=150;
                break;
            case '3'://wild
                min_Size=5;
                max_Size=300;
                break;
        }

    
    });

        
   
});