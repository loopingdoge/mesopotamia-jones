import { observable, action, /* computed */ } from 'mobx'

import { GameDoor } from '../config/map'
import { Riddle } from '../config/riddles'

export const GAME   = 'GAME'
export const MAP    = 'MAP'
export const BLUEP  = 'BLUEPRINT'

export interface IGameUIStore {
    selected: string
    selectedRiddle: Riddle
}

export class UIStore {

    @observable width: number = window.innerWidth
    @observable height: number = window.innerHeight

    @action changeWidth = (width: number) => this.width = width
    @action changeHeight = (height: number) => this.height = height

    @observable state: IGameUIStore

    constructor() {
        this.state = {
            selected: GAME,
            selectedRiddle: null,
        }
    }

    @action show = (selected: string) => {
        this.state = {
            ...this.state,
            selected,
            selectedRiddle: selected === GAME ? null : this.state.riddselectedRiddlele,
        }
    }

    @action onMapDoorClick = (selectedRiddle: Riddle) => {
        console.error('onMapDoorClick', selectedRiddle)
        this.state = {
            ...this.state,
            selectedRiddle
        }
    }
}

const uiStore = new UIStore()

window.onresize = () => {
    uiStore.changeWidth(window.innerWidth)
    uiStore.changeHeight(window.innerHeight)
}

export default uiStore