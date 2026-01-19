import * as THREE from 'three';
import Voxel from './Voxel';
import Settings from '../Settings';
import SendFileToClient from '../SendFile';
import MaterialReference from './MaterialReference';
import { json } from 'stream/consumers';

export default class VoxelScene {
  private scene: THREE.Scene;

  private voxels: Map<string, Voxel> = new Map<string, Voxel>();

  public voxelMeshes = [];

  public voxelGroup = new THREE.Group();

  private colorTable: Map<string, MaterialReference> = new Map<string, MaterialReference>();

  public currentColor: THREE.Color = new THREE.Color(0xd98d26);

  private defaultMaterial = new MaterialReference({ color: this.currentColor });

  private voxelGeometry = new THREE.BoxGeometry(
    Settings.cellSize,
    Settings.cellSize,
    Settings.cellSize,
  );

  constructor() {}

  Init(event) {
    this.scene = event.scene;
    this.scene.add(this.voxelGroup);


    // Handling the file loading.
    this.uploadElement.style.display = 'none';
    this.uploadElement.type = 'file';
    this.uploadElement.id = 'file';
    document.body.appendChild(this.uploadElement);

    this.uploadElement.oninput = async (input) => {
      const inputFileContents = await this.HandleFileInput(input); // Gets the JSON string
      const result = JSON.parse(inputFileContents); // Turns the JSON string into an object
      // console.log(result);
      this.ClearVoxels(); // Clear all voxels in the scene
      this.UpdateScene(result); // Update the scene with the new object.
    };
  }

  private uploadElement = document.createElement('input');

  SaveScene() {
    const jsonInfo = {
      voxelData: [{}],
    };

    this.voxels.forEach((values) => {
      const posArray: number[] = values.position.toArray();

      const voxelJSON = {
        pos: posArray,
        color: values.color,
      };

      jsonInfo.voxelData.push(voxelJSON);
    });

    jsonInfo.voxelData.splice(0,1); // Due to my inexperience with this lovely language, this is my jank to remove the first element from the scene.

    const parsedInfo = JSON.stringify(jsonInfo);
    SendFileToClient(parsedInfo, 'VoxelEditorScene.json');
  }

  LoadScene() {
    this.uploadElement.click();
  }

  // Parses the JSON file into a JSON string
  async HandleFileInput(input) {
    if (typeof window.FileReader !== 'function') {
      console.error('Filereader doesnt exist on this browser.');
    }

    if (input.srcElement.files.length <= 0) {
      console.error('Empty filelist.');
    }

    // Outputs the text, however you must call await on the function itself as await doesn't wait on this function here?
    const fileData: string = await new Response(
      input.srcElement.files[0],
    ).text();

    return fileData;

    // This didn't work because the way the function is called is within the input's own scope, so `this` was not VoxelScene.

    // const fileReader = new FileReader(); // I have no idea why but file reader refuses to exist in any scope :(
    // fileReader.addEventListener('load', () => {
    //   return fileReader.result;
    // });
    // fileReader.readAsText(input.srcElement.files[0]);
  }

  // Updates the voxel scene with the new data provided.
  UpdateScene(result) {
    result.voxelData.forEach((voxel) => {

      const vec3 = new THREE.Vector3(voxel.pos[0], voxel.pos[1], voxel.pos[2]);
      let props = Object.create({color: null});
      if(voxel.color.length !== 0) {
        props.color = voxel.color;
      }

      this.AddVoxel(vec3, props);
    });
  }

  GetMaterial(color) {
    if(this.colorTable.has(color)) {
      return this.colorTable.get(color)?.AssignColor();
    } else {
      let material = new MaterialReference({color: color});
      this.colorTable.set(color, material);
      return material.AssignColor();
    }
  }


  AddVoxel(position: THREE.Vector3, props) {
    const pos: THREE.Vector3 = new THREE.Vector3();

    pos.copy(position);
    const positionString: string = JSON.stringify(pos); // Using a string as the key seems to prevent it from using the position as a pointer.

    // If the position of the voxel placement is valid.
    const voxelT = this.voxels.get(positionString);

    if (
      pos.x < Settings.maxVoxels &&
      pos.y < Settings.maxVoxels &&
      pos.z < Settings.maxVoxels &&
      voxelT === undefined
    ) {

      // Get Color
      if(props?.color){
        props.material = this.GetMaterial(props.color);
      } else {
        props.material = this.defaultMaterial;
      }

      let voxel = new Voxel(props, pos);

      // Some reason using pos as the setter will also update the index element for the value.
      // Thanks javascript! The solution was to stringify/serialise it.

      this.voxels.set(positionString, voxel);
      //console.log(position);

      this.UpdateVoxelGeometry();
    } else {
      console.log('Voxel has invalid placement');
    }
  }

  RemoveVoxel(position: THREE.Vector3) {
    const pos: THREE.Vector3 = new THREE.Vector3();
    pos.copy(position);
    const positionString: string = JSON.stringify(pos); // Using a string as the key seems to prevent it from using the position as a pointer.

    // console.log(position);

    // Removes unused color tables
    const voxelRef = this.voxels.get(positionString);
    if(voxelRef) {
      const materialRef = this.colorTable.get(voxelRef.color);

      if(materialRef) {
        materialRef.RemoveColor();

        if(materialRef.GetRefCount() <= 0){
          this.colorTable.delete(voxelRef.color);
        }
      }
  }

    this.voxels.delete(positionString);
    this.UpdateVoxelGeometry();
  }

  ClearVoxels() {
    this.voxels.clear();
  }

  // Rebuilds the mesh for the scene to render.
  UpdateVoxelGeometry() {
    this.voxelMeshes = []; // Clear mesh array.
    this.voxelGroup.clear();
    this.voxels.forEach((voxels) => {
      const mesh = new THREE.Mesh(this.voxelGeometry, voxels.GetMaterial().Get());
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
