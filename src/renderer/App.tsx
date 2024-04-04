import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import ListGroup from '../components/ListGroup';
import 'bootstrap/dist/css/bootstrap.css';

function Hello() {
  const items = ['New York', 'San Francisco', 'Tokyo', 'London', 'Paris'];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
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
