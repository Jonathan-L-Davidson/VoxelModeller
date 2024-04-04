import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Alert from '../components/Alert';
import ListGroup from '../components/ListGroup';
import 'bootstrap/dist/css/bootstrap.css';

function Hello() {
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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
