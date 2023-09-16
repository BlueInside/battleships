const Player = require('./player');
const DOMController = require('./DOMController.js');

const player1 = Player();
const player2 = Player();
let winner = null;

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
    player2.cpuMove(player1);
  });
}
function gameLoop() {
  let continueLoop = true;
  if (gameOver()) {
    if (winner === player1) {
      console.log('P1 WON');
    }
  }
  if (gameOver()) {
    if (winner === player2) {
      console.log('P2 WON');
    }
  }
  updateGameBoards();
  player1.cpuMove(player2);
  player2.cpuMove(player1);
  requestAnimationFrame(gameLoop);
}
module.exports = {
  initializeGame,
  gameOver,
  updateGameBoards,
  gameLoop,
};
