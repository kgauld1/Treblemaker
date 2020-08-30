// tone-fft

let synth;
let bgCol;
let size;
let fft;

const AOctaves = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'C7'];

function setup() {
  createCanvas(windowWidth, windowHeight);

  bgCol = color(207, 236, 207);
  background(bgCol);
  textSize(22);
  
  // power of 32, in the range [32, 32768]
  size = 1024;
  
  synth = new Tone.Synth();
  fft = new Tone.FFT(size).toDestination();
  synth.connect(fft);
  
  noFill();
  strokeWeight(2);
}

function draw() {
  background(bgCol);
  text('ASDFJKL keys!', 20, 40);

  // draw the wave
  const waveArray = fft.getValue();

  beginShape();

  for (let i = 0; i < waveArray.length; i++) {
    curveVertex(map(log(i), 0, log(waveArray.length), 0, width), map(waveArray[i], -200, 0, height, 0));
  }

  endShape();
}

function mousePressed() {
  hasStarted = true;
  Tone.start();
}

function keyPressed() {
  switch (key) {
    case ('a'): 
      synth.triggerAttackRelease(AOctaves[0], '4n');
      bgCol = color(0, 75, 75);
      break;
    
    case ('s'): 
      synth.triggerAttackRelease(AOctaves[1], '4n');
      bgCol = color(40, 100, 100);
      break;
    
    case ('d'): 
      synth.triggerAttackRelease(AOctaves[2], '4n');
      bgCol = color(80, 125, 125);
      break;
    
    case ('f'): 
      synth.triggerAttackRelease(AOctaves[3], '4n');
      bgCol = color(120, 150, 150);
      break;
    
    case ('j'): 
      synth.triggerAttackRelease(AOctaves[4], '4n');
      bgCol = color(160, 175, 175);
      break;

    case ('k'): 
      synth.triggerAttackRelease(AOctaves[5], '4n');
      bgCol = color(200, 200, 200);
      break;
    
    case ('l'): 
      synth.triggerAttackRelease(AOctaves[6], '4n');
      bgCol = color(240, 225, 225);
      break;
  }
}