window.addEventListener('load',function(){
    const canvas = document.getElementById("canvas6");
    const ctx= canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    
    let color1='white';
    let color2='black';

    //fundamental rules of cellular automata
    const ruleSets={
        30:[0,0,0,1,1,1,1,0],//famous for its complex and seemingly random behavior. It is often used as an example of how simple rules can lead to complex patterns
        54:[0,0,1,1,0,1,1,0],//generates a pattern that looks like a checkerboard, and is sometimes used in cryptography for generating random numbers
        60:[0,0,1,1,1,1,0,0],//generates a pattern that looks like a checkerboard, and is sometimes used in cryptography for generating random numbers
        62:[0,0,1,1,1,1,1,0],//generates a pattern that looks like a checkerboard, and is sometimes used in cryptography for generating random numbers
        90:[0,1,0,1,1,0,1,0],//nteresting because it generates the Sierpinski triangle pattern, which is a fractal pattern that appears in many different areas of mathematics and science
        94:[0,1,0,1,1,1,1,0],//interesting because it generates the Sierpinski triangle pattern, which is a fractal pattern that appears in many different areas of mathematics and science
        102:[0,1,1,0,0,1,1,0],//interesting because it generates the Sierpinski triangle pattern, which is a fractal pattern that appears in many different areas of mathematics and science
        110:[0,1,1,0,1,1,1,0],//another rule that exhibits complex behavior, and has been shown to be capable of universal computation
        122:[0,1,1,1,1,0,1,0],//another rule that exhibits complex behavior, and has been shown to be capable of universal computation
        126:[0,1,1,1,1,1,1,0],//another rule that exhibits complex behavior, and has been shown to be capable of universal computation
        150:[1,0,0,1,0,1,1,0],//interesting because it generates the Sierpinski triangle pattern, which is a fractal pattern that appears in many different areas of mathematics and science
        158:[1,0,0,1,1,1,1,0],//interesting because it generates the Sierpinski triangle pattern, which is a fractal pattern that appears in many different areas of mathematics and science
        182:[1,0,1,1,0,1,1,0],//notable for its ability to simulate traffic flow, with the "1" representing a car and the "0" representing an empty space
        184:[1,0,1,1,1,0,0,0],//notable for its ability to simulate traffic flow, with the "1" representing a car and the "0" representing an empty space
        190:[1,0,1,1,1,1,1,0],//notable for its ability to simulate traffic flow, with the "1" representing a car and the "0" representing an empty space
        220:[1,1,0,1,1,1,0,0],//interesting because it generates the Sierpinski triangle pattern, which is a fractal pattern that appears in many different areas of mathematics and science
        222:[1,1,0,1,1,1,1,0],//interesting because it generates the Sierpinski triangle pattern, which is a fractal pattern that appears in many different areas of mathematics and science
        250:[1,1,1,1,1,0,1,0],//interesting because it generates the Sierpinski triangle pattern, which is a fractal pattern that appears in many different areas of mathematics and science
    };


    


    function decomposeNumber(number){

        let binaryArray = [];
        for (let i=7;i>=0;i--){
            let bit=(number>>i)&1;
            binaryArray.push(bit);
        }
        return binaryArray;

    }
  


    let cellHeight = canvas.height/20;
    let cellWidth = canvas.width/20;
    let noOfCells = 20;
    let cells =[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1];
    let y=0;
    let ruleSetNumber=30;
    let ruleset = [0,0,0,1,1,1,1,0];//initilize the ruleset as 30
    let colorRulesetEnable=false;
    let randomColorRulesetArray = [];
    let cellsColor=[];
    drawNextGen(cells,y);

    const slider_noOfCells=this.document.getElementById('noOfCells');
    const label_noOfCells=this.document.querySelector('[for="noOfCells"]');
    const ruleSetDropdown=this.document.getElementById('ruleSet');
    const rulesetButton=this.document.getElementById('generateArt');
    const randomRulesetButton=this.document.getElementById('randomRuleset');
    const randomDuoColorButton=this.document.getElementById('randomDuoColor');
    const randomColorRulesetButton=this.document.getElementById('randomColorRuleset');

    const clearButton = document.getElementById('clearCanvas');
    const undoButton = document.getElementById('undo');
    const redoButton = document.getElementById('redo');
    const saveButton = document.getElementById('save');

    slider_noOfCells.addEventListener('change',function(e){
        ctx.restore();
        ctx.clearRect(0,0,canvas.width,canvas.height);//clears the canvas
        noOfCells=e.target.value;
        updateSliders();
        cellWidth = canvas.width/noOfCells;
        cellHeight = canvas.height/noOfCells;
        console.log("cellHeight"+cellHeight);
        console.log("cellWidth"+cellWidth);
        updateCanvas();
        //updateArray(cells);
        
    });

    rulesetButton.addEventListener('click',function(){
        ruleSetNumber=document.getElementById('noOfRuleValue').value;
        ruleset=decomposeNumber(ruleSetNumber);
        updateCanvas();
    });


    randomRulesetButton.addEventListener('click',function(){
        ruleSetNumber=Math.floor(Math.random()*255);
        ruleset=decomposeNumber(ruleSetNumber);
        updateCanvas();
    });

    randomDuoColorButton.addEventListener('click',function(){
        let r1=Math.floor(Math.random()*255);
        let g1=Math.floor(Math.random()*255);
        let b1=Math.floor(Math.random()*255);

        color1="rgb("+r1+","+g1+","+b1+")";

        let r2=Math.floor(Math.random()*255);
        let g2=Math.floor(Math.random()*255);
        let b2=Math.floor(Math.random()*255);

        color2="rgb("+r2+","+g2+","+b2+")";

        updateCanvas();
    });


    randomColorRulesetButton.addEventListener('click',function(){
        //initialize random color array which will represent the ruleset
        randomColorRulesetArray = [];
        for(let i=0;i<8;i++){
            let r=Math.floor(Math.random()*255);
            let g=Math.floor(Math.random()*255);
            let b=Math.floor(Math.random()*255);
            let color="rgb("+r+","+g+","+b+")";
            randomColorRulesetArray.push(color);
        }
        colorRulesetEnable=true;
        cellsColor = [];
        updateCanvas();
    });



    ruleSetDropdown.addEventListener('change',function(){
        let ruleSetNo = ruleSetDropdown.value;
        ruleset = ruleSets[ruleSetNo];
        updateCanvas();

    });

    function updateCanvas(){//generates the new canvas
        //cells = randomArray(noOfCells); //creates a random array of 1s and 0s
        for(let i = 0; i < noOfCells; i++){
            cells[i]=0;
            if((i==noOfCells/2)||(i==(noOfCells-1)/2)){
                cells[i-1]=1;
            }
        }
        y=0; 
        drawNextGen(cells,y);//draws the first generation

        for(let i=0; i<noOfCells; i++){
            //console.log("Before update");
            //console.log(cells);
            //firstly change the colors based on color ruleset
            if(colorRulesetEnable){
                cellsColor =updateColorArray(cells);
            }
            //then update the cells based on the ruleset
            cells=updateArray(cells);
            
            y=y+cellWidth;
            drawNextGen(cells,y);
        }
        colorRulesetEnable=false;
    }



    function randomArray(noOfCells){
        cells = [];
        for(let i=0; i<noOfCells; i++){
            cells[i] = Math.floor(Math.random()*2);
        }
        
        return cells;
    }


    
    //let cells = [1,0,1,0,0,0,0,1,0,1,1,1,0,0,0,1,1,1,0,0];


    function drawNextGen(cells,y){
    for(let i = 0; i < noOfCells; i++){
        if(colorRulesetEnable){
            ctx.fillStyle = cellsColor[i];
            ctx.fillRect(i*cellWidth,y,cellWidth,cellHeight);
        }else{
        if(cells[i] == 1){
            ctx.fillStyle = color1;
          
            ctx.fillRect(i*cellWidth,y,cellWidth,cellHeight);
        }
        if(cells[i] == 0){
            ctx.fillStyle = color2;
            ctx.fillRect(i*cellWidth,y,cellWidth,cellWidth);
        }
        }
    }
}
    function updateArray(cells){
            let copiedCells =[];
        //this function updates the array
            for(let i=0; i<noOfCells; i++){
                let left= cells[i-1];
                let middle= cells[i];
                let right= cells[i+1];
                
                let nextGen = rules(left,middle,right);
                
                copiedCells[i] = nextGen;
                //cells[i] = nextGen;
            }
            return copiedCells;
}

    function updateColorArray(cells){
        let copiedCells =[];
    //this function updates the array
        for(let i=0; i<noOfCells; i++){
            let left= cells[i-1];
            let middle= cells[i];
            let right= cells[i+1];

            let nextGen = colorRuleset(left,middle,right);

            copiedCells[i] = nextGen;
            //cells[i] = nextGen;
        }
        return copiedCells;
    }


    function rules(a,b,c){
        if(a == 1 && b == 1 && c == 1){
            return ruleset[0];
        }
        if(a == 1 && b == 1 && c == 0){
            return ruleset[1];
        }
        if(a == 1 && b == 0 && c == 1){
            return ruleset[2];
        }
        if(a == 1 && b == 0 && c == 0){
            return ruleset[3];
        }
        if(a == 0 && b == 1 && c == 1){
            return ruleset[4];
        }
        if(a == 0 && b == 1 && c == 0){
            return ruleset[5];
        }
        if(a == 0 && b == 0 && c == 1){
            return ruleset[6];
        }
        if(a == 0 && b == 0 && c == 0){
            return ruleset[7];
        }
        return 0;
    }


    function colorRuleset(a,b,c){
        if(a == 1 && b == 1 && c == 1){
            return randomColorRulesetArray[0];
        }
        if(a == 1 && b == 1 && c == 0){
            return randomColorRulesetArray[1];
        }
        if(a == 1 && b == 0 && c == 1){
            return randomColorRulesetArray[2];
        }
        if(a == 1 && b == 0 && c == 0){
            return randomColorRulesetArray[3];
        }
        if(a == 0 && b == 1 && c == 1){
            return randomColorRulesetArray[4];
        }
        if(a == 0 && b == 1 && c == 0){
            return randomColorRulesetArray[5];
        }
        if(a == 0 && b == 0 && c == 1){
            return randomColorRulesetArray[6];
        }
        if(a == 0 && b == 0 && c == 0){
            return randomColorRulesetArray[7];
        }
        return randomColorRulesetArray[0];
    }




    function updateSliders(){
        slider_noOfCells.value=noOfCells;
        label_noOfCells.innerText='Number of Cells: '+Number(noOfCells);
    
    }



    });