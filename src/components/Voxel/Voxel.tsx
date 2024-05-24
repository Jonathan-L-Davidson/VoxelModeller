import * as THREE from 'three';
import Settings from '../Settings';

enum ENeighbours {
  Up = 0,
  Down,
  Left,
  Right,
  Forward,
  Back,
}

export default class Voxel {
  public position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  public offset = Settings.cellSize / 2;

  constructor(props, pos: THREE.Vector3) {
    this.position = pos;
  }
}
