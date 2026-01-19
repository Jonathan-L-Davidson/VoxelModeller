import React, {useState} from 'react';
import type * as CSS from 'csstype';
import Button from 'react-bootstrap/esm/Button';
import { faDownload, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExportDropdown from './exportPanel';

import './Sidebar.css';
import './swatch.css';
import MaterialReference from '../Voxel/MaterialReference';


function Footer() {
  return (
    <>
      <p>Created by Jonathan Davidson</p>
      <a
        href="www.jonathan-davidson.co.uk"
        target="_blank"
        rel="noopener noreferrer"
      >
        www.jonathan-davidson.co.uk
      </a>
    </>
  );
}


function SwatchList({voxelScene, selectedColor}) {

  const [colorList, setColorList] = useState(new Map<string, MaterialReference>());

  function OnColorAdded(newColorList) {
    setColorList(new Map(newColorList));
  }

  function OnColorRemoved(newColorList) {
    setColorList(new Map(newColorList));
  }

  voxelScene.eventSubscriber.OnColorAdded = OnColorAdded;
  voxelScene.eventSubscriber.OnColorRemoved = OnColorRemoved;

  const itemStyle: CSS.Properties = {
    display: 'flex',
    border: '4px',
    width: '30px',
    height: '30px',
    borderColor: 'whitesmoke',
    clear: 'both',
    backgroundColor: '#d98d26'

  }

  let htmlResults = [];

  function ChangeColor(color){
    console.log("OnClick(): %s", color);
    voxelScene.currentColor = color;
    selectedColor.color = color;
  }

  function OutputSwatchBlock(material, key, map){
    console.log(key);
    var tempStyle = structuredClone(itemStyle); // Copying the type, found info here https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
    tempStyle.backgroundColor = key;
    htmlResults.push(<div className='swatchItem' style={tempStyle} onClick={() => {ChangeColor(key)}}/>);
  }

  colorList.forEach(OutputSwatchBlock);

  return (
    <>
      <div className='swatchGrid'>
        {htmlResults}
      </div>
    </>
  )

}

export default class Sidebar extends React.Component {
  private voxelScene;
  private selectedColor;

  constructor(props) {
    super(props);
    this.voxelScene = props.voxelScene;
    this.selectedColor = { color: null};
  }

  render() {
    return (
      <div className="flexBoxVertical">
        <div className="item">
          <div className="exportBox">
            <p>Export Model</p>
            <div>
              <ExportDropdown voxelScene={this.voxelScene} />
            </div>
          </div>
        </div>
        <div className="itemSecondToLast">
          <div className="saveLoadBox">
            <Button
              type="button"
              className="btn btn-primary largeText"
              onClick={() => {
                this.voxelScene.LoadScene();
              }}
            >
              <FontAwesomeIcon icon={faDownload} /> Load
            </Button>
            <Button
              type="button"
              className="btn btn-primary largeText"
              onClick={() => {
                this.voxelScene.SaveScene();
              }}
            >
              <FontAwesomeIcon icon={faFloppyDisk} /> Save
            </Button>
          </div>
        </div>
        <div className="colorPicker">
          <input type="color" id="html5colorpicker" onChange={(value) => {
            //console.log("Value changed: ", value.target.value);
            this.voxelScene.currentColor = value.target.value;
          }} value={this.selectedColor.color} defaultValue={"#d98d26"} />
        </div>
        <div className="swatchPanel">
          <SwatchList voxelScene={this.voxelScene} selectedColor={this.selectedColor} />
        </div>
        <div className="item">
          <div className="footer">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
