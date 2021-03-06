import * as THREE from 'three';
import { coefficientDiameter, coefficientOrbitalRotation, SOLAR_ROTATE_ITS_SELF } from './solar';
import venusTexture from '@models/venus.jpg';
import { orbitalRotation, PlanetMovingConfig } from '../utils/math';

const VENUS_SIZE = 6052 * 30; // scale instead of real x50
export const VENUS_START_POSITION = {
  X: 2.5,
  Y: 0,
  Z: 0,
};
const VENUS_ORBITAL_ROTATION = 100000 / 224; // 224 days

export const venusConfig: PlanetMovingConfig = {
  selfRotate: SOLAR_ROTATE_ITS_SELF / 9, // 243 days
  orbitalRotation: orbitalRotation(VENUS_ORBITAL_ROTATION / coefficientOrbitalRotation, VENUS_START_POSITION.X),
}

export const venusMesh = () => {
  const texture = new THREE.TextureLoader().load(venusTexture);
  const geometry = new THREE.SphereGeometry(VENUS_SIZE / coefficientDiameter, 32, 32);
  const material = new THREE.MeshLambertMaterial({ map: texture, wireframe: false });
  const venus = new THREE.Mesh(geometry, material);
  venus.position.set(VENUS_START_POSITION.X, 0, 0);
  return venus;
}