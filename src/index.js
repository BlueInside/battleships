import './styles/style.css';
const Game = require('./game.js');

const playAgainBtn = document.getElementById('play-again-button');
const playBtn = document.getElementById('play-button');

playBtn.addEventListener('click', () => {
  const initialScreen = document.getElementById('initial-screen');
  initialScreen.style.display = 'none';

  const setupDisplay = document.getElementById('setup-display');
  setupDisplay.classList.remove('hidden');

  Game.startSetup();
});

playAgainBtn.addEventListener('click', () => {
  Game.playAgain();
});

document.addEventListener('resetGame', () => {
  Game.startSetup();
});

document.addEventListener('startGame', () => {
  const setupDisplay = document.getElementById('setup-display');
  setupDisplay.classList.add('hidden');

  const boardDisplay = document.getElementById('display');
  boardDisplay.classList.remove('hidden');

  Game.initializeGame();
});
