const Gameboard = require('../src/gameboard.js');
const Player = () => {
  let gameboard = Gameboard();

  const shoot = (cordX, cordY, enemyPlayer) => {
    enemyPlayer.receiveAttack(cordX, cordY);
  };
  const { placeShip, getHitRecords, receiveAttack } = gameboard;
  return { placeShip, getHitRecords, receiveAttack, shoot };
};

module.exports = Player;
