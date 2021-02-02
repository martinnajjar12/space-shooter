import Phaser from 'phaser';
import ScrollingBackground from '../background/ScrollingBackground';

const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${process.env.GAMEID}/scores`;
const leaderboardDiv = document.querySelector('.leaderboard');

const sortScore = data => {
  const sortedArray = data.sort((a, b) => b.score - a.score);
  for (let i = 0; i < 5; i += 1) {
    leaderboardDiv.innerHTML += `<li>${sortedArray[i].user}: ${sortedArray[i].score}</li>`;
  }
};

const refreshLeaderBoard = async () => {
  try {
    const resp = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await resp.json();
    sortScore(data.result);
  } catch (err) {
    leaderboardDiv.innerHTML = `Sorry! Something wrong happened. Error: ${err}`;
  }
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
    refreshLeaderBoard();
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
