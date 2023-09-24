const containsArray = require('./utility/containsArray');

function initializeGame(player1, player2) {
  // Place ships for player1

  // Place ships for player2
  player2.placeShip(5, 4, 7, 'horizontal');
  player2.placeShip(4, 5, 4, 'horizontal');
  player2.placeShip(3, 1, 6, 'horizontal');
  player2.placeShip(2, 4, 8, 'horizontal');
  player2.placeShip(3, 3, 1, 'vertical');
  player2.placeShip(2, 7, 1, 'vertical');
}

function showNotification(message) {
  const notificationContainer = document.getElementById(
    'notification-container'
  );
  const notificationText = document.getElementById('notification-text');

  // Set the notification text
  notificationText.innerText = message;

  // Show notification container
  notificationContainer.classList.remove('hidden');

  // Hide the notification after a few seconds
  setTimeout(() => {
    notificationContainer.classList.add('hidden');
  }, 3000);
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
    generateBoardHTML(player2, (displayShips = false))
  );
}

function generateBoardHTML(player, displayShips) {
  const board = player.getBoard();
  const missedHits = player.getMissedHits();
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
      if (currentCell && currentCell.isSunk()) {
        cellHTML.classList.add('sunk');

        // Set the sunk cell text content to X
        cellHTML.innerText = 'X';
      }
      if (isMissed) cellHTML.classList.add('miss');
      else if (isSuccessful) cellHTML.classList.add('hit');
      cellHTML.classList.add('cell');

      // Add cords X and Y as dataset;
      cellHTML.dataset.cordX = col;
      cellHTML.dataset.cordY = row;

      // Append the cell to the current row
      rowHTML.appendChild(cellHTML);
    }

    // Append the current row to the gameboard
    gameboard.appendChild(rowHTML);
  }
  // Return the gameboard containing all rows and cells
  return gameboard;
}

// Add event listeners on enemy gameboard cells
function addEnemyGameboardListeners() {
  const cpuCells = document.querySelectorAll('#player2-board-display .cell');
  cpuCells.forEach((cell) => {
    cell.addEventListener('click', () => {
      const cordX = Number(cell.dataset.cordX);
      const cordY = Number(cell.dataset.cordY);
      const shootEvent = new CustomEvent('shoot', { detail: { cordX, cordY } });
      document.dispatchEvent(shootEvent);
    });
  });
}

module.exports = {
  initializeGame,
  renderPlayerBoards,
  addEnemyGameboardListeners,
  showNotification,
};
