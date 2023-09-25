// Imports
const Player = require('./player');
const DOMController = require('./DOMController.js');
const containsArray = require('./utility/containsArray');
const setup = require('./setup.js');

// Constants for player names
const PLAYER_1_NAME = 'Player1';
const PLAYER_2_NAME = 'Player2';

let player1;
let player2;
let winner = null;

// Function to initialize the game by placing ships, setting up event listeners, and starting the game loop
function initializeGame() {
  // Place CPU's ships randomly
  player2.placeShipsAtRandom();

  // Listen for player clicks (shoots)
  onShootEvent();

  // Update the game boards to reflect ship placement
  updateGameBoards();

  // Start the game loop
  gameLoop();
}

// Function to start the setup phase of the game
function startSetup() {
  // Create new player instances
  player1 = Player(PLAYER_1_NAME);
  player2 = Player(PLAYER_2_NAME);

  // configure the game setup
  setup.removeRotationEventListener();
  setup.addRotationEventListener();
  setup.createDropZones(player1, player2);
  setup.displayShips();
  setup.showSetupWindow();
}

// Function to handle play-again scenario
function playAgain() {
  // Close game over and board display windows
  DOMController.closeGameOverWindow();
  DOMController.closeBoardDisplayWindow();

  // Start the setup phase again
  startSetup();
}

// Function to update the game boards on the UI
function updateGameBoards() {
  DOMController.renderPlayerBoards(player1, player2);
  DOMController.addEnemyGameboardListeners();
}

// Function to check if the game is over (all ships of one player are sunk)
function gameOver() {
  if (player1.gameOver()) {
    winner = player2;
    return true;
  } else if (player2.gameOver()) {
    winner = player1;
    return true;
  } else return false;
}

// Function to handle player shoot events
function onShootEvent() {
  document.addEventListener('shoot', (event) => {
    const { cordX, cordY } = event.detail;

    // Checks if clicked cell has already been targeted; if so ignore the click
    if (!containsArray(player2.getHitRecords(), [cordX, cordY])) {
      player1.shoot(cordX, cordY, player2);
      player2.cpuMove(player1);
      updateGameBoards();
    }
  });
}

// Function to handle the end of the game, displaying the winner and stopping the game loop
function handleGameOver(winner) {
  const gameOverModal = document.getElementById('game-over-modal');
  const winnerMessage = document.getElementById('winner-message');

  if (winner === player1) {
    winnerMessage.textContent = `${PLAYER_1_NAME} Wins!`;
  } else if (winner === player2) {
    winnerMessage.textContent = `${PLAYER_2_NAME} Wins!`;
  }

  // Show the game over modal
  gameOverModal.classList.remove('hidden');

  // Reset the winner
  winner = null;
}

// Function to control the main game loop using requestAnimationFrame, and check the game's end condition
function gameLoop() {
  if (gameOver()) handleGameOver(winner);
  else requestAnimationFrame(gameLoop);
}

// Export the functions to make them accessible to other parts of the application
module.exports = {
  initializeGame,
  updateGameBoards,
  gameLoop,
  startSetup,
  playAgain,
};
