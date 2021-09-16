var score = 0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;;

var life = 5;
var gameState = 1;

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);
  

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  

  heading = createElement("h1");
  scoreboard = createElement("h1");
  lifescore = createElement("h1");
   
}

function draw() {
  background("#BDA297");


  //display Score and number of lifes
  scoreboard.html("Score: "+score)
  scoreboard.style('color:red');
  scoreboard.position(width-200,20)
 
  lifescore.html("Life: "+life);
  lifescore.style('color:red');
  lifescore.position(200,20);


 

  if(gameState===1){
    gun.y=mouseY 

    if(frameCount % 80 === 0){
      drawblueBubble();
    }

    if(frameCount % 100 === 0){
      drawredBubble();
    }

    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup); 
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    if(blueBubbleGroup.collide(backBoard)){
      handleGameOver(blueBubbleGroup);
      
    
    }
    
    if(redBubbleGroup.collide(backBoard)){
      handleGameOver(redBubbleGroup);
      
    
    }

    
  }  

  if(life===0){
    gameState = 2;

    swal({
      title: `Game Over`,
      text: "Oops you lost the game....!!!",
      text: "Your Score is " + score,
      imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    })
  }
   



 
  

  if(keyDown("space")){
    var bullet = shootBullet();
    bullet.y = gun.y
  }

  drawSprites();  
}

function shootBullet(){
  bullet = createSprite(200,100,5,10);
  bullet.addImage(bulletImg);
  bullet.velocityX = 6;
  bullet.lifetime = 100;
  bullet.scale = 0.1;
 
  bulletGroup.add(bullet);

  return bullet;
  
}

function drawblueBubble(){
  bluebubble = createSprite(800, random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale=0.1;
  bluebubble.velocityX=-8;
  bluebubble.lifetime=400;

  blueBubbleGroup.add(bluebubble);
}

function drawredBubble(){
  redbubble = createSprite(800, random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale=0.1;
  redbubble.velocityX=-8;
  redbubble.lifetime=400;

  redBubbleGroup.add(redbubble);

}

function handleBubbleCollision(bubbleGroup){
  blast = createSprite(bullet.x, bullet.y, 50,50);
  blast.addImage(blastImg);
  blast.scale = 0.3;
  blast.lifetime = 20;

  if(life>0){
    score=score+1
  }

  bulletGroup.destroyEach();
  bubbleGroup.destroyEach();

}

function handleGameOver(bubbleGroup){
  life=life-1
  bubbleGroup.destroyEach();
}