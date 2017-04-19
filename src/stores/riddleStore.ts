import { observable, action, computed, reaction } from 'mobx'
import { GameDoor } from '../config/map'
import { Riddle, userSolutionInit } from '../config/riddles'
import riddleUIStore from './riddleUIStore'

export interface IRiddleStore {
    currentGameDoor: GameDoor
    generatedArgs: any[]
    userCode: string
    parameters: string[]
    userSolution: string
    codeResult: any
    isSolved: boolean
}

export class RiddleStore {

    @observable state: IRiddleStore

    @computed get currentGameDoor(): GameDoor {
        return this.state.currentGameDoor
    }
    @computed get generatedArgs(): any[] {
        return this.state.generatedArgs
    }
    @computed get userCode(): string {
        return this.state.userCode
    }
    @computed get parameters(): string[] {
        return this.state.parameters
    }
    @computed get userSolution(): string {
        return this.state.userSolution
    }
    @computed get codeResult(): any {
        return this.state.codeResult
    }
    @computed get isSolved(): boolean {
        return this.state.isSolved
    }

    set isSolved(isSolved: boolean) {
        this.state.isSolved = isSolved
    }

    @computed get currentRiddle(): Riddle {
        return this.state.currentGameDoor.door.riddle
    }

    @computed get question(): string {
        return this.currentRiddle.question(this.generatedArgs)
    }

    constructor() {
        this.state = {
            currentGameDoor: null,
            generatedArgs: null,
            userCode: null,
            parameters: [],
            userSolution: null,
            codeResult: null,
            isSolved: false,
        }
        reaction(
            () => this.codeResult,
            result => {
                if (this.currentRiddle.solution(this.generatedArgs) !== result) {
                    riddleUIStore.showNotification()
                    setTimeout(() => riddleUIStore.hideNotification(), 1000)
                }
            }
        )
    }

    @action setUserCode = (newCode: string) => {
        this.state = {
            ...this.state,
            userCode: newCode,
        }
    }

    @action setUserSolution = (newSol: string) => {
        this.state = {
            ...this.state,
            userSolution: newSol,
        }
    }

    @action activateDoor = (gameDoor: GameDoor, userCode: string) => {
        const riddle = gameDoor.door.riddle
        this.state = {
            ...this.state,
            currentGameDoor: gameDoor,
            generatedArgs: riddle.argsGenerator(),
            userSolution: userSolutionInit(riddle.solutionType, riddle.solutionLength),
            isSolved: false,
        }
        this.state.parameters = this.currentRiddle.parameters(this.generatedArgs)
        this.setUserCode(userCode || this.currentRiddle.defaultCode(this.generatedArgs))
        if (userCode) {
            this.runCode()
            this.checkSolution()
        }
    }

    @action checkSolution = () => {
        const riddleSolution = this.currentRiddle.solution(this.generatedArgs)
        let newState: IRiddleStore = this.state
        if (riddleSolution === this.userSolution) {
             newState = {
                 ...this.state,
                 isSolved: true,
             }
        }
        this.state = newState
    }

    @action runCode = () => {
        let codeResult
        let userSolution = this.state.userSolution
        const paramString = this.parameters.reduce((prev, param) => `${prev} ${param}`)

        try {
            // tslint:disable-next-line: no-eval
            codeResult = eval(`(function() {${paramString} ${this.userCode}})()`)
            // TODO: Check if codeResult is appropriate
            userSolution = String(codeResult)
        } catch (e) {
            codeResult = (e as EvalError).message
        }
        this.state = {
            ...this.state,
            codeResult,
            userSolution,
        }
    }

}

const riddleStore = new RiddleStore()

export default riddleStore