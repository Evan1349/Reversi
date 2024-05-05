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

  if (size === 8 && blackCount + whiteCount === size * size) {
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
