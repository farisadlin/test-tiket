import React from 'react';
import XIcon from '../styles/images/x.svg';
import OIcon from '../styles/images/o.svg';

const Square = ({ value, handleClick }) => {
  return (
    <button className="square" onClick={handleClick}>
      {value === 'X' ? <img src={XIcon} alt="X" /> : value === 'O' ? <img src={OIcon} alt="O" /> : null}
    </button>
    );
};

export default Square;