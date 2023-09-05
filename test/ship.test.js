const Ship = require('../src/ship.js');

describe.skip('Ship Factory', () => {
  let ship;

  beforeEach(() => {
    ship = Ship(3);
  });

  test('creates a ship object from factoryFunc', () => {
    expect(ship).not.toBeUndefined();
  });

  test('hit function increase number of hits on call', () => {
    const hits = ship.getHits();
    ship.hit();
    expect(ship.getHits()).toBe(hits + 1);
  });

  test('isSunk function === true if length and hits are equal', () => {
    const ship = Ship(1);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
