import { action, computed, observable } from 'mobx'

import { Riddle } from '../config/riddles'

export enum GameUI {
    Game,
    Map,
    Inventory,
    Help
}

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
    ui: GameUI
    selectedRiddle: Riddle
}

export class UIStore {
    @observable
    width: number = getGameScale(window.innerWidth, window.innerHeight).width

    @observable
    height: number = getGameScale(window.innerWidth, window.innerHeight).height

    @observable isInteractionHintVisible: boolean = false

    @observable isNotificationVisible: boolean = false

    @observable state: IGameUIStore

    constructor() {
        this.state = {
            ui: GameUI.Game,
            selectedRiddle: null
        }
    }

    @action changeWidth = (width: number) => (this.width = width)
    @action changeHeight = (height: number) => (this.height = height)

    @computed
    get selectedRiddle(): Riddle {
        return this.state.selectedRiddle
    }

    @computed
    get ui(): GameUI {
        return this.state.ui
    }

    @action
    show = (ui: GameUI) => {
        this.state = {
            ...this.state,
            ui,
            selectedRiddle:
                ui === GameUI.Game ? null : this.state.selectedRiddle
        }
    }

    @action
    hideOverlay = () => {
        this.state = {
            ...this.state,
            ui: GameUI.Game
        }
    }

    @action
    onMapDoorClick = (selectedRiddle: Riddle) => {
        this.state = {
            ...this.state,
            selectedRiddle
        }
    }

    @action
    showInteractionHint = () => {
        this.isInteractionHintVisible = true
    }

    @action
    hideInteractionHint = () => {
        this.isInteractionHintVisible = false
    }

    @action
    showNotification = () => {
        this.isNotificationVisible = true
    }

    @action
    hideNotification = () => {
        this.isNotificationVisible = false
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
