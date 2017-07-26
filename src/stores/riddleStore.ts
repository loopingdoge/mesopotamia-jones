import { observable, action, computed, reaction } from 'mobx'
import * as Blockly from 'node-blockly/browser'

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

        // TODO fare una factory dei blocchi
        // probabilmente ogni root block di ogni indovinello va messo nel riddle
        let mathChangeJson: any = {
            type: 'sum',
            message0: 'dati %1 e %2 %3 %4 il risultato è: %5',
            args0: [
                {
                    type: 'field_variable',
                    name: 'x',
                    variable: 'numero1'
                },
                {
                    type: 'field_variable',
                    name: 'y',
                    variable: 'numero2'
                },
                {
                    type: 'input_dummy'
                },
                {
                    type: 'input_statement',
                    name: 'USERCODE',
                    check: 'Number'
                },
                {
                    type: 'input_value',
                    name: 'RETURN',
                    check: 'Number',
                    align: 'RIGHT'
                }
            ],
            inputsInline: false,
            colour: 45,
            tooltip:
                'I dati sono numeri, quindi il risultato deve essere un numero',
            helpUrl: ''
        }

        Blockly.Blocks['sum'] = {
            init: function() {
                this.jsonInit(mathChangeJson)
                // Assign 'this' to a variable for use in the tooltip closure below.
                let thisBlock: any = this
            }
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

        // TODO parametrizzare questa cosa
        let self: any = this
        Blockly.JavaScript['sum'] = function(block: any) {
            let x = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue('x'),
                Blockly.Variables.NAME_TYPE
            )
            let y = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue('y'),
                Blockly.Variables.NAME_TYPE
            )
            let userCode = Blockly.JavaScript.statementToCode(block, 'USERCODE')
            let ret = Blockly.JavaScript.valueToCode(
                block,
                'RETURN',
                Blockly.JavaScript.ORDER_ATOMIC
            )
            let code = `(function( ${x}, ${y} ) { ${userCode} return ${ret} })(${self
                .state.generatedArgs})`
            return code
        }

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
            console.warn(
                'We generate the function but we need the block to call it'
            )
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
