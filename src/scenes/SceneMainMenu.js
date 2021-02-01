export default class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu' });
  }

  preload() {
    this.load.image('background', '../../assets/newBg.png');
    this.load.image('btnPlay', '../../assets/buttonBlue.png');
    this.load.image('btnHover', '../../assets/buttonRed.png');
    this.load.audio('btnAudio', '../../assets/vikinghorn.mp3');
  }

  create() {
    this.add.image(250, 300, 'background').setScale(3);
    const playBtnSound = this.sound.add('btnAudio');
    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'btnPlay',
    );
    this.btnPlay.setInteractive();
    this.btnPlay.on(
      'pointerover',
      function () {
        this.btnPlay.setTexture('btnHover');
      },
      this,
    );
    this.btnPlay.on(
      'pointerout',
      function () {
        this.btnPlay.setTexture('btnPlay');
      },
      this,
    );
    this.btnPlay.on(
      'pointerdown',
      function () {
        playBtnSound.play();
        setTimeout(() => {
          this.scene.start('SceneMain');
        }, 2000);
      },
      this,
    );
    // this.scene.start('SceneMain');
  }
}
