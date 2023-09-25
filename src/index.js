// Import the CSS styles
import './styles/style.css';

// Import the Game module
const Game = require('./game.js');

// Get references to the play again and play buttons
const playAgainBtn = document.getElementById('play-again-button');
const playBtn = document.getElementById('play-button');

// Add a click event listener to the play button
playBtn.addEventListener('click', () => {
  // Hide the initial screen
  const initialScreen = document.getElementById('initial-screen');
  initialScreen.style.display = 'none';

  // Show the setup display
  const setupDisplay = document.getElementById('setup-display');
  setupDisplay.classList.remove('hidden');

  // Start the setup phase of the game
  Game.startSetup();
});

// Add a click event listener to the play again button
playAgainBtn.addEventListener('click', () => {
  // Start the game setup again
  Game.playAgain();
});

// Add an event listener for the 'resetGame' event
document.addEventListener('resetGame', () => {
  // Start the setup phase of the game
  Game.startSetup();

  // Hide the game display
  const display = document.getElementById('display');
  display.classList.add('hidden');
});

// Add an event listener for the 'startGame' event
document.addEventListener('startGame', () => {
  // Hide the setup display
  const setupDisplay = document.getElementById('setup-display');
  setupDisplay.classList.add('hidden');

  // Show the game display
  const boardDisplay = document.getElementById('display');
  boardDisplay.classList.remove('hidden');

  const display = document.getElementById('display');
  display.classList.remove('hidden');

  // Initialize the game
  Game.initializeGame();
});
