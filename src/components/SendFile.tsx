function prepareFile(contents) {
  return new Blob([contents], { type: 'text/plain' });
}

export default function SendFileToClient(contents, fileName) {
  // Creates a hidden element to handle links in the html page, sourced from: https://threejs.org/examples/misc_exporter_obj.html
  const link = document.createElement('a');
  link.style.display = 'none';
  document.body.appendChild(link);

  link.href = URL.createObjectURL(prepareFile(contents));
  link.download = fileName;
  link.click();

  link.remove();
}
