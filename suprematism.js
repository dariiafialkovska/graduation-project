window.addEventListener('load',function(){
    const canvas=document.getElementById('canvas3');
    const ctx= canvas.getContext('2d');
    
    //here we full the canvas up to window sizes
    canvas.width=800;
    canvas.height=800;

    canvas.style.position='absolute';
    canvas.style.left='50%';
    canvas.style.top='50%';
    canvas.style.transform='translate(-50%,-50%)';
    
    ctx.filter='blur(0.2px)'; //Gaussian blur
    //ctx.filter='brightness(1.5)'; //adjust brightness
    //ctx.filter='contrast(1.5)'; //adjust contrast
    //ctx.filter='grayscale(1)'; //grayscale
    //ctx.filter='hue-rotate(90deg)'; //hue-rotate
    //ctx.filter='invert(1)'; //invert
    //ctx.filter='opacity(0.5)'; //opacity
    //ctx.filter='saturate(2)'; //saturate
    //ctx.filter='sepia(0.1)'; //sepia
    //ctx.filter='drop-shadow 2px 2px 2px blue)'; //drop-shadow

    let spacing=1;
    let densityProbability=0.6;
    let mediumProbability=0.8;
    let sizeVariation=2;

    let objectInCanvasBool=false;

    let rect_width=50;
    let rect_height=100;
    let rect_spread;
    let no_of_rect=0;

    let min_Size;
    let max_Size;

    function saveState(){
        let state = ctx.getImageData(0, 0, canvas.width, canvas.height);
        undoStack.push(state);
        //console.log('State saved:', state);
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
    const rightBackgroundDropdown=this.document.getElementById('background1');

    const canvascheckboxequal=this.document.getElementById('canvas-size-checkbox-equal');
    const canvascheckboxhorizontal=this.document.getElementById('canvas-size-checkbox-horizontal');
    const canvascheckboxvertical=this.document.getElementById('canvas-size-checkbox-vertical');
    const canvasAdjustButton=this.document.getElementById('canvas_size');
    
    
    canvascheckboxequal.addEventListener('change',function(){
        if(canvascheckboxequal.checked){
            canvas.width=500;
            canvas.height=500;
        }else{
            canvas.width=500;
            canvas.height=500;
        }
    });

    canvascheckboxhorizontal.addEventListener('change',function(){
        if(canvascheckboxhorizontal.checked){
            canvas.height=window.innerHeight/1.5;
            canvas.width=window.innerWidth/1.5;
        }else{
            canvas.width=500;
        }
    });

    canvascheckboxvertical.addEventListener('change',function(){
        if(canvascheckboxvertical.checked){
            canvas.height=window.innerHeight/1.2;
            canvas.width=window.innerWidth/3;
        }else{
            canvas.height=500;
        }
    });

    canvasAdjustButton.addEventListener('click',function(){
        //console.log('clicked');
        const height=document.getElementById('canvas-size-height').value;
        const width=document.getElementById('canvas-size-width').value;
        //console.log(height,width);
        canvas.height=height;
        canvas.width=width;
    });
    const backgrounds={
        1:['rgb(243, 241, 210)'],
        2:['#F0EFE5'],
        3:['#DCDCDC'],
        4:['#E4CF95'],
        5:['#C2B9A9']
    }
    
    function updateBackground(value1){
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
        const valueOfOption=backgroundDropdown.value;
        console.log(valueOfOption);
        console.log(backgroundDropdown);
        if(valueOfOption==="1"){
            backgroundDropdown.classList.add("select1");
            console.log("select1");
        }
        else{
            backgroundDropdown.classList.remove("select1");
        }
        if(valueOfOption==="2"){ 
            backgroundDropdown.classList.add("select2");}
        else{
            backgroundDropdown.classList.remove("select2");
        }
        if(valueOfOption==="3"){
            backgroundDropdown.classList.add("select3");}
        else{
            backgroundDropdown.classList.remove("select3");
        }
        if(valueOfOption==="4"){
            backgroundDropdown.classList.add("select4");}
        else{
            backgroundDropdown.classList.remove("select4");
        }
        if(valueOfOption==="5"){
            backgroundDropdown.classList.add("select5");}
        else{
            backgroundDropdown.classList.remove("select5");
        }

        updateBackground(backgroundDropdown.value);
    });


    rightBackgroundDropdown.addEventListener('change',function(){
        const valueOfOption=rightBackgroundDropdown.value;
        console.log(valueOfOption);
        console.log(rightBackgroundDropdown);
        if(valueOfOption==="1"){
            rightBackgroundDropdown.classList.add("select1");
            console.log("select1");
        }
        else{
            rightBackgroundDropdown.classList.remove("select1");
        }
        if(valueOfOption==="2"){
            rightBackgroundDropdown.classList.add("select2");}
        else{
            rightBackgroundDropdown.classList.remove("select2");
        }

        if(valueOfOption==="3"){
            rightBackgroundDropdown.classList.add("select3");}
        else{
            rightBackgroundDropdown.classList.remove("select3");
        }
        if(valueOfOption==="4"){
            rightBackgroundDropdown.classList.add("select4");}
        else{
            rightBackgroundDropdown.classList.remove("select4");
        }
        if(valueOfOption==="5"){
            rightBackgroundDropdown.classList.add("select5");}
        else{
            rightBackgroundDropdown.classList.remove("select5");
        }

    });



    const palettes={
        1:['#15102F','#D53232','#F6D912'],//blue red yellow
        2:['#151425','#9E8629','#A6281C'],
        3:['#312A16','#86490B','#CB8113'],
        4:['#150F09','#F3EDD8','#413856','#F0AD3A']
    }
    let currentPalette=1;

    function updatePalette(value1){
        //console.log(paletteDropdown.value)
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
    var functions=[randomizeRectangle];
    const includeRect=this.document.getElementById('includeRect');
    const includeTriangle=this.document.getElementById('includeTriangle');
    const includeCircle=this.document.getElementById('includeCircle');
    const includeLine=this.document.getElementById('includeLine');
    const includeStrokeCircle=this.document.getElementById('includeStrokeCircle');
    const includeHalfCircle=this.document.getElementById('includeHalfCircle');
    
    includeRect.addEventListener('change',function(){
        if(includeRect.checked){
            console.log('rect checked');
            functions.push(randomizeRectangle);
        }else{
            console.log('rect unchecked');
            functions.pop(randomizeRectangle);
        }
    });
    
    includeTriangle.addEventListener('change',function(){
        if(includeTriangle.checked){
            console.log('triangle checked');
            functions.push(randomizeTriangle);
        }else{
            console.log('triangle unchecked');
            functions.pop(randomizeTriangle);
        }
    });

    includeCircle.addEventListener('change',function(){
        if(includeCircle.checked){
            console.log('circle checked');
            functions.push(randomizeFullCircle);
        }else{
            console.log('circle unchecked');
            functions.pop(randomizeFullCircle);
        }
    });

    includeLine.addEventListener('change',function(){
        if(includeLine.checked){
            console.log('line checked');
            functions.push(randomizeLine);
        }else{
            console.log('line unchecked');
            functions.pop(randomizeLine);
        }

    });

    includeStrokeCircle.addEventListener('change',function(){
        if(includeStrokeCircle.checked){
            console.log('stroke circle checked');
            functions.push(randomizeStrokeCricle);

        }else{
            console.log('stroke circle unchecked');
            functions.pop(randomizeStrokeCricle);
        }

    });

    includeHalfCircle.addEventListener('change',function(){
        if(includeHalfCircle.checked){
            console.log('half circle checked');
            functions.push(randomizeHalfCircle);
        }else{
            console.log('half circle unchecked');
            functions.pop(randomizeHalfCircle);
        }

    });
    


    function randomNumber(n){
        return Math.floor(Math.random()*n);
    }
    randomizeArtButton.addEventListener('click',function(){
        saveState();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        paletteDropdown.value=getRandomPalette();
        updatePalette(paletteDropdown.value);
        backgroundDropdown.value=getRandomBackground();
        updateBackground(backgroundDropdown.value);
        let size_random_variations=Math.floor(Math.random()*2)+1;
        let constant_size=Math.floor(Math.random()*2)+1;
        console.log("size_random_variations,constant_size");
        console.log(size_random_variations,constant_size);
        switch(size_random_variations){
            case 1://constant
                console.log("constant_size");
                if(constant_size==1){//small
                    console.log("small_size");
                    min_Size=canvas.width*0.1;
                    max_Size=canvas.width*0.2;
                }else if(constant_size==2){
                    console.log("medium_size");
                    min_Size=canvas.width*0.2;
                    max_Size=canvas.width*0.4;
                }else if(constant_size==3){
                    console.log("large_size");
                    min_Size=canvas.width*0.4;
                    max_Size=canvas.width*0.6;
                }
                break;
            case 2://variable
                console.log("variable_size");
                min_Size=canvas.width*0.2;
                max_Size=canvas.width*0.7;
                break;
            case 3://wild
                console.log("wild_size");
                min_Size=canvas.width*0.1;
                max_Size=canvas.width*0.7;
                break;
        }
        let randomSpacing=Math.floor(Math.random()*2)+1;
        let number_of_shapes=Math.floor(Math.random()*7)+3;
        switch (randomSpacing){
            case '1'://Sparse
                spacing=1;

                break;
            case '2'://Medium
                spacing=2;
                if(number_of_shapes>4)
                    mediumProbability=0.9;
                break;
            case '3'://Dense
                spacing=3;
                if(number_of_shapes>4)
                    densityProbability=0.8;
                break;
        }
        let functions1=[randomizeRectangle,randomizeTriangle,randomizeFullCircle,randomizeLine,randomizeStrokeCricle];

        for(let i=0;i<number_of_shapes;i++){
        functions1[randomNumber(functions1.length)]();
        }
    });

    //rectangles

    function create_rectangle(x,y,rect_width,rect_height){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle=color;
        ctx.fillRect(x,y,rect_width,rect_height);
        ctx.stroke();
        ctx.translate(x,y);
        ctx.restore();
        
    }

    function randomizeRectangle(){
        if(spacing==1){
            x_pos=Math.random()*canvas.width;
            y_pos=Math.random()*canvas.height;
        }else if(spacing==2){
            x_pos=Math.random()*(canvas.width*mediumProbability-canvas.width*(1-mediumProbability))+canvas.width*(1-mediumProbability); //so it will be in %20-%80
            y_pos=Math.random()*(canvas.height*mediumProbability-canvas.height*(1-mediumProbability))+canvas.height*(1-mediumProbability);
        }else if(spacing==3){
            y_pos=Math.random()*(canvas.height*0.6-canvas.height*0.4)+canvas.height*0.4;
            x_pos=Math.random()*(canvas.width*0.6-canvas.width*0.4)+canvas.width*0.4;
        }

        rect_width=Math.floor(Math.random()*(max_Size-min_Size+1))+min_Size;
        rect_height=Math.floor(Math.random()*(max_Size-min_Size+1))+min_Size;

        if(objectInCanvasBool){
            if(x_pos+rect_width>canvas.width){
                x_pos=canvas.width-rect_width;
            }
            if(y_pos+rect_height>canvas.height){
                y_pos=canvas.height-rect_height;
            }
        }

        //rect_width=Math.random()*70 +30;
        //rect_height=Math.random()*70 +30; //how much smaller
        rect_spread =Math.random()*20+30; //spreading gradient
        color=getRandomColor();
        //color= 'hsl('+ Math.random()*360+',60%,60%';
        create_rectangle(x_pos,y_pos,rect_width,rect_height);
    }


    addRectButton.addEventListener('click',function(){
        saveState();
        randomizeRectangle();
    });

    //triangles

    function create_triangle(p1x,p1y,p2x,p2y,p3x,p3y){
        ctx.save();
        ctx.beginPath();
        //console.log('p1x: '+p1x+' p1y: '+p1y+' p2x: '+p2x+' p2y: '+p2y+' p3x: '+p3x+' p3y: '+p3y)
        ctx.moveTo(p1x,p1y);
        ctx.lineTo(p2x,p2y);
        ctx.lineTo(p3x,p3y);
        ctx.fillStyle=color;
        ctx.fill();
        //console.log('triangle created');
    }
    
    function randomizeTriangle(){
        if(spacing==1){
            p1x=Math.random()*canvas.width;
            p1y=Math.random()*canvas.height;
        }else if(spacing==2){
            p1x=Math.random()*(canvas.width*mediumProbability-canvas.width*(1-mediumProbability))+canvas.width*(1-mediumProbability); //so it will be in %20-%80
            p1y=Math.random()*(canvas.height*mediumProbability-canvas.height*(1-mediumProbability))+canvas.height*(1-mediumProbability);
        }else if(spacing==3){
            p1y=Math.random()*(canvas.height*densityProbability-canvas.height*(1-densityProbability))+canvas.height*(1-densityProbability);
            p1x=Math.random()*(canvas.width*densityProbability-canvas.width*(1-densityProbability))+canvas.width*(1-densityProbability);
        }
        size=Math.floor(Math.random()*(max_Size-min_Size+1))+min_Size;
        p2x=Math.random()*p1x+100;
        p2y=Math.random()*p2x+100;
        p3x=Math.random()*70+Math.abs(p1x-p2x);
        p3y=Math.random()*70+Math.abs(p1y-p2y);

        if(objectInCanvasBool){
            if(p1x>canvas.width){
                p1x=canvas.width-p1x;
            }
            if(p1y>canvas.height){
                p1y=canvas.height-p1y;
            }
            if(p2x>canvas.width){
                p2x=canvas.width-p2x;
            }
            if(p2y>canvas.height){
                p2y=canvas.height-p2y;
            }
            if(p3x>canvas.width){
                p3x=canvas.width-p3x;
            }
            if(p3y>canvas.height){
                p3y=canvas.height-p3y;
            }
        }


        color=getRandomColor();
        //color= 'hsl('+ Math.random()*360+',60%,60%';
        create_triangle(p1x,p1y,p2x,p2y,p3x,p3y)
    }

    addTriangleButton.addEventListener('click',function(){
        saveState();
        randomizeTriangle();
    });

    //lines
    function randomizeLine(){
        if(spacing==1){
            p1x=Math.random()*canvas.width;
            p1y=Math.random()*canvas.height;
        }else if(spacing==2){
            p1x=Math.random()*(canvas.width*mediumProbability-canvas.width*(1-mediumProbability))+canvas.width*(1-mediumProbability); //so it will be in %20-%80
            p1y=Math.random()*(canvas.height*mediumProbability-canvas.height*(1-mediumProbability))+canvas.height*(1-mediumProbability);
        }else if(spacing==3){
            p1y=Math.random()*(canvas.height*0.6-canvas.height*0.4)+canvas.height*0.4;
            p1x=Math.random()*(canvas.width*densityProbability-canvas.width*(1-densityProbability))+canvas.width*(1-densityProbability);
        }

        ctx.save();
        p2x=Math.random()*(max_Size-min_Size+1)+min_Size;//min should be p1x
        p2y=Math.random()*(max_Size-min_Size+1)+min_Size;//min should be p1y
        
        if(objectInCanvasBool){
            if(p1x>canvas.width){
                p1x=canvas.width-p1x;
            }
            if(p1y>canvas.height){
                p1y=canvas.height-p1y;
            }   
            if(p2x>canvas.width){
                p2x=canvas.width-p2x;
            }
            if(p2y>canvas.height){
                p2y=canvas.height-p2y;
            }
        }
        
        
        ctx.beginPath();
        ctx.moveTo(p1x,p1y);
        ctx.lineTo(p2x,p2y);
        ctx.lineWidth=12;
        ctx.strokeStyle=getRandomColor();
        ctx.stroke();
        //console.log('line created');
    }

    addLineButton.addEventListener('click',function(){
            saveState();
            randomizeLine();
        });


    //stroke circle
    function randomizeStrokeCricle(){
        if(spacing==1){
            p1x=Math.random()*canvas.width;
            p2x=Math.random()*canvas.height;
        }else if(spacing==2){
            p1x=Math.random()*(canvas.width*mediumProbability-canvas.width*(1-mediumProbability))+canvas.width*(1-mediumProbability); //so it will be in %20-%80
            p2x=Math.random()*(canvas.width*mediumProbability-canvas.width*(1-mediumProbability))+canvas.width*(1-mediumProbability);
        }else if(spacing==3){
            p2x=Math.random()*(canvas.width*densityProbability-canvas.width*(1-densityProbability))+canvas.width*(1-densityProbability);
            p1x=Math.random()*(canvas.width*densityProbability-canvas.width*(1-densityProbability))+canvas.width*(1-densityProbability);
        }

        ctx.save();
        //X,Y,RADIUS,START ANGLE,END ANGLE
        if(objectInCanvasBool){
            if(p1x>canvas.width){
                p1x=canvas.width-p1x;
            }
            if(p2x>canvas.height){
                p2x=canvas.height-p2x;
            }
        }

        size=Math.random()*(max_Size/2-min_Size/2+1)+min_Size/2;
        ctx.beginPath();
        ctx.arc(p1x,p2x,size,0,2*Math.PI);
        ctx.lineWidth=12;
        ctx.strokeStyle=getRandomColor();
        ctx.stroke();
        
        //console.log('stroke circle created');
    }

    addStrokeCircleButton.addEventListener('click',function(){
        saveState();
        randomizeStrokeCricle();
    });

    //full circle
    function randomizeFullCircle(){
        if(spacing==1){
            p1x=Math.random()*canvas.width;
            p2x=Math.random()*canvas.height;
        }else if(spacing==2){
            p1x=Math.random()*(canvas.width*mediumProbability-canvas.width*(1-mediumProbability))+canvas.width*(1-mediumProbability); //so it will be in %20-%80
            p2x=Math.random()*(canvas.width*mediumProbability-canvas.width*(1-mediumProbability))+canvas.width*(1-mediumProbability);
        }else if(spacing==3){
            p2x=Math.random()*(canvas.width*densityProbability-canvas.width*(1-densityProbability))+canvas.width*(1-densityProbability);
            p1x=Math.random()*(canvas.width*densityProbability-canvas.width*(1-densityProbability))+canvas.width*(1-densityProbability);
        }
  
        ctx.save();
        if(objectInCanvasBool){
            if(p1x>canvas.width){
                p1x=canvas.width-p1x;
            }
            if(p2x>canvas.height){
                p2x=canvas.height-p2x;
            }
        }
        //X,Y,RADIUS,START ANGLE,END ANGLE
        size=Math.random()*(max_Size/2-min_Size/2+1)+min_Size/2;
        ctx.fillStyle=getRandomColor();
        ctx.beginPath();
        ctx.arc(p1x,p2x,size,0,2*Math.PI);
        ctx.fill();
        //ctx.stroke();
        //saveState();
        //console.log('full circle created');
    }


    addFullCircleButton.addEventListener('click',function(){
        saveState();
        randomizeFullCircle();
    });


    //half circle
    function randomizeHalfCircle(){
        if(spacing==1){
            p1x=Math.random()*canvas.width;
            p2x=Math.random()*canvas.height;
        }else if(spacing==2){
            p1x=Math.random()*(canvas.width*mediumProbability-canvas.width*(1-mediumProbability))+canvas.width*(1-mediumProbability); //so it will be in %20-%80
            p2x=Math.random()*(canvas.width*mediumProbability-canvas.width*(1-mediumProbability))+canvas.width*(1-mediumProbability);
        }else if(spacing==3){
            p1x=Math.random()*(canvas.width*densityProbability-canvas.width*(1-densityProbability))+canvas.width*(1-densityProbability);
            p2x=Math.random()*(canvas.width*densityProbability-canvas.width*(1-densityProbability))+canvas.width*(1-densityProbability);
        }
        ctx.save();
        //X,Y,RADIUS,START ANGLE,END ANGLE
        size=Math.random()*(max_Size/2-min_Size/2+1)+min_Size/2;
        //angle
        angle=Math.random()*Math.PI+100;
        if(objectInCanvasBool){
            if(p1x>canvas.width){   
                p1x=canvas.width-p1x;
            }
            if(p2x>canvas.height){
                p2x=canvas.height-p2x;
            }   
        }
        ctx.fillStyle=getRandomColor();
        ctx.beginPath();
        ctx.arc(p1x,p2x,size,angle,Math.PI);
        ctx.fill();
        //ctx.stroke();
        //saveState();
        //console.log('half circle created');
    }

    addHalfCircleButton.addEventListener('click',function(){
        saveState();
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
            //console.log("undo");
            redoStack.push(ctx.getImageData(0,0,canvas.width,canvas.height));
            let state=undoStack.pop();
            ctx.putImageData(state,0,0);       
    }
    });
    //redo button
    redoButton.addEventListener('click',function(){
        if(redoStack.length>0){
        //console.log("redo");
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
    const objectInCanvasCheckbox=document.getElementById('objectInCanvas');
    
    const sizeSelect=document.getElementById('sizeVariation');
    const secondSelect=document.getElementById('secondSelect');
    sizeSelect.addEventListener('change',function(){
        if(sizeSelect.value=='1'){
            secondSelect.style.display='block';
        }else{
            secondSelect.style.display='none';
        }
    });


    const secondSelectValue=document.querySelector('#secondSelect');
    const spacingTypeButton=document.querySelector('#spacing');
    //create art
    createArtButton.addEventListener('click',function(){
        
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
        updateBackground(backgroundDropdown1.value);

        updatePalette(paletteDropdown1.value);
        objectInCanvasCheckbox.addEventListener('change',function(){
            if(objectInCanvasCheckbox.checked){
                objectInCanvasBool=true;
            }else{
                objectInCanvasBool=false;
            }
        });
    

        switch (spacingTypeButton.value){
            case '1'://Sparse
                spacing=1;

                break;
            case '2'://Medium
                spacing=2;
                if(numberButton.value>4)
                    mediumProbability=0.9;
                break;
            case '3'://Dense
                spacing=3;
                if(numberButton.value>4)
                    densityProbability=0.8;
                break;
        };

        switch(sizeVariationButton.value){
            case '1'://constant
                //console.log('1 selected');
                if(secondSelectValue.value=='1'){//small
                    min_Size=canvas.width*0.1;
                    max_Size=canvas.width*0.2;
                }else if(secondSelectValue.value=='2'){
                    min_Size=canvas.width*0.2;
                    max_Size=canvas.width*0.4;
                }else if(secondSelectValue.value=='3'){
                    min_Size=canvas.width*0.4;
                    max_Size=canvas.width*0.6;
                }
                break;
            case '2'://variable
                //console.log('2 selected');
                min_Size=canvas.width*0.2;
                max_Size=canvas.width*0.7;
                break;
            case '3'://wild
                //console.log('3 selected');
                min_Size=canvas.width*0.1;
                max_Size=canvas.width*0.7;
                break;
        };
        
        //console.log(numberButton.value);
        console.log(functions);
        for(let i=0;i<numberButton.value;i++){
            functions[randomNumber(functions.length)]();
        }
        //console.log(sizeVariationButton.value);

    
    });

        
   
});