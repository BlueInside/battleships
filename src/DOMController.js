function initializeGame(player1, player2) {
  // Place ships for player1 and player2
  player1.placeShip(5, 5, 1, 'vertical');
  player1.placeShip(4, 2, 7, 'horizontal');
  player1.placeShip(3, 7, 4, 'horizontal');
  player1.placeShip(3, 2, 1, 'vertical');
  player1.placeShip(2, 1, 5, 'horizontal');
  player1.placeShip(2, 8, 9, 'horizontal');

  player2.placeShip(5, 4, 7, 'horizontal');
  player2.placeShip(4, 5, 4, 'horizontal');
  player2.placeShip(3, 1, 6, 'horizontal');
  player2.placeShip(2, 4, 8, 'horizontal');
  player2.placeShip(3, 3, 1, 'vertical');
  player2.placeShip(2, 7, 1, 'vertical');
}

function renderPlayerBoards(player1, player2) {
  const player1Board = player1.getBoard();
  const player2Board = player2.getBoard();
  const player1BoardElement = document.getElementById('player1-board-display');
  const player2BoardElement = document.getElementById('player2-board-display');

  player1BoardElement.innerText = '';
  player2BoardElement.innerText = '';
  player1BoardElement.appendChild(generateBoardHTML(player1Board));
  player2BoardElement.appendChild(generateBoardHTML(player2Board));
}

function generateBoardHTML(board) {
  const gameboard = document.createElement('div');
  gameboard.classList.add('playerBoard');
  for (let row = 0; row < board.length; row++) {
    const divRow = document.createElement('div');
    divRow.classList.add('row');
    for (let col = 0; col < board[row].length; col++) {
      // Create each cell content
      const cell = document.createElement('div');
      cell.textContent = `X`;
      cell.classList.add('cell');
      divRow.appendChild(cell);
    }
    gameboard.appendChild(divRow);
  }
  return gameboard;
}
module.exports = { initializeGame, renderPlayerBoards };
