// player.js - Defines the Player module for managing player moves and actions

const Gameboard = require('../src/gameboard.js');
const containsArray = require('../src/utility/containsArray.js');

const Player = () => {
  let gameboard = Gameboard();

  // Shoots enemy board
  const shoot = (cordX, cordY, enemyPlayer) => {
    enemyPlayer.receiveAttack(cordX, cordY);
  };

  // Checks if move is legal, (doesn't shoot same cell twice)
  const isLegal = (cordX, cordY, enemy) => {
    const enemyHitRecords = enemy.getHitRecords();
    const isLegal = !containsArray(enemyHitRecords, [cordX, cordY]);
    return isLegal;
  };

  // Generates a random move for the CPU player and checks if it's a legal move.
  // If not, recursively calls `cpuMove` until a legal move is found.
  const cpuMove = (enemy) => {
    let cordX = Math.floor(Math.random() * 10);
    let cordY = Math.floor(Math.random() * 10);
    if (isLegal(cordX, cordY, enemy)) shoot(cordX, cordY, enemy);
    else cpuMove(enemy);
  };

  const {
    placeShip,
    getHitRecords,
    receiveAttack,
    getBoard,
    gameOver,
    getSuccessfulHits,
  } = gameboard;
  return {
    placeShip,
    getHitRecords,
    receiveAttack,
    shoot,
    getBoard, // Retrieves the player's game board
    cpuMove,
    gameOver,
    getSuccessfulHits,
  };
};

module.exports = Player; // Export the player module
