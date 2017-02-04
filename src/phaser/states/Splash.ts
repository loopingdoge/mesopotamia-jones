import * as Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class Splash extends Phaser.State {

  loaderBg: Phaser.Sprite
  loaderBar: Phaser.Sprite

  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('wall', 'assets/images/loader-bar.png')
    this.load.spritesheet('dude', 'assets/images/dude.png', 32, 48)
  }

  create () {
    this.state.start('Game')
  }

}