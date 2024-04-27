/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, CameraControls, Grid } from '@react-three/drei';

function OnHoverBox(props) {
  const ref = useRef();

  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1.0}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function DrawGrid() {
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

  return <Grid position={[0, -0.001, 0]} args={[5, 5]} {...gridConfig} />;
}

function Three() {
  const cameraControlsRef = useRef();

  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 60 }}>
      <directionalLight
        castShadow
        position={[10, 20, 15]}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-left={-8}
        shadow-camera-bottom={-8}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        intensity={2}
        shadow-bias={-0.0001}
      />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OnHoverBox position={[-1.5, 0.5, 0.5]} />
      <OnHoverBox position={[1.5, 0.5, 0.5]} />
      <DrawGrid position={[0, -1, 0]} />
      <CameraControls ref={cameraControlsRef} />
    </Canvas>
  );
}

export default Three;
