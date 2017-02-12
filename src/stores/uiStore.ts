import { observable, action, /* computed */ } from 'mobx'

export class UIStore {

    @observable width: number = window.innerWidth
    @observable height: number = window.innerHeight

    @action changeWidth = (width: number) => this.width = width
    @action changeHeight = (height: number) => this.height = height

}

const uiStore = new UIStore()

window.onresize = () => {
    uiStore.changeWidth(window.innerWidth)
    uiStore.changeHeight(window.innerHeight)
}

export default uiStore