var PLAY=1;
var END=0;
var gamestate="PLAY"

var path,boy,cash,diamonds,jwellery,sword,end;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg;
var score = 0;
var cashG,diamondsG,jwelleryG,swordGroup,picks,runs;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  
  picks = loadSound("picku.mp3");
  runs = loadSound("run.mp3")
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
//boy.debug=true;  
boy.setCollider("rectangle",100,0,1300,1300);
boy.addAnimation("SahilRunnin",endImg)  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
runs.play();

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
   
  
  
  
   if(gamestate==="PLAY"){
  createCash();
    createDiamonds();
    createJwellery();
    createSword();
   
  }  
    
 
path.velocityY = (4 + score/200);

  
  
  
  
  if(cashG.isTouching(boy) || diamondsG.isTouching(boy) || 
     jwelleryG.isTouching(boy)){
    score=score+50
   picks.play();
  }

  
  
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      
      
    }else{
      if(swordGroup.isTouching(boy)) {
    swordGroup.destroyEach();
       gamestate="END";    
      }
    }
    
    
  
  
  if(gamestate==="END"){
    
    cashG.setVelocityYEach(0)
    diamondsG.setVelocityYEach(0)
    jwelleryG.setVelocityYEach(0)
    path.velocityY=0;
    
    cashG.destroyEach(10)
    diamondsG.destroyEach(10)
    jwelleryG.destroyEach(10)
  
    boy.changeAnimation("SahilRunnin",endImg);
    boy.x=200;
    boy.y=200;
    boy.scale=1
    runs.pause();
    if(keyDown("space")){
    gamestate="PLAY"
     reset();     
     runs.play();             
    }
}
  
  
    //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
 
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ score,70,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = (4 + score/200);;
  cash.lifetime = 150;
  cashG.add(cash);

  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = (4 + score/200);;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = (4 + score/200);;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = (4 + score/200);;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}


function reset(){
 
    cashG.setVelocityYEach((4 + score/200))
    diamondsG.setVelocityYEach((4 + score/200))
    jwelleryG.setVelocityYEach((4 + score/200))
    path.velocityY=0;
    
    cashG.destroyEach(10)
    diamondsG.destroyEach(10)
    jwelleryG.destroyEach(10)

    boy.changeAnimation("SahilRunning",boyImg);
    boy.scale=0.08
    boy.y=330
    score=0
}
