const Player = require('./player');
const DOMController = require('./DOMController.js');

const player1 = Player();
const player2 = Player();
const winner = null;

function initializeGame() {
  DOMController.initializeGame(player1, player2);
}

function updateGameBoards() {
  DOMController.renderPlayerBoards(player1, player2);
}

function gameOver() {
  if (player1.gameOver()) {
    winner = player1;
    return true;
  } else if (player2.gameOver()) {
    winner = player2;
    return true;
  } else return false;
}

module.exports = { initializeGame, gameOver, updateGameBoards };
