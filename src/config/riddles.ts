import * as Blockly from 'node-blockly/browser'

export interface Riddle {
    id: string
    question: (variables: any[]) => string
    defaultToolbox: string[]
    defaultWorkspace: (variables: any[]) => string
    solution: (variables: any[]) => string
    solutionLength: number
    solutionType: SolutionType
    rootBlock: any
    getCodeGen: (args: any) => (block: any) => string
    argsGenerator: () => any[]
}

export type SolutionType = 'string' | 'number'

const randomNum = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomLetter = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const randomIndex = Math.floor(Math.random() * letters.length)
    return letters[randomIndex]
}

export const userSolutionInit = (type: SolutionType, length: number) => {
    let str = ''
    // tslint:disable-next-line:curly
    for (let i = 0; i < length; i++)
        str = str.concat(type === 'string' ? 'a' : '0')
    return str
}

const riddles: Riddle[] = [
    {
        id: 'return',
        question: ([a]: number[]) => `Inserisci il numero ${a}`,
        defaultToolbox: [`<block type="numero1"></block>`],
        defaultWorkspace: ([a]) => `
        <xml xmlns="http://www.w3.org/1999/xhtml">
            <block type="riddle_return" id="riddle_return" deletable="false"></block>
        </xml>`,
        rootBlock: {
            type: 'riddle_return',
            message0: 'dato %1 %2 apri la porta con: %3',
            args0: [
                {
                    type: 'field_variable',
                    name: 'x',
                    variable: 'numero1'
                },
                {
                    type: 'input_dummy'
                },
                {
                    type: 'input_value',
                    name: 'return',
                    check: 'Number',
                    align: 'RIGHT'
                }
            ],
            inputsInline: false,
            colour: 45,
            tooltip:
                'I dati sono numeri, quindi il risultato deve essere un numero',
            helpUrl: ''
        }, // TODO block: any <- impostare type
        getCodeGen: (args: any) => (block: any) => {
            const x = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue('x'),
                Blockly.Variables.NAME_TYPE
            )
            const ret = Blockly.JavaScript.valueToCode(
                block,
                'return',
                Blockly.JavaScript.ORDER_ADDITION
            )
            const code = `(function( ${x} ) { return ${ret} })(${args})`
            return code
        },
        solution: ([a]: number[]) => `${a}`,
        solutionLength: 1,
        solutionType: 'number',
        argsGenerator: () => [randomNum(1, 9)]
    },
    {
        id: 'somma',
        question: ([a, b]: number[]) => `Quanto fa la somma di ${a} e ${b}?`,
        defaultToolbox: [
            `<block type="numero1"></block>`,
            `<block type="numero2"></block>`,
            `<block type="math_arithmetic">
                <field name="OP">ADD</field>
                <value name="A">
                </value>
                <value name="B">
                </value>
            </block>`
        ],
        defaultWorkspace: ([a, b]) => `
        <xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">
            <block type="riddle_somma" id="riddle_somma" deletable="false"></block>
        </xml>`,
        rootBlock: {
            type: 'riddle_somma',
            message0: 'dati %1 e %2 %3 %4 apri la porta con: %5',
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
        },
        getCodeGen: (args: any) => (block: any) => {
            const x = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue('x'),
                Blockly.Variables.NAME_TYPE
            )
            const y = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue('y'),
                Blockly.Variables.NAME_TYPE
            )
            const userCode = Blockly.JavaScript.statementToCode(
                block,
                'USERCODE'
            )
            const ret = Blockly.JavaScript.valueToCode(
                block,
                'RETURN',
                Blockly.JavaScript.ORDER_ATOMIC
            )
            const code = `(function( ${x}, ${y} ) { ${userCode} return ${ret} })(${args})`
            return code
        },
        solution: ([a, b]: number[]) => `${a + b}`,
        solutionLength: 1,
        solutionType: 'number',
        argsGenerator: () => [randomNum(1, 4), randomNum(1, 4)]
    },
    {
        id: 'word',
        question: ([a, b, c, d]: string[]) =>
            `Se la porta aprire vorrai, in fila le seguenti lettere mettere dovrai ${a}, ${b}, ${c}, ${d}`,
        defaultToolbox: [`<block type="math_number"></block>`],
        defaultWorkspace: ([a, b, c, d]) => `
        <xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">
            <block type="riddle_somma" id="riddle_somma" deletable="false"></block>
        </xml>`,
        rootBlock: {
            type: 'riddle_somma',
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
        },
        getCodeGen: (args: any) => (block: any) => {
            const x = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue('x'),
                Blockly.Variables.NAME_TYPE
            )
            const y = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue('y'),
                Blockly.Variables.NAME_TYPE
            )
            const userCode = Blockly.JavaScript.statementToCode(
                block,
                'USERCODE'
            )
            const ret = Blockly.JavaScript.valueToCode(
                block,
                'RETURN',
                Blockly.JavaScript.ORDER_ATOMIC
            )
            const code = `(function( ${x}, ${y} ) { ${userCode} return ${ret} })(${args})`
            return code
        },
        solution: ([a, b, c, d]: string[]) => `${a + b + c + d}`,
        solutionLength: 4,
        solutionType: 'string',
        argsGenerator: () => [
            randomLetter(),
            randomLetter(),
            randomLetter(),
            randomLetter()
        ]
    },
    {
        id: 'somma',
        question: ([a, b]: number[]) => `Quanto fa la somma di ${a} e ${b}?`,
        defaultToolbox: [`<block type="math_number"></block>`],
        defaultWorkspace: ([a, b]) => `
        <xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">
            <block type="riddle_somma" id="riddle_somma" deletable="false"></block>
        </xml>`,
        rootBlock: {
            type: 'riddle_somma',
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
        },
        getCodeGen: (args: any) => (block: any) => {
            const x = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue('x'),
                Blockly.Variables.NAME_TYPE
            )
            const y = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue('y'),
                Blockly.Variables.NAME_TYPE
            )
            const userCode = Blockly.JavaScript.statementToCode(
                block,
                'USERCODE'
            )
            const ret = Blockly.JavaScript.valueToCode(
                block,
                'RETURN',
                Blockly.JavaScript.ORDER_ATOMIC
            )
            const code = `(function( ${x}, ${y} ) { ${userCode} return ${ret} })(${args})`
            return code
        },
        solution: ([a, b]: number[]) => `${a + b}`,
        solutionLength: 1,
        solutionType: 'number',
        argsGenerator: () => [randomNum(1, 4), randomNum(1, 4)]
    }
]

export const getRiddlyById = (id: string): Riddle =>
    riddles.filter(r => r.id === id)[0]

export default riddles
