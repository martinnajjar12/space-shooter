import Phaser from 'phaser';
import ScrollingBackground from '../background/ScrollingBackground';
import sortResult from '../utils/sortResult';

const leaderboardDiv = document.querySelector('.leaderboard');

const printScore = () => {
  sortResult().then(value => {
    if (typeof value === 'object') {
      for (let i = 0; i < 5; i += 1) {
        leaderboardDiv.innerHTML += `<li>${value[i].user}: ${value[i].score}</li>`;
      }
    } else {
      leaderboardDiv.innerHTML = value;
    }
  });
};

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  preload() {
    this.load.audio('music', 'Venus.wav');
    this.load.audio('btnAudio', 'vikinghorn.mp3');
    this.load.image('playAgainBlue', 'playAgainBlue.png');
    this.load.image('playAgainHover', 'playAgain.png');
  }

  create() {
    printScore();
    const bgMusic = this.sound.add('music');
    bgMusic.play();
    const playBtnSound = this.sound.add('btnAudio');
    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      400,
      'playAgainBlue',
    );
    this.btnPlay.setInteractive();
    this.btnPlay.on(
      'pointerover',
      (this.changeTexture = () => {
        this.btnPlay.setTexture('playAgainHover');
      }),
      this,
    );
    this.btnPlay.on(
      'pointerout',
      (this.changeTextureAgain = () => {
        this.btnPlay.setTexture('playAgainBlue');
      }),
      this,
    );
    this.btnPlay.on(
      'pointerdown',
      (this.changeTextureThird = () => {
        bgMusic.stop();
        playBtnSound.play();
        setTimeout(() => {
          leaderboardDiv.innerHTML = '';
          this.scene.start('SceneMain');
        }, 2000);
      }),
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

    this.title = this.add.text(
      this.game.config.width * 0.5,
      200,
      'Leaderboard',
      {
        fontFamily: 'monospace',
        fontSize: 36,
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
