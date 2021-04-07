var Gamestate="play";
var hp
var heroindex=0
var backdrop
var backdropimg
var hpimg
var obstacleimg
var ObstaclesGroup 
var snitchimg
var SnitchesGroup
var count=0;
var snitchcount=0
var invisibleGround
var invisibleRoof
var gameover

function preload(){
backdropimg = loadImage("backdrop.jpg")
hpimg= loadImage("hp.png")
obstacleimg= loadImage("Bludger.png")
snitchimg = loadImage("hpsnitch.png")
}

function setup(){
createCanvas(windowWidth-50,windowHeight-50);
backdrop = createSprite(200,200,displayWidth,displayHeight);
backdrop.scale=10
backdrop.addImage(backdropimg)
 gameover= createSprite(200,200,80,10);
gameover.scale=0.15;
hp = createSprite(150,300,80,30);
hp.addImage(hpimg)
hp.scale=0.5;
invisibleGround = createSprite(200,450,200,5);
invisibleGround.visible = false;
invisibleRoof = createSprite(200,25,200,5);
invisibleRoof.visible = false;
hp.setCollider("circle",10,0,80);
ObstaclesGroup = new Group();
SnitchesGroup = new Group()
textSize(18);
textFont("Georgia");
textStyle(BOLD); 
}


function draw() {
  
   background("lightgreen");
  if(Gamestate==="play"){
     gameover.visible=false
  backdrop.velocityX = -(6+count/25); 
   if (backdrop.x < -5){
      backdrop.x = backdrop.width/2;
    }
   count = count + Math.round(World.frameRate/40);
  
  
   if(keyDown("space")){
     hp.velocityY = -12 ;
    }
  hp.velocityY = hp.velocityY + 0.8;
  
  if(count===500){
    ObstaclesGroup.velocityX=-100;
  }
  spawnObstacles();
  spawnSnitches()
 console.log(heroindex)
 console.log(SnitchesGroup.length)
  for(var j=0;j<SnitchesGroup;j++){
    if(SnitchesGroup.get(j).isTouching(hp)){
      SnitchesGroup.get(j).destroyeach();
      snitchcount= snitchcount + 1;
      console.log(snitchcount)
    }
  }
  if(snitchcount===3){
    Gamestate="end"
  }
 if( ObstaclesGroup.isTouching(hp)){
   Gamestate="end";
 }
  }

 
else if(Gamestate==="end"){
 //gameover.visible=true
backdrop.velocityX=0;
hp.velocityY=0;
ObstaclesGroup.setVelocityXEach(0);
ObstaclesGroup.setLifetimeEach(-1);
SnitchesGroup.setVelocityXEach(0);
SnitchesGroup.setLifetimeEach(-1);


}
console.log(displayHeight)
hp.collide(invisibleGround);
hp.collide(invisibleRoof);
//hp.collide(windowHeight);
  drawSprites();
   text("score:"+count,300,20);
}
function spawnObstacles() {
  if(World.frameCount % 40 === 0) {
    if(count===500){
      World.frameCount % 20 === 0;
       obstacle.velocityX = -10;
    }
    var obstacle = createSprite(400,random(100,450),10,40);
    obstacle.velocityX = -8;
   
    
    //generate random obstacles
    obstacle.addImage(obstacleimg)
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.35;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
    
  }
}
function spawnSnitches() {
  if(World.frameCount % 70 === 0) {
    if(count===500){
      World.frameCount % 70 === 0;
       snitch.velocityX = -4;
    }
    var snitch = createSprite(600,random(100,450),10,40);
    snitch.velocityX = -4;
   
    
    //generate random obstacles
    snitch.addImage(snitchimg)
    //assign scale and lifetime to the obstacle           
    snitch.scale = 0.05;
    snitch.lifetime = 70;
    //add each obstacle to the group
    SnitchesGroup.add(snitch);
    heroindex= heroindex + 1
    
  }
}

