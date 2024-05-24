import './main.css';
import Three from '../../components/Three';
import VoxelScene from '../../components/Voxel/VoxelScene';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function GetMainModule() {
  const voxelScene = new VoxelScene();
  return (
    <div className="container">
      <div className="grid-sidebar">
        <Sidebar voxelScene={voxelScene} />
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
