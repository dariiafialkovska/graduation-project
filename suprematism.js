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

    const addTriangleButton= document.getElementById('addTriangle');
    const addRectButton= document.getElementById('addRect');
    const addLineButton=this.document.getElementById('addLine');
    const automaticButton=this.document.getElementById('automaticAdd');
    const stopButton= this.document.getElementById('stopAdd');

    //rectangles
    //lines
    //squares 
    //triangles


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
        x_pos=Math.random()*canvas.width+50;
        y_pos=Math.random()*canvas.height+50;
        rect_width=Math.random()*70 +30;
        rect_height=Math.random()*70 +30; //how much smaller
        rect_spread =Math.random()*20+30; //spreading gradient
        color= 'hsl('+ Math.random()*360+',60%,60%';
        create_rectangle(x_pos,y_pos,rect_width,rect_height);
    }


    addRectButton.addEventListener('click',function(){
        randomizeRectangle();
    });

    //triangles

    function create_triangle(p1x,p1y,p2x,p2y,p3x,p3y){
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p1x,p1y);
        ctx.lineTo(p2x,p2y);
        ctx.lineTo(p3x,p3y);
        ctx.fillStyle=color;
        ctx.fill();
    }
    
    function randomizeTriangle(){
        p1x=Math.random()*canvas.width+50;
        p1y=Math.random()*canvas.height+50;
        p2x=Math.random()*p1x+50;
        p2y=Math.random()*p2x+50;
        p3x=Math.random()*20+Math.abs(p1x-p2x);
        p3y=Math.random()*20+Math.abs(p1y-p2y);
        color= 'hsl('+ Math.random()*360+',60%,60%';
        create_triangle(p1x,p1y,p2x,p2y,p3x,p3y)
    }

    addTriangleButton.addEventListener('click',function(){
        randomizeTriangle();
    });

    function randomizeLine(){
        ctx.save();
        p1x=Math.random()*canvas.width;
        p1y=Math.random()*canvas.height;
        p2x=Math.random()*p1x+50;
        p2y=Math.random()*p2x+50; 
        ctx.beginPath();
        ctx.moveTo(p1x,p1y);
        ctx.lineTo(p2x,p2y);
        ctx.lineWidth=12;
        ctx.strokeStyle='black';
        ctx.stroke();
    }


    addLineButton.addEventListener('click',function(){
            randomizeLine();
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

   
});