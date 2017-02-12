import { observable, action, /* computed */ } from 'mobx'

export class RiddleUIStore {

    @observable isCuneiformExpanded: boolean = true
    @observable isLegendExpanded: boolean = true

    @action shrinkCuneiform = () => this.isCuneiformExpanded = false
    @action expandCuneiform = () => this.isCuneiformExpanded = true

    @action shrinkLegend = () => this.isLegendExpanded = false
    @action expandLegend = () => this.isLegendExpanded = true

}

const riddleUIStore = new RiddleUIStore()

export default riddleUIStore