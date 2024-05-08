import * as THREE from 'three';
import Voxel from './Voxel';
import Settings from '../Settings';

export default class VoxelScene {
  private voxels: Map<string, Voxel> = new Map<string, Voxel>();

  public voxelGroup: THREE.Group = new THREE.Group();

  GetVoxelGroup() {
    return this.voxelGroup;
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
      // Thanks javascript!

      // I've tried many, right now I'm using an array of the x y z but it still doesn't work...
      this.voxels.set(positionString, voxel);

      this.UpdateVoxelGeometry();
    }
  }

  RemoveVoxel(position: THREE.Vector3) {
    const pos: THREE.Vector3 = new THREE.Vector3();
    pos.copy(position);
    const positionString: string = JSON.stringify(pos);

    this.voxels.delete(positionString);
  }

  UpdateVoxelGeometry() {
    this.voxelGroup.clear();
    // Generate a mesh using the voxel information.
    // Maybe scan through each x y z and find linked voxels. Using the greedy mesh algorithm.
    this.voxels.forEach((voxel, pos) => {
      this.voxelGroup.add(voxel.GetMesh());
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
