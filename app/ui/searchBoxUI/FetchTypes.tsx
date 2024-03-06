'use client'

import React from 'react';

interface TypeButtonProps {
  type: string;
}

const TypeButton: React.FC<TypeButtonProps> = ({ type }) => {
  const handleClick = () => {
    
  }

  return (
    <button onClick={handleClick} style={{ width: 'auto' }}>
      {type}
    </button>
  );
};

export default TypeButton;