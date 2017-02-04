/* globals __DEV__ */
declare const __DEV__: boolean
import * as Phaser from 'phaser'
import Dude from '../sprites/Dude'

export default class Game extends Phaser.State {

  player: Phaser.Sprite
  walls: Phaser.Group

  init () {}
  preload () {}

  create () {
    // const bannerText = 'Phaser + ES6 + Webpack + Typescript'
    // let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, '')
    // banner.font = 'Bangers'
    // banner.padding.set(10, 16)
    // banner.fontSize = 40
    // banner.fill = '#77BFA3'
    // banner.smoothed = false
    // banner.anchor.setTo(0.5)
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.walls = this.game.add.group()
    this.walls.enableBody = true        // Abilito la fisica per ogni oggetto del gruppo

    // top e bottom sono alti 40, left e right sono larghi 58
    let top = this.walls.create(0, 0, 'wall')
    top.scale.setTo(4.5, 2)
    top.body.immovable = true
    top.body.setSize(this.game.width, 2, 0, 0)

    let bottom = this.walls.create(0, this.game.height - 40, 'wall')
    bottom.scale.setTo(4.5, 2)
    bottom.body.immovable = true
    bottom.body.setSize(this.game.width, 40, 0, -4)

    let left = this.walls.create(0, 0, 'wall')
    left.scale.setTo(0.2, 36)
    left.body.immovable = true

    let right = this.walls.create(this.game.width - 58, 0, 'wall')
    right.scale.setTo(0.2, 36)
    right.body.immovable = true

    this.player = this.game.add.existing(new Dude({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      key: 'dude'
    }))

  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }

  update () {
    this.game.physics.arcade.collide(this.player, this.walls)
  }
}