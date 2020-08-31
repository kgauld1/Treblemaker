/*

let player = new Tone.Player(filename).toDestination();
player.loop = true;
player.autostart = false;

*/
let key_dict = {
  'Q':{
    keyClass: 0,
    filename: 'audio_files/drums/clap1.wav'
  },
  'W': {
    keyClass: 0,
    filename: 'audio_files/drums/clap2.wav'
  },
  'E':{
    keyClass: 0,
    filename: 'audio_files/drums/perc1.wav'
  },
  'R':{
    keyClass: 1,
    filename: 'audio_files/melody/'
  },
  'T':{
    keyClass: 1,
    filename: 'audio_files/melody/'
  },
  'Y':{
    keyClass: 1,
    filename: 'audio_files/melody/'
  },
  'U': {
    keyClass: 1,
    filename: 'audio_files/melody/'
  }, 
  'I': {
    keyClass: 1,
    filename: 'audio_files/melody/'
  },
  'O':{
    keyClass: 2,
    filename: 'audio_files/bass/bass1.wav'
  },
  'P':{
    keyClass: 2,
    filename: 'audio_files/bass/bass2.wav'
  },
  'A':{
    keyClass: 0,
    filename: 'audio_files/drums/hihat1.wav'
  },
  'S':{
    keyClass: 0,
    filename: 'audio_files/drums/hihat2.wav'
  },
  'D': {
    keyClass: 0,
    filename: 'audio_files/drums/kick1.wav'
  }, 
  'F': {
    keyClass: 1,
    filename: 'audio_files/melody/'
  },
  'G':{
    keyClass: 1,
    filename: 'audio_files/melody/'
  },
  'H':{
    keyClass: 1,
    filename: 'audio_files/melody/'
  },
  'J':{
    keyClass: 1,
    filename: 'audio_files/melody/'
  },
  'K':{
    keyClass: 2,
    filename: 'audio_files/bass/bass3.wav'
  },
  'L': {
    keyClass: 2,
    filename: 'audio_files/bass/bass4.wav'
  }, 
  'Z': {
    keyClass: 0,
    filename: 'audio_files/drums/snare1.wav'
  },
  'X':{
    keyClass: 0,
    filename: 'audio_files/drums/snare2.wav'
  },
  'C':{
    keyClass: 0,
    filename: 'audio_files/drums/snare3.wav'
  },
  'V':{
    keyClass: 1,
    filename: 'audio_files/melody/'
  },
  'B':{
    keyClass: 1,
    filename: 'audio_files/melody/'
  },
  'N': {
    keyClass: 2,
    filename: 'audio_files/bass/bass5.wav'
  }, 
  'M': {
    keyClass: 2,
    filename: 'audio_files/bass/bass6.wav'
  }
}
let audio_started = false;
let analyzer = new Tone.FFT(2048);


const canvas = document.querySelector('#canvas');
let width = canvas.offsetWidth;
let height = canvas.offsetHeight;
const renderer = new THREE.WebGLRenderer({canvas: canvas});
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfaf0e6);

const setup = () => {
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(width, height);
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


window.addEventListener('keydown', e => {
	try{
    var idx = key_dict[String.fromCharCode(e.keyCode)].keyClass;
    movements[idx].accel += 0.8
  } catch(e){return;}
});

/// AUDIO ///
window.addEventListener('keydown', e => {
  if(!audio_started){
    Tone.start();
    audio_started = true;
  }
  var chr = String.fromCharCode(e.keyCode);
  if(key_dict[chr] == undefined) return;
  if(key_dict[chr].keyClass == 1) return;
  
  if(key_dict[chr].player == undefined){
    key_dict[chr].player = new Tone.Player(key_dict[chr].filename).toDestination();
    key_dict[chr].player.loop = false;
    key_dict[chr].player.autostart = true;
    key_dict[chr].player.connect(analyzer);
  }else
    key_dict[chr].player.start();
    
});
window.addEventListener('keyup', e => {
  var chr = String.fromCharCode(e.keyCode)
  if(key_dict[chr] == undefined) return;

  switch(key_dict[chr].keyClass){
    case 1:
      //key_dict[chr].osc.stop();
      break;
    case 2:
      if(key_dict[chr].player != undefined)
        key_dict[chr].player.stop();
    default:
      return;
  }
});


const render = (time) => {
  requestAnimationFrame(render);
  for(let bubble of bubbles){
    bubble.rotation.y += -Math.random() / rot_factor
    bubble.rotation.z += Math.random() / rot_factor
  }

  updateVertices(time)//  

  for(let m of movements){
    if (m.dist > 0.1) m.accel -= 0.05;
    if (m.dist < -0.1) m.accel += 0.05;

    m.accel *= friction;
    if (Math.abs(m.accel) < 0.001) m.accel = 0.01;

    m.dist += m.accel;

    m.dist = Math.max(-1, Math.min(2,m.dist));
  }
  renderer.clear();
  renderer.render(scene, camera);
}



requestAnimationFrame(render);
renderer.render(scene, camera);