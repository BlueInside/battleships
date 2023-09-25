// player.js - Defines the Player module for managing player moves and actions

const Gameboard = require('../src/gameboard.js');
const containsArray = require('../src/utility/containsArray.js');

const Player = (name) => {
  let gameboard = Gameboard();

  // Shoots enemy board
  const shoot = (cordX, cordY, enemyPlayer) => {
    enemyPlayer.receiveAttack(cordX, cordY);
  };

  // Checks if move is legal, (doesn't shoot same cell twice)
  const isLegal = (cordX, cordY, enemy) => {
    const enemyHitRecords = enemy.getHitRecords();
    const isLegal = !containsArray(enemyHitRecords, [cordX, cordY]);
    return isLegal;
  };

  // Generates a random move for the CPU player and checks if it's a legal move.
  // If not, recursively calls `cpuMove` until a legal move is found.
  const cpuMove = (enemy) => {
    let cordX = Math.floor(Math.random() * 10);
    let cordY = Math.floor(Math.random() * 10);
    if (isLegal(cordX, cordY, enemy)) {
      shoot(cordX, cordY, enemy);
    } else cpuMove(enemy);
  };

  function placeShipsAtRandom() {
    // Define the lengths of the ships to be placed
    const shipLengths = [5, 4, 3, 3, 2];

    // Get the size of the game board
    const boardSize = getBoard().length;

    // Loop through each ship length to place them on the board
    shipLengths.forEach((shipLength) => {
      while (true) {
        // Generate random starting coordinates for the ship
        const startX = Math.floor(Math.random() * boardSize);
        const startY = Math.floor(Math.random() * boardSize);

        // Randomly choose the ship's orientation: horizontal or vertical
        const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';

        // Check if the ship can be placed in the chosen direction without overlap
        if (
          direction === 'horizontal' &&
          startX + shipLength < boardSize && // Ensure it fits within the board horizontally
          !shipsOverlap(shipLength, startX, startY, direction) // Ensure no overlap
        ) {
          // Place the ship on the board and exit the loop
          placeShip(shipLength, startX, startY, direction);
          break;
        } else if (
          direction === 'vertical' &&
          startY + shipLength < boardSize && // Ensure it fits within the board vertically
          !shipsOverlap(shipLength, startX, startY, direction) // Ensure no overlap
        ) {
          // Place the ship on the board and exit the loop
          placeShip(shipLength, startX, startY, direction);
          break;
        }
      }
    });
  }

  function shipsOverlap(shipLength, startX, startY, direction) {
    const board = getBoard();

    if (direction === 'horizontal') {
      // Check each cell the ship will occupy horizontally
      for (let i = startX; i < startX + shipLength; i++) {
        const currentCell = board[startY][i];
        // If the cell is already occupied by another ship, return true (overlap)
        if (currentCell !== null) return true;
      }
    } else if (direction === 'vertical') {
      // Check each cell the ship will occupy vertically
      for (let i = startY; i < startY + shipLength; i++) {
        const currentCell = board[i][startX];
        // If the cell is already occupied by another ship, return true (overlap)
        if (currentCell !== null) return true;
      }
    }

    // If no overlap was found, return false
    return false;
  }

  const {
    placeShip,
    getHitRecords,
    receiveAttack,
    getBoard,
    gameOver,
    getSuccessfulHits,
    getMissedHits,
  } = gameboard;
  return {
    name,
    placeShip,
    getHitRecords,
    receiveAttack,
    shoot,
    getBoard, // Retrieves the player's game board
    cpuMove,
    gameOver,
    getSuccessfulHits,
    getMissedHits,
    placeShipsAtRandom,
  };
};

module.exports = Player; // Export the player module
