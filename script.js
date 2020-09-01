var notesMidi = [];
var drumsMidi = [];
let loaded = {}
let startTime = Date.now();
let audio_started = false;
let analyzer = new Tone.FFT(1024);
let pSysts = [];

let key_dict = {
  'Q':{
    keyClass: 0,
    player: new Tone.Player('audio_files/drums/clap1.wav', onload = () => {
          loaded['Q'] = true;
        }).toDestination(),
		midiNote: {style: "drums", note: ["clap1"]}
  },
  'W': {
    keyClass: 0,
    player: new Tone.Player('audio_files/drums/clap2.wav', onload = () => {
          loaded['W'] = true;
        }).toDestination(),
		midiNote: {style: "drums", note: ["clap2"]}
  },
  'E':{
    keyClass: 0,
    player: new Tone.Player('audio_files/drums/perc1.wav', onload = () => {
          loaded['E'] = true;
        }).toDestination(),
		midiNote: {style: "drums", note: ["perc1"]}
  },
  'R':{
    keyClass: 1,
    player: new Tone.Player('audio_files/melody/c.wav', onload = () => {
          loaded['R'] = true;
        }).toDestination(),
		midiNote: {style: "note", note: ["C4"]}
  },
  'T':{
    keyClass: 1,
    player: new Tone.Player('audio_files/melody/cs.wav', onload = () => {
          loaded['T'] = true;
        }).toDestination(),
		midiNote: {style: "note", note: ["C#4"]}
  },
  'Y':{
    keyClass: 1,
    player: new Tone.Player('audio_files/melody/d.wav', onload = () => {
          loaded['Y'] = true;
        }).toDestination(),
		midiNote: {style: "note", note: ["D4"]}
  },
  'U': {
    keyClass: 1,
		player: new Tone.Player('audio_files/melody/ds.wav', onload = () => {
          loaded['U'] = true;
        }).toDestination(),
		midiNote: {style: "note", note: ["D#4"]}
  }, 
  'I': {
    keyClass: 1,
		player: new Tone.Player('audio_files/melody/e.wav', onload = () => {
          loaded['I'] = true;
        }).toDestination(),
		midiNote: {style: "note", note: ["E4"]}
  },
  'O':{
    keyClass: 2,
		player: new Tone.Player('audio_files/bass/bass1.wav', onload = () => {
          loaded['O'] = true;
        }).toDestination(),
    midiNote: {style: "bass", note: ["A#2", "F1"]}
  },
  'P':{
    keyClass: 2,
		player: new Tone.Player('audio_files/bass/bass2.wav', onload = () => {
          loaded['P'] = true;
        }).toDestination(),
		midiNote: {style: "note", note: ["F#3","B2"]}
  },
  'A':{
    keyClass: 0,
		player: new Tone.Player('audio_files/drums/hihat1.wav', onload = () => {
          loaded['A'] = true;
        }).toDestination(),
		midiNote: {style: "drums", note: ["hihat1"]}
  },
  'S':{
    keyClass: 0,
		player: new Tone.Player('audio_files/drums/hihat2.wav', onload = () => {
          loaded['S'] = true;
        }).toDestination(),
		midiNote: {style: "drums", note: ["hihat2"]}
  },
  'D': {
    keyClass: 0,
		player: new Tone.Player('audio_files/drums/kick1.wav', onload = () => {
          loaded['D'] = true;
        }).toDestination(),
		midiNote: {style: "drums", note: ["kick1"]}
  }, 
  'F': {
    keyClass: 1,
		player: new Tone.Player('audio_files/melody/f.wav', onload = () => {
          loaded['F'] = true;
        }).toDestination(),
    midiNote: {style: "note", note: ["F4"]}
  },
  'G':{
    keyClass: 1,
		player: new Tone.Player('audio_files/melody/fs.wav', onload = () => {
          loaded['G'] = true;
        }).toDestination(),
    midiNote: {style: "note", note: ["F#4"]}
  },
  'H':{
    keyClass: 1,
		player: new Tone.Player('audio_files/melody/g.wav', onload = () => {
          loaded['H'] = true;
        }).toDestination(),
		midiNote: {style: "note", note: ["G4"]}
  },
  'J':{
    keyClass: 1,
		player: new Tone.Player('audio_files/melody/gs.wav', onload = () => {
          loaded['J'] = true;
        }).toDestination(),
		midiNote: {style: "note", note: ["G#4"]}
  },
  'K':{
    keyClass: 2,
		player: new Tone.Player('audio_files/bass/bass3.wav', onload = () => {
          loaded['K'] = true;
        }).toDestination(),
    midiNote: {style: "note", note: ["F3", "C#3"]}
  },
  'L': {
    keyClass: 2,
		player: new Tone.Player('audio_files/bass/bass4.wav', onload = () => {
          loaded['L'] = true;
        }).toDestination(),
    midiNote: {style: "note", note: ["D3","G2"]}
  }, 
  'Z': {
    keyClass: 0,
		player: new Tone.Player('audio_files/drums/snare1.wav', onload = () => {
          loaded['Z'] = true;
        }).toDestination(),
		midiNote: {style: "drums", note: ["snare1"]}
  },
  'X':{
    keyClass: 0,
		player: new Tone.Player('audio_files/drums/snare2.wav', onload = () => {
          loaded['X'] = true;
        }).toDestination(),
		midiNote: {style: "drums", note: ["snare2"]}
  },
  'C':{
    keyClass: 1,
		player: new Tone.Player('audio_files/melody/a.wav', onload = () => {
          loaded['C'] = true;
        }).toDestination(),
		midiNote: {style: "note", note: ["A4"]}
  },
  'V':{
    keyClass: 1,
		player: new Tone.Player('audio_files/melody/as.wav', onload = () => {
          loaded['V'] = true;
        }).toDestination(),
		midiNote: {style: "note", note: ["A#4"]}
  },
  'B':{
    keyClass: 1,
		player: new Tone.Player('audio_files/melody/b.wav', onload = () => {
          loaded['B'] = true;
        }).toDestination(),
		midiNote: {style: "note", note: ["B4"]}
  },
  'N': {
    keyClass: 2,
		player: new Tone.Player('audio_files/bass/bass5.wav', onload = () => {
          loaded['N'] = true;
        }).toDestination(),
		midiNote: {style: "note", note: ["B2","D#3"]}
  }, 
  'M': {
    keyClass: 2,
		player: new Tone.Player('audio_files/bass/bass6.wav', onload = () => {
          loaded['M'] = true;
        }).toDestination(),
		midiNote: {style: "note", note: ["G2","C#3"]}
  }
}

