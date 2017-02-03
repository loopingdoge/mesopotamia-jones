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
    // this.game.physics.enable(this, Phaser.Physics.Arcade)
  }

  update() {
    if (this.cursors.left.isDown) {
        // this.body.velocity.x = -150
        this.animations.play('left')
    } else if (this.cursors.right.isDown) {
        //  Move to the right
        // this.body.velocity.x = 150
        this.animations.play('right')
    } else {
        //  Stand still
        this.animations.stop()
        this.frame = 4
    }
  }

}