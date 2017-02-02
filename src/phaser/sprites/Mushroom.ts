import * as Phaser from 'phaser'

interface ISprite {
  game: Phaser.Game
  x: number
  y: number
  key?: string
}

export default class Mushroom extends Phaser.Sprite {

  constructor ({ game, x, y, key}: ISprite) {
    super(game, x, y, key)
    this.anchor.setTo(0.5)
  }

  update () {
    this.angle += 1
  }

}