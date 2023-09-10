const Gameboard = require('../src/gameboard.js');
const Ship = require('../src/ship.js');
const containsArray = require('../src/utility/containsArray.js');

describe('Gameboard Factory', () => {
  let gameboard;
  let placeShip;
  beforeEach(() => {
    gameboard = Gameboard();
    placeShip = gameboard.placeShip;
  });

  test('create gameboard object', () => {
    expect(gameboard).not.toBeUndefined();
  });

  test('create board with specific size and cells that are null', () => {
    const board = gameboard.getBoard();
    expect(board.length).toBe(10);
    board.forEach((row) => {
      expect(row.length).toBe(10);
      row.forEach((cell) => expect(cell).toBe(null));
    });
  });

  test('place ship at specific coordinates', () => {
    placeShip(4, 0, 0, 'horizontal');
    const board = gameboard.getBoard();
    const placedCells = [];
    for (let index = 0; index < board.length; index++) {
      board[index].forEach((cell) => {
        if (cell !== null) placedCells.push(cell);
      });
    }
    expect(placedCells.length).toBe(4);

    for (let index = 0; index < 3; index++) {
      expect(placedCells[index]).toBeDefined();
    }
  });

  test(`Don't place ship if it's out of array bonds`, () => {
    expect(() => placeShip(11, 0, 0, 'horizontal')).toThrow();
  });

  test('receiveAttack stores hit records correctly', () => {
    placeShip(4, 3, 3, 'vertical');
    gameboard.receiveAttack(2, 4);
    expect(containsArray(gameboard.getHitRecords(), [2, 4])).toBe(true);
  });

  test('Calls ship hit() if ship was on attack cord', () => {
    placeShip(4, 3, 3, 'vertical');
    const board = gameboard.getBoard();
    const ship = board[5][3];
    expect(ship.isShip).toBe(true);
    expect(ship.getHits()).toBe(0);
    gameboard.receiveAttack(3, 4);
    expect(ship.getHits()).toBe(1);
  });

  test('Gameboard checks if all the ships are sunk', () => {
    placeShip(1, 3, 3, 'horizontal');
    expect(gameboard.gameOver()).toBe(false);
    gameboard.receiveAttack(3, 3);
    expect(gameboard.gameOver()).toBe(true);
  });

  test(`Gameboard doesn't sink a ship when same cell was triggered`, () => {
    placeShip(4, 3, 3, 'horizontal');
    const board = gameboard.getBoard();
    const ship = board[3][3];
    expect(gameboard.gameOver()).toBe(false);
    gameboard.receiveAttack(3, 3);
    expect(ship.getHits()).toBe(1);
    gameboard.receiveAttack(3, 3);
    gameboard.receiveAttack(3, 3);
    expect(ship.isSunk()).toBe(false);
    expect(ship.getHits()).toBe(1);
    expect(gameboard.gameOver()).toBe(false);
  });
});
