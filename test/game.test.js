const DOMController = require('../src/DOMController.js');
const Player = require('./player');

describe('testing game module', () => {
  let player1 = Player();
  let player2 = Player();
  beforeEach(() => {
    player1 = Player();
    player2 = Player();
  });
  test('game place ships', () => {});
});
