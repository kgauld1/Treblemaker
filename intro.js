var introbg;
var introWindow;
let playButton;
let startButton;

function preload(){
	introbg = loadImage("/images/introbg2.png")
	intropic = loadImage("/images/intropic.png")
}

function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  introWindow = createGraphics(width*.75, height*.75);
}

function draw(){
  background(introbg);
	image(intropic, windowWidth/5 + 50, windowHeight/10, 800, 450);
	
}

function drawIntro(){
	
  noStroke();
  introWindow.fill("white");
	
  rect(0,0, width, height, 15);
  
  fill("white");
  textFont("'Quicksand', sans-serif");
  textSize(70);

  textAlign(CENTER, TOP);
  textSize(25);
  text("\nPress any letter key from A -> Z to start ", width/8, height/4, 3/4 * width, 500)

  startButton = createButton("Start")
  startButton.position(width/2 - textWidth("PLAY")*2, height/2 + 170);
  startButton.size(100, 50)
  startButton.style("background", "linear-gradient(to right, #cb11cb 0%, #2575fc 100%)");
  startButton.style("border","0px");
  startButton.style("border-radius", "10px");
  startButton.style("font-family", "Courier Prime");
  startButton.style("color", "white");
  startButton.style("font-size", "25px");
  startButton.style("padding", "0px");
  startButton.mousePressed(function(){window.location.href='/levels.html'});


  image(introWindow, (width-introWindow.width)/2, height/7, introWindow.width, introWindow.height);
}
