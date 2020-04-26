var countSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll('.square')
var colorDisplay = document.getElementById('colorDisplay');
var messageDis = document.getElementById("message");
var h1 = document.querySelector('h1');
var resetC = document.getElementById('reset');
var modeButtons = document.querySelectorAll('.mode');
init();

function init(){
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener('click',function(){
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');
            this.textContent === "Easy"? countSquares = 3: countSquares = 6;
            resetF();
        });
    }
    for(var i = 0; i < squares.length; i++){
        squares[i].addEventListener('click',function(){
            var clickedColor = this.style.backgroundColor;
            if(clickedColor === pickedColor){
                messageDis.textContent = "Correct";
                resetC.textContent = 'Play Again?';
                changeColor(clickedColor);
                h1.style.backgroundColor = clickedColor;
            }else{
                this.style.backgroundColor = "#232323";
                messageDis.textContent = "Try Again";
    
            }
        });
    }
    resetF();
} 

function resetF(){
    colors = generateRandomColor(countSquares);
    pickedColor = pickColor();
    h1.style.backgroundColor = 'steelblue';
    resetC.textContent = 'New COlors';
    colorDisplay.textContent = pickedColor.toUpperCase();
    messageDis.textContent = "";
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = 'block'; 
        }else{
            squares[i].style.display = 'none';  
        }
    } 
}
resetC.addEventListener("click", function(){
    colors = generateRandomColor(countSquares);
    pickedColor = pickColor();
    h1.style.backgroundColor = 'steelblue';
    resetC.textContent = 'New COlors';
    colorDisplay.textContent = pickedColor.toUpperCase();
    messageDis.textContent = "";
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = colors[i];
    }
});

function changeColor(color){
    for( var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColor(num){
    var arr = [];
    for(var i = 0; i < num; i++){
        arr.push(randomColor());
    }
    return arr;
}

function randomColor(){
    return "rgb("+Math.floor(Math.random()*256)+", "+Math.floor(Math.random()*256)+", "+Math.floor(Math.random()*256)+')';
}