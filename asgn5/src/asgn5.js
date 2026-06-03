// CSE 160 – Assignment 5

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ─── RENDERER ────────────────────────────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// ─── SCENE & CAMERA ──────────────────────────────────────────────────────────
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);
camera.position.set(0, 80, 180);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 20;
controls.maxDistance = 1200;

// ─── PROCEDURAL CANVAS TEXTURES ──────────────────────────────────────────────
function makeGradientTexture(c1, c2, size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, c1);
  g.addColorStop(1, c2);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function makeNoiseTexture(baseColor, spotColor, size = 256, spots = 60) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = spotColor;
  for (let i = 0; i < spots; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 12 + 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.globalAlpha = Math.random() * 0.5 + 0.2;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  return new THREE.CanvasTexture(canvas);
}

function makeStripedTexture(c1, c2, stripes = 12, size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const h = size / stripes;
  for (let i = 0; i < stripes; i++) {
    ctx.fillStyle = i % 2 === 0 ? c1 : c2;
    ctx.fillRect(0, i * h, size, h);
  }
  return new THREE.CanvasTexture(canvas);
}

function makeSunTexture(size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0,   '#fff8c0');
  g.addColorStop(0.3, '#ffcc00');
  g.addColorStop(0.7, '#ff6600');
  g.addColorStop(1,   '#cc2200');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = 'rgba(255,200,0,0.3)';
  for (let i = 0; i < 20; i++) {
    const angle = Math.random() * Math.PI * 2;
    const len = Math.random() * size * 0.4 + size * 0.2;
    ctx.lineWidth = Math.random() * 6 + 1;
    ctx.beginPath();
    ctx.moveTo(size / 2, size / 2);
    ctx.lineTo(size / 2 + Math.cos(angle) * len, size / 2 + Math.sin(angle) * len);
    ctx.stroke();
  }
  return new THREE.CanvasTexture(canvas);
}

