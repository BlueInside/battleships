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
  let shipsOnBoard = [];
  const createBoard = (size) => {
    board = Array(size)
      .fill(null)
      .map((x) => Array(size).fill(null));
  };
  const getBoard = () => board;
  const placeShip = (shipLength, startX, startY, direction) => {
    if (!direction) throw new Error('direction must be provided');
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

      for (let y = startY; y < startY + shipLength; y++) {
        board[y][startX] = ship;
      }
    }
    shipsOnBoard.push(ship);
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

  const gameOver = () => {
    let sunkShips = 0;
    console.log(shipsOnBoard.length, sunkShips);
    shipsOnBoard.forEach((ship) => {
      console.log(ship.isSunk());
      if (ship.isSunk()) sunkShips += 1;
    });
    if (sunkShips === shipsOnBoard.length) return true;
    else return false;
  };
  return {
    createBoard,
    getBoard,
    placeShip,
    getHitRecords,
    receiveAttack,
    gameOver,
  };
};

const gameboard = Gameboard();
gameboard.createBoard(8);
gameboard.placeShip(1, 3, 3, 'vertical');
console.log(gameboard.gameOver());
gameboard.receiveAttack(3, 3);
console.log(gameboard.gameOver());
module.exports = Gameboard;
