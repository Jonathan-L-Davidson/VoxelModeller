/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useGraph } from '@react-three/fiber';
import { CameraControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import InputHandler from './ClickHandler';
import Settings from './Settings';
import VoxelScene from './Voxel/VoxelScene';

function OnHoverBox(props: any) {
  const ref = useRef();

  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useEffect(() => {
    props.objAdd(ref);
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? props.cellSize + props.cellSize * 0.5 : props.cellSize}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[props.cellSize, props.cellSize, props.cellSize]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function DrawGrid(props: any) {
  const gridConfig = {
    cellSize: props.cellSize,
    cellThickness: 1,
    cellColor: '#8f8f8f',
    sectionSize: 5 * props.cellSize,
    sectionThickness: 2,
    sectionColor: '#e0e0e0',
    fadeDistance: 100 * props.cellSize,
    fadeStrength: 1 * props.cellSize,
    followCamera: true,
    infiniteGrid: true,
  };

  const position = props.position;

  return <Grid position={position} args={[1, 1]} {...gridConfig} />;
}

function Three() {
  const voxelScene = new VoxelScene();
  const input = new InputHandler(voxelScene);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 10 * Settings.cellSize], fov: 60 }}
      onMouseDown={input.OnMouseClick}
      onMouseUp={input.OnMouseReleased}
      onPointerMove={input.OnMouseMove}
      onCreated={input.OnCreate}
    >
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[10, 20, 15]} intensity={2} />
      <ambientLight />
      <DrawGrid position={[0, 0.2, 0]} cellSize={Settings.cellSize} />
      <CameraControls makeDefault />
    </Canvas>
  );
}

export default Three;
