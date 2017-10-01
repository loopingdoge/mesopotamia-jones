import * as Blockly from 'node-blockly/browser'

import { padStart } from 'lodash'

export interface Riddle {
    id: string
    question: (variables: any[]) => string
    defaultToolbox: string[]
    defaultWorkspace: (variables?: any[]) => string
    paramsXML?: (variables: any[]) => string
    solution: (variables: any[]) => string
    solutionLength: number
    solutionType: SolutionType
    rootBlock?: any
    getCodeGen?: (args: any) => (block: any) => string
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
        question: ([a]: number[]) => `Inserisci il numero: ${a}`,
        defaultToolbox: [
            `
            <block type="get_number" id="numero" editable="false">
                <field name="NAME">numero</field>
            </block>
            `,
            `<block type="math_number"></block>`
        ],
        defaultWorkspace: () => `
        <xml xmlns="http://www.w3.org/1999/xhtml">
            <block type="riddle_return" id="riddle_return" deletable="false" editable="false">
                <statement name="RIDDLE_PARAMS"></statement>
            </block>
        </xml>`,
        paramsXML: ([a]) => `
            <block type="set_number" id="numero" deletable="false" editable="false" movable="false">
                <field name="NAME">numero</field>
                <value name="VALUE">
                    <block type="math_number" id="numero_value" deletable="false" editable="false" movable="false">
                        <field name="NUM">${a}</field>
                    </block>
                </value>
            </block>
        `,
        solution: ([a]: number[]) => `${a}`,
        solutionLength: 1,
        solutionType: 'number',
        argsGenerator: () => [randomNum(1, 9)]
    },
    {
        id: 'somma',
        question: ([a, b]: number[]) => `Quanto fa la somma di ${a} e ${b}?`,
        defaultToolbox: [
            `
            <block type="get_number" id="numero1" editable="false">
                <field name="NAME">numero1</field>
            </block>
            `,
            `
            <block type="get_number" id="numero2" editable="false">
                <field name="NAME">numero2</field>
            </block>
            `,
            `<block type="math_number"></block>`,
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
            message0: 'dati %1 %2 e %3 %4 apri la porta con: %5',
            args0: [
                {
                    type: 'field_variable',
                    name: 'x',
                    variable: 'numero1'
                },
                {
                    type: 'input_dummy',
                    align: 'RIGHT'
                },
                {
                    type: 'field_variable',
                    name: 'y',
                    variable: 'numero2'
                },
                {
                    type: 'input_dummy',
                    align: 'RIGHT'
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
            const ret = Blockly.JavaScript.valueToCode(
                block,
                'return',
                Blockly.JavaScript.ORDER_ATOMIC
            )
            const code = `
                function main() {
                    ${x} = ${args[0]};
                    ${y} = ${args[1]};
                    return ${ret}
                }
            `
            return code
        },
        solution: ([a, b]: number[]) => padStart(`${a + b}`, 2, '0'),
        solutionLength: 2,
        solutionType: 'number',
        argsGenerator: () => [randomNum(1, 9), randomNum(1, 9)]
    },
    {
        id: 'word',
        question: ([a, b, c, d]: string[]) =>
            `Se la porta aprire vorrai, in ordine queste lettere inserire dovrai: ${a}, ${b}, ${c}, ${d}`,
        defaultToolbox: [
            `<block type="lettera1"></block>`,
            `<block type="lettera2"></block>`,
            `<block type="lettera3"></block>`,
            `<block type="lettera4"></block>`,
            `
            <block type="text">
                <field name="TEXT"></field>
            </block>
            `,
            `
            <block type="text_join">
                <mutation items="4"></mutation>
            </block>
            `
        ],
        defaultWorkspace: () => `
        <xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">
            <block type="riddle_word" id="riddle_word" deletable="false">
                <statement name="RIDDLE_PARAMS"></statement>
            </block>
        </xml>`,
        paramsXML: ([a, b, c, d]) => `
            <block type="set_lettera" id="lettera1" deletable="false" editable="false" movable="false">
                <field name="NAME">lettera1</field>
                <value name="VALUE">
                    <block type="text" id="lettera1_text" deletable="false" editable="false" movable="false">
                        <field name="TEXT">${a}</field>
                    </block>
                </value>
                <next>
                    <block type="set_lettera" id="lettera2" deletable="false" editable="false" movable="false">
                        <field name="NAME">lettera2</field>
                        <value name="VALUE">
                            <block type="text" id="lettera2_text" deletable="false" editable="false" movable="false">
                                <field name="TEXT">${b}</field>
                            </block>
                        </value>
                        <next>
                            <block type="set_lettera" id="lettera3" deletable="false" editable="false" movable="false">
                                <field name="NAME">lettera3</field>
                                <value name="VALUE">
                                    <block type="text" id="lettera3_text" deletable="false" editable="false" movable="false">
                                        <field name="TEXT">${c}</field>
                                    </block>
                                </value>
                                <next>
                                    <block type="set_last_lettera" id="lettera4" deletable="false" editable="false" movable="false">
                                        <field name="NAME">lettera4</field>
                                        <value name="VALUE">
                                            <block type="text" id="lettera4_text" deletable="false" editable="false" movable="false">
                                                <field name="TEXT">${d}</field>
                                            </block>
                                        </value>
                                    </block>
                                </next>
                            </block>
                        </next>
                    </block>
                </next>
            </block>
        `,
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
        id: 'if',
        question: ([a, b, c]: number[]) =>
            `Se il numero magico è pari, la porta si apre con la somma di ${a} e ${b}, altrimenti con il prodotto.\n Il numero magico è ${c}`,
        defaultToolbox: [
            `
            <block type="get_number" id="numero1" editable="false">
                <field name="NAME">numero1</field>
            </block>
            `,
            `
            <block type="get_number" id="numero2" editable="false">
                <field name="NAME">numero2</field>
            </block>
            `,
            `
            <block type="get_number" id="numero_magico" editable="false">
                <field name="NAME">numero_magico</field>
            </block>
            `,
            `
                <block type="variables_get">
                    <field name="VAR" id="O@T=,KYexe-SHMAI+Tq%" variabletype="">risultato</field>
                </block>
            `,
            `
                <block type="variables_set">
                    <field name="VAR" id="O@T=,KYexe-SHMAI+Tq%" variabletype="">risultato</field>
                </block>
            `,
            `<block type="math_number"></block>`,
            `
                <block type="controls_if">
                    <mutation else="1"></mutation>
                </block>
            `,
            `
                <block type="math_arithmetic">
                    <field name="OP">ADD</field>
                    <value name="A">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                    </value>
                    <value name="B">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                    </value>
                </block>
            `,
            `
                <block type="math_number_property">
                    <mutation divisor_input="false"></mutation>
                    <field name="PROPERTY">EVEN</field>
                    <value name="NUMBER_TO_CHECK">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                    </value>
                </block>
            `
        ],
        defaultWorkspace: ([a, b, c]) => `
        <xml xmlns="http://www.w3.org/1999/xhtml" id="workspaceBlocks" style="display:none">
            <block type="riddle_if" id="riddle_if" deletable="false"></block>
        </xml>`,
        rootBlock: {
            type: 'riddle_if',
            message0: 'Dati %1 %2 %3 %4 e %5 %6 %7 apri la porta con %8',
            args0: [
                {
                    type: 'field_variable',
                    name: 'x',
                    variable: 'numero1'
                },
                {
                    type: 'input_dummy',
                    align: 'RIGHT'
                },
                {
                    type: 'field_variable',
                    name: 'y',
                    variable: 'numero2'
                },
                {
                    type: 'input_dummy',
                    align: 'RIGHT'
                },
                {
                    type: 'field_variable',
                    name: 'z',
                    variable: 'numero_magico'
                },
                {
                    type: 'input_dummy',
                    align: 'RIGHT'
                },
                {
                    type: 'input_statement',
                    name: 'usercode'
                },
                {
                    type: 'input_value',
                    name: 'return',
                    align: 'RIGHT'
                }
            ],
            colour: 60,
            tooltip: '',
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
            const z = Blockly.JavaScript.variableDB_.getName(
                block.getFieldValue('z'),
                Blockly.Variables.NAME_TYPE
            )
            const userCode = Blockly.JavaScript.statementToCode(
                block,
                'usercode'
            )
            const ret = Blockly.JavaScript.valueToCode(
                block,
                'return',
                Blockly.JavaScript.ORDER_ATOMIC
            )
            const code = `
                function main() {
                    ${x} = ${args[0]};
                    ${y} = ${args[1]};
                    ${z} = ${args[2]};
                    ${userCode};
                    return ${ret}
                }
            `
            return code
        },
        solution: ([a, b, c]: number[]) =>
            padStart(`${c % 2 === 0 ? a + b : a * b}`, 2, '0'),
        solutionLength: 2,
        solutionType: 'number',
        argsGenerator: () => [
            randomNum(1, 9),
            randomNum(1, 9),
            randomNum(1, 10)
        ]
    }
]

export const getRiddlyById = (id: string): Riddle =>
    riddles.filter(r => r.id === id)[0]

export default riddles
