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
  let missedHits = [];
  let shipsOnBoard = [];
  let accurateHits = [];
  const createBoard = ((size) => {
    board = Array(size)
      .fill(null)
      .map((x) => Array(size).fill(null));
  })(8);
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
gameboard.placeShip(3, 3, 3, 'vertical');
const board = gameboard.getBoard();
const ship = board[3][3];

console.log(gameboard.gameOver());
console.log(ship.getHits());

gameboard.receiveAttack(3, 3);
console.log(ship.isSunk());
console.log(ship.getHits());

gameboard.receiveAttack(3, 3);
gameboard.receiveAttack(3, 3);
console.log(ship.getHits());
console.log(ship.isSunk());
console.log(gameboard.getHitRecords());
