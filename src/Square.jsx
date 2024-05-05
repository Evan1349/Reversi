import React from 'react';
import './App.css';

function Square({ value, onSquareClick }) {
  
  let display;
  if (value === 'black') {
    display = <div className='black-piece'></div>;
  } else if (value === 'white') {
    display = <div className='white-piece'></div>;
  } else {
    display = null;
  }

  return (
    <button className='square' onClick={onSquareClick}>
      {display}
    </button>
  );
}

export default Square;
