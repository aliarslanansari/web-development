var countSquares = 6;
var colors = generateRandomColor(countSquares);
// [
//     'rgb(255, 0, 0)',
//     'rgb(0, 0, 255)',
//     'rgb(0, 255, 0)',
//     'rgb(255, 255, 0)',
//     'rgb(255, 0, 255)',
//     'rgb(0, 255, 255)',
// ];

var squares = document.querySelectorAll('.square')
var pickedColor = pickColor();
var colorDisplay = document.getElementById('colorDisplay');
var messageDis = document.getElementById("message");
colorDisplay.textContent = pickedColor;
var h1 = document.querySelector('h1');
var resetC = document.getElementById('reset');
var easyB = document.getElementById('easyB');
var hardB = document.getElementById('hardB');


easyB.addEventListener("click",function(){
    easyB.classList.add('selected');
    hardB.classList.remove('selected');
    countSquares = 3;
    colors = generateRandomColor(countSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];
        }else{
            squares[i].style.display = 'none';  
        }
    }
});
hardB.addEventListener("click",function(){
    hardB.classList.add('selected');
    easyB.classList.remove('selected');
    countSquares = 6;
    colors = generateRandomColor(countSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = 'block';  
        }
    }
})

for(var i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = colors[i];
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


resetC.addEventListener("click", function(){
    colors = generateRandomColor(countSquares);
    pickedColor = pickColor();
    h1.style.backgroundColor = '#232323';
    colorDisplay.textContent = pickedColor;
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