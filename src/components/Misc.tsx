// import { useState } from 'react';
// import Alert from 'Alert';
// import ListGroup from './ListGroup';
// import 'bootstrap/dist/css/bootstrap.css';

// // Deprecated, do not use, was used for understanding react with a tutorial.
// function HelloWorld() {
//   const items = ['New York', 'San Francisco', 'Tokyo', 'London', 'Paris'];
//   const [selectedCity, setSelectedCity] = useState('Warning');

//   const [alertVisible, setAlertVisability] = useState(true);
//   const HandleAlertButton = () => setAlertVisability(false);

//   const handleSelectItem = (item: string) => {
//     setSelectedCity(item);
//     setAlertVisability(true);
//   };

//   return (
//     <div>
//       {alertVisible && (
//         <Alert onClickedOn={HandleAlertButton}>
//           <strong>{selectedCity}!</strong>
//         </Alert>
//       )}

//       <ListGroup items={items} title="Cities" onSelectItem={handleSelectItem} />
//     </div>
//   );
// }

// function DrawGrid(props) {
//     const ref = useRef();
//     var sizeWidth = 0.2;
//     var sizeHeight = 0.2;
//     var gridLines = 10;

//     const lineGroup = new THREE.Group();
//     const lineMat = new THREE.LineBasicMaterial({ color: 'hotpink' });

//     for (let i = 0; i < gridLines; i++) {
//       let points = [];
//       points.push(
//         new THREE.Vector3(i * sizeWidth, 0, (gridLines * sizeWidth) / 2),
//       );
//       points.push(
//         new THREE.Vector3(i * sizeWidth, 0, -(gridLines * sizeWidth) / 2),
//       );

//       const geometry = new THREE.BufferGeometry().setFromPoints(points);
//       const lines = new THREE.Line(geometry, lineMat);

//       lineGroup.add(lines);
//     }

//     for (let i = 0; i < gridLines; i++) {
//       let points = [];
//       points.push(
//         new THREE.Vector3((gridLines * sizeHeight) / 2, 0, i * sizeHeight),
//       );
//       points.push(
//         new THREE.Vector3(-(gridLines * sizeHeight) / 2, 0, i * sizeHeight),
//       );

//       const geometry = new THREE.BufferGeometry().setFromPoints(points);
//       const lines = new THREE.Line(geometry, lineMat);

//       lineGroup.add(lines);
//     }

//     return <primitive {...props} object={lineGroup} />;
//   }
