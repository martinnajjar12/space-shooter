import Phaser from 'phaser';
import ScrollingBackground from '../background/ScrollingBackground';
import loadBody from '../utils/loader';

loadBody();

const myDiv = document.querySelector('.textDiv');

export default class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu' });
  }

  preload() {
    this.load.image('background', 'newBg.png');
    this.load.image('btnPlay', 'buttonBlue.png');
    this.load.image('btnHover', 'buttonRed.png');
    this.load.audio('btnAudio', 'vikinghorn.mp3');
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
      (this.changeTexture = () => {
        this.btnPlay.setTexture('btnHover');
      }),
      this,
    );
    this.btnPlay.on(
      'pointerout',
      (this.changeTextureAgain = () => {
        this.btnPlay.setTexture('btnPlay');
      }),
      this,
    );
    this.btnPlay.on(
      'pointerdown',
      (this.changeTextureThird = () => {
        playBtnSound.play();
        setTimeout(() => {
          myDiv.innerHTML = '';
          this.scene.start('SceneMain');
        }, 2000);
      }),
      this,
    );

    myDiv.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        playBtnSound.play();
        setTimeout(() => {
          myDiv.innerHTML = '';
          this.scene.start('SceneMain');
        }, 2000);
      }
    });

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
    for (let i = 0; i < 5; i += 1) {
      const bg = new ScrollingBackground(this, 'background', i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    this.backgrounds.forEach(background => background.update());
  }
}
