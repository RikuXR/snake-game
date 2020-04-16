const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// create the snake
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

// create the food
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

// create the score
let score = 0;

// control the snake
let d;
document.addEventListener("keydown", direction);

function direction(e) {
  if (e.keyCode === 37 && d !== "right") {
    d = "left";
  } else if (e.keyCode === 38 && d !== "down") {
    d = "up";
  } else if (e.keyCode === 39 && d !== "left") {
    d = "right";
  } else if (e.keyCode === 40 && d !== "up") {
    d = "down";
  }
}

// draw everything
function draw() {
  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y);

  // old head position
  let snakeX = snake[0].x,
    snakeY = snake[0].y;

  // change snake coordinates
  if (d === "left") snakeX -= box;
  if (d === "up") snakeY -= box;
  if (d === "right") snakeX += box;
  if (d === "down") snakeY += box;

  // remove the tail
  snake.pop();

  // add new head
  snake.unshift({ x: snakeX, y: snakeY });

  ctx.fillStyle = "white";
  ctx.font = "37px Arial";
  ctx.fillText(score, 2 * box, 1.6 * box);
}

// update canvas
let game = setInterval(draw, 100);
