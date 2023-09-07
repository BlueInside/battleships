const Ship = (length) => {
  let hits = 0;

  const hit = () => (hits += 1);

  const getHits = () => hits;

  const isSunk = () => (getHits() === length ? true : false);

  return { hit, getHits, isSunk };
};

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

const gameboard = Gameboard();
gameboard.createBoard(6);
// gameboard.placeShip(3, 0, 0, 'horizontal');
gameboard.placeShip(2, 0, 1, 'vertical');
const board = gameboard.getBoard();

const shootRecords = [];
shootRecords.push([2, 4]);
shootRecords.push([4, 4]);
console.log(
  shootRecords.filter((record) => {
    if (record[0] === 2 && record[1] == 4) return true;
    else return false;
  })
);
module.exports = Gameboard;
