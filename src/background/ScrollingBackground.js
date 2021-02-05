export default class ScrollingBackground {
  constructor(scene, key, velocityY) {
    this.scene = scene;
    this.key = key;
    this.velocityY = velocityY;
    this.layers = this.scene.add.group();
    this.createLayers();
  }

  createLayers() {
    for (let i = 0; i < 2; i += 1) {
      const layer = this.scene.add.sprite(240, 320, this.key);
      layer.y = layer.displayHeight * i;
      layer.setDepth(-5 - (i - 1));
      this.scene.physics.world.enableBody(layer, 0);
      layer.body.velocity.y = this.velocityY;

      this.layers.add(layer);
    }
  }

  update() {
    if (this.layers.getChildren()[0].y > 0) {
      this.layers.getChildren().forEach((layer, index) => {
        layer.y = -layer.displayHeight + layer.displayHeight * index;
      });
    }
  }
}
