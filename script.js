let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let gameOver = false;
let gameStarted = false;
canvas.width = 600;
canvas.height = 400;
let speed = 3;
let ball = {
    x : 300,
    y : 200,
    dx : 3,
    dy : 3,
    radius : 10
};


function increaseSpeed(){
    speed += 1;
    ball.dx += speed * Math.sign(ball.dx);
    ball.dy += speed * Math.sign(ball.dy);
}
function decreaseSpeed() {
    speed -= 1;
    if (speed < 1) speed = 1;

    ball.dx = speed * Math.sign(ball.dx);
    ball.dy = speed * Math.sign(ball.dy);
}


let paddle = {
    x : 250,
    y : 370,
    width : 100,
    height : 10
};

function drawBall() { 
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle(){
    ctx.fillStyle = "white";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}
function startGame() {
    gameStarted = true;
}
function moveBall(){
    if (gameOver || !gameStarted) return;
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
    }

    if (
    ball.y + ball.radius >= paddle.y &&
    ball.y + ball.radius <= paddle.y + paddle.height &&
    ball.x >= paddle.x &&
    ball.x <= paddle.x + paddle.width
) {
    ball.dy = -Math.abs(ball.dy); // force upward bounce
}

    if (ball.y > canvas.height){
        gameOver = true;
        ball.dy = 0;
        ball.dx = 0;
        setTimeout(()=>{
        alert("Game Over!");
        },50);
    }
}
document.addEventListener("mousemove", function(e){
     if(!gameStarted) return;  
    let rect = canvas.getBoundingClientRect();
    let newX = e.clientX - rect.left - paddle.width / 2;

    if(newX < 0){
        newX = 0;
    }
    if (newX + paddle.width > canvas.width){
        newX = canvas.width - paddle.width;
    }
    paddle.x = newX;
});
canvas.addEventListener("touchmove", function(e){
    if(!gameStarted) return;

    let rect = canvas.getBoundingClientRect();
    let touchX = e.touches[0].clientX;

    let newX = touchX - rect.left - paddle.width / 2;

    newX = Math.max(0, Math.min(canvas.width - paddle.width, newX));

    paddle.x = newX;
});
function gameloop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    moveBall();
    requestAnimationFrame(gameloop);
}
gameloop();
function resetGame() {
    ball.x = 300;
    ball.y = 200;
    ball.dx = 3;
    ball.dy = 3;

    paddle.x = 250;

    gameOver = false;
}