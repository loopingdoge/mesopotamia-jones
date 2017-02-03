declare var PIXI: any

import 'pixi'
import 'p2'
import * as Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'

import config from './config'

declare global {
    interface Window {
        game: Phaser.Game
    }
}

class Game extends Phaser.Game {

  constructor () {
  const docElement = document.documentElement
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

    super(width, height, Phaser.CANVAS, 'game', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
  }

  start() {
    this.state.start('Boot')
  }

}

export default Game