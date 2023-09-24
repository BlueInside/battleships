const Player = require('./player');
const DOMController = require('./DOMController.js');
const containsArray = require('./utility/containsArray');
const setup = require('./setup.js');

let player1 = Player('Player1');
let player2 = Player('Player2');
let winner = null;
let continueLoop = true;

// Place ships and listen to player clicks (shoots)
function initializeGame() {
  onShootEvent();
  updateGameBoards();
  gameLoop();
}

function startSetup() {
  player1 = Player('Player1');
  player2 = Player('Player2');
  setup.removeRotationEventListener();
  setup.addRotationEventListener();
  setup.createDropZones(player1, player2);
  setup.displayShips();
  setup.showSetupWindow();
}

function playAgain() {
  DOMController.closeGameOverWindow();
  DOMController.closeBoardDisplayWindow();
  startSetup();
}

function updateGameBoards() {
  DOMController.renderPlayerBoards(player1, player2);
  DOMController.addEnemyGameboardListeners();
}

// Checks if players ships are sunk if so returns opposite player as winner
function gameOver() {
  if (player1.gameOver()) {
    winner = player2;
    return true;
  } else if (player2.gameOver()) {
    winner = player1;
    return true;
  } else return false;
}

// Shoots enemy board
function onShootEvent() {
  document.addEventListener('shoot', (event) => {
    const { cordX, cordY } = event.detail;
    // Checks if clicked cell has already been targeted, if so ignore the click
    if (!containsArray(player2.getHitRecords(), [cordX, cordY])) {
      player1.shoot(cordX, cordY, player2);
      player2.cpuMove(player1);
      updateGameBoards();
    }
  });
}

// Displays winner and stops gameLoop
function handleGameOver(winner) {
  const gameOverModal = document.getElementById('game-over-modal');
  const winnerMessage = document.getElementById('winner-message');

  if (winner === player1) {
    winnerMessage.textContent = 'Player 1 Wins!';
  } else if (winner === player2) {
    winnerMessage.textContent = 'Player 2 Wins!';
  }

  gameOverModal.classList.remove('hidden');
  // reset winner
  winner = null;
}

// Controls main game loop using requestAnimationFrame, and checks game's end condition
function gameLoop() {
  if (gameOver()) handleGameOver(winner);
  else requestAnimationFrame(gameLoop);
}

module.exports = {
  initializeGame,
  updateGameBoards,
  gameLoop,
  startSetup,
  playAgain,
};
