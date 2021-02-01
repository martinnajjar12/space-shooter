import ScrollingBackground from '../background/ScrollingBackground';

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  preload() {
    this.load.audio('music', '../../assets/Venus.wav');
    this.load.audio('btnAudio', '../../assets/vikinghorn.mp3');
    this.load.image('playAgainBlue', '../../assets/playAgainBlue.png');
    this.load.image('playAgainHover', '../../assets/playAgain.png');
  }

  create() {
    const bgMusic = this.sound.add('music');
    bgMusic.play();
    const playBtnSound = this.sound.add('btnAudio');
    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'playAgainBlue',
    );
    this.btnPlay.setInteractive();
    this.btnPlay.on(
      'pointerover',
      function () {
        this.btnPlay.setTexture('playAgainHover');
      },
      this,
    );
    this.btnPlay.on(
      'pointerout',
      function () {
        this.btnPlay.setTexture('playAgainBlue');
      },
      this,
    );
    this.btnPlay.on(
      'pointerdown',
      function () {
        bgMusic.stop();
        playBtnSound.play();
        setTimeout(() => {
          this.scene.start('SceneMain');
        }, 2000);
      },
      this,
    );

    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
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
