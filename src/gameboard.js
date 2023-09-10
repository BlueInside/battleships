const Ship = require('../src/ship.js');
const containsArray = require('../src/utility/containsArray.js');
const Gameboard = () => {
  let board;
  let missedHits = [];
  let accurateHits = [];
  let shipsOnBoard = [];
  const createBoard = ((size) => {
    board = Array(size)
      .fill(null)
      .map((x) => Array(size).fill(null));
  })(10);

  const getBoard = () => board;

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

  const getHitRecords = () => missedHits;
  const receiveAttack = (cordX, cordY) => {
    const targetedCell = board[cordY][cordX];
    // do nothing when same cell is being shoot twice
    if (
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
  };
};

module.exports = Gameboard;
