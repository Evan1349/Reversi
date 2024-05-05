import React from 'react';
import Square from './Square';
import CalculateWinner from './CalculateWinner';
import './App.css';

function Board({ size, squares, onPlay }) {
  const [blackIsNext, setBlackIsNext] = React.useState(true);

  const handleClick = (row, col) => {
    if (CalculateWinner(squares, size) || squares[row][col]) {
      return;
    }

    const nextSquares = squares.map((rowArr) => [...rowArr]);

    // 定义8个方向的偏移量
    const directions = [
      { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
      { row: 0, col: -1 },                      { row: 0, col: 1 },
      { row: 1, col: -1 }, { row: 1, col: 0 }, { row: 1, col: 1 }
    ];

    let canPlay = false; // 标记是否至少有一个方向上可以吃子

    for (const dir of directions) {
      let [i, j] = [row + dir.row, col + dir.col];
      let shouldFlip = false;
      let count = 0;

      while (i >= 0 && i < size && j >= 0 && j < size && squares[i][j]) {
        if (squares[i][j] === (blackIsNext ? 'black' : 'white')) {
          shouldFlip = true;
          break;
        }
        i += dir.row;
        j += dir.col;
        count++;
      }

      if (shouldFlip && count > 0) {
        i = row + dir.row;
        j = col + dir.col;
        while (count-- > 0) {
          nextSquares[i][j] = blackIsNext ? 'black' : 'white';
          i += dir.row;
          j += dir.col;
        }
        canPlay = true; // 在至少一个方向上可以吃子
      }
    }

    if (!canPlay) {
      return; // 如果所有方向上都无法吃子，则禁止落子
    }

    nextSquares[row][col] = blackIsNext ? 'black' : 'white';
    onPlay(nextSquares);
    setBlackIsNext(!blackIsNext);
  };

  const winner = CalculateWinner(squares, size);
  let status;

  
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    const currentPlayer = blackIsNext ? '\u25CF' : '\u25CB';
    status = 'Next player: ' + currentPlayer; 
  }

  return (
    <div className='board'>
      <div className='status'>{status}</div>
      {squares.map((row, rowIndex) => (
        <div key={rowIndex} className='board-row'>
          {row.map((square, colIndex) => (
            <Square
              key={colIndex}
              value={square}
              onSquareClick={() => handleClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
