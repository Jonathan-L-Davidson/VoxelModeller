import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { faDownload, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExportDropdown from './exportPanel';
import './Sidebar.css';

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

export default class Sidebar extends React.Component {
  private voxelScene;

  constructor(props) {
    super(props);
    this.voxelScene = props.voxelScene;
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
        <div className="item">
          <p className="footer">
            <Footer />
          </p>
        </div>
      </div>
    );
  }
}
