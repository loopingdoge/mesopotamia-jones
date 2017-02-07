import { observable, action, /* computed */ } from 'mobx'

export class GameStore {
    @observable level: number = 0

    @action incrementLevel = () => this.level++

    @action prevLevel = () => this.level--
    @action nextLevel = () => this.level++
}

const gameStore = new GameStore()

export default gameStore