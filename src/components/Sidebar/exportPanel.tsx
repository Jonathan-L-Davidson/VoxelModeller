import React from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown, { Option } from 'react-dropdown';

import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { OBJExporter } from '../../addons/exporters/OBJExporter';
import { GLTFExporter } from '../../addons/exporters/GLTFExporter';
import { STLExporter } from '../../addons/exporters/STLExporter';

import 'react-dropdown/style.css';
import './container.css';
import SendFileToClient from '../SendFile';

const exportersDropdown = [
  { value: '0', label: 'OBJ' },
  { value: '1', label: 'GLTF' },
  { value: '2', label: 'STL' },
];

const exporters = [OBJExporter, GLTFExporter, STLExporter];

const defaultSelection = exportersDropdown[0];

let selectedExporter = new exporters[0]();
let selectedOption: number = 0;
const fileName: string = 'export';

function DropdownChanged(event: Option) {
  selectedOption = Number.parseInt(event.value, 10);

  selectedExporter = new exporters[selectedOption]();
}

function saveFile(voxelScene) {
  console.log(selectedExporter);
  console.log(voxelScene);

  const parsedInfo = selectedExporter.parse(voxelScene.voxelGroup);
  let fileNameCompiled: string = fileName;
  fileNameCompiled += '.';
  fileNameCompiled += exportersDropdown[selectedOption].label.toLowerCase();

  SendFileToClient(parsedInfo, fileNameCompiled);
}

export default function ExportDropdown(props) {
  return (
    <div className="flexbox">
      <Dropdown
        options={exportersDropdown}
        onChange={DropdownChanged}
        value={defaultSelection}
        className="dropdownItemLarge"
      />
      <Button
        type="button"
        onClick={() => {
          saveFile(props.voxelScene);
          className = 'btn btn-primary';
        }}
      >
        <FontAwesomeIcon icon={faFileExport} /> Export
      </Button>
    </div>
  );
}
