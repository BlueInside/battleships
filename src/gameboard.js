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
      for (let x = startX; x < startX + shipLength; x++) {
        board[startY][x] = ship;
      }
    }
    if (direction === 'vertical') {
      console.log('hello');
      for (let y = startY; y < startY + shipLength; y++) {
        board[y][startX] = ship;
      }
    }
  };

  return { createBoard, getBoard, placeShip };
};

module.exports = Gameboard;
