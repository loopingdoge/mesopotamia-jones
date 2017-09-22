import { action, computed, observable, reaction } from 'mobx'
import * as Blockly from 'node-blockly/browser'

import { blocks } from '../config/blocks'
import { GameDoor } from '../config/map'
import riddles from '../config/riddles'
import { Riddle, userSolutionInit } from '../config/riddles'
import riddleUIStore from './riddleUIStore'

import { padStart } from 'lodash'

export interface IRiddleStore {
    currentGameDoor: GameDoor
    generatedArgs: any[]
    workspaceXML: string
    userSolution: string
    codeResult: any
    isSolved: boolean
    riddleCompleted: boolean
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
    get riddleCompleted(): boolean {
        return this.state.riddleCompleted
    }
    set riddleCompleted(riddleCompleted: boolean) {
        this.state.riddleCompleted = riddleCompleted
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
            isSolved: false,
            riddleCompleted: false
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

        reaction(() => this.userSolution, () => this.checkSolution())

        for (const riddle of riddles) {
            // Visual properties
            Blockly.Blocks[`riddle_${riddle.id}`] = {
                init() {
                    this.jsonInit(riddle.rootBlock)
                }
            }
        }

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
            isSolved: false,
            codeResult: null
        }

        // if (!Blockly.Blocks[rootBlockID]) {
        //     Blockly.Blocks[rootBlockID] = {
        //         init() {
        //             this.jsonInit(riddle.rootBlock)
        //         }
        //     }
        // }
        // TODO parametrizzare questa cosa
        Blockly.JavaScript[rootBlockID] = riddle.getCodeGen(this.generatedArgs)

        this.setWorkspaceXML(
            workspaceXML ||
                this.currentRiddle.defaultWorkspace(this.generatedArgs)
        )
        if (workspaceXML) {
            // ex userCode
            this.runCode()
            this.setRiddleCompleted()
        }
        riddleUIStore.tutorialStartIndex = 0
    }

    @action
    checkSolution = () => {
        const riddleSolution = this.currentRiddle.solution(this.generatedArgs)
        const isSolved = riddleSolution === this.userSolution

        this.state = {
            ...this.state,
            isSolved
        }

        return isSolved
    }

    @action
    setRiddleCompleted = () => {
        if (this.checkSolution()) {
            this.state = {
                ...this.state,
                riddleCompleted: true
            }
        }
    }

    @action
    runCode = () => {
        let codeResult
        let userSolution = this.state.userSolution
        const {
            solutionType,
            solutionLength
        } = this.currentGameDoor.door.riddle

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

            // tslint:disable-next-line:curly
            if (solutionType === 'number')
                codeResult = padStart(codeResult, solutionLength, '0')

            // TODO: Check if codeResult is appropriate
            if (codeResult) {
                userSolution = String(codeResult)
                console.log(`Code result: ${userSolution}`)
            }
        } catch (e) {
            codeResult = (e as EvalError).message
        }
        this.state = {
            ...this.state,
            codeResult,
            userSolution
        }
    }

    @action
    clearWorkspace = () => {
        this.state = {
            ...this.state,
            workspaceXML: this.currentRiddle.defaultWorkspace([
                ...this.generatedArgs
            ]),
            codeResult: null
        }
    }
}

const riddleStore = new RiddleStore()

export default riddleStore
