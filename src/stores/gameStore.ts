import { observable, action, /* computed */ } from 'mobx'
import { RouterStore } from 'mobx-react-router'
import PhaserGame from '../phaser'

export const GAME = 'GAME'
export const RIDDLE = 'RIDDLE'

export class GameStore {

    game: PhaserGame

    @observable level: number = 1

    @observable state: string = GAME

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
        this.state = RIDDLE
        // this.push('/riddle')
    }

    push: (path: string) => void

    setRoutingStore(routingStore: RouterStore) {
        this.push = routingStore.push
    }
}

const gameStore = new GameStore()

export default gameStore