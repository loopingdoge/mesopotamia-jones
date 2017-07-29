import { action, computed, observable } from 'mobx'

import { Riddle } from '../config/riddles'

export const GAME = 'GAME'
export const MAP = 'MAP'
export const BLUEP = 'BLUEPRINT'

const getGameScale = (pageWidth: number, pageHeight: number) => {
    let width: number
    let height: number
    width = pageWidth
    height = pageWidth * 0.5625
    if (height > pageHeight) {
        height = pageHeight
        width = height * 1.77
    }
    return {
        width: Math.floor(width),
        height: Math.floor(height)
    }
}

export interface IGameUIStore {
    selected: string
    selectedRiddle: Riddle
}

export class UIStore {
    @observable
    width: number = getGameScale(window.innerWidth, window.innerHeight).width

    @observable
    height: number = getGameScale(window.innerWidth, window.innerHeight).height

    @observable state: IGameUIStore

    constructor() {
        this.state = {
            selected: GAME,
            selectedRiddle: null
        }
    }

    @action changeWidth = (width: number) => (this.width = width)
    @action changeHeight = (height: number) => (this.height = height)

    @computed
    get selectedRiddle(): Riddle {
        return this.state.selectedRiddle
    }

    @action
    show = (selected: string) => {
        this.state = {
            ...this.state,
            selected,
            selectedRiddle: selected === GAME ? null : this.state.selectedRiddle
        }
    }

    @action
    onMapDoorClick = (selectedRiddle: Riddle) => {
        this.state = {
            ...this.state,
            selectedRiddle
        }
    }
}

const uiStore = new UIStore()

window.onresize = () => {
    const { width, height } = getGameScale(
        window.innerWidth,
        window.innerHeight
    )
    uiStore.changeWidth(width)
    uiStore.changeHeight(height)
}

export default uiStore