for (let i = 0; i < 26; i++){
	let letter = 'QWERTYUIOPASDFGHJKLZXCVBNM'.charAt(i);
  key_dict[letter].player.connect(analyzer);
}

// playerMelody = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');

let aiPlayerLoaded = false
const aiPlayer = new Tone.Sampler({
	urls: {
		"A3": "a.wav",
		"A#3": "as.wav",
    "B3": "b.wav",
		"C3": "c.wav",
    "C#3": "cs.wav",
		"D3": "d.wav",
    "D#3": "ds.wav",
		"E3": "e.wav",
    "F3": "f.wav",
		"F#3": "fs.wav",
    "G3": "g.wav",
		"G#3": "gs.wav",
	},
	baseUrl: "audio_files/melody/",
	onload: () => {
		aiPlayerLoaded = true;
	}
}).toDestination();
aiPlayer.connect(analyzer);

let aiDrumsLoaded = false;
const drumPlayer = new Tone.Sampler({
  urls:{
    'C1': 'clap1.wav',
    'C#1': 'clap2.wav',
    'D1': 'hihat1.wav',
    'D#1': 'hihat2.wav',
    'E1': 'kick1.wav',
    'F1': 'perc1.wav',
    'F#1': 'snare1.wav',
    'G1': 'snare2.wav'
  },
  baseUrl: "audio_files/drums/",
  onload: () => {
    aiDrumsLoaded = true;
  }
}).toDestination();
drumPlayer.connect(analyzer);
/*
if(aiPlayerLoaded)
  aiPlayer.triggerAttackRelease(notes: ['A3', 'A4', 'A5'], '4n')
*/


