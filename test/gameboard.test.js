const Gameboard = require('../src/gameboard.js');
const Ship = require('../src/ship.js');
describe('Gameboard Factory', () => {
  test('create gameboard object', () => {
    const gameboard = Gameboard();
    expect(gameboard).not.toBeUndefined();
  });

  test('place ship at specific coordinates'),
    () => {
      const gameboard = Gameboard();
      const { placeShip, board } = gameboard;
      placeShip(4, 0, 'A', 0, 'D');
      const placedCells = [];
      board.forEach((cell) => {
        if (cell !== null) placedCells.push(cell);
      });
      expect(placedCells.length).toBe(4);
      for (let index = 0; index < 3; index++) {
        expect(placedCells[i]).toBeDefined();
      }
    };
});
