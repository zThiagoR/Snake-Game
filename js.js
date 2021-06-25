const canvas = document.getElementById("snake")
let context = canvas.getContext ('2d')
let scoreboard = document.getElementById('scoreboard')
var score = 0;
var velocidade = 200;
let box = 32;
let direction = 'right'
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function criarCobrinha() {
    for(i = 0; i < snake.length; i++) { 
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box)    
    }
}

function drawfood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function iniciarJogo() {

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            document.getElementById('teste').style.display = "block"
            snake = [0];
            food = [0];
        }
    }

    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    criarBG()
    criarCobrinha()
    drawfood()
    criarScoreBoard()

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(direction == 'right') snakeX += box
    if(direction == 'down') snakeY += box
    if(direction == 'up')   snakeY -= box
    if(direction == 'left') snakeX -= box

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
        score++
        velocidade -= 5
        velocidadeCobra(velocidade)
        scoreboard.innerHTML = `PONTOS: ${score}`
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)

}

document.addEventListener('keydown', update) 

function update(event) {
    if(event.keyCode == 37 && direction !== 'right')  direction = 'left'
    if(event.keyCode == 38 && direction !== 'down')  direction = 'up'
    if(event.keyCode == 39 && direction !== 'left')  direction = 'right'
    if(event.keyCode == 40 && direction !== 'up')  direction = 'down'

}

let jogo = setInterval(iniciarJogo, 200);

function criarScoreBoard() {

    scoreboard.innerHTML = `PONTOS: ${score}`
}

function reniciar() {   
    location.reload()
}

function velocidadeCobra(velo){
    clearInterval(jogo);
    jogo = setInterval(iniciarJogo, velo);
}