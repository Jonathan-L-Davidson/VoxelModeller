import SplitPane, { Pane } from 'split-pane-react';
import { useState } from 'react';
import Alert from '../../components/Alert';
import ListGroup from '../../components/ListGroup';
import 'bootstrap/dist/css/bootstrap.css';

export default function GetMainModule() {
  return (
    <div>
      <HelloWorld />
    </div>
  );
}

// Deprecated, do not use, was used for understanding react with a tutorial.
function HelloWorld() {
  const items = ['New York', 'San Francisco', 'Tokyo', 'London', 'Paris'];
  const [selectedCity, setSelectedCity] = useState('Warning');

  const [alertVisible, setAlertVisability] = useState(true);
  const HandleAlertButton = () => setAlertVisability(false);

  const handleSelectItem = (item: string) => {
    setSelectedCity(item);
    setAlertVisability(true);
  };

  return (
    <div>
      {alertVisible && (
        <Alert onClickedOn={HandleAlertButton}>
          <strong>{selectedCity}!</strong>
        </Alert>
      )}

      <ListGroup items={items} title="Cities" onSelectItem={handleSelectItem} />
    </div>
  );
}
