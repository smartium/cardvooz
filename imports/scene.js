import THREE from 'three';

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer();
let controls = new (require('three-orbit-controls')(THREE))(camera);
let logoPoints = 15;
var floorTexture = new THREE.ImageUtils.loadTexture( 'images/vooz_hor.png' );
let floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
let floorGeometry = new THREE.PlaneGeometry(400, 400/4.39, logoPoints, logoPoints);
let logo = new THREE.Mesh(floorGeometry, floorMaterial);

camera.position.set(0, 0, 900);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene').appendChild(renderer.domElement);

scene.add(logo);

export default function(audioData) {
  let {levels, waveform, beatCutOff, isBeat, volume} = audioData;

  waveform.forEach((value, i) => {
    if (i%2 === 0) {
      logo.geometry.vertices[i/2].z = value * 80;
    }
  });
  logo.geometry.verticesNeedUpdate = true;

  renderer.render(scene, camera);
}
