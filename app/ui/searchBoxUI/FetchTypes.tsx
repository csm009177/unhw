'use client'

import React from 'react';

interface TypeButtonProps {
  type: string;
  onClick: () => void;
}

const TypeButton: React.FC<TypeButtonProps> = ({ type, onClick }) => {
  return (
    <button onClick={onClick} style={{ width: 'auto' }}>
      {type}
    </button>
  );
};

export default TypeButton;