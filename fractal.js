window.addEventListener('load',function(){
    const canvas=document.getElementById('canvas1');
    const ctx= canvas.getContext('2d');
    
    //here we full the canvas up to window sizes
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;


    //CANVAS SETTINGS

    //every object that we put will now be will be filled with defined color
    //ctx.fillStyle='red';

    //defining the stroke color for each stroke used
    ctx.strokeStyle='yellow';



    //can be used to make lines round
    //ctx.lineCap='round';

    
    //EFFECT SETTINGS
    //ctx.translate(100,100); //different start point
    //ctx.rotate(0.5); //rotating the canvas

    //ctx.save(); //by this we can change settings for some objects
    //ctx.restore(); //and restore the old ones before the save

    //x,y coordinates, witdh, height
    //ctx.fillRect(50,50,10,10); //creating rectangle

    //ctx.beginPath();
    //ctx.moveTo(200,200), //starting point
    //ctx.lineTo(300,300);
    //ctx.stroke();

    //ctx.scale(0.99,0.99); //to rescale the object


    ctx.strokeStyle='pink';
    ctx.lineCap='round';
    ctx.lineWitdh=5;
    ctx.shadowColor='rgba(0,0,0,0.7';
    ctx.shadowOffsetX=2;
    ctx.shadowOffsetY=2;
    ctx.shadowBlur=10;
    //restriction of canvas 
    let size=canvas.width<canvas.height ? canvas.height* 0.3 :
    canvas.height*0.3;
    let sides=5;
    let scale=0.5;
    let spread=0.5;
    let color= 'hsl('+ Math.random()*360+',100%,50%';
    let maxLevel=3; //depth of the fractal
    let branches=2;

    let fractal_branch=2;

    const randomizeButton= document.getElementById('randomizeButton');

    const resetButton= document.getElementById('resetButton');

    const slider_spread=document.getElementById('spread');
    const label_spread=document.querySelector('[for="spread"]');
    slider_spread.addEventListener('change',function(e){
        spread=e.target.value;
        updateSliders();
        fractal();
    })
    const slider_sides=document.getElementById('sides');
    const label_sides=this.document.querySelector('[for="sides"]');
    slider_sides.addEventListener('change',function(e){
        sides=e.target.value;
        updateSliders();
        fractal();
    })

    const slider_scale=this.document.getElementById('scale');
    const label_scale=this.document.querySelector('[for="scale"]');
    slider_scale.addEventListener('change',function(e){
        scale=e.target.value;
        updateSliders();
        fractal();
    })

    const slider_color=this.document.getElementById('color');
    const label_color=this.document.querySelector('[for="color"]');
    slider_color.addEventListener('change',function(e){
        color=e.target.value;
        updateSliders();
        fractal();
    })



    function branch(level){
        if(level>maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size,0);
        ctx.stroke();

        for(let i=0; i<branches; i++){
            if(fractal_branch==2){
            ctx.save();
            ctx.translate(size-(size/branches)*i,0);
            ctx.scale(scale,scale);

            ctx.save()
            ctx.rotate(spread);
            branch(level+1);
            ctx.restore();
    
            ctx.save();
            ctx.rotate(-spread);
            branch(level+1);
            ctx.restore();

            ctx.restore();
            }
            if(fractal_branch==1){
            ctx.save();
            ctx.translate(size-(size/branches)*i,0);
            ctx.scale(scale,scale);

            ctx.save()
            ctx.rotate(spread);
            branch(level+1);
            ctx.restore();
            ctx.restore();
            }
        }

       
    }
    function fractal(){
        ctx.clearRect(0,0,canvas.width,canvas.height);//canvası temizliyor
        ctx.save();
        ctx.strokeStyle=color;
        ctx.translate(canvas.width/2,canvas.height/2);

        for (let i=0; i<sides; i++){
            ctx.rotate((Math.PI*2)/sides);
            branch(0);
        }
        ctx.restore();
        randomizeButton.style.backgroundColor=color;
    }
    fractal();

    function randomizeFractal(){
        sides=Math.floor(Math.random()*7 +2);
        scale=Math.random()*0.2 +0.4; //how much smaller
        spread =Math.random()*2.9+0.1; //spreading gradient
        color= 'hsl('+ Math.random()*360+',100%,50%';
    }
    randomizeButton.addEventListener('click',function(){
        randomizeFractal();
        updateSliders();
        fractal();
    });//callback function

    function resetFractal(){
        sides=5;
        scale=0.5; //how much smaller
        spread =0.7; //spreading gradient
    }

    resetButton.addEventListener('click',function(){
        resetFractal();
        updateSliders();
        fractal();
    });

    function updateSliders(){
        slider_spread.value=spread;
        label_spread.innerText='Spread: ' + Number(spread).toFixed(2);
        slider_sides.value=sides;
        label_sides.innerText='Sides: ' + sides;
        slider_scale.value=scale;
        label_scale.innerText='Scale:'+scale;
        slider_color.value=color;
    }//number is number constructer to fixed is to write 2 digits
    updateSliders();

    this.window.addEventListener('resize',function(){
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
        size=canvas.width<canvas.height ? canvas.height* 0.3 :
        canvas.height*0.3;
        fractal();
    });

});