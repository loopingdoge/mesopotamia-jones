import { observable, action, /* computed */ } from 'mobx'

export class RiddleStore {
    level: number = 0

    riddleText: string
    defaultCode: string

    @observable userCode: string
    @observable codeResult: string

    @observable isSolved: boolean

    @action runCode = () => {
        console.warn('ESEGUO STO CODICE EMMERDA', this.userCode)
        this.codeResult = '18'
    }
}

const riddleStore = new RiddleStore()

export default riddleStore