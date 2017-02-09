import { observable, action, computed } from 'mobx'
import riddles, { Riddle } from '../config/riddles'

export class RiddleStore {

    level: number
    riddles: Riddle[]
    args: any[]

    @observable userCode: string
    @observable codeResult: any

    @observable isSolved: boolean = false

    constructor(level: number = 1) {
        this.level = level
        this.riddles = riddles
        this.changeLevel(this.level)
        this.generateArgs()
    }

    @action checkSolution = () => {
        if (this.riddles[this.level].solution(this.args) === this.codeResult) {
            this.isSolved = true
        }
    }

    @action generateArgs = () => {
        this.args = this.riddles[this.level].argsGenerator()
    }

    @action runCode = () => {
        try {
            // tslint:disable-next-line: no-eval
            this.codeResult = eval(`(function() {${this.userCode}})()`)
        } catch(e) {
            this.codeResult = (<EvalError>e).message
        }
    }

    @action changeLevel = (level: number) => {
        this.level = level
        this.generateArgs()
        this.setUserCode(this.riddles[this.level].defaultCode(this.args))
    }

    @action setUserCode = (newCode: string) => this.userCode = newCode

    @computed get riddle() {
        return this.riddles[this.level]
    }

}

const riddleStore = new RiddleStore()

export default riddleStore