const Gameboard = require('../src/gameboard.js');
const Player = () => {
  let gameboard = Gameboard();

  const shoot = (cordX, cordY, enemyPlayer) => {
    enemyPlayer.receiveAttack(cordX, cordY);
  };
  const { placeShip, getHitRecords, receiveAttack, getBoard } = gameboard;
  return { placeShip, getHitRecords, receiveAttack, shoot, getBoard };
};

module.exports = Player;
