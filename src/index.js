import './styles/style.css';
const Game = require('./game.js');
const DOMController = require('./DOMController.js');
const playBtn = document.getElementById('play-button');
playBtn.addEventListener('click', () => {
  const initialScreen = document.getElementById('initial-screen');
  initialScreen.style.display = 'none';

  const setupScreen = document.getElementById('setup-screen');
  setupScreen.style.display = 'flex';
  Game.startSetup();
  //   Game.initializeGame();
  //   Game.updateGameBoards();
  //   Game.gameLoop();
});
