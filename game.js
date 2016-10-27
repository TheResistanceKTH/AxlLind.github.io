var ctx = document.getElementById('canvas').getContext('2d');
ctx.width = 700;
ctx.height = 1000;
ctx.fillStyle = "#FFFFFF";
ctx.strokeStyle = "#000000";
var notLost = true, firstPlay = true, score = 0;
var rectX = canvas.width/2 -75;
var img = new Image();
img.src = 'ball.png';
var ballX = canvas.width/2 -25,
    ballY = 20,
    veloX = 0.5 + (Math.random()),
    veloY = 0.5 + (Math.random());
if(Math.random() < 0.5) {
    veloX *= -1
}

window.setInterval(function(){
  if(firstPlay === false) {
    run();
  } else {
    ctx.fillStyle = "#000000";
    ctx.font = "65px Arial";
    ctx.fillText("Welcome to the best game ever!", 30, canvas.height/2);
    ctx.font = "20px Arial";
    ctx.fillText("Press enter to play", 430, canvas.height/2 + 35);
    ctx.fillStyle = "#FFFFFF";
  }
}, 5);

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 65:
        moveRect(-25);
        break;
    case 68:
        moveRect(25);
        break;
    case 13:
        firstPlay = false;
        if(notLost === false) {
          rectX = canvas.width/2 -75;
          ballX = canvas.width/2 -25;
          ballY = 20;
          veloX = 0.5 + Math.random();
          veloY = 0.5 + Math.random();
          if(Math.random() < 0.5) {
            veloX *= -1;
          }
          score = 0;
          notLost = true;
        }
        break;
  }
}

function moveRect(deltaX){
  if(rectX + deltaX > canvas.width - 150 || rectX + deltaX < 0) {
    return;
  }
  rectX += deltaX;
}

function run(){
  if(notLost) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(rectX,canvas.height-50,150,15);
      ctx.strokeRect(rectX,canvas.height-50,150,15);
      drawBall();
      ctx.font = "20px Arial";
      ctx.fillText("Score: " + score, canvas.width/2 -60, 20);
  } else {
    ctx.font = "100px Arial";
    ctx.fillText("You lose, loser!", 170, canvas.height/2);
    ctx.strokeText("You lose, loser!", 170, canvas.height/2);
    ctx.font = "20px Arial";
    ctx.fillText("Press enter to play again", 370, canvas.height/2 + 35);
    ctx.strokeText("Press enter to play again", 370, canvas.height/2 + 35);
  }
}

function drawBall() {
  if(ballX <= 0) {
    veloX *= -1;
    ballX = 2; // to prevent bug where ball gets stuck at edge
  } else if(ballX >= canvas.width - 50) {
    veloX *= -1;
    ballX = canvas.width - 52;
  } else if(ballY <= 0) {
    veloY *= -1;
    ballY = 2;
  } else if(ballY > canvas.height - 65) {
    notLost = false;
  }
  if(ballY >= canvas.height-95 && ballY >= canvas.height-90 && ballX > rectX-50 && ballX < rectX+150) {
    veloY *= -1.05;
    veloX *= 1.05;
    ballY = canvas.height - 97;
    score ++;
  }
  ballX += veloX;
  ballY += veloY;
  ctx.drawImage(img,ballX,ballY,50,50)
}
