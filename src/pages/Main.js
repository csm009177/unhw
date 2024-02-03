import { useState } from 'react';
import '../App.css';

function Main() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="Main">
      {isOpen && (
        <div className="Left-var">
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      )}
      <button onClick={toggleList}>{isOpen ? '<<' : '>>'}</button>
    </div>
  );
}

export default Main;
