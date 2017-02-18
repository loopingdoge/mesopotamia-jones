import { observable, action, reaction, /* computed */ } from 'mobx'
import { RouterStore } from 'mobx-react-router'
import { RiddleStore } from './riddleStore'

export class GameStore {

    init(stores: any) {
        let { riddleStore, routingStore } = stores
        this.push = routingStore.push
        this.riddleStore = riddleStore

        reaction(
            () => this.riddleStore.isSolved,
            () => this.levelSolved(this.riddleStore.level)
        )
    }

    push: (path: string) => void
    riddleStore: RiddleStore

    @observable level: number = 0

    @action incrementLevel = () => this.level++

    @action goToRiddle = (level: number) => {
        this.riddleStore.changeLevel(this.level)
        this.push('/riddle')
    }

    @action levelSolved = (level: number) => {
        this.level = level+1
        this.push('/game')
    }

}

const gameStore = new GameStore()

export default gameStore