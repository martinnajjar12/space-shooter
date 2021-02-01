import ScrollingBackground from '../background/ScrollingBackground';

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
          // this.scene.start('SceneGameOver');
        }, 2000);
      },
      this,
    );

    this.title = this.add.text(
      this.game.config.width * 0.5,
      128,
      'SPACE SHOOTER',
      {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      },
    );
    this.title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    this.title.setOrigin(0.5);

    this.backgrounds = [];
    for (let i = 0; i < 5; i++) {
      const bg = new ScrollingBackground(this, 'background', i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    this.backgrounds.forEach(background => background.update());
  }
}