const canvas = document.querySelector('#canvas');

var button =  document.createElement('button');
button.setAttribute('class', 'button');
button.appendChild(document.createTextNode("Click here to start the AI"));
document.body.appendChild(button);

button.onclick = async () => {
  await melodyRnnLoaded;
  let melodySeed = {
    notes: notesMidi,
    totalQuantizedSteps: notesMidi[notesMidi.length - 1].quantizedEndStep,
    quantizationInfo: { stepsPerQuarter: 4 }
  };
  let steps = 128;
  let temperature = 0.8;

  
  await drumRnnLoaded;
  let drumSeed = {
    notes: drumsMidi,
    totalQuantizedSteps: drumsMidi[drumsMidi.length - 1].quantizedEndStep,
    quantizationInfo: {stepsPerQuarter: 4}
  }

  let melodyResult = await melodyRnn.continueSequence(melodySeed, steps, temperature);

  let drumResult = await drumRnn.continueSequence(drumSeed, steps, temperature);

	for (let note of melodyResult.notes){
		//console.log('trigger', note.pitch, note.quantizedStartStep);
    if(aiPlayerLoaded)
		  aiPlayer.triggerAttackRelease(note.pitch, note.quantizedEndStep - note.quantizedStartStep, note.quantizedStartStep);
	}

	for (let note of drumResult.notes){
		if(aiDrumsLoaded)
      drumPlayer.triggerAttackRelease(note.pitch, note.quantizedEndStep - note.quantizedStartStep, note.quantizedStartStep);
	}
}


let width = canvas.offsetWidth;
let height = canvas.offsetHeight;
const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
const scene = new THREE.Scene();
//scene.fog = new THREE.Fog(0xfaf0e60, 100, 1000);
scene.fog = new THREE.Fog(0xb4ccdc, 100, 1000);
//scene.background = new THREE.Color(0xfaf0e6);

const setup = () => {
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;

  const aspectRatio = width / height;
  const fieldOfView = 100;
  const nearPlane = 0.1;
  const farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 300;
}
setup();


/*     LIGHTING     */
let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x8E8E8E, .5)

let shadowLight = new THREE.DirectionalLight(0xffffff, .4);
shadowLight.position.set(0, 450, 350);
shadowLight.castShadow = true;

shadowLight.shadow.camera.left = -650;
shadowLight.shadow.camera.right = 650;
shadowLight.shadow.camera.top = 650;
shadowLight.shadow.camera.bottom = -650;
shadowLight.shadow.camera.near = 1;
shadowLight.shadow.camera.far = 1000;

shadowLight.shadow.mapSize.width = 4096;
shadowLight.shadow.mapSize.height = 4096;

scene.add(hemisphereLight);  
scene.add(shadowLight);


/*     CREATE BUBBLES     */
const vertex = width > 575 ? 80 : 40;


const geoms = [new THREE.SphereGeometry(100, vertex, vertex),
                new THREE.SphereGeometry(100, vertex, vertex),
                new THREE.SphereGeometry(100, vertex, vertex)];


for(let bubbleGeometry of geoms){
  for(let i = 0; i < bubbleGeometry.vertices.length; i++) {
    let vector = bubbleGeometry.vertices[i];
    vector.original = vector.clone();  
  }
}

const materials = [new THREE.MeshStandardMaterial({ color: 0x49C100 }),
                    new THREE.MeshStandardMaterial({ color: 0x4BE0D9 }),
                    new THREE.MeshStandardMaterial({ color: 0xC927FD })]

let bubbles = [new THREE.Mesh(geoms[0], materials[0]), 
                new THREE.Mesh(geoms[1], materials[1]),
                new THREE.Mesh(geoms[2], materials[2])];

