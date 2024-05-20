import Settings from './Settings';
import * as THREE from 'three';
import VoxelScene from './Voxel/VoxelScene';

enum ButtonInput {
  left = 0,
  middle,
  right,
}

export default class InputHandler {
  private voxelScene: VoxelScene;

  private scene!: THREE.Scene;

  // ----------------------------------------
  // Input handling
  // ----------------------------------------
  private raycast = new THREE.Raycaster();

  private mouseXY = new THREE.Vector2();

  private camera!: THREE.Camera;

  // Amount of pixels mouse has to move once clicked to not trigger a click release.
  private placementThreshold: number = 20;

  private mouseDown: boolean = false;

  private clickedXY = new THREE.Vector2();

  // ----------------------------------------
  // Voxel placement helpers
  // ----------------------------------------
  private objects = [];

  private selectedMesh;

  private highlightGeo;

  highlightMat = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    opacity: 0.5,
    transparent: true,
  });

  private highlightMesh;

  // Used for the floor click detection.
  private floorPlaneGeo;

  private floorPlane;

  constructor(voxelScene) {
    this.floorPlaneGeo = new THREE.PlaneGeometry(
      300 * Settings.cellSize,
      300 * Settings.cellSize,
    );
    this.floorPlane = new THREE.Mesh(
      this.floorPlaneGeo,
      new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide }),
    );

    this.floorPlane.position.setY(0.1);

    this.floorPlane.rotateX(-0.5 * Math.PI);
    this.objects.push(this.floorPlane);

    this.highlightGeo = new THREE.BoxGeometry(
      Settings.cellSize,
      Settings.cellSize,
      Settings.cellSize,
    );

    this.highlightMesh = new THREE.Mesh(this.highlightGeo, this.highlightMat);

    this.voxelScene = voxelScene;
  }

  OnCreate = (state) => {
    // console.log(state);
    this.camera = state.camera;
    this.scene = state.scene;
    this.scene.add(this.highlightMesh);
    this.scene.add(this.floorPlane);
  };

  AddObject = (obj) => {
    // console.log(obj);
    if (!this.objects.includes(obj.current)) {
      this.objects.push(obj.current);
    }
  };

  OnMouseClick = (event) => {
    // console.log('Clicked!');
    this.clickedXY.set(event.clientX, event.clientY);
    this.mouseDown = true;
  };

  OnMouseReleased = (event) => {
    // console.log(event);

    const releasedPos: THREE.Vector2 = new THREE.Vector2(
      event.clientX,
      event.clientY,
    );

    const dist = releasedPos.distanceTo(this.clickedXY);

    if (dist < this.placementThreshold) {
      switch (event.button) {
        case ButtonInput.left:
          console.log('Place Voxel');
          this.voxelScene.AddVoxel(this.highlightMesh.position, null);
          this.UpdateRaycast(); // update collision.
          break;
        case ButtonInput.right:
          console.log('Remove Voxel');
          this.voxelScene.RemoveVoxel(this.selectedMesh);
          this.UpdateRaycast(); // update collision.
          break;
        default:
          break;
      }
    }

    this.mouseDown = false;
  };

  OnMouseMove = (event) => {
    const mouseRelativePos = new THREE.Vector2(
      event.clientX - Math.abs(event.target.clientWidth - window.innerWidth),
      event.clientY - Math.abs(event.target.clientHeight - window.innerHeight),
    );

    // Normalise the X and Y position of the mouse relative to the canvas (target) size to create a dir for a raycast.
    // X / width = 0 to 1. Multiply by 2 so it's a 0 to 2, minus 1 so it's -1 to 1.
    const movedInput = new THREE.Vector2(
      (mouseRelativePos.x / event.target.clientWidth) * 2 - 1,
      -(mouseRelativePos.y / event.target.clientHeight) * 2 + 1,
    );

    // console.log(movedInput);
    this.mouseXY = movedInput;
    // console.log(this.mouseXY);

    this.UpdateRaycast();
  };

  UpdateRaycast() {
    if (this.camera && !this.mouseDown) {
      // console.log('PRE-RAYCAST');
      this.raycast.setFromCamera(this.mouseXY, this.camera);
      // console.log(this.objects);

      // Concat merges two arrays together:
      const hitList = this.objects.concat(this.voxelScene.voxelMeshes);

      const intersections = this.raycast.intersectObjects(hitList, false);

      // if there are intersections
      if (intersections.length > 0) {
        // get first hit.
        const intersectedObj = intersections[0];

        this.selectedMesh = intersectedObj.object.position;

        // get point of intersected object and add the normal of the face it collided with.
        this.highlightMesh.position
          .copy(intersectedObj.point)
          .add(intersectedObj.face?.normal);

        this.highlightMesh.position
          .divideScalar(Settings.cellSize)
          .floor()
          .multiplyScalar(Settings.cellSize)
          .addScalar(Settings.cellSize * 0.5);
      }
      // Set the position of our highlight to that position.
    }
  }
}
