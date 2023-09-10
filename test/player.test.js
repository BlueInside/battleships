const Player = require('../src/player.js');
const containsArray = require('../src/utility/containsArray.js');

describe.skip('testing player factoryFunction', () => {
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

  test('players can attack each other game boards miss shots', () => {
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
    expect(containsArray(player1.getHitRecords(), [4, 5])).toBe(true);
    expect(containsArray(player2.getHitRecords(), [3, 3])).toBe(true);
    // check with false values
    expect(containsArray(player1.getHitRecords(), [5, 4])).toBe(false);
    expect(containsArray(player2.getHitRecords(), [2, 3])).toBe(false);
  });

  test('players can attack each other game boards hits', () => {
    player1.placeShip(4, 7, 3, 'vertical');
    player2.placeShip(4, 2, 1, 'horizontal');

    //accurate hits
    const player1Ship = player1.getBoard()[3][7];
    const player2Ship = player2.getBoard()[1][2];

    expect(player1Ship.getHits()).toBe(0);
    expect(player2Ship.getHits()).toBe(0);

    player1.shoot(2, 1, player2);
    expect(player2Ship.getHits()).toBe(1);

    player2.shoot(7, 3, player1);
    expect(player1Ship.getHits()).toBe(1);
  });

  test('computer makes random moves', () => {
    expect(player2.getHitRecords().length).toBe(0);
    player1.cpuMove(player2);
    expect(player2.getHitRecords().length).toBe(1);
    player1.cpuMove(player2);
    expect(player2.getHitRecords().length).toBe(2);
    player1.cpuMove(player2);
    player1.cpuMove(player2);
    player1.cpuMove(player2);
    expect(player2.getHitRecords().length).toBe(5);
    for (let index = 0; index < 59; index++) {
      player1.cpuMove(player2);
    }
    expect(player2.getHitRecords().length).toBe(64);
  });
});
