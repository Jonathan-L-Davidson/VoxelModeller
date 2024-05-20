import * as THREE from 'three';
import Voxel from './Voxel';
import Settings from '../Settings';

export default class VoxelScene {
  private scene: THREE.Scene;

  private voxels: Map<string, Voxel> = new Map<string, Voxel>();

  public voxelMeshes = [];

  public voxelGroup = new THREE.Group();

  private voxelMaterial = new THREE.MeshStandardMaterial({ color: 0xd98d26 });

  private voxelGeometry = new THREE.BoxGeometry(
    Settings.cellSize,
    Settings.cellSize,
    Settings.cellSize,
  );

  Init(event) {
    this.scene = event.scene;
    this.scene.add(this.voxelGroup);
  }

  // Position MUST be floored() and divided by voxelsize, props are data for voxel
  AddVoxel(position: THREE.Vector3, props) {
    const pos: THREE.Vector3 = new THREE.Vector3();
    pos.copy(position);
    const positionString: string = JSON.stringify(pos);

    // If the position of the voxel placement is valid.
    const voxelT = this.voxels.get(positionString);

    if (
      pos.x < Settings.maxVoxels &&
      pos.y < Settings.maxVoxels &&
      pos.z < Settings.maxVoxels &&
      voxelT === undefined
    ) {
      let voxel = new Voxel(props, pos);

      // Some reason using pos as the setter will also update the index element for the value.
      // Thanks javascript! The solution was to stringify/serialise it.

      this.voxels.set(positionString, voxel);
      console.log(position);

      this.UpdateVoxelGeometry();
    }
  }

  RemoveVoxel(position: THREE.Vector3) {
    const pos: THREE.Vector3 = new THREE.Vector3();
    pos.copy(position);
    const positionString: string = JSON.stringify(pos);

    console.log(position);

    this.voxels.delete(positionString);
    this.UpdateVoxelGeometry();
  }

  UpdateVoxelGeometry() {
    this.voxelMeshes = []; // Clear mesh array.
    this.voxelGroup.clear();
    this.voxels.forEach((voxels) => {
      const mesh = new THREE.Mesh(this.voxelGeometry, this.voxelMaterial);
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      mesh.position.set(
        voxels.position.x,
        voxels.position.y,
        voxels.position.z,
      );
      this.voxelGroup.add(mesh);
      this.voxelMeshes.push(mesh);
    });
  }
}
