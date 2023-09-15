const Player = require('./player');
const DOMController = require('./DOMController.js');

const player1 = Player();
const player2 = Player();
const winner = null;

function initializeGame() {
  DOMController.initializeGame(player1, player2);
  onShootEvent();
}

function updateGameBoards() {
  DOMController.renderPlayerBoards(player1, player2);
  DOMController.addEnemyGameboardListeners();
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
function onShootEvent() {
  document.addEventListener('shoot', (event) => {
    const { cordX, cordY } = event.detail;
    console.log(cordX, cordY);
    player1.shoot(cordX, cordY, player2);
    // player 2 shoot automatically ?
    player2.cpuMove();
  });
}
function gameLoop() {
  if (gameOver()) {
    //   handleGameOver(); // IMPLEMENT
  }
  player2.cpuMove(player1);
  if (gameOver()) {
    //   handleGameOver(); // IMPLEMENT
  }
  updateGameBoards();

  requestAnimationFrame(gameLoop);
}
module.exports = { initializeGame, gameOver, updateGameBoards, gameLoop };
