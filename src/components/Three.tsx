/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import InputHandler from './ClickHandler';

function OnHoverBox(props: any) {
  const ref = useRef();

  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  props.objAdd(ref);

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1.0}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function DrawGrid(props: any) {
  const gridConfig = {
    cellSize: 1.0,
    cellThickness: 0.5,
    cellColor: '#8f8f8f',
    sectionSize: 5,
    sectionThickness: 1,
    sectionColor: '#e0e0e0',
    fadeDistance: 30,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true,
  };

  const position = props.position;

  return <Grid position={position} args={[10.5, 10.5]} {...gridConfig} />;
}

function Three() {
  const input = new InputHandler();
  // input.camera = useThree();

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.5, 5], fov: 60 }}
      onMouseDown={input.OnMouseClick}
      onMouseUp={input.OnMouseReleased}
      onPointerMove={input.OnMouseMove}
      onCreated={input.OnCreate}
    >
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[10, 20, 15]} intensity={2} />
      <ambientLight />
      <OnHoverBox position={[-1.5, 0.5, 0.5]} objAdd={input.AddObject} />
      <OnHoverBox position={[1.5, 0.5, 0.5]} objAdd={input.AddObject} />
      <DrawGrid position={[0, 0, 0]} />
      <CameraControls makeDefault />
    </Canvas>
  );
}

export default Three;
