let snakeX = 5;
let snakeY = 4;
let xMax = 80;
let yMax = 40;
let xPawn;
let yPawn;
let direction = "bottom";
let snakeBody = [];
let pawn;
let move;
let interval;
let die = false;

window.addEventListener("load", startGame);

$(document).keypress(function (e) {
   switch (e.which) {
       case 100:
            direction = "right";
            snakeMove();
           break;
       case 113:
           direction = "left";
           snakeMove();
           break;
       case 122:
           direction = "top";
           snakeMove();
            break;
       case 115:
           direction = "bottom";
           snakeMove();
           break;
   }
});

function startGame() {
    setSnake();
    spawn();
    interval = window.setInterval(snakeMove, 1000);
}

function setSnake() {
    let snakeHead = {
        x: snakeX,
        y: snakeY,
        element: document.getElementById("snakeHead")
    };
    snakeBody.push(snakeHead);
}

function snakeMove() {
    move = canMove(direction);
    if (move && !die){
        switch (direction) {
            case "right":
                snakeBody[snakeBody.length-1].x++;
                break;
            case "left":
                snakeBody[snakeBody.length-1].x--;
                break;
            case "top":
                snakeBody[snakeBody.length-1].y--;
                break;
            case "bottom":
                snakeBody[snakeBody.length-1].y++;
                break;
        }
    }
    snakeDisplacement(direction);
}

function  canMove(dir) {
    let pawnC = testCollision(dir);
    switch (pawnC) {
        case false:
            let wallC = testDirection(dir);
            switch (wallC) {
                case false:
                    let selfC = selfCollision(direction);
                    switch (selfC) {
                        case true:
                            return false;
                        case false:
                            return true;
                    }
                    return true;
                case true:
                    reloading();
                    return false;
            }
            break;
        case true:
           addSquare();
           return false;
    }
}

function selfCollision(dir) {
    switch (dir) {
        case "right":
            for(let i = 0; i<snakeBody.length; i++){
                if (snakeBody[snakeBody.length-1].x === (snakeBody[i].x)-1 && snakeBody[snakeBody.length-1].y === snakeBody[i].y){
                    reloading();
                    return true;
                }
            }
            return false;
        case "left":
            for(let i = 0; i<snakeBody.length; i++){
                if (snakeBody[snakeBody.length-1].x === (snakeBody[i].x)+1 && snakeBody[snakeBody.length-1].y === snakeBody[i].y){
                    reloading();
                    return true;
                }
            }
            return false;
        case "top":
            for(let i = 0; i<snakeBody.length; i++){
                if (snakeBody[snakeBody.length-1].x === (snakeBody[i].x) && snakeBody[snakeBody.length-1].y === (snakeBody[i].y)+1){
                    reloading();
                    return true;
                }
            }
            return false;
        case "bottom":
            for(let i = 0; i<snakeBody.length; i++){
                if (snakeBody[snakeBody.length-1].x === snakeBody[i].x && snakeBody[snakeBody.length-1].y === (snakeBody[i].y)-1){
                    reloading();
                    return true;
                }
            }
            return false;
    }
}

function testCollision(dir) {
    switch (dir) {
        case "right":
            return !(snakeBody[snakeBody.length-1].y !== yPawn || snakeBody[snakeBody.length-1].x !== xPawn - 1);
        case "left":
            return !(snakeBody[snakeBody.length-1].y !== yPawn || snakeBody[snakeBody.length-1].x !== xPawn + 1);
        case "top":
            return !(snakeBody[snakeBody.length-1].y !== yPawn + 1 || snakeBody[snakeBody.length-1].x !== xPawn);
        case "bottom":
            return !(snakeBody[snakeBody.length-1].y !== yPawn - 1 || snakeBody[snakeBody.length-1].x !== xPawn);
    }
}

function testDirection(dir) {
    switch (dir) {
        case "right":
            return snakeBody[snakeBody.length-1].x >= xMax;
        case "left":
            return snakeBody[snakeBody.length-1].x <= 1;
        case "top":
            return snakeBody[snakeBody.length-1].y <= 1;
        case "bottom":
            return snakeBody[snakeBody.length-1].y >= yMax;
    }
}

function snakeDisplacement(dir) {
    for(let i=0; i<snakeBody.length; i++){
        switch (i) {
            case snakeBody.length-1:
                snakeBody[i].element.style.gridArea =  snakeBody[i].y +"/" + snakeBody[i].x + "/" + parseInt(snakeBody[i].y+1) + "/" + parseInt(snakeBody[i].x+1);
                break;
            case snakeBody.length-2:
                if (move) {
                    switch (dir) {
                        case "right":
                            snakeBody[i].x = snakeBody[i+1].x-1;
                            snakeBody[i].y = snakeBody[i+1].y;
                            snakeBody[i].element.style.gridArea = snakeBody[i].y +"/" + snakeBody[i].x + "/" + parseInt(snakeBody[i].y+1) + "/" + parseInt(snakeBody[i].x+1);
                            break;
                        case "left":
                            snakeBody[i].x = snakeBody[i+1].x+1;
                            snakeBody[i].y = snakeBody[i+1].y;
                            snakeBody[i].element.style.gridArea = snakeBody[i].y +"/" + snakeBody[i].x + "/" + parseInt(snakeBody[i].y+1) + "/" + parseInt(snakeBody[i].x+1);
                            break;
                        case "top":
                            snakeBody[i].x = snakeBody[i+1].x;
                            snakeBody[i].y = snakeBody[i+1].y+1;
                            snakeBody[i].element.style.gridArea = snakeBody[i].y +"/" + snakeBody[i].x + "/" + parseInt(snakeBody[i].y+1) + "/" + parseInt(snakeBody[i].x+1);
                            break;
                        case "bottom":
                            snakeBody[i].x = snakeBody[i+1].x;
                            snakeBody[i].y = snakeBody[i+1].y-1;
                            snakeBody[i].element.style.gridArea = snakeBody[i].y +"/" + snakeBody[i].x + "/" + parseInt(snakeBody[i].y+1) + "/" + parseInt(snakeBody[i].x+1);
                            break;
                    }
                }
                break;
            default:
                if (move){
                    snakeBody[i].x = snakeBody[i+1].x;
                    snakeBody[i].y = snakeBody[i+1].y;
                    snakeBody[i].element.style.gridArea = snakeBody[i].y +"/" + snakeBody[i].x + "/" + parseInt(snakeBody[i].y+1) + "/" + parseInt(snakeBody[i].x+1);
                }
                break;
        }
    }
}

function rand (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawn() {
    xPawn = rand(1, 20);
    yPawn = rand(1, 10);

    let square = document.createElement('div');
    square.className = "pawn";
    square.style.gridArea = yPawn +"/" + xPawn + "/" + parseInt(yPawn+1) + "/" + parseInt(xPawn+1);
    document.getElementById("gamePanel").appendChild(square);
    pawn = square;
}

function addSquare() {
    pawn.className = "square snake-element";
    pawn.style.backgroundColor = "yellow-green";
    let newSquare = {
        x: xPawn,
        y: yPawn,
        element: pawn
    };
    snakeBody.push(newSquare);
    spawn();
}

function reloading() {
    alert('you die');
    die = true;
    clearInterval(interval);
    alert('reloading');
    document.location.reload(true);
}
