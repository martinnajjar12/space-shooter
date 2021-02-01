import ScrollingBackground from '../background/ScrollingBackground';
import SceneMain from '../scenes/SceneMain';

export default class Entity extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key, type);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('type', type);
    this.setData('isDead', false);
  }

  explode(canDestroy) {
    if (!this.getData('isDead')) {
      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }

      this.setAngle(0);
      this.body.setVelocity(0, 0);

      this.on(
        'animationcomplete',
        function () {
          if (canDestroy) {
            this.destroy();
          } else {
            this.setVisible(false);
          }
        },
        this,
      );

      this.setData('isDead', true);
    }
  }
}
