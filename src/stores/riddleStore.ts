import { observable, action, computed } from 'mobx'
import { GameDoor } from '../config/map'
import { Riddle } from '../config/riddles'

export class RiddleStore {

    @observable currentGameDoor: GameDoor
    @observable generatedArgs: any[]
    @observable userCode: string
    @observable codeResult: any
    @observable isSolved: boolean = false

    @computed get currentRiddle(): Riddle {
        return this.currentGameDoor.door.riddle
    }

    @action setUserCode = (newCode: string) => this.userCode = newCode

    @action activateDoor = (gameDoor: GameDoor) => {
        console.warn('CHANGE', gameDoor.door.id)
        this.currentGameDoor = gameDoor
        this.generatedArgs = this.currentRiddle.argsGenerator()
        this.setUserCode(this.currentRiddle.defaultCode(this.generatedArgs))
    }

    @action checkSolution = () => {
        if (this.currentRiddle.solution(this.generatedArgs) === this.codeResult) {
            this.isSolved = true
        }
    }

    @action runCode = () => {
        try {
            // tslint:disable-next-line: no-eval
            this.codeResult = eval(`(function() {${this.userCode}})()`)
        } catch (e) {
            this.codeResult = (<EvalError>e).message
        }
    }

}

const riddleStore = new RiddleStore()

export default riddleStore