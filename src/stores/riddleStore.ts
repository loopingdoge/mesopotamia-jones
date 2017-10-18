import { action, computed, observable, reaction } from 'mobx'
import * as Blockly from 'node-blockly/browser'

import { getBlocks } from '../config/blocks'
import { GameDoor } from '../config/map'
import riddles, { Riddle, userSolutionInit } from '../config/riddles'
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
    isSolvedAutomatically: boolean
    error: boolean
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

    @computed
    get blocklyError(): boolean {
        return this.state.error
    }

    constructor() {
        this.state = {
            currentGameDoor: null,
            generatedArgs: null,
            userSolution: null,
            workspaceXML: null,
            codeResult: null,
            isSolved: false,
            riddleCompleted: false,
            isSolvedAutomatically: false,
            error: false
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

        this.initBlocks()
    }

    initBlocks() {
        // Init custom blocks
        for (const block of getBlocks()) {
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
        const paramsXML = this.currentRiddle.paramsXML(this.generatedArgs)
        this.state = {
            ...this.state,
            workspaceXML: workspaceXML.replace(
                /<statement name="RIDDLE_PARAMS">[\s\S]*?<\/statement>/,
                `<statement name="RIDDLE_PARAMS">${paramsXML}</statement>`
            )
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
            codeResult: userSolutionInit(
                riddle.solutionType,
                riddle.solutionLength
            )
        }

        this.setWorkspaceXML(
            workspaceXML || this.currentRiddle.defaultWorkspace
        )

        if (workspaceXML) {
            // ex userCode
            this.runCode()
            if (this.checkSolution()) {
                this.setRiddleCompleted(true)
            }
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
    setRiddleCompleted = (automatic: boolean = false) => {
        if (this.checkSolution()) {
            this.state = {
                ...this.state,
                riddleCompleted: true,
                isSolvedAutomatically: automatic
            }
        }
    }

    @action
    runCode = () => {
        let codeResult
        let userSolution = this.state.userSolution
        let error = false
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
        const code = `${Blockly.JavaScript.workspaceToCode(workspace)}; main()`

        try {
            // tslint:disable-next-line: no-eval
            codeResult = eval(code)

            // tslint:disable-next-line:curly
            if (solutionType === 'number')
                codeResult = padStart(codeResult, solutionLength, '0')

            // TODO: Check if codeResult is appropriate
            if (codeResult) {
                userSolution = String(codeResult)
                // console.log(`Code result: ${userSolution}`)
            }
        } catch (e) {
            error = true
        }
        this.state = {
            ...this.state,
            codeResult,
            userSolution,
            error
        }
    }

    @action
    clearWorkspace = () => {
        this.setWorkspaceXML(this.currentRiddle.defaultWorkspace)
    }
}

const riddleStore = new RiddleStore()

export default riddleStore
