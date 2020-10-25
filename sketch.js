var gameState = START;
var PLAY = 2;
var END = 0;
var START = 1;

var carImage, busImage, truckImage, postImage, carImage1, car, line2, line1, r;
var gameOver, restart, gameOverImage, restartImage, obstacleGroup;

var sound;
var score, gameSound;


function preload() {
  //to load the obstacle and the car images
  carImage1 = loadImage("download.jpg");
  busImage = loadImage("bus.jpg");
  truckImage = loadImage("truck.png");
  carImage = loadImage("car 2.jpg")
  postImage = loadImage("pole.png");

  // to load the gameover and restart image
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");



}

function setup() {
  createCanvas(600, 600);

  line2 = createSprite(200, 300, 5, 600);
  line2.shapeColor = ("red");

  line1 = createSprite(400, 300, 5, 600);
  line1.shapeColor = ("red");

  car = createSprite(300, 500, 20, 20);
  car.addImage("running car", carImage);
  car.scale = 0.35;



  gameOver = createSprite(300, 260, 10, 10);
  gameOver.addImage("gameOverImage", gameOverImage);
  gameOver.visible = false;

  restart = createSprite(300, 300);
  restart.addImage(restartImage);
  restart.visible = false;

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  score = 0;

  obstacleGroup = createGroup();


}

function draw() {
  background("white");
  car.setVelocity(0, 0);

  if (gameState === START) {
    text("this is a car", 10, 10);
    text("press 'space' to start", 30, 10);
    text("save yourself from the other cars and posts", 50, 10);
    text("score the highest and win");
    textSize(20);
    text("ALL THE BEST", 200, 300);

    car.visible = false;
    line2.visible = false;
    line1.visible = false;
    score.visible = false;

    if (keyDown("space")) {
      gameState = PLAY;
      car.visible=true;
      line2.visible = true;
      line1.visible = true;
      score.visible = true;

      
    }
  }

  if (gameState === PLAY) {
    spawnCar2();
    score = score + Math.round(getFrameRate() / 60);

    if (keyDown("LEFT_ARROW")) {
      car.velocityX = car.velocityX - 5
    }
    if (keyDown("RIGHT_ARROW")) {
      car.velocityX = car.velocityX + 5
    } else if (obstacleGroup.isTouching(car)) {
      gameState = END;
    }
    fill("blue");
    textSize(30);
    text("score:" + score, 240, 590);

  }
  if (gameState === END) {
    obstacleGroup.destroyEach();
    obstacleGroup.setLifetimeEach(-1);
    line2.destroy();
    line1.destroy();
    car.destroy();

    gameOver.visible = true;
    restart.visible = true;


  }

  fill("blue");
  textSize(30);
  text("score:" + score, 240, 590);



  drawSprites();


}

function spawnCar2() {
  if (frameCount % 60 === 0) {
    var car2 = createSprite(200, -200, 20, 20);
    car2.velocityY = -(6 + 2 * score / 100);

    var r = Math.round(random(1, 4));
    switch (r) {
      case 1:
        car2.addImage(carImage1);
        break;
      case 2:
        car2.addImage(busImage);
        break;
      case 3:
        car2.addImage(truckImage);
        break;
      case 4:
        car2.addImage(postImage);
        break;
      default:
        break;
    }
    car2.scale = 0.5;
    obstacleGroup.add(car2);
    car2.lifetime = 300;

  }
}