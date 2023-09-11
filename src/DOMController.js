const containsArray = require('./utility/containsArray');

function initializeGame(player1, player2) {
  // Place ships for player1
  player1.placeShip(5, 5, 1, 'vertical');
  player1.placeShip(4, 2, 7, 'horizontal');
  player1.placeShip(3, 7, 4, 'horizontal');
  player1.placeShip(3, 2, 1, 'vertical');
  player1.placeShip(2, 1, 5, 'horizontal');
  player1.placeShip(2, 8, 9, 'horizontal');

  // Place ships for player2
  player2.placeShip(5, 4, 7, 'horizontal');
  player2.placeShip(4, 5, 4, 'horizontal');
  player2.placeShip(3, 1, 6, 'horizontal');
  player2.placeShip(2, 4, 8, 'horizontal');
  player2.placeShip(3, 3, 1, 'vertical');
  player2.placeShip(2, 7, 1, 'vertical');
}

function renderPlayerBoards(player1, player2) {
  const player1BoardElement = document.getElementById('player1-board-display');
  const player2BoardElement = document.getElementById('player2-board-display');

  // Clean boards content
  player1BoardElement.innerText = '';
  player2BoardElement.innerText = '';

  // Generate boards based on player objects
  let displayShips = true;
  player1BoardElement.appendChild(generateBoardHTML(player1, displayShips));
  player2BoardElement.appendChild(
    generateBoardHTML(player2, (displayShips = true))
  );
}
function generateBoardHTML(player, displayShips) {
  const board = player.getBoard();
  const missedHits = player.getHitRecords();
  const successfulHits = player.getSuccessfulHits();
  const gameboard = document.createElement('div');

  gameboard.classList.add('playerBoard');

  // Iterate through rows
  for (let row = 0; row < board.length; row++) {
    const rowHTML = document.createElement('div');
    rowHTML.classList.add('row');

    // Iterate through columns in the current row
    for (let col = 0; col < board[row].length; col++) {
      const currentCell = board[row][col];
      const isShip = !!currentCell && displayShips; // Check if the current cell is a ship
      const isMissed = containsArray(missedHits, [col, row]); // Check if the current cell is a missed hit
      const isSuccessful = containsArray(successfulHits, [col, row]); // Check if the current cell is a successful hit

      // Create the HTML element for each cell
      const cellHTML = document.createElement('div');

      // Add appropriate CSS classes based on cell content
      if (isShip) cellHTML.classList.add('ship');
      if (isMissed) cellHTML.classList.add('miss');
      else if (isSuccessful) cellHTML.classList.add('hit');
      cellHTML.classList.add('cell');

      // Set the cell text content to
      cellHTML.innerText = 'X';

      // Append the cell to the current row
      rowHTML.appendChild(cellHTML);
    }

    // Append the current row to the gameboard
    gameboard.appendChild(rowHTML);
  }

  // Return the gameboard containing all rows and cells
  return gameboard;
}

module.exports = { initializeGame, renderPlayerBoards };
