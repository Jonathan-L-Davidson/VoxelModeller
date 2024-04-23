import './main.css';
import Three from '../../components/Three';

export default function GetMainModule() {
  // const [toolPanelWidth, SetToolPanelWidth] = useState('30%');

  return (
    <div className="container">
      <div className="grid-sidebar">
        <p>Sidebar</p>
      </div>
      <div className="grid-slider">
        <div className="grey" />
      </div>
      <div className="grid-three">
        <div className="threeJS-wrapper">
          <Three />
        </div>
      </div>
    </div>
  );
}
