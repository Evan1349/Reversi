import React,{useState} from 'react';
import Square from './Square';
import CalculateWinner from './CalculateWinner';
import './App.css';

function Board({ size, squares, onPlay }) {
  const [blackIsNext, setBlackIsNext] = useState(true);

  const handleClick = (row, col) => {
    if (CalculateWinner(squares) || squares[row][col]) {
      return;
    }

    const nextSquares = squares.map((rowArr) => [...rowArr]);

    // 定義8個向量
    const directions = [
      { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
      { row: 0, col: -1 },                      { row: 0, col: 1 },
      { row: 1, col: -1 }, { row: 1, col: 0 }, { row: 1, col: 1 }
    ];

    // 初始化為不可落子
    let canPlay = false; 
    // 檢查每個方向是否有可以吃子的情況
    for (const dir of directions) {                   // 對於每個方向進行迭代，directions 包含了所有可能的八個方向
      let [i, j] = [row + dir.row, col + dir.col];    // 計算下一個位置的坐標，dir.row 和 dir.col 分別表示在該方向上的行和列偏移量
      let shouldFlip = false;                         // 是否應該翻轉棋子的標誌，如果這個方向上有可以吃的對方棋子，則設為 true
      let count = 0;                                  // 計數器，用於統計該方向上可以吃的對方棋子的個數

      // 開始循環，直到超出棋盤範圍或者遇到空的方格
      while (i >= 0 && i < size && j >= 0 && j < size && squares[i][j]) {
        // 如果下一個方格的顏色與當前玩家的顏色相反，則可以吃子，設置 shouldFlip 為 true，並跳出循環
        if (squares[i][j] === (blackIsNext ? 'black' : 'white')) {
          shouldFlip = true;
          break;
        }
        // 更新 i 和 j 的值，移動到下一個相鄰的方格
        i += dir.row;
        j += dir.col;
        count++;   // 遞增計數器，用於統計該方向上可以吃的對方棋子的個數
      }

      // 如果該方向上存在可以吃的對方棋子並且有一個以上，則進行棋子翻轉
      if (shouldFlip && count > 0) {
        i = row + dir.row; // 回到最初的位置
        j = col + dir.col; // 回到最初的位置
        // 開始進行棋子翻轉，將該方向上所有的對方棋子都翻轉成當前玩家的顏色
        while (count-- > 0) {
          // 將該位置的棋子翻轉為當前玩家的顏色
          nextSquares[i][j] = blackIsNext ? 'black' : 'white'; // 將該位置的棋子翻轉為當前玩家的顏色
          // 移動到下一個相鄰的方格
          i += dir.row;
          j += dir.col;
        }
        canPlay = true; // 在至少一個方向上可以吃子，設置 canPlay 為 true
      }
    }
    if (!canPlay) {
      return; // 如果所有方向上都無法吃子，則禁止落子
    }

    nextSquares[row][col] = blackIsNext ? 'black' : 'white';  // 將當前位置的棋子顏色設置為當前玩家的顏色
    onPlay(nextSquares);                                      // 呼叫 onPlay 函數，將更新後的棋盤傳遞給Game組件，通知棋盤已經更新
    setBlackIsNext(!blackIsNext);                             // 切換玩家，如果當前是黑棋的回合，則設置為白棋的回合；如果當前是白棋的回合，則設置為黑棋的回合
  };

  // 計算勝利者
  const winner = CalculateWinner(squares);
  let status;

   // 根據是否有勝利者來設置狀態
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    // 根據當前玩家來設置下一步是誰的回合
    const currentPlayer = blackIsNext ? '\u25CF' : '\u25CB';
    status = 'Next player: ' + currentPlayer; 
  }

  return (
    <div className='board'>
      <div className='status'>{status}</div>
      {/* 渲染棋盤 */}
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
