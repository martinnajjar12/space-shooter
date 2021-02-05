import Phaser from 'phaser';
import SceneMainMenu from './scenes/SceneMainMenu';
import SceneMain from './scenes/SceneMain';
import SceneGameOver from './scenes/SceneGameOver';
import loadBody from './utils/loader';

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [SceneMainMenu, SceneMain, SceneGameOver],
  pixelArt: true,
  roundPixels: true,
};

const game = () => new Phaser.Game(config);
game();
loadBody();
