const Ship = require('../src/ship.js');
const Gameboard = () => {
  let board;
  const createBoard = (size) => {
    board = Array(size)
      .fill(null)
      .map((x) => Array(size).fill(null));
  };
  const getBoard = () => board;
  //   const placeShip = (shipLength, startX, startY, stopX, stopY) {
  //     const ship = Ship(shipLength);
  //   }
  return { createBoard, getBoard };
};

// const gameboard = Gameboard();
// gameboard.createBoard(10);
// console.log(gameboard.getBoard());

module.exports = Gameboard;
