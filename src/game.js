const Player = require('./player');
const DOMController = require('./DOMController.js');
const containsArray = require('./utility/containsArray');
const setup = require('./setup.js');

const player1 = Player('Player1');
const player2 = Player('Player2');
let winner = null;
let continueLoop = true;

// Place ships and listen to player clicks (shoots)
function initializeGame() {
  DOMController.initializeGame(player1, player2);
  onShootEvent();
}

function startSetup() {
  // DOMController.createSetupBoard(player1);
  // DOMController.displayAndUpdateShipPosition();
  setup.addRotationEventListener();
  setup.createDropZones(player1);
  setup.displayShips();
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
  if (winner === player1) console.log('P1 WON'); //Implement gameOver for p1
  else if (winner === player2) console.log('P2 WON'); //Implement gameOver for p1
  continueLoop = false;
}

// Controls main game loop using requestAnimationFrame, and checks game's end condition
function gameLoop() {
  if (gameOver()) handleGameOver(winner);
  if (continueLoop) requestAnimationFrame(gameLoop);
}

module.exports = {
  initializeGame,
  updateGameBoards,
  gameLoop,
  startSetup,
};