for(let i = 0; i < bubbles.length; i++){
  let bubble = bubbles[i];
  bubble.position.x = -300 + i*300;
  bubble.castShadow = true;
  bubble.receiveShadow = false;
  scene.add(bubble);
}


/*     PLANE FOR SHADOW     */
const createPlane = () => {
  const planeGeometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
  const planeMaterial = new THREE.ShadowMaterial({
    opacity: 0.15
  });
  const plane = new THREE.Mesh( planeGeometry, planeMaterial );
  plane.position.y = -150;
  plane.position.x = 0;
  plane.position.z = 0;
  plane.rotation.x = Math.PI / 180 * -90;
  plane.receiveShadow = true;
  scene.add(plane);
}
createPlane();

/*     MOVEMENT     */
let dist = 0

let movements = [{accel: 0, dist: 0}, {accel: 0, dist: 0}, {accel: 0, dist: 0}];

const updateVertices = (time) => {
  for(let k = 0; k < geoms.length; k++){

    let bubbleGeometry = geoms[k];

    for(let i = 0; i < bubbleGeometry.vertices.length; i++) {
      let vector = bubbleGeometry.vertices[i];
      vector.copy(vector.original);
      let perlin = noise.simplex3(
        (vector.x * 0.006) + (time * 0.0005 *(k+1)/1000) + k,
        (vector.y * 0.006) + (time * 0.0005 *(k+1)) + k,
        (vector.z * 0.006) + k
      );
      let ratio = ((perlin * 0.3 * (movements[k].dist + 0.1)) + 0.8);
      vector.multiplyScalar(ratio);
    }
    bubbleGeometry.verticesNeedUpdate = true;
  }
}

function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}


/*     ANIMATIONS     */
var accel = 0;
var friction = 0.6;
var min = 0;
var rot_factor = 15;

function updateRule(){
  const waveArray = analyzer.getValue();
  for(var i = 0; i < waveArray.length; i++)
    if(waveArray[i] < -100) waveArray[i] = 0;
    else waveArray[i] = map(waveArray[i], -100, 0, 0, 1);
  
  let third = Math.floor(waveArray.length/9);
  for(var i = 0; i < third; i++){
    for(var k = 0; k < 3; k ++){
      movements[k].accel += 0.4*waveArray[i+third*k]/third;
    }
  }
}

var keys = {}

/// AUDIO ///
window.addEventListener('keydown', e => {
	if (e.keyCode in keys) return;
	keys[e.keyCode] = Date.now();
  if(!audio_started){
    Tone.start();
    audio_started = true;
  }
  var chr = String.fromCharCode(e.keyCode);
  if(key_dict[chr] == undefined) return;
	if (loaded[chr]){
		key_dict[chr].player.start();
	}
  let colors = [0x49C100, 0x4BE0D9, 0xC927FD ]
  for(let k = 0; k < movements.length; k++){
    let origin = {'x': -300+300*k, 'y': 0, 'z':0};
    pSysts.push(new ParticleSystem(origin, movements[k].dist*1.2, colors[k]));
  }
});

function addNote(chr, st){
	let tempo = 120; // quarter/min
	let quantizedTempo = (tempo*4)/60; // 16ths / second

	let sTime = Math.round(((st - startTime) / 1000) * quantizedTempo);
	let eTime = Math.round(((Date.now() - startTime) / 1000) * quantizedTempo);

	for (note of key_dict[chr].midiNote.note){
		if (key_dict[chr].midiNote.style == 'drums'){
			// let n = note.substring(0, note.length - 1) + parseInt(note.charAt(note.length - 1))
			let midiNote = drumToMidi.get(note);
			drumsMidi.push({
				pitch: midiNote + 12,
				quantizedStartStep: sTime,
				quantizedEndStep: eTime
			});
			console.log(midiNote + 12, sTime, eTime);
			continue;
		}
		let midiNote = Tone.Frequency(note).toMidi();
		
		notesMidi.push({
			pitch: midiNote + 12,
			quantizedStartStep: sTime,
			quantizedEndStep: eTime
		})
		console.log(midiNote + 12, sTime, eTime);
	}
}

