const Player = require('./player');
const DOMController = require('./DOMController.js');

const player1 = Player();
const player2 = Player();
const winner = null;

function initializeGame() {
  DOMController.initializeGame(player1, player2);
  gameLoop();
}

function updateGameBoards() {
  DOMController.renderPlayerBoards(player1, player2);
  DOMController.addEnemyGameboardListeners(player1, player2);
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

function gameLoop() {
  document.addEventListener('shoot', (event) => {
    const { cordX, cordY } = event.detail;
    console.log(cordX, cordY);
    player1.shoot(cordX, cordY, player2);
    if (gameOver()) {
      //   handleGameOver(); // IMPLEMENT
    }
    player2.cpuMove(player1);
    if (gameOver()) {
      //   handleGameOver(); // IMPLEMENT
    }
    updateGameBoards();
  });
}
module.exports = { initializeGame, gameOver, updateGameBoards };
