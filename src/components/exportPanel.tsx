import React from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown, { Option } from 'react-dropdown';
import { OBJExporter } from '../addons/exporters/OBJExporter';
import { GLTFExporter } from '../addons/exporters/GLTFExporter';
import { STLExporter } from '../addons/exporters/STLExporter';
import 'react-dropdown/style.css';
import './container.css';

const exportersDropdown = [
  { value: '0', label: 'OBJ' },
  { value: '1', label: 'GLTF' },
  { value: '2', label: 'STL' },
];

const exporters = [OBJExporter, GLTFExporter, STLExporter];

const defaultSelection = exportersDropdown[0];

let selectedExporter = new exporters[0]();
let selectedOption: number;
let fileName: string = 'test';

function DropdownChanged(event: Option) {
  selectedOption = Number.parseInt(event.value, 10);

  selectedExporter = new exporters[selectedOption]();
}

// Creates a hidden element to handle links in the html page, sourced from: https://threejs.org/examples/misc_exporter_obj.html
const link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link);

function prepareFile(contents) {
  return new Blob([contents], { type: 'text/plain' });
}

function saveFile(voxelScene) {
  console.log(selectedExporter);
  console.log(voxelScene);

  const parsedInfo = selectedExporter.parse(voxelScene.voxelGroup);
  let fileNameCompiled: string = fileName;
  fileNameCompiled += '.';
  fileNameCompiled += exportersDropdown[selectedOption].label.toLowerCase();

  link.href = URL.createObjectURL(prepareFile(parsedInfo));
  link.download = fileNameCompiled;
  link.click();
}

export default function ExportDropdown(props) {
  return (
    <div className="dropdownContainer">
      <Dropdown
        options={exportersDropdown}
        onChange={DropdownChanged}
        value={defaultSelection}
        className="dropdownItemLarge"
      />
      <Button
        variant="light"
        onClick={() => {
          saveFile(props.voxelScene);
        }}
      >
        Export
      </Button>
    </div>
  );
}

// export default { ExportDropdown };
