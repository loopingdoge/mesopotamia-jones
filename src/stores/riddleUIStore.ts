import { action, observable } from 'mobx'

export class RiddleUIStore {
    @observable isCuneiformExpanded: boolean = true
    @observable isLegendExpanded: boolean = true
    @observable isNotificationVisible: boolean = false
    @observable isTutorialOpen: boolean = false
    @observable tutorialStartIndex: number = 0

    @action
    shrinkCuneiform = () => {
        this.isCuneiformExpanded = false
        const event = document.createEvent('HTMLEvents')
        event.initEvent('resize', true, false)
        for (let i = 100; i < 1000; i += 25) {
            setTimeout(() => window.dispatchEvent(event), i)
        }
    }

    @action
    expandCuneiform = () => {
        this.isCuneiformExpanded = true
        const event = document.createEvent('HTMLEvents')
        event.initEvent('resize', true, false)
        for (let i = 100; i < 1000; i += 25) {
            setTimeout(() => window.dispatchEvent(event), i)
        }
    }

    @action shrinkLegend = () => (this.isLegendExpanded = false)
    @action expandLegend = () => (this.isLegendExpanded = true)

    @action showNotification = () => (this.isNotificationVisible = true)
    @action hideNotification = () => (this.isNotificationVisible = false)

    @action showTutorial = () => (this.isTutorialOpen = true)
    @action hideTutorial = () => (this.isTutorialOpen = false)
}

const riddleUIStore = new RiddleUIStore()

export default riddleUIStore
