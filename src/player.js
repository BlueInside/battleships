const Gameboard = require('../src/gameboard.js');
const containsArray = require('../src/utility/containsArray.js');
const Player = () => {
  let gameboard = Gameboard();

  const shoot = (cordX, cordY, enemyPlayer) => {
    enemyPlayer.receiveAttack(cordX, cordY);
  };

  const isLegal = (cordX, cordY, enemy) => {
    const enemyHitRecords = enemy.getHitRecords();
    const isLegal = !containsArray(enemyHitRecords, [cordX, cordY]);
    return isLegal;
  };

  const cpuMove = (enemy) => {
    let cordX = Math.floor(Math.random() * 8);
    let cordY = Math.floor(Math.random() * 8);
    if (isLegal(cordX, cordY, enemy)) shoot(cordX, cordY, enemy);
    else cpuMove(enemy);
  };

  const { placeShip, getHitRecords, receiveAttack, getBoard } = gameboard;
  return { placeShip, getHitRecords, receiveAttack, shoot, getBoard, cpuMove };
};

module.exports = Player;
