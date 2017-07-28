import 'p2'
import * as Phaser from 'phaser-ce'
import 'pixi'

import BootState from './states/Boot'
import GameState from './states/Game'
import SplashState from './states/Splash'

import config from './config'

declare global {
    interface Window {
        game: Phaser.Game
    }
}

const calculateDimesions = () => {
    const docElement = document.documentElement
    const width =
        docElement.clientWidth > config.gameWidth
            ? config.gameWidth
            : docElement.clientWidth
    const height =
        docElement.clientHeight > config.gameHeight
            ? config.gameHeight
            : docElement.clientHeight
    return { width, height }
}

class Game extends Phaser.Game {
    constructor() {
        super(config.gameWidth, config.gameHeight, Phaser.CANVAS, 'game', null)

        this.state.add('Boot', BootState, false)
        this.state.add('Splash', SplashState, false)
        this.state.add('Game', GameState, false)
    }

    start() {
        this.state.start('Boot')
    }

    loadRoom() {
        this.state.start('Game')
    }

    nextLevel() {
        this.state.restart()
    }
}

export default Game
