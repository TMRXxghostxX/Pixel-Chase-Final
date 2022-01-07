var player, playerImg;
var cop, copImg;
var track, trackImg;
var oil, oilImg;
var oilGp;
var fenceImg;
var fenceGp;
var carGp,
obstacle1,
obstacle2,
obstacle3,
obstacle4;
//gameState 0 = Play, gameState 1 = Gameover
var gameState = 0;
var score = 0;
var dieSound;
var gameOverImg, restartImg;


  
function preload(){
  playerImg=loadImage("Player.png");
  copImg=loadImage("Cop.png");
  trackImg=loadImage("track (2).jpg");
  oilImg=loadImage("Oil.png");
  fenceImg=loadImage("Fence(1).png");
  dieSound=loadSound("die.mp3");
  obstacle1=loadImage("Car1.png");
  obstacle2=loadImage("Car2.png");
  obstacle3=loadImage("Car3.png");
  obstacle4=loadImage("Car4.png");
  restartImg = loadImage("Restart.png");
  gameOverImg = loadImage("Gameover.png");
  }
  
  
function setup() {
  createCanvas(400,600);
  track = createSprite(200,200,50,50);
  //oil = createSprite(300,-100,50,50);
  //oil.scale=0.30;
  player = createSprite(200,300,50,50);
  player.scale=0.45;
  cop = createSprite(200,575,50,50);
  cop.scale=0.45;
  player.addImage("Player",playerImg);
  cop.addImage("Cop",copImg);
  track.addImage("track",trackImg);
  //oil.addImage("oil",oilImg);
  gameOver = createSprite(200, 175);
  gameOver.addImage(gameOverImg);

  restart = createSprite(200, 375);
  restart.addImage(restartImg);

  gameOver.scale = 0.35
  restart.scale = 0.10

  oilGp = createGroup();
  fenceGp = createGroup();
  carGp = createGroup();
} 
  
function draw() {
  background("white");
  
  console.log(score);

  gameOver.depth += player.depth;
  restart.depth += player.depth;

  if(gameState===0){
score = score + Math.round(getFrameRate()/60);
      track.velocityY = (5 + 3*score/250);
  if(track.y>1000){
    track.y = 230;
  }

  gameOver.visible = false;
  restart.visible = false;
  
  if(keyDown("left")){
    player.x += -7;
  }
  if(keyDown("right")){
    player.x += 7;
  }
  cop.x = player.x;
  spawnOil();
  spawnFence();
  spawnFence2();
  spawnOil2();
  spawnObstacles();
  if(player.isTouching(oilGp)){
    player.y += 0.75;
  }
  if(fenceGp.isTouching(player)){
    gameState = 1;
    oilGp.destroyEach();
    fenceGp.destroyEach();
    carGp.destroyEach();
    dieSound.play();
  }
  if(carGp.isTouching(player)){
    gameState = 1;
    oilGp.destroyEach();
    fenceGp.destroyEach();
    carGp.destroyEach();
    dieSound.play();
  }
  if(player.isTouching(cop)){
    gameState = 1;
    oilGp.destroyEach();
    fenceGp.destroyEach();
    carGp.destroyEach();
    dieSound.play();
  }
  }else if(gameState===1){
    track.velocityY = 0;
    oilGp.velocityY = 0;
    fenceGp.velocityY = 0;
    oilGp.lifetime = -1;
    fenceGp.lifetime = -1;
    gameOver.visible = true;
    restart.visible = true;
    
    if (mousePressedOver(restart)) {
      reset();
    }
  }
console.log(gameState);
  drawSprites();
  textSize(25);
  fill("white");
  text("Score: " + score, 15, 30);
} 

function spawnOil() {
  if (frameCount % 95 === 0) {
    var oil = createSprite(Math.round(random(25, 375),-100,50,50));
    oil.velocityY = (5 + 3*score/250);
    oil.addImage("oil",oilImg);

    //assign scale and lifetime to the obstacle
    oil.scale=0.30;
    oil.lifetime = 130;
    player.depth += oil.depth;
    cop.depth += oil.depth;
    oilGp.add(oil);
  }}
function spawnFence(){
  if (frameCount % 160 === 0) {
    var fence = createSprite(Math.round(random(25, 375),-100,50,50));
    fence.velocityY = (5 + 3*score/250);

    fence.addImage("fence",fenceImg);

    //assign scale and lifetime to the obstacle
    fence.scale=0.90;
    fence.lifetime = 130;
    //player.depth += fence.depth;
    //cop.depth += fence.depth;
    fenceGp.add(fence);
}}
function spawnFence2(){
  if (frameCount % 100 === 0) {
    var fence2 = createSprite(Math.round(random(25, 375),-100,50,50));
    fence2.velocityY = (5 + 3*score/250);

    fence2.addImage("fence",fenceImg);

    //assign scale and lifetime to the obstacle
    fence2.scale=0.90;
    fence2.lifetime = 130;
    //player.depth += fence.depth;
    //cop.depth += fence.depth;
    fenceGp.add(fence2);
}}
function spawnOil2() {
  if (frameCount % 120 === 0 && score>250) {
    var oil2 = createSprite(Math.round(random(25, 375),-100,50,50));
    oil2.velocityY = (5 + 3*score/250);
    oil2.addImage("oil",oilImg);

    //assign scale and lifetime to the obstacle
    oil2.scale=0.30;
    oil2.lifetime = 130;
    player.depth += oil2.depth;
    cop.depth += oil2.depth;
    oilGp.add(oil2);
  }}
  function spawnFence3(){
    if (frameCount % 350 === 0 && score>750) {
      var fence3 = createSprite(Math.round(random(25, 375),-100,50,50));
      fence3.velocityY = (5 + 3*score/250);
  
      fence3.addImage("fence",fenceImg);
  
      //assign scale and lifetime to the obstacle
      fence3.scale=0.90;
      fence3.lifetime = 130;
      //player.depth += fence.depth;
      //cop.depth += fence.depth;
      fenceGp.add(fence3);
  }}
  function spawnObstacles() {
    if (frameCount % 230 === 0 && score > 500) {
      var obstacle = createSprite(Math.round(random(25, 375), -100, 50, 50));
      obstacle.velocityY = Math.round(random(1, 5)+3*score/250);
  
      //generate random obstacles
      var rand = Math.round(random(1, 4));
      switch (rand) {
        case 1:
          obstacle.addImage(obstacle1);
          break;
        case 2:
          obstacle.addImage(obstacle2);
          break;
        case 3:
          obstacle.addImage(obstacle3);
          break;
        case 4:
          obstacle.addImage(obstacle4);
          break;
        default:
          break;
      }
  
      //assign scale and lifetime to the obstacle
      obstacle.scale = 0.35;
      obstacle.lifetime = 1500;
  
      //add each obstacle to the group
      carGp.add(obstacle);
    }
  }

  function reset() {
    gameState = 0;
    gameOver.visible = false;
    restart.visible = false;
    carGp.destroyEach();
    fenceGp.destroyEach();
    oilGp.destroyEach();
    score = 0;
    player.y = 300;
    player.x = 200;
  }