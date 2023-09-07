const containsArray = (matrix, targetArray) => {
  for (let index = 0; index < matrix.length; index++) {
    console.log(matrix[index]);
    if (
      matrix[index][0] === targetArray[0] &&
      matrix[index][1] === targetArray[1]
    )
      return true;
  }
  return false;
};

const Ship = (length) => {
  let hits = 0;

  const isShip = true;

  const hit = () => (hits += 1);

  const getHits = () => hits;

  const isSunk = () => (getHits() === length ? true : false);

  return { hit, getHits, isSunk, isShip };
};

const Gameboard = () => {
  let board;
  let hitRecords = [];
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
  const getHitRecords = () => hitRecords;
  const receiveAttack = (cordX, cordY) => {
    const targetedCell = board[cordY][cordX];
    console.log(board[cordY][cordX]);
    if (targetedCell === null) {
      hitRecords.push([cordX, cordY]);
    } else if (targetedCell.isShip) {
      targetedCell.hit();
    }
  };
  return { createBoard, getBoard, placeShip, getHitRecords, receiveAttack };
};

const gameboard = Gameboard();
gameboard.createBoard(8);
gameboard.placeShip(4, 3, 3, 'vertical');
const board = gameboard.getBoard();
const ship = board[4][3];
console.log(ship);
console.log(ship.getHits());
gameboard.receiveAttack(3, 4);
console.log(ship.getHits());
module.exports = Gameboard;
