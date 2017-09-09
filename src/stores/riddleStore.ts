import { action, computed, observable, reaction } from 'mobx'
import * as Blockly from 'node-blockly/browser'

import { blocks } from '../config/blocks'
import { GameDoor } from '../config/map'
import { Riddle, userSolutionInit } from '../config/riddles'
import riddleUIStore from './riddleUIStore'

export interface IRiddleStore {
    currentGameDoor: GameDoor
    generatedArgs: any[]
    workspaceXML: string
    userSolution: string
    codeResult: any
    isSolved: boolean
}

export class RiddleStore {
    @observable state: IRiddleStore

    @computed
    get currentGameDoor(): GameDoor {
        return this.state.currentGameDoor
    }
    @computed
    get generatedArgs(): any[] {
        return this.state.generatedArgs
    }
    @computed
    get workspaceXML(): string {
        return this.state.workspaceXML
    }
    @computed
    get userSolution(): string {
        return this.state.userSolution
    }
    @computed
    get codeResult(): any {
        return this.state.codeResult
    }
    @computed
    get isSolved(): boolean {
        return this.state.isSolved
    }

    set isSolved(isSolved: boolean) {
        this.state.isSolved = isSolved
    }

    @computed
    get currentRiddle(): Riddle {
        return this.state.currentGameDoor.door.riddle
    }

    @computed
    get question(): string {
        return this.currentRiddle.question(this.generatedArgs)
    }

    constructor() {
        this.state = {
            currentGameDoor: null,
            generatedArgs: null,
            userSolution: null,
            workspaceXML: null,
            codeResult: null,
            isSolved: false
        }

        reaction(
            () => this.codeResult,
            result => {
                if (
                    this.currentRiddle.solution(this.generatedArgs) !== result
                ) {
                    riddleUIStore.showNotification()
                    setTimeout(() => riddleUIStore.hideNotification(), 1000)
                }
            }
        )

        // Init custom blocks
        for (const block of blocks) {
            // Visual properties
            Blockly.Blocks[block.id] = {
                init() {
                    this.jsonInit(block.json)
                }
            }
            // Codegen
            Blockly.JavaScript[block.id] = block.generator
        }
    }

    @action
    setWorkspaceXML = (workspaceXML: string) => {
        this.state = {
            ...this.state,
            workspaceXML
        }
    }

    @action
    setUserSolution = (newSol: string) => {
        this.state = {
            ...this.state,
            userSolution: newSol
        }
    }

    @action
    activateDoor = (gameDoor: GameDoor, workspaceXML: string) => {
        const riddle = gameDoor.door.riddle
        const rootBlockID = `riddle_${riddle.id}`

        this.state = {
            ...this.state,
            currentGameDoor: gameDoor,
            generatedArgs: riddle.argsGenerator(),
            userSolution: userSolutionInit(
                riddle.solutionType,
                riddle.solutionLength
            ),
            isSolved: false
        }

        if (!Blockly.Blocks[rootBlockID]) {
            Blockly.Blocks[rootBlockID] = {
                init() {
                    this.jsonInit(riddle.rootBlock)
                }
            }
        }
        // TODO parametrizzare questa cosa
        Blockly.JavaScript[rootBlockID] = riddle.getCodeGen(this.generatedArgs)

        this.setWorkspaceXML(
            workspaceXML ||
                this.currentRiddle.defaultWorkspace(this.generatedArgs)
        )
        if (workspaceXML) {
            // ex userCode
            this.runCode()
            this.checkSolution()
        }
    }

    @action
    checkSolution = () => {
        const riddleSolution = this.currentRiddle.solution(this.generatedArgs)
        let newState: IRiddleStore = this.state
        if (riddleSolution === this.userSolution) {
            newState = {
                ...this.state,
                isSolved: true
            }
        }
        this.state = newState
    }

    @action
    runCode = () => {
        let codeResult
        let userSolution = this.state.userSolution

        const workspace = new Blockly.Workspace()
        let xml
        try {
            xml = Blockly.Xml.textToDom(this.workspaceXML)
        } catch (e) {
            console.error(e)
        }

        Blockly.Xml.domToWorkspace(xml, workspace)
        const code = Blockly.JavaScript.workspaceToCode(workspace)

        try {
            // tslint:disable-next-line: no-eval
            codeResult = eval(code)
            // TODO: Check if codeResult is appropriate
            userSolution = String(codeResult)
            console.log(`Code result: ${userSolution}`)
        } catch (e) {
            codeResult = (e as EvalError).message
        }
        this.state = {
            ...this.state,
            codeResult,
            userSolution
        }
    }
}

const riddleStore = new RiddleStore()

export default riddleStore
