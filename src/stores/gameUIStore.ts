import { observable, action, /* computed */ } from 'mobx'

export const GAME   = 'GAME'
export const MAP    = 'MAP'
export const BLUEP  = 'BLUEPRINT'

export interface IGameUIStore {
    selected: string
}

export class UIStore {

    @observable width: number = window.innerWidth
    @observable height: number = window.innerHeight

    @action changeWidth = (width: number) => this.width = width
    @action changeHeight = (height: number) => this.height = height

    @observable state: IGameUIStore

    constructor() {
        this.state = {
            selected: GAME
        }
        console.warn(this.width, this.height)
    }

    @action showMap = () => {
        this.state = {
            ...this.state,
            selected: MAP
        }
    }

    @action showBluep = () => {
        this.state = {
            ...this.state,
            selected: BLUEP
        }
    }

    @action showGame = () => {
        this.state = {
            ...this.state,
            selected: GAME
        }
    }
}

const uiStore = new UIStore()

window.onresize = () => {
    uiStore.changeWidth(window.innerWidth)
    uiStore.changeHeight(window.innerHeight)
}

export default uiStore