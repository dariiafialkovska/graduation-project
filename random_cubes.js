window.addEventListener('load',function(){
    const canvas=document.getElementById('canvas2');
    const ctx= canvas.getContext('2d');
    
    //here we full the canvas up to window sizes
    canvas.width=window.innerWidth/1.5;
    canvas.height=window.innerHeight/1.5;

    let rect_width=50;
    let rect_height=100;
    let rect_spread;
    let no_of_rect=0;

    const addRectButton= document.getElementById('addRect');
    const automaticButton=this.document.getElementById('automaticAdd');
    const stopButton= this.document.getElementById('stopAdd');

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
        x_pos=Math.random()*canvas.width+0;
        y_pos=Math.random()*canvas.height+0;
        rect_width=Math.random()*70 +30;
        rect_height=Math.random()*70 +30; //how much smaller
        rect_spread =Math.random()*20+30; //spreading gradient
        color= 'hsl('+ Math.random()*360+',100%,40%';
        create_rectangle(x_pos,y_pos,rect_width,rect_height);
    }


    addRectButton.addEventListener('click',function(){
        randomizeRectangle();
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