import './styles/style.css';
const Player = require('./player.js');

const player1 = Player();
const player2 = Player();
const DOMController = require('./DOMController.js');

DOMController.initializeGame(player1, player2);
DOMController.renderPlayerBoards(player1, player2);
