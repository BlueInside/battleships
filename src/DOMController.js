const Player = require('./player.js');

function initializeGame() {
  const player1 = Player();
  const player2 = Player();

  // Place ships for player1 and player2
  player1.placeShip(5, 5, 1, 'vertical');
  player1.placeShip(4, 2, 7, 'horizontal');
  player1.placeShip(3, 7, 4, 'horizontal');
  player1.placeShip(3, 2, 1, 'vertical');
  player1.placeShip(2, 1, 5, 'horizontal');
  player1.placeShip(2, 8, 9, 'horizontal');

  player2.placeShip(5, 4, 7, 'horizontal');
  player2.placeShip(4, 5, 4, 'horizontal');
  player2.placeShip(3, 1, 6, 'horizontal');
  player2.placeShip(2, 4, 8, 'horizontal');
  player2.placeShip(3, 3, 1, 'vertical');
  player2.placeShip(2, 7, 1, 'vertical');
}

module.exports = { initializeGame };
