import { observable, action, reaction, /* computed */ } from 'mobx'
import { RiddleStore } from './riddleStore'

import PhaserGame from '../phaser'

export const GAME = 'GAME'
export const RIDDLE = 'RIDDLE'

export class GameStore {

    game: PhaserGame

    push: (path: string) => void
    riddleStore: RiddleStore

    @observable level: number = 1

    @observable state: string = GAME

    init(stores: any) {
        let { riddleStore, routingStore } = stores
        this.push = routingStore.push
        this.riddleStore = riddleStore

        reaction(
            () => this.riddleStore.isSolved,
            () => this.levelSolved(this.riddleStore.level)
        )
    }

    @action startGame = () => {
        this.game = new PhaserGame()
        this.game.start()
    }

    @action incrementLevel = () => this.level++

    @action goToLevel = (level: number) => {
        this.level = level
        this.state = GAME
    }

    @action goToRiddle = (level: number) => {
        // TODO: usare level
        this.state = RIDDLE
        this.riddleStore.changeLevel(this.level)
    }

    @action levelSolved = (level: number) => {
        this.level = level + 1
        this.state = GAME
        // TODO: Far ricaricare il livello a game
    }

}

const gameStore = new GameStore()

export default gameStore