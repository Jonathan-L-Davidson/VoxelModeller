/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function OnHoverBox(props) {
  const ref = useRef();

  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame((state, delta) => (ref.current.rotation.x += delta));

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

function DrawGrid(props) {
  var gridSizeWidth = 10;
  var gridSizeHeight = 10;
  var gridLines = 5;

  return (

  )
}

function Three() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OnHoverBox position={[-1.2, 0, 0]} />
      <OnHoverBox position={[1.2, 0, 0]} />
    </Canvas>
  );
}

export default Three;