window.addEventListener('keyup', e => {
	var chr = String.fromCharCode(e.keyCode);
	let st = keys[e.keyCode];
	delete keys[e.keyCode];
  if(key_dict[chr] == undefined) return;
  if(key_dict[chr].keyCode == 0) return;
  if(loaded[chr]){
    key_dict[chr].player.stop();
		addNote(chr, st);
	}
});


const render = (time) => {
  requestAnimationFrame(render);
  for(let bubble of bubbles){
    bubble.rotation.y += -Math.random() / rot_factor
    bubble.rotation.z += Math.random() / rot_factor
  }

  updateVertices(time)
  updateRule();

  for(let m of movements){
    if (m.dist > 0.1) m.accel -= 0.05;
    if (m.dist < -0.1) m.accel += 0.05;
    m.accel *= friction;
    if (Math.abs(m.accel) < 0.001) m.accel = 0.01;

    m.dist += m.accel;
    m.dist = Math.max(-1, Math.min(2,m.dist));
  }

  for(let i = 0; i < pSysts.length; i++){
    if(pSysts[i].isDead()){
      pSysts.splice(i,1);
      i--;
    }else pSysts[i].update();
  }

  renderer.clear();
  renderer.render(scene, camera);
}

requestAnimationFrame(render);
renderer.render(scene, camera);

function map(v,l1,h1,l2,h2){
  let r1 = h1-l1;
  let adjv = v-l1;
  let ratio = adjv/r1;
  let r2 = h2-l2;
  return ratio*r2 + l2;
}

////// MAGENTA //////

let melodyRnn = new music_rnn.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');

let drumRnn = new music_rnn.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/drum_kit_rnn')

let midiToDrum = new Map([
  [36, 'clap1'],
  [37, 'clap2'],
  [38, 'hihat1'],
  [39, 'hihat2'],
  [40, 'kick1'],
  [41, 'perc1'],
  [42, 'snare1'],
  [43, 'snare2']
])

let drumToMidi = new Map([...midiToDrum].map((e) => e.reverse()));

let drumRnnLoaded = drumRnn.initialize();
let melodyRnnLoaded = melodyRnn.initialize();


//////// PARTICLES /////////
class ParticleSystem{
  constructor(origin, size, color){
    let p = [];
    let n = 8
    for(let i = 0; i < n; i++)
      p.push(new Particle(origin, size, 2*i*Math.PI/n, color));
    this.particles = p;
  }
  update(){
    for(let p of this.particles){
      p.update();
      if(p.isDead()) return true;
    }
    return false;
  }
  isDead(){
    for(let p of this.particles)
      if(p.isDead()){
        this.destroyParticles();
        return true;
      }
    return false;
  }
  destroyParticles(){
    for(let particle of this.particles){
      scene.remove(particle);
      particle.partGeom.dispose();
      particle.partMaterial.dispose();
      renderer.renderLists.dispose();
    }
  }
}
class Particle{
  constructor(origin, size, angle, c){
    this.partGeom = new THREE.SphereGeometry(size);
    this.partMaterial = new THREE.MeshLambertMaterial({ color: c });
    this.particle = new THREE.Mesh(this.partGeom, this.partMaterial);
    this.particle.position.x = origin.x;
    this.particle.position.y = origin.y;
    this.particle.position.z = origin.z;

    scene.add(this.particle);

    this.velocity = {'x': 10*Math.cos(angle), 'y': 10*Math.sin(angle), 'z': -0.1}
    this.accel = {'x': -0.2*Math.cos(angle), 'y': -0.2*Math.sin(angle), 'z': -0.4}
  }
  update(){
    this.particle.position.x += this.velocity.x + 5*(Math.random() -0.5);
    this.particle.position.y += this.velocity.y + 5*(Math.random() -0.5);
    this.particle.position.z += this.velocity.z;

    this.velocity.x += this.accel.x;
    this.velocity.y += this.accel.y;
    this.velocity.z += this.accel.z;
  }
  isDead(){
    return this.particle.position.z < -1000;
  }
}