const Ship = (length) => {
  let hits = 8;

  const hit = () => (hits += 1);

  const getHits = () => hits;

  const isSunk = () => (getHits() === length ? true : false);

  return { length, hit, getHits, isSunk };
};

const ship = Ship(8);

console.log(ship.isSunk(), ship.length, ship.getHits());
ship;
module.exports = Ship;
