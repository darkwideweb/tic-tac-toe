import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const InfoButton = ({ onClick }) => {
  return (
    <button className="info-button" onClick={onClick}>
      <FaInfoCircle />
    </button>
  );
};

export default InfoButton;
