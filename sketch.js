var REGULAR = 1;
var EASY = 2;
var MEDIUM = 3;
var HARD = 4;
var WIN = 5;
var LOSE = 6;
var VIBE = 7;

var ENDLESS = 8;

var MENU = 0;

var gameState = MENU;

var target, targetImage, targetGroup;
var hit, win, music1, music2, music3, music4, music5;
var score = 0;
var back, backImage, wonImage, overImage, end, nice;
var restart, restartIMG, reg, regIMG, endless, endlessIMG, menu, menuIMG;
var crosshair,crosshairIMG;
var bullseye;
var title, titleIMG;
var r, g, b;

function preload(){
  targetImage = loadImage("target.png");
  
  backImage = loadImage("backround.jpg");
  wonImage = loadImage("won_background.jpg");
  overImage = loadImage("over.jpg");
  end = loadImage("maxresdefault.jpg");
  nice = loadImage("nice.jpg");
  
  restartIMG = loadImage("restart_button.png");
  menuIMG = loadImage("menu.png");
  endlessIMG = loadImage("endlessbutton-1.png");
  regIMG = loadImage("regbutton.png");
  
  titleIMG = loadImage("title.png");
  
  crosshairIMG = loadImage("crosshair.png");
  
  hit = loadSound("hitmarker_2.mp3");
  win = loadSound("victoryff.swf.mp3");
  
  music1 = loadSound("giorno-theme.mp3");
  music2 = loadSound("shop-song.mp3");
  music3 = loadSound("bonetrousle.mp3");
  music4 = loadSound("lull.mp3");
  music5 = loadSound("shooting-gallery.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  back = createSprite(windowWidth/2, windowHeight/2,windowWidth, windowHeight);
  
  title = createSprite(windowWidth/2, 125,10,10);
  title.addImage(titleIMG);
  title.scale = 1;
  title.visible = false;
  
  restart = createSprite((windowWidth/2)-200, (windowHeight/2)+125,20,20);
  restart.addImage(restartIMG);
  restart.scale = 0.5;
  restart.visible = false;
    
  menu = createSprite((windowWidth/2)+200, (windowHeight/2)+125, 10, 10);
  menu.addImage(menuIMG);
  menu.scale = 0.8;
  menu.visible = false;
  
  endless = createSprite((windowWidth/2)+140, (windowHeight/2)+85, 10, 10);
  endless.addImage(endlessIMG);
  endless.scale = 0.5;
  endless.visible = false;
  
  reg = createSprite((windowWidth/2)-140,(windowHeight/2)+85,10,10);
  reg.addImage(regIMG);
  reg.scale = 0.55;
  reg.visible = false;
  
  crosshair = createSprite(mouseX, mouseY);
  crosshair.addImage(crosshairIMG);
  crosshair.scale = 0.4;
  crosshair.visible = false;
  
  target = createSprite(-200,-200)
  targetGroup = new Group();
  
  r = 143;
  g = 61;
  b = 61;
  pickSong();
}

function draw() {  
  background(backImage);

  console.log(mouseX , mouseY);
  
  back.visible = false;
  
  crosshair.x = mouseX;
  crosshair.y = mouseY;
  
  crosshair.depth = target.depth;
  target.depth = target.depth-1;
  restart.depth = restart.depth-1;
  menu.depth = menu.depth-1;
  endless.depth = endless.depth-1;
  reg.depth = reg.depth-1;
  

  if(r === 143 && g >= 61 && b === 61){
    g = g + 1;
  }
  
  if(r <= 143 && g === 143 && b === 61){
    r = r - 1;
  }

  if(r === 61 && g === 143 && b >= 61){
    b = b + 1;
  }

  if(r === 61 && g <= 143 && b === 143){
    g = g - 1;
  }

  if(r >= 61 && g === 61 && b === 143){
    r = r + 1;
  }

  if(r === 143 && g === 61 && b <= 143){
    b = b - 1;
  }
  
  console.log(r , g , b);
  if(gameState === MENU){
    background(r,g,b);
    endless.visible = true;
    reg.visible = true;
    title.visible = true;
    menu.visible = false;
    restart.visible = false;
    crosshair.visible = false;
    target.visible = false;
    if(mousePressedOver(endless)){
      eNdless();   
    }
    if(mousePressedOver(reg)){
      rEgular();
    }
  }
  
  if(gameState === REGULAR){
    gameState = EASY;
  }
    if(gameState === EASY){
      spawnTargetSlow();
      reg.visible = false;
      endless.visible = false;
      title.visible = false;
      restart.visible = false;
      menu.visible = true;
      menu.x = 150;
      menu.y = 70;
      if(mousePressedOver(menu)){
        mEnu();
      }
      if(score >= 8 && score <= 18){
        gameState = MEDIUM;
      }
      if(score === -10){
        gameState = LOSE
      }
    }
    
    if(gameState === MEDIUM){
      spawnTargetMedium();
      reg.visible = false;
      title.visible = false;
      endless.visible = false;
      restart.visible = false;
      menu.visible = true;
      menu.x = 150;
      menu.y = 70;
      if(mousePressedOver(menu)){
        mEnu();
      }
      if(score > 18 && score <= 29){
        gameState = HARD;
      }
    }

    if(gameState === HARD){
      spawnTargetQuick();
      reg.visible = false;
      endless.visible = false;
      title.visible = false;
      restart.visible = false;
      menu.visible = true;
      menu.x = 150;
      menu.y = 70;
      if(mousePressedOver(menu)){
        mEnu();
      }
      if(score === 30){
        win.play();
      }
      if(score >= 30 && score < 6969){
        gameState = WIN
      }
    }
    if(gameState === WIN){
      targetGroup.destroyEach();
      back.destroy();
      background(wonImage);
      score = score + 1;
      fill(0,0,255);
      stroke("yellow");
      textSize(50);
      text("Congratulations! You Won",(windowWidth/2) - 300, windowHeight/2);
      restart.visible = false;
      crosshair.visible = false;
      menu.visible = true;
      menu.x = (windowWidth/2);
      menu.y = (windowHeight/2)+150;
      if(mousePressedOver(menu)){
        mEnu();
      }
      if(score === 6969){
        gameState = VIBE;
      }
    }
  if(gameState === LOSE){
        targetGroup.destroyEach();
        bullseye.destroy();
        back.destroy();
        background(overImage);
        score = -10;
        restart.visible = true;
        menu.visible = true;
        crosshair.visible = false;
        menu.x = (windowWidth/2)+200;
        menu.y = (windowHeight/2)+125;
        if(mousePressedOver(restart)){
          reset();
        }
        if(mousePressedOver(menu)){
          mEnu();
      }
    }
  if(gameState === VIBE){
        background(end);
        fill("white");
        stroke("black");
        strokeWeight(10);
        textSize(50);
        text("DON'T COME BACK",(windowWidth/2) - 245, windowHeight/2);
      }
  if(gameState === EASY || gameState === MEDIUM || gameState === HARD || gameState === ENDLESS){
    crosshair.visible = true;
    if(mouseWentDown("leftButton")&&mousePressedOver(target)){
      target.x = -200;
      target.y = -200;
      bullseye.x = -200;
      bullseye.y = -200;
      hit.play();
      score = score + 2;
      target.visible = false;
      bullseye.visible = false;
    }
    if(mouseWentDown("leftButton")&&mousePressedOver(bullseye)){
      target.x = -200;
      target.y = -200;
      bullseye.x = -200;
      bullseye.y = -200;
      hit.play();
      score = score + 2;
      target.visible = false;
      bullseye.visible = false;
    }
    if(mouseWentDown("leftButton")&&mousePressedOver(back)){
    score = score - 1;
    }
  }
  if(gameState === ENDLESS){
    spawnTargetEndless();
    reg.visible = false;
    endless.visible = false;
    title.visible = false;
    restart.visible = false;
    menu.visible = true;
    menu.x = 150;
    menu.y = 70;
    if(mousePressedOver(menu)){
      mEnu();
  }
    if(score === 69){
      background(nice);
    }
  }
  
  drawSprites();
  
  if(gameState === EASY || gameState === MEDIUM || gameState === HARD || gameState === ENDLESS || gameState === LOSE || gameState === WIN){
    fill("blue");
    stroke("green");
    strokeWeight(5)
    textSize(30);
    text("Score : " + score,(windowWidth/2) - 75, 50);
  }
}
function spawnTargetSlow(){
  if(World.frameCount%50 === 0){
    target = createSprite(random(60,windowWidth-60),random(110,windowHeight-60),50,50);
    target.debug = false;
    target.setCollider("circle",0,0);
    target.scale = 0.6;
    target.lifetime = 50;
    target.addImage(targetImage);
    targetGroup.add(target);
    bullseye = createSprite(target.x,target.y-2,0.1,0.1);
    bullseye.lifetime = 50;
    bullseye.debug = false;
    bullseye.setCollider("circle",0,0,18);
  }
}
function spawnTargetMedium() {
  if(World.frameCount%40 === 3){
    target = createSprite(random(50,windowWidth-50),random(100,windowHeight-50),50,50);
    target.debug = false;
    target.setCollider("circle",0,0);
    target.scale = 0.5;
    target.lifetime = 40;
    target.addImage(targetImage);
    targetGroup.add(target);
    bullseye = createSprite(target.x,target.y-1,0.1,0.1);
    bullseye.lifetime = 40;
    bullseye.debug = false;
    bullseye.setCollider("circle",0,0,15);
  }  
}
function spawnTargetQuick() {
  if(World.frameCount%30 === 0){
    target = createSprite(random(40,windowWidth-40),random(90,windowHeight-40),50,50);
    target.debug = false;
    target.setCollider("circle",0,0);
    target.scale = 0.4;
    target.lifetime = 30;
    target.addImage(targetImage);
    targetGroup.add(target);
    bullseye = createSprite(target.x,target.y-1,0.1,0.1);
    bullseye.lifetime = 30;
    bullseye.debug = false;
    bullseye.setCollider("circle",0,0,12);
  }  
}
function spawnTargetEndless(){
  if(World.frameCount%30 === 0){
    target = createSprite(random(40,windowWidth-40),random(90,windowHeight-40),50,50);
    target.debug = false;
    target.setCollider("circle",0,0);
    target.scale = 0.4;
    target.lifetime = 30;
    target.addImage(targetImage);
    targetGroup.add(target);
    bullseye = createSprite(target.x,target.y-1,0.1,0.1);
    bullseye.lifetime = 30;
    bullseye.debug = false;
    bullseye.setCollider("circle",0,0,12);
  }  
}

function reset() {
  gameState = EASY;
  restart.visible = false;
  score = 1;
}
function mEnu(){
  gameState = MENU;
  menu.visible = false;
  score = 1;
}
function eNdless(){
  gameState = ENDLESS;
  endless.visible = false;
}
function rEgular(){
  gameState = REGULAR;
  reg.visible = false;
}
function pickSong() {
  var rand = Math.round(random(1,4));
  switch(rand) {
      case 1: music2.loop();
              break;
      case 2: music3.loop();
              break;
      case 3: music4.loop();
              break;
      case 4: music5.loop();
              break;
      default: break;
  }
}