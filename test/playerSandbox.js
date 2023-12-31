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
  const createBoard = ((size) => {
    board = Array(size)
      .fill(null)
      .map((x) => Array(size).fill(null));
  })(8);

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

  const getHitRecords = () => hitRecords;
  const receiveAttack = (cordX, cordY) => {
    const targetedCell = board[cordY][cordX];
    if (targetedCell === null) {
      hitRecords.push([cordX, cordY]);
    } else if (targetedCell.isShip) {
      targetedCell.hit();
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
    createBoard,
    getBoard,
    placeShip,
    getHitRecords,
    receiveAttack,
    gameOver,
  };
};

const containsArray = (matrix, targetArray) => {
  for (let index = 0; index < matrix.length; index++) {
    if (
      matrix[index][0] === targetArray[0] &&
      matrix[index][1] === targetArray[1]
    )
      return true;
  }
  return false;
};

// dependency classes
const Player = () => {
  let gameboard = Gameboard();

  const shoot = (cordX, cordY, enemy) => {
    enemy.receiveAttack(cordX, cordY);
  };

  const isLegal = (cordX, cordY, enemy) => {
    const enemyHitRecords = enemy.getHitRecords();
    const isLegal = !containsArray(enemyHitRecords, [cordX, cordY]);
    return isLegal;
  };

  const cpuMove = (enemy) => {
    let cordX = Math.floor(Math.random() * 8);
    let cordY = Math.floor(Math.random() * 8);
    if (isLegal(cordX, cordY, enemy)) shoot(cordX, cordY, enemy);
    else cpuMove(enemy);
  };

  const { placeShip, getHitRecords, receiveAttack, getBoard } = gameboard;
  return { placeShip, getHitRecords, receiveAttack, shoot, getBoard, cpuMove };
};

const player2 = Player();
function placeCPUShips() {
  const shipLengths = [5, 4, 3, 3, 2];
  const boardSize = player2.getBoard().length;

  shipLengths.forEach((shipLength) => {
    while (true) {
      const startX = Math.floor(Math.random() * boardSize);
      const startY = Math.floor(Math.random() * boardSize);
      const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';

      if (
        direction === 'horizontal' &&
        startX + shipLength < boardSize &&
        !shipsOverlap(shipLength, startX, startY, direction)
      ) {
        player2.placeShip(shipLength, startX, startY, direction);
        break;
      } else if (
        direction === 'vertical' &&
        startY + shipLength < boardSize &&
        !shipsOverlap(shipLength, startX, startY, direction)
      ) {
        player2.placeShip(shipLength, startX, startY, direction);
        break;
      }
    }
  });
}

function shipsOverlap(shipLength, startX, startY, direction) {
  const board = player2.getBoard();

  if (direction === 'horizontal') {
    for (let i = startX; i < startX + shipLength; i++) {
      const currentCell = board[startY][i];
      if (currentCell !== null) return true;
    }
  } else if (direction === 'vertical') {
    for (let i = startY; i < startY + shipLength; i++) {
      const currentCell = board[i][startX];
      if (currentCell !== null) return true;
    }
  }
  return false;
}
console.log(player2.getBoard())
placeCPUShips();
console.log(player2.getBoard())

