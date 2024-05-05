import React, { useState } from 'react';
import Board from './Board';
import './App.css';

function Game() {
  const size = 8;
  // 初始化棋盤
  const initialSquares = Array.from({ length: size }, (_, rowIndex) =>
    Array.from({ length: size }, (_, colIndex) =>
      (rowIndex === 3 && colIndex === 3) || (rowIndex === 4 && colIndex === 4) ? 'black' :
      (rowIndex === 3 && colIndex === 4) || (rowIndex === 4 && colIndex === 3) ? 'white' :
      null
    )
  );
  const [history, setHistory] = useState([initialSquares]);
  const [currentMove, setCurrentMove] = useState(0);
  const [blackIsNext, setBlackIsNext] = useState(true);
  const currentSquares = history[currentMove];

  // 處理落子事件
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setBlackIsNext(!blackIsNext);
  }

  // 切換至特定步驟
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setBlackIsNext(nextMove % 2 === 0);
  }

  // 產生移動步驟列表
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board size={size} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
