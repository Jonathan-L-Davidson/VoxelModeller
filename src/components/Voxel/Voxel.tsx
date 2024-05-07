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
  private size = new THREE.Vector3(1, 1, 1);

  public position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  public neighbours = new Map();

  public vertices = [];

  constructor(props, pos: THREE.Vector3) {
    this.position = pos;
  }

  // eslint-disable-next-line no-use-before-define
  SetNeighbour(dir: ENeighbours, neighbour: Voxel) {
    this.neighbours.set(dir, neighbour);
  }

  GetSize() {
    return this.size;
  }

  GetPos() {
    return this.position;
  }

  GenerateFaces(dir: number, neighbour: Voxel) {
    return 0;
  }

  // How I want to render the voxel is to get the current size, get position. Add size / 2 to the x y and z.
  // Check where my neighbours are, if there are no neighbours, generate 4 verts in that dir.
  // Afterwards, check for duplicate vertices. Then return a list of verts to use.
  GetMesh(): THREE.Mesh {
    this.neighbours.forEach(this.GenerateFaces);
    let mesh = new THREE.Mesh(
      new THREE.BoxGeometry(
        Settings.cellSize,
        Settings.cellSize,
        Settings.cellSize,
      ),
      new THREE.MeshBasicMaterial({ color: 0x002000 }),
    );

    mesh.position.copy(this.position);
    mesh.position.multiplyScalar(Settings.cellSize);
    const meshOffset = new THREE.Vector3(
      Settings.cellSize * 0.5,
      Settings.cellSize * 0.5,
      Settings.cellSize * 0.5,
    );
    mesh.position.add(meshOffset);

    console.log(mesh);
    return mesh;
  }
}
