var backgroundImg,bg;
var spaceShip,spaceShipImg;
var meteorImg,meteor
var star,starImg;

var score = 0 

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var starsGroup;
var meteorsGroup;

var gameOver,gameOverImg;
var restart,restartImg;


function preload(){
backGroundImg = loadImage("assest/backGround.jpg");
spaceShipImg = loadImage("assest/spaceShip4.png");
meteorImg = loadImage("assest/meteor4.png");
starImg = loadImage("assest/star2.png")
gameOverImg = loadImage("assest/gameOver2.png")
restartImg = loadImage("assest/restart.png")

}

function setup(){
createCanvas(windowWidth,windowHeight);
//backgroundImg.scale = 0.5;




bg = createSprite(windowWidth/2,windowHeight/2,50,50);
bg.addImage(backGroundImg);
bg.velocityY+=5;
bg.scale = 3.2;

spaceShip = createSprite(windowWidth/2,windowHeight-120,50,50);
spaceShip.addImage(spaceShipImg);
spaceShip.scale = 0.25
spaceShip.debug = true
spaceShip.setCollider("circle",0,0,300)

gameOver = createSprite(windowWidth/2,windowHeight/2);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.4; 

gameOver.visible = false;

restart = createSprite(windowWidth/2,windowHeight/2+200);
restart.addImage(restartImg);
restart.scale = 0.3;

restart.visible = false;

starsGroup = new Group();
meteorsGroup = new Group();

}


function draw(){
 // background(0);
 

 fill("white")
 strokeWeight(10);
 stroke("white")
  textSize(60);
 text("Score:"+score,windowWidth/2,windowHeight-350);


 
      if(gameState === PLAY){
        if(bg.y>500){
          bg.y=bg.width/2;
        }

          if(keyIsDown(RIGHT_ARROW)){
            spaceShip.position.x +=5
          }
          
          if(keyIsDown(LEFT_ARROW)){
             spaceShip.position.x -=5
          }
   
          
          if(spaceShip.isTouching(starsGroup)){
          score +=5;
          
          }
          
          if(spaceShip.isTouching(meteorsGroup)){
          gameState = END;
          }

          gameOver.visible = false;
         restart.visible = false;

          spawnstars();
         spawnmeteors();
         
      }
      else if(gameState === END){
        bg.velocityY = 0;
        meteorsGroup.setVelocityYEach(0);
        starsGroup.setVelocityYEach (0);

        meteorsGroup.destroyEach();
        starsGroup.destroyEach();

        if(mousePressedOver(restart)) {
          reset();
        }

        gameOver.visible = true;
        restart.visible = true;

       
        


        
      }

      drawSprites();
}

function spawnstars() {
  
  if (frameCount % 60 === 0) {
    var  star = createSprite(700,100)
      star.addImage(starImg);
     star.scale=0.3;
      star.x=Math.round(random(70,1400));
      star.velocity.y=+5
     
      star.depth = spaceShip.depth;
      spaceShip.depth = spaceShip.depth -5;

      starsGroup.add(star);
      
    }
  }
  
  function spawnmeteors(){
    if (frameCount % 40 === 0) {
      var  meteor = createSprite(700,100)
        meteor.addImage(meteorImg);
       meteor.scale=0.5;
        meteor.x=Math.round(random(70,1400));
        meteor.velocity.y=+5
      

        spaceShip.depth = meteor.depth;
        spaceShip.depth = spaceShip.depth +1;

        meteorsGroup.add(meteor);
      }
  }
  
  function reset(){
    gameState = PLAY;
    bg.velocityY +=5
    gameOver.visible = false;
    restart.visible = false;
  
    score = 0
  }
