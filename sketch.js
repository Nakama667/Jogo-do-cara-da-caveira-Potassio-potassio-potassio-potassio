var imagemDaTorre, torre;
var imagemDaPorta, porta, grupoDePortas;
var imagemDoEscalador, escalador, grupoDeEscaladores;
var fantasma, imagemDoFantasma;
var grupoDeBlocoInvisivel, blocoInvisivel;
var estadoJogo = "JOGAR"

function preload(){
  imagemDaTorre = loadImage("tower.png");
  imagemDaPorta = loadImage("door.png");
  imagemDoEscalador = loadImage("climber.png");
  imagemDoFantasma = loadImage("ghost-standing.png");
  somAssustador = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  somAssustador.loop();
  
  torre = createSprite(300,300);
  torre.addImage("tower",imagemDaTorre);
  torre.velocityY = 3;
  
  fantasma = createSprite(300,400,100,100);
  fantasma.addImage("fantasm",imagemDoFantasma);
  fantasma.scale = 0.4;
  
  
  grupoPortas = new Group();
  grupoDeEscaladores = new Group();
  grupoDeBlocoInvisivel = new Group();
  
  }

function draw(){
  background(200);
 if(estadoJogo === "JOGAR"){
   
  if(torre.y > 500){
      torre.y = 200
    }
  
  if(keyDown("left_arrow")){
    fantasma.x = fantasma.x-8;
  }
  
  if(keyDown("right_arrow")){
    fantasma.x = fantasma.x+8;
  }
  
  if(keyDown("space")){
    fantasma.velocityY = -10;
  }
  
  fantasma.velocityY = fantasma.velocityY +0.799999;
  
  if(grupoDeEscaladores.isTouching(fantasma)){
    fantasma.velocityY = 0;
  }
  
  if(grupoDeBlocoInvisivel.isTouching(fantasma)|| fantasma.y>600){
    fantasma.destroy();
    estadoJogo = "END";
  }
  
  gerarPortas();
  drawSprites();
 }
  console.log(frameCount);
  if(estadoJogo === "END"){
    textSize(30);
    stroke("red");
    fill("black");
    text("GAME OVER ;-;",200,300);
    
    
  }
}

function gerarPortas(){
  if (frameCount % 90 === 0){
    var porta = createSprite(100,50,100,100)
    porta.addImage("door",imagemDaPorta);
    porta.x = Math.round(random(120,350)); 
    porta.velocityY = 3;
    porta.lifetime = 500;
    grupoPortas.add(porta);
    porta.depth=fantasma.depth;
    fantasma.depth +=1;
    
    var escalador = createSprite(72,115,72,27);
    escalador.addImage("climber",imagemDoEscalador);
    escalador.x = porta.x;
    escalador.velocityY = 3  
    escalador.lifetime = 500;
    grupoDeEscaladores.add(escalador);
    
    var blocoInvisivel = createSprite(200,115)
    blocoInvisivel.width = escalador.width;
    blocoInvisivel.height = 2;
    blocoInvisivel.x = porta.x;
    blocoInvisivel.velocityY = 3;
    blocoInvisivel.debug = true;
    grupoDeBlocoInvisivel.add(blocoInvisivel);
  }
  
}


