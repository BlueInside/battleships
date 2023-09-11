// gameboard.js - Defines the Gameboard module for managing the game state

const Ship = require('../src/ship.js');
const containsArray = require('../src/utility/containsArray.js');

const Gameboard = () => {
  let board;
  let missedHits = []; // Stores the coordinates of missed hits
  let accurateHits = []; // Stores the coordinates of accurate hits
  let shipsOnBoard = []; // Keeps trac of all ships currently on the board

  // Create 10x10 board filled with null values and initializes game state
  const createBoard = ((size) => {
    board = Array(size)
      .fill(null)
      .map((x) => Array(size).fill(null));
  })(10);

  const getBoard = () => board;

  //Places a ship on the game board based on its length, starting position, and direction
  const placeShip = (shipLength, startX, startY, direction) => {
    const ship = Ship(shipLength);
    if (!direction) throw new Error('direction must be provided');
    if (direction === 'horizontal') {
      if (startX + shipLength > board.length)
        throw new Error('Ship must be placed within board');
      for (let x = startX; x < startX + shipLength; x++) {
        board[startY][x] = ship;
      }
    }
    if (direction === 'vertical') {
      if (startY + shipLength > board.length)
        throw new Error('Ship must be placed within board');

      for (let y = startY; y < startY + shipLength; y++) {
        board[y][startX] = ship;
      }
    }
    shipsOnBoard.push(ship);
  };

  // Retrieves the array of missed hit coordinates
  const getHitRecords = () => missedHits;

  // Handles an attack on the gameboard, recording hits and misses
  const receiveAttack = (cordX, cordY) => {
    const targetedCell = board[cordY][cordX];

    if (
      // Checks if cell was targeted before, does nothing if so
      containsArray(missedHits, [cordX, cordY]) ||
      containsArray(accurateHits, [cordX, cordY])
    ) {
      return;
    } else if (targetedCell === null) {
      missedHits.push([cordX, cordY]);
    } else if (targetedCell.isShip) {
      targetedCell.hit();
      accurateHits.push([cordX, cordY]);
    }
  };

  const getShipsOnBoard = () => shipsOnBoard;

  const getSuccessfulHits = () => accurateHits;

  // Checks if the game is over by verifying if all ships are sunk
  const gameOver = () => {
    let sunkShips = 0;
    shipsOnBoard.forEach((ship) => {
      if (ship.isSunk()) sunkShips += 1;
    });
    if (sunkShips === shipsOnBoard.length) return true;
    else return false;
  };

  return {
    getBoard,
    placeShip,
    getHitRecords,
    receiveAttack,
    gameOver,
    getShipsOnBoard,
    getSuccessfulHits,
  };
};

module.exports = Gameboard; // Export the Gameboard module
