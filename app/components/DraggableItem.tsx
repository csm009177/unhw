// components/DraggableItem.tsx

'use client'
import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

interface DraggableItemProps {
  name: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ name }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.ITEM, name },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
      {name}
    </div>
  );
};

export default DraggableItem;
