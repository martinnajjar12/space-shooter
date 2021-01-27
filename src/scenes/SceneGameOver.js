export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  preload() {
    this.load.image('ship', '../../assets/playerShip1_green.png');
  }

  create() {}
}
