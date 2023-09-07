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

  const shoot = (cordX, cordY, enemyPlayer) => {
    enemyPlayer.receiveAttack(cordX, cordY);
  };
  const { placeShip, getHitRecords, receiveAttack, getBoard } = gameboard;
  return { placeShip, getHitRecords, receiveAttack, shoot, getBoard };
};

const player1 = Player();
const player2 = Player();

player1.placeShip(4, 7, 3, 'vertical');
player2.placeShip(4, 2, 1, 'horizontal');

//accurate hits
const player1Ship = player1.getBoard()[3][7];
const player2Ship = player2.getBoard()[1][2];

console.log(player1Ship, player2Ship);
console.log(player1Ship.getHits(), player2Ship.getHits());
player1Ship.getHits();
console.log(player1Ship.getHits(), player2Ship.getHits());
player2Ship.getHits();
console.log(player1Ship.getHits(), player2Ship.getHits());

player1.shoot(2, 1, player2);
console.log(player2Ship.getHits());
player2Ship.getHits();

player2.shoot(7, 3, player1);
console.log(player1Ship.getHits());
player1Ship.getHits();
