function CalculateWinner(squares) {
  let blackCount = 0;
  let whiteCount = 0;
  let emptyCount = 0;

  // 遍歷2維陣列，紀錄黑子、白子和空格的數目
  squares.forEach(row => {
    row.forEach(square => {
      if (square === 'black') {
        blackCount++;
      } else if (square === 'white') {
        whiteCount++;
      } else {
        emptyCount++;
      }
    });
  });
  
  // 下完棋盤後計算勝負
  if (emptyCount === 0) {
    if (blackCount > whiteCount) {
      return 'Black';
    } else if (whiteCount > blackCount) {
      return 'White';
    } else {
      return 'Draw';
    }
  } else {
    return null; // 若棋盤仍有空格，則返回null，表示遊戲尚未結束
  }
}

export default CalculateWinner;