function makeSkyboxTexture(size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000005';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 600; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 1.5;
    const bright = Math.floor(Math.random() * 100 + 155);
    ctx.fillStyle = `rgb(${bright},${bright},${bright})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

function makeRockyTexture(size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#888';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 8 + 1;
    const v = Math.floor(Math.random() * 80 + 80);
    ctx.fillStyle = `rgb(${v},${v - 10},${v - 20})`;
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  return new THREE.CanvasTexture(canvas);
}

function makeCraterTexture(size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#b0a090';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 15 + 3;
    ctx.strokeStyle = '#806050';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(60,40,30,0.3)';
    ctx.beginPath();
    ctx.arc(x, y, r * 0.7, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

function makeRingTexture(size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, size, size);
  for (let i = 0; i < 30; i++) {
    const frac = i / 30;
    const alpha = 0.1 + frac * 0.4;
    const gray = Math.floor(180 + frac * 50);
    ctx.fillStyle = `rgba(${gray},${gray - 20},${gray - 40},${alpha})`;
    ctx.fillRect(0, Math.floor(frac * size), size, Math.ceil(size / 30));
  }
  return new THREE.CanvasTexture(canvas);
}

function makeIceTexture(size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#c8e8f8';
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = 'rgba(100,160,220,0.4)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 40; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * size, Math.random() * size);
    ctx.lineTo(Math.random() * size, Math.random() * size);
    ctx.stroke();
  }
  return new THREE.CanvasTexture(canvas);
}

function makeEarthLikeTexture(size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1a4a9a';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#2d8c3e';
  const continents = [[80, 60, 70, 50], [160, 80, 90, 60], [50, 140, 60, 70], [190, 150, 50, 40]];
  for (const [x, y, w, h] of continents) {
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, Math.random(), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.ellipse(Math.random() * size, Math.random() * size, 40, 15, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

// ─── SKYBOX ──────────────────────────────────────────────────────────────────
const skyTex = makeSkyboxTexture(512);
const skyGeo = new THREE.BoxGeometry(4000, 4000, 4000);
const skyMat = new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide });
const skybox = new THREE.Mesh(skyGeo, skyMat);
scene.add(skybox);

// ─── LIGHTS (5 different types) ──────────────────────────────────────────────
const ambientLight = new THREE.AmbientLight(0x222244, 0.4);
scene.add(ambientLight);

const sunLight = new THREE.PointLight(0xffddaa, 3, 1000, 1.2);
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true;
scene.add(sunLight);

const dirLight = new THREE.DirectionalLight(0x00ddff, 1.4);
dirLight.position.set(-200, 120, -200);
scene.add(dirLight);

const hemiLight = new THREE.HemisphereLight(0x4488ff, 0xff4422, 1.0);
hemiLight.position.set(0, 250, 0);
scene.add(hemiLight);

const spotLight = new THREE.SpotLight(0xff44aa, 6, 700, Math.PI / 5, 0.3);
spotLight.position.set(-180, 220, 80);
spotLight.target.position.set(0, 0, 0);
spotLight.castShadow = true;
scene.add(spotLight);
scene.add(spotLight.target);

// ─── SUN ─────────────────────────────────────────────────────────────────────
const sunTex = makeSunTexture();
const sunGeo = new THREE.SphereGeometry(18, 64, 64);
const sunMat = new THREE.MeshBasicMaterial({ map: sunTex });
const sun = new THREE.Mesh(sunGeo, sunMat);
sun.userData = { name: 'The Sun', fact: 'Our star! It contains 99.86% of the mass in the solar system and is 1.4 million km wide.' };
scene.add(sun);

const glowCanvas = document.createElement('canvas');
glowCanvas.width = glowCanvas.height = 256;
const gc = glowCanvas.getContext('2d');
const gg = gc.createRadialGradient(128, 128, 0, 128, 128, 128);
gg.addColorStop(0,   'rgba(255,220,100,0.6)');
gg.addColorStop(0.4, 'rgba(255,150,30,0.2)');
gg.addColorStop(1,   'rgba(0,0,0,0)');
gc.fillStyle = gg;
gc.fillRect(0, 0, 256, 256);
const glowTex = new THREE.CanvasTexture(glowCanvas);
const glowMat = new THREE.SpriteMaterial({ map: glowTex, transparent: true, blending: THREE.AdditiveBlending });
const glow = new THREE.Sprite(glowMat);
glow.scale.set(120, 120, 1);
scene.add(glow);

// ─── PLANET DATA ─────────────────────────────────────────────────────────────
const planetData = [
  {
    name: 'Mercury', radius: 2.4,  orbit: 35,  speed: 4.7,  tilt: 0.03, hasRings: false,
    tex: makeCraterTexture(),
    fact: 'Closest planet to the Sun. A year lasts only 88 Earth days.'
  },
  {
    name: 'Venus',   radius: 5.8,  orbit: 55,  speed: 3.5,  tilt: 0.04, hasRings: false,
    tex: makeNoiseTexture('#d4a030', '#8b4500'),
    fact: 'Hottest planet at ~465°C. Rotates backwards relative to most planets!'
  },
  {
    name: 'Earth',   radius: 6.0,  orbit: 78,  speed: 2.98, tilt: 0.41, hasRings: false,
    tex: makeEarthLikeTexture(),
    fact: 'Our home! 71% covered in water. The only known planet to harbor life.'
  },
  {
    name: 'Mars',    radius: 3.4,  orbit: 105, speed: 2.41, tilt: 0.44, hasRings: false,
    tex: makeNoiseTexture('#c1440e', '#8b1a00', 256, 80),
    fact: 'The Red Planet. Home to Olympus Mons, the tallest volcano in the solar system.'
  },
  {
    name: 'Jupiter', radius: 13.0, orbit: 155, speed: 1.31, tilt: 0.05, hasRings: false,
    tex: makeStripedTexture('#c8a060', '#a07040'),
    fact: 'Largest planet in the solar system. Has at least 95 known moons!'
  },
  {
    name: 'Saturn',  radius: 11.0, orbit: 210, speed: 0.97, tilt: 0.47, hasRings: true,
    tex: makeStripedTexture('#e8d880', '#b0a050'),
    fact: 'Known for its stunning ring system made of ice and rock particles.'
  },
  {
    name: 'Uranus',  radius: 7.5,  orbit: 265, speed: 0.68, tilt: 1.71, hasRings: false,
    tex: makeIceTexture(),
    fact: 'Rotates on its side with a 98° axial tilt. Has 13 known rings.'
  },
  {
    name: 'Neptune', radius: 7.2,  orbit: 315, speed: 0.54, tilt: 0.49, hasRings: false,
    tex: makeNoiseTexture('#3060d0', '#1030a0'),
    fact: 'Windiest planet — gusts up to 2,100 km/h. Farthest planet from the Sun.'
  },
];

// ─── BUILD PLANETS ───────────────────────────────────────────────────────────
const planetMeshes = [];
const orbitPivots  = [];

planetMeshes.push(sun);

for (const pd of planetData) {
  const orbitGeo = new THREE.TorusGeometry(pd.orbit, 0.08, 8, 200);
  const orbitMat = new THREE.MeshBasicMaterial({ color: 0x336699, transparent: true, opacity: 0.4 });
  const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
  orbitRing.rotation.x = Math.PI / 2;
  scene.add(orbitRing);

  const pivot = new THREE.Object3D();
  pivot.rotation.y = Math.random() * Math.PI * 2;
  scene.add(pivot);
  orbitPivots.push({ pivot, speed: pd.speed * 0.002 });

  const geo = new THREE.SphereGeometry(pd.radius, 48, 48);
  const mat = new THREE.MeshPhongMaterial({ map: pd.tex });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.x = pd.orbit;
  mesh.rotation.z = pd.tilt;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = { name: pd.name, fact: pd.fact };
  pivot.add(mesh);
  planetMeshes.push(mesh);

  if (pd.hasRings) {
    const ringGeo = new THREE.RingGeometry(pd.radius * 1.4, pd.radius * 2.5, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      map: makeRingTexture(),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    mesh.add(ring);
  }

  if (pd.name === 'Earth') {
    const moonPivot = new THREE.Object3D();
    mesh.add(moonPivot);
    const moonGeo = new THREE.SphereGeometry(1.5, 24, 24);
    const moonMat = new THREE.MeshPhongMaterial({ map: makeCraterTexture() });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.x = 12;
    moon.userData = { name: 'The Moon', fact: "Earth's only natural satellite. About 384,400 km away." };
    moonPivot.add(moon);
    planetMeshes.push(moon);
    orbitPivots.push({ pivot: moonPivot, speed: 0.02 });
  }
}

// ─── ASTEROID BELT ───────────────────────────────────────────────────────────
const asteroidTex = makeRockyTexture();
const asteroidGeo = new THREE.IcosahedronGeometry(1, 0);
const asteroidData = [];

for (let i = 0; i < 11; i++) {
  const scale = Math.random() * 1.8 + 0.8;
  const mat = new THREE.MeshPhongMaterial({ map: asteroidTex, flatShading: true });
  const mesh = new THREE.Mesh(asteroidGeo, mat);
  mesh.scale.set(scale, scale * (Math.random() * 0.5 + 0.7), scale);

  const angle = (i / 11) * Math.PI * 2 + Math.random() * 0.3;
  const dist  = 128 + Math.random() * 16;
  const yOff  = (Math.random() - 0.5) * 6;
  mesh.position.set(Math.cos(angle) * dist, yOff, Math.sin(angle) * dist);
  mesh.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  mesh.castShadow = true;
  scene.add(mesh);
  asteroidData.push({ mesh, angle, dist, yOff, speed: Math.random() * 0.001 + 0.0005 });
}

// ─── STAR PARTICLES ──────────────────────────────────────────────────────────
const starGeo = new THREE.BufferGeometry();
const starPositions = [];
for (let i = 0; i < 2000; i++) {
  const r     = 800 + Math.random() * 1200;
  const theta = Math.random() * Math.PI * 2;
  const phi   = Math.acos(2 * Math.random() - 1);
  starPositions.push(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi)
  );
}
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.5, sizeAttenuation: true });
scene.add(new THREE.Points(starGeo, starMat));

// ─── RAYCASTER (click → info panel) ──────────────────────────────────────────
const raycaster = new THREE.Raycaster();
const mouse     = new THREE.Vector2();

const infoPanel = document.getElementById('info-panel');
const infoName  = document.getElementById('info-name');
const infoBody  = document.getElementById('info-body');

document.getElementById('close-info').addEventListener('click', () => {
  infoPanel.style.display = 'none';
});

renderer.domElement.addEventListener('click', (e) => {
  mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const hits = raycaster.intersectObjects(planetMeshes, true);
  if (hits.length > 0) {
    let obj = hits[0].object;
    while (!obj.userData.name && obj.parent) obj = obj.parent;
    if (obj.userData.name) {
      infoName.textContent = obj.userData.name;
      infoBody.textContent = obj.userData.fact || 'An object in our solar system.';
      infoPanel.style.display = 'block';
    }
  }
});

// ─── SPEED SLIDER ────────────────────────────────────────────────────────────
let speedMultiplier = 1.0;
const slider   = document.getElementById('speed-slider');
const speedVal = document.getElementById('speed-val');
slider.addEventListener('input', () => {
  speedMultiplier = parseFloat(slider.value);
  speedVal.textContent = speedMultiplier.toFixed(1);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ─── ANIMATION LOOP ──────────────────────────────────────────────────────────
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  for (const { pivot, speed } of orbitPivots) {
    pivot.rotation.y += speed * speedMultiplier;
  }

  for (const mesh of planetMeshes) {
    if (mesh.userData.noSpin) continue;
    mesh.rotation.y += 0.005 * speedMultiplier;
  }

  for (const a of asteroidData) {
    a.angle += a.speed * speedMultiplier;
    a.mesh.position.set(
      Math.cos(a.angle) * a.dist,
      a.yOff,
      Math.sin(a.angle) * a.dist
    );
    a.mesh.rotation.x += 0.01;
    a.mesh.rotation.y += 0.007;
  }

  spaceshipPivot.rotation.y += SPACESHIP_BASE_SPEED * spaceshipBoost * speedMultiplier;

  controls.update();
  renderer.render(scene, camera);
}

// ─── SPACESHIP (GLB model) ───────────────────────────────────────────────────
const spaceshipPivot = new THREE.Object3D();
scene.add(spaceshipPivot);

const SPACESHIP_BASE_SPEED   = 0.0008;
const SPACESHIP_ORBIT_RADIUS = 380;
let   spaceshipBoost         = 1;

// External follow-spotlight that reveals the spaceship during boost
const boostSpot = new THREE.SpotLight(0xffe0a0, 0, 250, Math.PI / 3.5, 0.5, 1.0);
boostSpot.position.set(SPACESHIP_ORBIT_RADIUS - 30, 90, 40);
const boostSpotTarget = new THREE.Object3D();
boostSpotTarget.position.set(SPACESHIP_ORBIT_RADIUS, 15, 0);
spaceshipPivot.add(boostSpotTarget);
boostSpot.target = boostSpotTarget;
spaceshipPivot.add(boostSpot);

const gltfLoader = new GLTFLoader();
gltfLoader.load('Spaceship.glb', (gltf) => {
  const model = gltf.scene;
  model.scale.set(8, 8, 8);
  model.position.set(SPACESHIP_ORBIT_RADIUS, 15, 0);
  model.rotation.y = Math.PI;
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow    = true;
      child.receiveShadow = true;
      child.userData = {
        name: 'Spaceship',
        fact: 'A lone spacecraft on a slow orbit beyond Neptune. Hit BOOST to engage warp drive!',
        noSpin: true
      };
      planetMeshes.push(child);
    }
  });
  spaceshipPivot.add(model);
});

// ─── BOOST BUTTON ────────────────────────────────────────────────────────────
const boostBtn = document.getElementById('boost-btn');
boostBtn.addEventListener('click', () => {
  if (spaceshipBoost > 1) return;
  spaceshipBoost      = 40;
  boostSpot.intensity = 200;
  boostBtn.disabled    = true;
  boostBtn.textContent = 'WARP DRIVE ENGAGED';
  setTimeout(() => {
    spaceshipBoost      = 1;
    boostSpot.intensity = 0;
    boostBtn.disabled    = false;
    boostBtn.textContent = 'BOOST SPACESHIP';
  }, 2500);
});

animate();
