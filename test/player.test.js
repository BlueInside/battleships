const Player = require('../src/player.js');
const containsArray = require('../src/utility/containsArray.js');

describe('testing player factoryFunction', () => {
  let player1;
  let player2;
  beforeEach(() => {
    player1 = Player();
    player2 = Player();
  });
  test('player object is created', () => {
    expect(player1).toBeDefined();
    expect(player2).toBeDefined();
  });

  test('players can attack each other game boards', () => {
    player1.placeShip(4, 7, 3, 'vertical');
    player2.placeShip(4, 2, 1, 'horizontal');

    //miss shoots
    expect(player2.getHitRecords().length).toBe(0);
    player1.shoot(3, 3, player2);
    expect(player2.getHitRecords().length).toBe(1);
    expect(player1.getHitRecords().length).toBe(0);
    player2.shoot(4, 5, player1);
    expect(player1.getHitRecords().length).toBe(1);

    //check if shots match
    expect(containsArray(player1.getHitRecords, [4, 5])).toBe(true);
    expect(containsArray(player2.getHitRecords, [3, 3])).toBe(true);
    // check with false values
    expect(containsArray(player1.getHitRecords, [5, 4])).toBe(false);
    expect(containsArray(player2.getHitRecords, [2, 3])).toBe(false);

    // const player1Board = player1.getBoard();
    // const player1Ship = player1Board[3][7];
    // const player2Board = player2.getBoard();
    // const player2Ship = player2Board[1][2];
  });
});
