// ship.js Defines the Ship module for managing the ship state

const Ship = (length) => {
  let hits = 0; // Number of hits the ship has taken

  const isShip = true;

  const hit = () => (hits += 1); // Increment the hit count

  const getHits = () => hits; // Get the current hit count

  const isSunk = () => (getHits() === length ? true : false); // Check if the ship is sunk

  return { hit, getHits, isSunk, isShip };
};

module.exports = Ship;
