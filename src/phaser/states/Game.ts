/* globals __DEV__ */
declare const __DEV__: boolean
import * as Phaser from 'phaser'
// import Mushroom from '../sprites/Mushroom'
import Dude from '../sprites/Dude'

export default class Game extends Phaser.State {

  // mushroom: Mushroom
  player: Phaser.Sprite

  init () {}
  preload () {}

  create () {
    const bannerText = 'Phaser + ES6 + Webpack + Typescript'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, '')
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    // this.mushroom = new Mushroom({
    //   game: this.game,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   key: 'mushroom'
    // })
    // this.game.add.existing(this.mushroom)

    this.player = this.game.add.existing(new Dude({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      key: 'dude'
    }))

    this.player.animations.add('left', [0, 1, 2, 3], 10, true)
    this.player.animations.add('right', [5, 6, 7, 8], 10, true)

    this.player.animations.play('right')
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.dude, 32, 32)
    }
  }
}