const Player = require('../src/player.js');

describe('game running functions', () => {
  let player;
  function shipsOverlap(shipLength, startX, startY, direction) {
    const board = player.getBoard();

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
  beforeEach(() => {
    player = Player('P1');
    player.placeShip(5, 4, 5, 'horizontal');
    player.placeShip(3, 4, 7, 'vertical');
  });
  test('returns false when no overlap', () => {
    expect(shipsOverlap(2, 5, 3, 'vertical')).toBeFalsy();
    expect(shipsOverlap(5, 0, 0, 'vertical')).toBeFalsy();
  });

  test('returns true when overlap', () => {
    expect(shipsOverlap(5, 5, 3, 'vertical')).toBeTruthy();
    expect(shipsOverlap(4, 1, 5, 'horizontal')).toBeTruthy();
    expect(shipsOverlap(5, 7, 5, 'horizontal')).toBeTruthy();
    expect(shipsOverlap(5, 4, 9, 'horizontal')).toBeTruthy();
  });
});
