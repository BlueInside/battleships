const Ship = require('../src/ship.js');

let ship;

beforeEach(() => {
  ship = Ship(3);
});
test('creates a ship factoryFunc with specified length', () => {
  expect(ship.length).toBe(3);
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
