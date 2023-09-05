const Ship = require('../src/ship.js');

test('creates a ship factoryFunc with specified length', () => {
  const ship = Ship(8);
  expect(ship.length).toBe(8);
});
