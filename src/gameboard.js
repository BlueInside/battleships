const Ship = require('../src/ship.js');
const Gameboard = () => {
  let board;

  const createBoard = (size) => {
    board = Array(size)
      .fill(null)
      .map((x) => Array(size).fill(null));
  };

  const getBoard = () => board;

  const placeShip = (shipLength, startX, startY, direction) => {
    const ship = Ship(shipLength);

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
      console.log('hello');
      for (let y = startY; y < startY + shipLength; y++) {
        board[y][startX] = ship;
      }
    }
  };

  return { createBoard, getBoard, placeShip };
};

module.exports = Gameboard;
