import Player from '../entities/Player';
import GunShip from '../entities/GunShip';

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
    this.physics.add.sprite(100, 450, 'ship');
    this.anims.create({
      key: 'ship',
      frames: this.anims.generateFrameNumbers('ship'),
      frameRate: 20,
      repeat: -1,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 3000,
      callback: function () {
        var enemy = new GunShip(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0,
        );
        this.enemies.add(enemy);
      },
      callbackScope: this,
      loop: true,
    });

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'ship',
    );
  }

  update() {
    this.player.update();

    if (this.cursors.up.isDown) {
      this.player.moveUp();
    } else if (this.cursors.down.isDown) {
      this.player.moveDown();
    }

    if (this.cursors.left.isDown) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown) {
      this.player.moveRight();
    }

    if (this.keySpace.isDown) {
      this.player.setData('isShooting', true);
    } else {
      this.player.setData(
        'timerShootTick',
        this.player.getData('timerShootDelay') - 1,
      );
      this.player.setData('isShooting', false);
    }
  }
}
