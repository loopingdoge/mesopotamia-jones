import 'pixi'
// tslint:disable-next-line
import 'p2'
import * as Phaser from 'phaser-ce'

import BootState from './states/Boot'
import GameState from './states/Game'

import { gameHeight, gameWidth } from './config'

const calculateDimesions = () => {
    const docElement = document.documentElement
    const width =
        docElement.clientWidth > gameWidth ? gameWidth : docElement.clientWidth
    const height =
        docElement.clientHeight > gameHeight
            ? gameHeight
            : docElement.clientHeight
    return { width, height }
}

class Game extends Phaser.Game {
    constructor() {
        super(gameWidth, gameHeight, Phaser.CANVAS, 'game', null)

        this.state.add('Boot', BootState, false)
        this.state.add('Game', GameState, false)
    }

    start() {
        this.state.start('Boot')
    }

    loadRoom() {
        this.state.clearCurrentState()
        this.state.start('Game')
    }

    nextLevel() {
        this.state.restart()
    }
}

export default Game
