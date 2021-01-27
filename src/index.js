import 'phaser';
import simpleScene from './scenes/simpleScene';

const gameConfig = {
  width: 680,
  height: 400,
  scene: simpleScene,
};

new Phaser.Game(gameConfig);
