
var trex, trex_running, groundImg, nuvem, nuv, score, grupoCacto, grupoNuvem, gameOver, fim
var play = 1
var end = 0
var estado = play
function preload() {
  trex_running = loadAnimation('trex1.png', 'trex3.png', 'trex4.png')
  groundImg = loadImage('ground2.png')
  nuv = loadImage('cloud.png')
  O1 = loadImage('obstacle1.png')
  O2 = loadImage('obstacle2.png')
  O3 = loadImage('obstacle3.png')
  O4 = loadImage('obstacle4.png')
  O5 = loadImage('obstacle5.png')
  O6 = loadImage('obstacle6.png')
  gameOver = loadImage('gameOver.png')
}

function setup() {
  createCanvas(600, 200)

  //crie um sprite de trex
  trex = createSprite(40, 160, 40, 80)
  ground = createSprite(300, 190, 600, 20)
  trex.addAnimation('running', trex_running)
  trex.scale = 0.5
  ground.velocityX = -4
  ground.addImage('ground1.png', groundImg)
  InvisibleGround = createSprite(300, 195, 600, 10)
  InvisibleGround.visible = false
  score = 0
  grupoCacto = new Group()
  grupoNuvem = new Group()
  fim = createSprite(300, 100, 100, 100)
  fim.addImage(gameOver)
  fim.visible = false
}

function draw() {
  background("white");
  drawSprites();
  text('Pontos: ' + score, 500, 50)
  if (estado === play) {
    score = Math.round(frameCount / 30)
    if (keyDown('space') && trex.y > 150) {
      trex.velocityY = -10;
    }
    if (ground.x < 0) {
      ground.x = ground.width / 2
    }
    if (frameCount % 80 === 0) {
      spawnCloud();
    }
    if (frameCount % 90 === 0) {
      spawnObstacle();
    }
    if (grupoCacto.isTouching(trex)) {
      estado = end
    }
  }

  if (estado === end) {
    ground.velocityX = 0
    grupoCacto.setVelocityXEach(0)
    grupoNuvem.setVelocityXEach(0)
    fim.visible = true
  }

  trex.velocityY += 0.5;
  trex.collide(InvisibleGround);
  console.log(frameCount)
}
function spawnCloud() {
  y = Math.round(random(30, 80))
  nuvem = createSprite(650, y, 50, 50);
  nuvem.addImage('nuvem', nuv)
  nuvem.velocityX = -2;
  nuvem.depth = trex.depth
  trex.depth = trex.depth + 1
  nuvem.lifetime = 350
  grupoNuvem.add(nuvem)
}
function spawnObstacle() {
  var cacto = createSprite(620, 170, 10, 50)
  cacto.velocityX = -6
  var rand = Math.round(random(1, 6))
  switch (rand) {
    case 1: cacto.addImage(O1);
      break;
    case 2: cacto.addImage(O2);
      break;
    case 3: cacto.addImage(O3);
      break;
    case 4: cacto.addImage(O4);
      break;
    case 5: cacto.addImage(O5);
      break;
    case 6: cacto.addImage(O6);
      break;
    default: break;
  }
  cacto.scale = 0.5
  cacto.lifetime = 350
  grupoCacto.add(cacto)
}