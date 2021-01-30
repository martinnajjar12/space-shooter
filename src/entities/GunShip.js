import Entity from './Entity';
import EnemyLaser from './EnemyLaser';

export default class GunShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy', 'GunShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.shootTimer = this.scene.time.addEvent({
      delay: 3000,
      callback: function () {
        const laser = new EnemyLaser(this.scene, this.x, this.y, 'blueLaser');
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
    this.play('enemy');
  }
  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}
