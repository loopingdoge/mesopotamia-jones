import * as Phaser from 'phaser'

interface ISprite {
  game: Phaser.Game
  x: number
  y: number
  key?: string
}

export default class Dude extends Phaser.Sprite {

  cursors: Phaser.CursorKeys

  constructor ({ game, x, y, key}: ISprite) {
    super(game, x, y, key)
    this.anchor.setTo(0.5)
    this.cursors = this.game.input.keyboard.createCursorKeys()

    this.game.physics.enable(this)

    this.animations.add('left', [0, 1, 2, 3], 10, true)
    this.animations.add('right', [5, 6, 7, 8], 10, true)
  }

  update() {
    if (this.cursors.left.isDown) {
        this.body.velocity.y = 0
        this.body.velocity.x = -150
        this.animations.play('left')
    } else if (this.cursors.right.isDown) {
        //  Move to the right
        this.body.velocity.y = 0
        this.body.velocity.x = 150
        this.animations.play('right')
    } else if (this.cursors.up.isDown) {
        this.body.velocity.x = 0
        this.body.velocity.y = -150
        this.animations.play('right')
    } else if (this.cursors.down.isDown) {
        this.body.velocity.x = 0
        this.body.velocity.y = 150
        this.animations.play('right')
    } else {
        //  Stand still
        this.body.velocity.x = 0
        this.body.velocity.y = 0
        this.animations.stop()
        this.frame = 4
    }
  }

}