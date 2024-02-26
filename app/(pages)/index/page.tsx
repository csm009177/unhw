// pages/index.tsx
'use client'

import React, { useState } from 'react';
import DraggableItem from '../../components/DraggableItem';
import DropBox from '../../components/DropBox';

const IndexPage: React.FC = () => {
  const [droppedItems, setDroppedItems] = useState<string[]>([]);

  const handleDrop = (item: any) => {
    setDroppedItems(prevItems => [...prevItems, item.name]);
  };

  return (
    <div>
      <h1>Drag and Drop Example</h1>
      <DropBox onDrop={handleDrop}>
        {droppedItems.map((itemName, index) => (
          <div key={index}>{itemName}</div>
        ))}
      </DropBox>
      <div style={{ marginTop: '20px' }}>
        <DraggableItem name="Item 1" />
        <DraggableItem name="Item 2" />
        <DraggableItem name="Item 3" />
      </div>
    </div>
  );
};

export default IndexPage;
