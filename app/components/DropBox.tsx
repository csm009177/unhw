// components/DropBox.tsx
'use client'

import React from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

interface DropBoxProps {
  onDrop: (item: any) => void;
}

const DropBox: React.FC<DropBoxProps> = ({ onDrop, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop: (item: any, monitor: DropTargetMonitor) => {
      onDrop(item);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} style={{ border: '1px dashed black', padding: '20px', backgroundColor: isOver ? 'lightgray' : 'transparent' }}>
      {children}
    </div>
  );
};

export default DropBox;
