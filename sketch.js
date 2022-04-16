

var path,Player;
var car1,car2,car3;
var pathImg,PlayerImg;

var oppBlue1Img;
var oppPurple1Img;
var oppRed1Img;
var gameOverImg,restartImg;

var purpleGrp, blueGrp,redGrp; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  PlayerImg = loadImage("player.png")
  oppBlue1Img = loadImage("car1.png");
  oppPurple1Img = loadImage("car2.png");
 oppRed1Img = loadImage("car3.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png")
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
Player  = createSprite(70,150);
Player.addImage("player1",PlayerImg);
Player.scale=0.2;
  
//set collider for Player


// Player.setCollider("rectangle",0,0,40,40);


  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
gameOver.visible = false;  
restart = createSprite(650,200);
restart.addImage(restartImg);
restart.scale = 0.1;
restart.visible = false;  
  
purpleGrp = new Group();
blueGrp = new Group();
redGrp = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   Player.y = World.mouseY;
  
   edges= createEdgeSprites();
   Player .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      redCars();
    } else if (select_oppPlayer == 2) {
      purpleCars();
    } else {
      blueCars();
    }
  }
  
   if(purpleGrp.isTouching(Player)){
     gameState = END;
     car1.velocityY = 0;
     
    }
    
    if(blueGrp.isTouching(Player)){
      gameState = END;
      car2.velocityY = 0;
      
    }
    
    if(redGrp.isTouching(Player)){
      gameState = END;
      car3.velocityY = 0;
      
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
  
  
    path.velocityX = 0;
    Player.velocityY = 0;
    // Player.addImage("SahilRunning",mainRacerImg2);
  
    purpleGrp.setVelocityXEach(0);
    purpleGrp.setLifetimeEach(-1);
  
    blueGrp.setVelocityXEach(0);
    blueGrp.setLifetimeEach(-1);
  
    redGrp.setVelocityXEach(0);
    redGrp.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      reset()

     }
   
}
}

function redCars(){
        car1 =createSprite(1100,Math.round(random(50, 250)));
        car1.scale =0.05;
        car1.velocityX = -(6 + 2*distance/150);
        car1.addImage("opponentcar1",oppBlue1Img);
        car1.setLifetime=170;
        purpleGrp.add(car1);
}

function purpleCars(){
        car2 =createSprite(1100,Math.round(random(50, 250)));
        car2.scale =0.2;
        car2.velocityX = -(6 + 2*distance/150);
        car2.addImage("opponentcar2",oppPurple1Img);
        car2.setLifetime=170;
        blueGrp.add(car2);
}

function blueCars(){
        car3 =createSprite(1100,Math.round(random(50, 250)));
        car3.scale =0.05;
        car3.velocityX = -(6 + 2*distance/150);
        car3.addImage("opponentcar3",oppRed1Img);
        car3.setLifetime=170;
        redGrp.add(car3);
}



function reset(){
 gameState = PLAY;
 gameOver.visible = false;
 restart.visible = false
 Player.addImage("player1",PlayerImg);
  
 purpleGrp.destroyEach();
 blueGrp.destroyEach();
 redGrp.destroyEach();
  
 distance = 0;
}





