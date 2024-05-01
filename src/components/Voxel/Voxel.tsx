import * as THREE from 'three';

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

  public position = new THREE.Vector3(0, 0, 0);

  public neighbours = new Map();

  public vertices = [];

  // eslint-disable-next-line no-use-before-define
  SetNeighbour(dir: ENeighbours, neighbour: Voxel) {
    this.neighbours.set(dir, neighbour);
  }

  GetSize() {
    return this.size;
  }

  GenerateFaces(dir: number, neighbour: Voxel) {
    return 0;
  }

  // How I want to render the voxel is to get the current size, get position. Add size / 2 to the x y and z.
  // Check where my neighbours are, if there are no neighbours, generate 4 verts in that dir.
  // Afterwards, check for duplicate vertices. Then return a list of verts to use.
  GetMesh() {
    this.neighbours.forEach(this.GenerateFaces);
    return (
      <mesh scale={this.size} position={this.position}>
        <boxGeometry />
      </mesh>
    );
  }
}
