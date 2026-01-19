import { MeshStandardMaterial } from "three";
import Voxel from "./Voxel";

export default class MaterialReference {

  private refCount: number = 0;
  private material: MeshStandardMaterial;

  AssignColor() {
    ++this.refCount
    console.log("Reference count: ", this.refCount)
    return this;
  }

  RemoveColor() {
    --this.refCount
    console.log("Reference count: ", this.refCount)
    return this;
  }

  GetRefCount() {
    return this.refCount;
  }

  Get() {
    return this.material;
  }

  constructor(props) {
    this.material = new MeshStandardMaterial(props);
  }
}
