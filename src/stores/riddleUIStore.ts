import { observable, action, /* computed */ } from 'mobx'

export class RiddleUIStore {

    @observable isCuneiformExpanded: boolean = true
    @observable isLegendExpanded: boolean = true
    @observable isNotificationVisible: boolean = false

    @action shrinkCuneiform = () => this.isCuneiformExpanded = false
    @action expandCuneiform = () => this.isCuneiformExpanded = true

    @action shrinkLegend = () => this.isLegendExpanded = false
    @action expandLegend = () => this.isLegendExpanded = true

    @action showNotification = () => this.isNotificationVisible = true
    @action hideNotification = () => this.isNotificationVisible = false

}

const riddleUIStore = new RiddleUIStore()

export default riddleUIStore