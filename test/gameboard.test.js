const Gameboard = require('../src/gameboard.js');
const Ship = require('../src/ship.js');
describe('Gameboard Factory', () => {
  let gameboard;
  beforeEach(() => {
    gameboard = Gameboard();
  });

  test('create gameboard object', () => {
    expect(gameboard).not.toBeUndefined();
  });

  test('create board with specific size and cells that are null', () => {
    gameboard.createBoard(4);
    const board = gameboard.getBoard();
    expect(board.length).toBe(4);
    board.forEach((row) => {
      expect(row.length).toBe(4);
      row.forEach((cell) => expect(cell).toBe(null));
    });
  });

  test('place ship at specific coordinates', () => {
    gameboard.createBoard(6);
    const { placeShip } = gameboard;
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
});
