import * as THREE from 'three';
import Settings from '../Settings';
import MaterialReference from './MaterialReference';

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

  private voxelMaterial: MaterialReference;
  public color: string;

  GetMaterial() {
    return this.voxelMaterial;
  }

  constructor(props, pos: THREE.Vector3) {
    this.position = pos;

    console.assert(props?.material, "No material provided")

    this.voxelMaterial = props.material;
    this.color = props.color;
  }
}
