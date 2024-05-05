function CalculateWinner(squares, size) {
  let blackCount = 0;
  let whiteCount = 0;
  let emptyCount = 0;

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

  // 考慮初始四顆子的情況
  const initialCount = 0;
  if (size === 8 && blackCount + whiteCount === size * size - initialCount) {
    if (blackCount > whiteCount) {
      return 'Black';
    } else if (whiteCount > blackCount) {
      return 'White';
    } else {
      return 'Draw';
    }
  }

  if (emptyCount === 0) {
    if (blackCount > whiteCount) {
      return 'Black';
    } else if (whiteCount > blackCount) {
      return 'White';
    } else {
      return 'Draw';
    }
  } else {
    return null;
  }
}

export default CalculateWinner;
