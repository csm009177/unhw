import { useState } from 'react';
import '../App.css';

function Main() {
  const [isOpen, setIsOpen] = useState(true);
  const [,] = useState("")
  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const createButton = () => {
    
  }

  return (
    <div className="Main">
      {isOpen && (
        <div className="Left-var">
          <ul>
            <p>unhw</p>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      )}
      <button onClick={toggleList}>{isOpen ? '◀' : '▶'}</button>
    </div>
  );
}

export default Main;
