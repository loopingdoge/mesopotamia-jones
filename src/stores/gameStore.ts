import { observable, action, /* computed */ } from 'mobx'
import riddles from '../config/riddles'
import { RouterStore } from 'mobx-react-router'

export class GameStore {

    @observable level: number = 0

    @action incrementLevel = () => this.level++

    @action goToRiddle = (level: number) => {
        this.level = level
        this.push('/riddle')
    }

    push: (path: string) => void

    setRoutingStore(routingStore: RouterStore) {
        this.push = routingStore.push
    }
}

const gameStore = new GameStore()

export default gameStore