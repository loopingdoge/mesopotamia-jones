import { observable, action, /* computed */ } from 'mobx'

import { GameDoor } from '../config/map'

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
    }

    @action show = (selected: string) => {
        this.state = {
            ...this.state,
            selected
        }
    }

    @action onMapDoorClick = (door: GameDoor) => {

    }
}

const uiStore = new UIStore()

window.onresize = () => {
    uiStore.changeWidth(window.innerWidth)
    uiStore.changeHeight(window.innerHeight)
}

export default uiStore