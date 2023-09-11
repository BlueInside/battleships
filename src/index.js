import './styles/style.css';
const Player = require('./player.js');

const player1 = Player();
const player2 = Player();
const DOMController = require('./DOMController.js');

DOMController.initializeGame(player1, player2);
player1.shoot(0, 0, player2);
player1.shoot(0, 1, player2);
player1.shoot(0, 2, player2);
player2.shoot(2, 1, player1);
player2.shoot(1, 1, player1);
DOMController.renderPlayerBoards(player1, player2);
