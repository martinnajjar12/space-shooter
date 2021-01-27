export default class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMain' });
  }

  preload() {
    this.load.image('background', 'darkPurple.png');
    this.load.image('enemy', 'enemyBlack2.png');
    this.load.image('laser', 'laserGreen03.png');
    this.load.image('myLaser', 'laserRed03.png');
    this.load.image('playerDamaged', 'playerDamaged.png');
    this.load.spritesheet('ship', 'ship_spritesheet.png', {
      frameWidth: 99,
      frameHeight: 70,
    });
  }

  create() {
    this.add.image(250, 300, 'background').setScale(3);
    this.add.image(400, 150, 'enemy');
    this.add.image(400, 200, 'laser');
    this.add.image(200, 200, 'myLaser');
    this.add.image(100, 200, 'playerDamaged');
    player = this.physics.add.sprite(100, 450, 'ship');
  }
}
