import * as THREE from 'three';
import nightSky from '@models/night-sky.jpg';
import { addPlanetToList } from './planet-list';
import { solarMesh, solarShineMesh, solarUniforms } from '../planets/solar';
import { mercuryMesh } from '../planets/mercury';
import { venusMesh } from '../planets/venus';
import { earthMesh } from '../planets/earth';
import { marsMesh } from '../planets/mars';
import { jupiterMesh } from '../planets/jupiter';
import { saturnMesh, saturnRingsMesh } from '../planets/saturn';
import { uranusMesh } from '../planets/uranus';
import { neptuneMesh } from '../planets/neptune';
import { PlanetNames } from './card';

export const START_CAMERA_POSITION_Z = 20;

export interface SolarSystemObjects {
  solarShine: THREE.Mesh;
  solar: THREE.Mesh;
  mercury: THREE.Mesh;
  venus: THREE.Mesh;
  earth: THREE.Mesh;
  mars: THREE.Mesh;
  jupiter: THREE.Mesh;
  saturn: THREE.Mesh;
  saturnRing: THREE.Mesh;
  uranus: THREE.Mesh;
  neptune: THREE.Mesh;
}

export const initSolarSystem = (scene: THREE.Scene): SolarSystemObjects => {
  return {
    solarShine: addPlanetToScene(scene, solarShineMesh(), PlanetNames.solar),
    solar: addPlanetToScene(scene, solarMesh(solarUniforms), PlanetNames.solar),
    mercury: addPlanetToScene(scene, mercuryMesh(), PlanetNames.mercury),
    venus: addPlanetToScene(scene, venusMesh(), PlanetNames.venus),
    earth: addPlanetToScene(scene, earthMesh(), PlanetNames.earth),
    mars: addPlanetToScene(scene, marsMesh(), PlanetNames.mars),
    jupiter: addPlanetToScene(scene, jupiterMesh(), PlanetNames.jupiter),
    saturn: addPlanetToScene(scene, saturnMesh(), PlanetNames.saturn),
    saturnRing: addPlanetToScene(scene, saturnRingsMesh(), PlanetNames.saturn),
    uranus: addPlanetToScene(scene, uranusMesh(), PlanetNames.uranus),
    neptune: addPlanetToScene(scene, neptuneMesh(), PlanetNames.neptune),
  }
}

export const createScene = (): THREE.Scene => {
  const scene = new THREE.Scene();
  const nightSkyTexture = new THREE.TextureLoader().load(nightSky);
  scene.background = nightSkyTexture;
  return scene;
}

export const createCamera = (): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = START_CAMERA_POSITION_Z;
  return camera;
}

export const zoomAndPosition = (camera: THREE.PerspectiveCamera) => {
  const minPositionFromCamera = 30;
  if (Math.abs(camera.position.z) > minPositionFromCamera) {
    camera.position.z = minPositionFromCamera;
  }
  if (Math.abs(camera.position.x) > minPositionFromCamera) {
    camera.position.x = minPositionFromCamera;
  }
  if (Math.abs(camera.position.y) > minPositionFromCamera) {
    camera.position.y = minPositionFromCamera;
  }
}

export const createRenderer = (): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  return renderer;
} 

export const createLight = (scene: THREE.Scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  const pointLight = new THREE.PointLight(0xffffff, 1.5, 0, 0);
  scene.add(ambientLight);
  scene.add(pointLight);
}

export const resizeWindow = (renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) => {
  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
}

export const addPlanetToScene = (scene: THREE.Scene, mesh: THREE.Mesh, name: string): THREE.Mesh => {
  scene.add(mesh);
  addPlanetToList(mesh.id, name);
  return mesh;
}