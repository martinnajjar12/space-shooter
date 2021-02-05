import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preloadScene' });
  }

  preload() {
    this.graphics = this.add.graphics();
    this.newGraphics = this.add.graphics();
    const progressBar = new Phaser.Geom.Rectangle(90, 200, 300, 50);
    const progressBarFill = new Phaser.Geom.Rectangle(90, 205, 290, 40);

    this.graphics.fillStyle(0xffffff, 1);
    this.graphics.fillRectShape(progressBar);

    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(progressBarFill);

    const loadingText = this.add.text(115, 260, 'Loading: ', {
      fontSize: '32px',
      fill: '#FFF',
    });

    this.load.image('background', 'newBg.png');
    this.load.image('btnPlay', 'buttonBlue.png');
    this.load.image('btnHover', 'buttonRed.png');
    this.load.audio('btnAudio', 'vikinghorn.mp3');
    this.load.image('enemy', 'enemyBlue2.png');
    this.load.image('chaserEnemy', 'ufoGreen.png');
    this.load.image('lastEnemy', 'enemyGreen5.png');
    this.load.image('blueLaser', 'laserBlue05.png');
    this.load.image('greenLaser', 'laserGreen03.png');
    this.load.image('myLaser', 'laserRed01.png');
    this.load.spritesheet('ship', 'ship_spritesheet.png', {
      frameWidth: 99,
      frameHeight: 70,
    });
    this.load.audio('mars', 'Mars.wav');
    this.load.audio('explosion', 'explosion.mp3');
    this.load.audio('music', 'Venus.wav');
    this.load.image('playAgainBlue', 'playAgainBlue.png');
    this.load.image('playAgainHover', 'playAgain.png');

    this.load.on('progress', this.updateBar, {
      newGraphics: this.newGraphics,
      loadingText,
    });
    this.load.on('complete', this.complete, { scene: this.scene });
  }

  updateBar(percentage) {
    this.newGraphics.clear();
    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(
      new Phaser.Geom.Rectangle(95, 205, percentage * 290, 40),
    );

    percentage *= 100;
    this.loadingText.setText(`Loading: ${percentage.toFixed(0)}%`);
  }

  complete() {
    this.scene.start('SceneMainMenu');
  }
}
