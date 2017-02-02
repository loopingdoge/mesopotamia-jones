export const centerGameObjects = (objects :Phaser.Sprite[]) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}