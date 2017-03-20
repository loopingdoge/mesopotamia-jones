import { observable, action, reaction, /* computed */ } from 'mobx'

export class RiddleUIStore {

    @observable isCuneiformExpanded: boolean = true
    @observable isLegendExpanded: boolean = true

    @observable isCuneiformButtonToggled: boolean = false
    @observable isLegendButtonToggled: boolean = false

    @observable isNotificationVisible: boolean = false

    constructor() {
        reaction(
            () => this.isCuneiformExpanded,
            () => setTimeout(() => this.isCuneiformButtonToggled = !this.isCuneiformButtonToggled, 350)
        )
        reaction(
            () => this.isLegendExpanded,
            () => setTimeout(() => this.isLegendButtonToggled = !this.isLegendButtonToggled, 350)
        )
    }

    @action shrinkCuneiform = () => this.isCuneiformExpanded = false
    @action expandCuneiform = () => this.isCuneiformExpanded = true

    @action shrinkLegend = () => this.isLegendExpanded = false
    @action expandLegend = () => this.isLegendExpanded = true

    @action showNotification = () => this.isNotificationVisible = true
    @action hideNotification = () => this.isNotificationVisible = false

}

const riddleUIStore = new RiddleUIStore()

export default riddleUIStore