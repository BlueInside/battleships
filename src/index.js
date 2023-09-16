import './styles/style.css';
const Game = require('./game.js');

const playBtn = document.getElementById('play-button');
playBtn.addEventListener('click', () => {
  const initialScreen = document.getElementById('initial-screen');

  initialScreen.style.display = 'none';
  Game.initializeGame();
  Game.updateGameBoards();
  Game.gameLoop();
});
