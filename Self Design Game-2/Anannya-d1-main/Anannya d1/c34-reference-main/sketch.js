var background,backgroundImage;
var butterfly,butterflyImage;
var gameover,gameoverImage;
var bee,beeImage;
var girl,girlImage;
var restart,restartImage;
var score=0;
var lives=20;
var PLAY=1;
var END=0;
var gameState=PLAY;
const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;
var engine,world;
var invisibleGround;
var girl2Image,girl2;
var sound;
var edges;

function preload(){
  backgroundImage=loadImage("Pictures/pic32.png");
  butterflyImage=loadImage("Pictures/butterfly.png");
  gameoverImage=loadImage("Pictures/gameover.png");
  beeImage=loadImage("Pictures/bee.png");
  girlImage=loadImage("Pictures/girl.png");
  restartImage=loadImage("Pictures/restart.png");
  girl2Image=loadImage("Pictures/girl2.png");
  sound=loadSound("Sounds/Sound.mp3.mp3");
}

function setup() {
  createCanvas(1000,1000);
  engine=Engine.create();
  world=engine.world;
  //background=createSprite(800,800,0,0);
 // background.addImage(backgroundImage);
  girl=createSprite(200,300,30,20);
  girl.addImage(girlImage);
  girl.scale=0.2;
  gameover=createSprite(500,150,10,10);
  gameover.addImage(gameoverImage);
  gameover.scale=0.2;
  invisibleGround=createSprite(0,1000,2000,10);
  invisibleGround.x=invisibleGround.width/2;
  invisibleGround.visible=false;
  restart=createSprite(900,900,20,20);
  restart.addImage(restartImage);
  restart.scale=0.2;
  ButterflyGroup=new Group();
  BeeGroup=new Group();
}

function draw() {
 background(backgroundImage);
 edges=createEdgeSprites();
  Engine.update(engine);
  if(gameState === PLAY){
    girl.x=mouseX;
    girl.y=mouseY;
  
  Butterfly();
  Bee();
  Score();
  textSize(20);
  fill("black");
  text("Score:"+score,900,30);
  text("Lives:"+lives,900,45);
  gameover.visible=false;
  restart.visible=false;

if(BeeGroup.isTouching(girl)){
  lives=lives-1;
  BeeGroup[0].destroy();

  if(lives===0){
    gameState=END;
    girl.changeImage(girl2Image);
  }

}

}
  else if(gameState===END){
    gameover.visible=true;
    restart.visible=true;
    girl.velocityX=0;
    girl.velocityY=0;
    BeeGroup.setVelocityXEach(0);
    BeeGroup.setVelocityYEach(0);
    ButterflyGroup.setVelocityXEach(0);
    ButterflyGroup.setVelocityYEach(0);
    girl.changeAnimation("girl2",girl2Image);
    if(mousePressedOver(restart)){
Restart();
    }
  }
  sound.play();
  drawSprites();
}

function Butterfly(){
  if(frameCount%10 === 0){
    butterfly=createSprite(400,500,20,20);
    butterfly.y=Math.round(random(30,800));
    butterfly.x=Math.round(random(30,800));
    butterfly.addImage(butterflyImage);
    butterfly.velocityY=5;
    butterfly.velocityX=1;
    butterfly.lifetime=200;
    butterfly.scale=0.1;
    ButterflyGroup.add(butterfly);
  }
}

function Bee(){
  if(frameCount%10 === 0){
    bee=createSprite(500,600,20,20);
    //var Bee=Math.round(random(1,2));
     
    bee.y=Math.round(random(30,800));
    bee.x=Math.round(random(30,800));
      bee.addImage(beeImage);
     
    
   
    bee.scale=0.4;
    BeeGroup.add(bee);
  
    BeeGroup.bounceOff(edges);
  }
}

function Score(){
  if(ButterflyGroup.isTouching(girl)){
    score=score+1;
    ButterflyGroup[0].destroy();
  }
}

function Restart(){
  gameState=PLAY
  restart.visible=false;
  score=0;
  lives=20;
}