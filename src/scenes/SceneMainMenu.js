export default class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu' });
  }

  preload() {
    this.load.image('background', '../../assets/darkPurple.png');
  }

  create() {
    this.add.image(250, 300, 'background').setScale(3);
    this.scene.start('SceneMain');
  }
}
