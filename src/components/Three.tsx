/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, Grid } from '@react-three/drei';
// Post process libraries provided by Poimandres, who also made react-three fiber.
import {
  N8AO,
  SMAA,
  EffectComposer,
  Outline,
} from '@react-three/postprocessing';

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

class Three extends React.Component {
  private voxelScene;

  private input;

  constructor(props) {
    super(props);
    this.voxelScene = props.voxelScene;
    console.log(this.voxelScene);
    this.input = new InputHandler(this.voxelScene);
  }

  render() {
    return (
      <Canvas
        shadows
        gl={{ antialias: false }} // Use postprocessing SMAA instead.
        camera={{
          position: [0, Settings.cellSize, Settings.cellSize * 2],
          fov: 70,
        }}
        onMouseDown={this.input.OnMouseClick}
        onMouseUp={this.input.OnMouseReleased}
        onPointerMove={this.input.OnMouseMove}
        onCreated={(event) => {
          this.voxelScene.Init(event);
          this.input.OnCreate(event);
        }}
      >
        <directionalLight
          position={[
            1 * Settings.cellSize,
            50 * Settings.cellSize,
            50 * Settings.cellSize,
          ]}
          intensity={2}
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <ambientLight intensity={0.8} />
        <DrawGrid position={[0, 0.2, 0]} cellSize={Settings.cellSize} />
        <CameraControls makeDefault />
        <EffectComposer multisampling={0}>
          <Outline selection={this.voxelScene.voxelGroup} />
          <N8AO
            halfRes
            color="black"
            aoRadius={2}
            intensity={1}
            aoSamples={6}
            denoiseSamples={4}
          />
          <SMAA />
        </EffectComposer>
      </Canvas>
    );
  }
}

export default Three;
