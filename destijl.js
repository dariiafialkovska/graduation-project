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

    canvas.style.position='absolute';
    canvas.style.left='50%';
    canvas.style.top='50%';
    canvas.style.transform='translate(-50%,-50%)';
    


    //drawing background
    ctx.strokeStyle = "black";
    ctx.lineWidth = 13;
    ctx.fillStyle = "#EAEFE9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    let previousStack=[];
    let nextStack=[];

    const palette={
        1:"#E70503", //red
        2:"#0300AD", //blue
        3:"#FDDE06", //yellow
        4:"#050103" ,//black
        5:"#EAEFE9", //white
        6:"#EAEFE9" ,//white
        7:"#EAEFE9" ,//white
        8:"#EAEFE9", //white
        9:"#EAEFE9", //white total 6
        10:"#E70503", //red
        11:"#E70503", //red total 3
        12:"#FDDE06", //yellow
        13:"#FDDE06", //yellow total 3

    }

    function saveState(){
        let state = ctx.getImageData(0, 0, canvas.width, canvas.height);
        previousStack.push(state);
        console.log('State saved:', state);
    }
    var rectangles=[];
    randomizeArtButton.addEventListener('click', function() {
        rectangles.splice(0,rectangles.length);
        rectangles=[{x:0,y:0,width:canvas.width,height:canvas.height}];
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

    function createLines(point){
        console.log("createLines");
        let {x,y}=point; //define the point
        console.log("rectangles.length: "+rectangles.length);
        for( let i=rectangles.length-1;i>=0;i--){
            console.log("inside for loop");
            if(x>rectangles[i].x && x<rectangles[i].x+rectangles[i].width && x){//if the point is inside the rectangle
                console.log("inside if statement");
                console.log("x is: "+x);
                if(Math.random()>0.5){
                    //remove the point
                    const squareToBeRemoved=rectangles[i];
                    rectangles.splice(i,1);
                    var rectangle1={
                        x:squareToBeRemoved.x,
                        y:squareToBeRemoved.y,
                        width:squareToBeRemoved.width-(squareToBeRemoved.width-x+squareToBeRemoved.x),
                        height:squareToBeRemoved.height
                    };
                    rectangles.push(rectangle1);
                    var rectangle2={
                        x:x,
                        y:squareToBeRemoved.y,
                        width:squareToBeRemoved.width-x+squareToBeRemoved.x,
                        height:squareToBeRemoved.height
                    }
                    rectangles.push(rectangle2);
                }
            }
            if(y>rectangles[i].y && y<rectangles[i].y+rectangles[i].height && y){//if the point is inside the rectangle
                if(Math.random()>0.5){
                    //remove the point
                    const squareToBeRemoved=rectangles[i];
                    rectangles.splice(i,1);
                    var rectangle1={
                        x:squareToBeRemoved.x,
                        y:squareToBeRemoved.y,
                        width:squareToBeRemoved.width,
                        height:squareToBeRemoved.height-(squareToBeRemoved.height-y+squareToBeRemoved.y)
                    };
                    rectangles.push(rectangle1);
                    var rectangle2={
                        x:squareToBeRemoved.x,
                        y:y,
                        width:squareToBeRemoved.width,
                        height:squareToBeRemoved.height-y+squareToBeRemoved.y
                    };
                    rectangles.push(rectangle2);
                }
            }

        }
    }
    function createDeStijl(){
// Set line thickness and color
        console.log("createDeStijl");
        var step=canvas.width/6;
        for(let i=0;i<canvas.width;i+=step){
            createLines({x:i});
        }
        for(let i=0;i<canvas.height;i+=step){
            createLines({y:i});
        }
        for(let i=0;i<rectangles.length;i++){
            rectangles[i].color=getRandomColor();
        }
        for(let i=0;i<rectangles.length;i++){
            ctx.beginPath();
            ctx.rect(rectangles[i].x,rectangles[i].y,rectangles[i].width,rectangles[i].height);
            ctx.fillStyle=rectangles[i].color;
            ctx.lineWidth = 6;
            ctx.strokeStyle = '#000000';
            ctx.fill();
            ctx.stroke();
        }
        ctx.lineWidth = 13;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }

});