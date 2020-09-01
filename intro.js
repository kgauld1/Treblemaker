var introbg;
var introWindow;
let playButton;
let startButton;

function preload(){
	introbg = loadImage("/images/introbg3.png")
	intropic = loadImage("/images/intropic.png")
}

function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  introWindow = createGraphics(width*.75, height*.75);
}

function draw(){
  background(introbg);
	image(intropic, windowWidth/5 + 150, windowHeight - 321, 571, 321);
	drawIntro();
	
}

function drawIntro(){
  noStroke();
  fill("black");
  textFont("'Quicksand', sans-serif");
  textSize(70);

  textAlign(CENTER, TOP);
  textSize(25);
  text("\nWelcome to Treblemaker - an immersive visual and auditory experience that combines interactive music creation with mesmerizing 3D graphics! \n\nPress any letter key from A -> Z to use the keyboard as a multi-instrumental toolbox and start creating unique melodies with only the touch of a finger! ", width/5+ 100, height/14, 1/2 * width, 500)

  startButton = createButton("Start")
  startButton.position(width/2 - textWidth("Start")/2, height/2 - 25);
  startButton.size(100, 50)
  startButton.style("background", "linear-gradient(to right, #84e0a7 0%, #78b5da 100%)");
  startButton.style("border","0px");
  startButton.style("border-radius", "10px");
  startButton.style("font-family", "Quicksand");
  startButton.style("color", "black");
  startButton.style("font-size", "25px");
  startButton.style("padding", "0px");
  startButton.mousePressed(function(){window.location.href='/visualization.html'});


  // image(introWindow, (width-introWindow.width)/2, height/7, introWindow.width, introWindow.height);
}
