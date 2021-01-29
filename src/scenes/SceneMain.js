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
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'ship',
    );

    this.time.addEvent({
      delay: 3000,
      callback: function () {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }
        // else if (Phaser.Math.Between(0, 10) >= 5) {
        //   if (this.getEnemiesByType('ChaserShip').length < 5) {
        //     enemy = new ChaserShip(
        //       this,
        //       Phaser.Math.Between(0, this.game.config.width),
        //       0,
        //     );
        //   }
        // } else {
        //   enemy = new CarrierShip(
        //     this,
        //     Phaser.Math.Between(0, this.game.config.width),
        //     0,
        //   );
        // }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(
      this.playerLasers,
      this.enemies,
      function (playerLaser, enemy) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.explode(true);
          playerLaser.destroy();
        }
      },
    );

    this.physics.add.overlap(
      this.player,
      this.enemies,
      function (player, enemy) {
        if (!player.getData('isDead') && !enemy.getData('isDead')) {
          player.explode(false);
          enemy.explode(true);
        }
      },
    );

    this.physics.add.overlap(
      this.player,
      this.enemyLasers,
      function (player, laser) {
        if (!player.getData('isDead') && !laser.getData('isDead')) {
          player.explode(false);
          laser.destroy();
        }
      },
    );
  }

  update() {
    this.player.update();

    if (!this.player.getData('isDead')) {
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

    for (let enemy of this.enemies.getChildren()) {
      enemy.update();
      if (
        enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight
      ) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.destroy();
        }
      }
    }

    for (let laser of this.enemyLasers.getChildren()) {
      laser.update();
      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (let laser of this.playerLasers.getChildren()) {
      laser.update();
      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }

  getEnemiesByType(type) {
    const enemiesArray = this.enemies
      .getChildren()
      .filter(enemy => enemy.getData('type') == type);
    return enemiesArray;
  }
}
