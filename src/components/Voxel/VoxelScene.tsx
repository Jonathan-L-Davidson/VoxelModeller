import * as THREE from 'three';
import Voxel from './Voxel';
import Settings from '../Settings';

export default class VoxelScene {
  private voxels: Map<number[], Voxel> = new Map<number[], Voxel>();

  public voxelGroup: THREE.Group = new THREE.Group();

  GetVoxelGroup() {
    return this.voxelGroup;
  }

  // Position MUST be floored() and divided by voxelsize, props are data for voxel
  AddVoxel(position: THREE.Vector3, props) {
    const pos: THREE.Vector3 = new THREE.Vector3();
    pos.copy(position);
    // If the position of the voxel placement is valid.
    const voxelT = this.voxels.get([pos.x, pos.y, pos.z]);
    console.log(voxelT === undefined); // This always returns true???????????
    console.log(this.voxels);

    if (
      pos.x < Settings.maxVoxels &&
      pos.y < Settings.maxVoxels &&
      pos.z < Settings.maxVoxels &&
      voxelT === undefined
    ) {
      let voxel = new Voxel(props, pos);

      // Some reason using pos as the setter will also update the index element for the value.
      // Thanks javascript!
      // I've tried many, right now I'm using an array of the x y z but it still doesn't work...
      this.voxels.set([pos.x, pos.y, pos.z], voxel);

      this.UpdateVoxelGeometry();
    }
  }

  RemoveVoxel(pos: THREE.Vector3) {
    this.voxels.delete([pos.x, pos.y, pos.z]);
  }

  UpdateVoxelGeometry() {
    // Generate a mesh using the voxel information.
    // Maybe scan through each x y z and find linked voxels. Using the greedy mesh algorithm.
    this.voxels.forEach((voxel, pos) => {
      console.log(voxel, pos);
    });
    // for (let z = 0; z < Settings.maxVoxels; z++) {
    //   for (let y = 0; y < Settings.maxVoxels; y++) {
    //     for (let x = 0; x < Settings.maxVoxels; x++) {
    //       const voxPos = new THREE.Vector3(x, y, z);
    //       const voxel: Voxel = this.voxels.get(voxPos);
    //       console.log(voxel);
    //     }
    //   }
    // }
  }
}
