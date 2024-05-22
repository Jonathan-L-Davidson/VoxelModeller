import './main.css';
import { useRef } from 'react';
import Three from '../../components/Three';
import ExportDropdown from '../../components/exportPanel';
import VoxelScene from '../../components/Voxel/VoxelScene';

export default function GetMainModule() {
  const voxelScene = new VoxelScene();
  // const [toolPanelWidth, SetToolPanelWidth] = useState('30%');
  return (
    <div className="container">
      <div className="grid-sidebar">
        <p>Sidebar</p>
        <ExportDropdown voxelScene={voxelScene} />
      </div>
      <div className="grid-slider">
        <div className="grey" />
      </div>
      <div className="grid-three">
        <div className="threeJS-wrapper">
          <Three voxelScene={voxelScene} />
        </div>
      </div>
    </div>
  );
}
