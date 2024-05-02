import * as THREE from 'three';

enum ButtonInput {
  left = 0,
  middle,
  right,
}

export default class InputHandler {
  private raycast = new THREE.Raycaster();

  private mouseXY = new THREE.Vector2();

  private camera!: THREE.Camera;

  // Amount of pixels mouse has to move once clicked to not trigger a click release.
  private placementThreshold: number = 20;

  private mouseDown: boolean = false;

  private clickedXY = new THREE.Vector2();

  private objects = [];

  AddObject = (obj: Object) => {
    console.log('MESH CREATED');
    console.log(obj);
    this.objects.push(obj);
  };

  OnCreate = (state) => {
    // console.log(state);
    this.camera = state.camera;
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
          break;
        case ButtonInput.right:
          console.log('Remove Voxel');
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
      (mouseRelativePos.y / event.target.clientHeight) * 2 - 1,
    );

    // console.log(movedInput);
    this.mouseXY = movedInput;
    // console.log(this.mouseXY);

    this.UpdateRaycast();
  };

  UpdateRaycast() {
    if (this.camera && !this.mouseDown) {
      console.log('PRE-RAYCAST');
      this.raycast.setFromCamera(this.mouseXY, this.camera);
      console.log(this.objects);
      const intersections = this.raycast.intersectObjects(this.objects, false);

      // if there are intersections
      if (intersections.length > 0) {
        // get first hit.
        const intersectedObj = intersections[0];
        console.log('RAYCAST HIT');
        console.log(intersectedObj);
      }
      // get point of intersected object and add the normal of the face it collided with.
      // Set the position of our highlight to that position.
    }
  }
}
