const Ship = (length) => {
  let hits = 0;

  const hit = () => (hits += 1);

  const getHits = () => hits;

  const isSunk = () => (getHits() === length ? true : false);

  return { length, hit, getHits, isSunk };
};

module.exports = Ship;
