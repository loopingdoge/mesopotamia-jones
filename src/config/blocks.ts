import * as Blockly from 'node-blockly/browser'

export interface Block {
    id: string
    json: any
    toolboxEntry: string // TODO fare facoltativa
    generator: (block: any) => string
}

const block = (
    id: string,
    json: any,
    toolboxEntry: string,
    generator: (block: any) => any
) => ({
    id,
    json,
    toolboxEntry,
    generator
})

export const blocks: Block[] = [
    block(
        'text',
        {
            type: 'text',
            message0: '" %1 "',
            args0: [
                {
                    type: 'field_input',
                    name: 'TEXT',
                    text: ''
                }
            ],
            output: null,
            colour: 160,
            tooltip: '',
            helpUrl: ''
        },
        `
        <block type="string">
            <field name="TEXT"></field>
        </block>
        `,
        (block: any) => [
            Blockly.JavaScript.quote_(block.getFieldValue('TEXT')),
            Blockly.JavaScript.ORDER_ATOMIC
        ]
    ),
    block(
        'set_lettera',
        {
            type: 'set_lettera',
            message0: '%1 = %2',
            args0: [
                {
                    type: 'field_input',
                    name: 'NAME',
                    text: 'set_lettera'
                },
                {
                    type: 'input_value',
                    name: 'VALUE',
                    align: 'RIGHT'
                }
            ],
            inputsInline: true,
            previousStatement: null,
            nextStatement: null,
            colour: 20,
            tooltip: '',
            helpUrl: ''
        },
        `
        <block type="set_lettera">
            <field name="NAME">set_lettera</field>
        </block>
        `,
        (block: any) => {
            const varname = block.getFieldValue('NAME')
            const value = Blockly.JavaScript.valueToCode(
                block,
                'VALUE',
                Blockly.JavaScript.ORDER_ATOMIC
            )
            return `${varname} = ${value}; \n`
        }
    ),
    block(
        'set_last_lettera',
        {
            type: 'set_last_lettera',
            message0: '%1 = %2',
            args0: [
                {
                    type: 'field_input',
                    name: 'NAME',
                    text: 'lettera1'
                },
                {
                    type: 'input_value',
                    name: 'VALUE',
                    align: 'RIGHT'
                }
            ],
            inputsInline: true,
            previousStatement: null,
            colour: 20,
            tooltip: '',
            helpUrl: ''
        },
        `
        <block type="set_last_lettera">
            <field name="NAME">set_last_lettera</field>
        </block>
        `,
        (block: any) => {
            const varname = block.getFieldValue('NAME')
            const value = Blockly.JavaScript.valueToCode(
                block,
                'VALUE',
                Blockly.JavaScript.ORDER_ATOMIC
            )
            return `${varname} = ${value}; \n`
        }
    ),
    block(
        'numero1',
        {
            type: 'numero1',
            message0: 'numero1',
            output: 'Number',
            colour: 165,
            tooltip: '',
            helpUrl: ''
        },
        `<block type="numero1"></block>`,
        (block: any) => [
            Blockly.JavaScript.variableDB_.getName(
                'numero1',
                Blockly.Variables.NAME_TYPE
            ),
            Blockly.JavaScript.ORDER_ATOMIC
        ]
    ),
    block(
        'numero2',
        {
            type: 'numero2',
            message0: 'numero2',
            output: 'Number',
            colour: 165,
            tooltip: '',
            helpUrl: ''
        },
        `<block type="numero2"></block>`,
        (block: any) => [
            Blockly.JavaScript.variableDB_.getName(
                'numero2',
                Blockly.Variables.NAME_TYPE
            ),
            Blockly.JavaScript.ORDER_ATOMIC
        ]
    ),
    block(
        'numero_magico',
        {
            type: 'numero_magico',
            message0: 'numero magico',
            output: 'Number',
            colour: 165,
            tooltip: '',
            helpUrl: ''
        },
        `<block type="numero_magico"></block>`,
        (block: any) => [
            Blockly.JavaScript.variableDB_.getName(
                'numero_magico',
                Blockly.Variables.NAME_TYPE
            ),
            Blockly.JavaScript.ORDER_ATOMIC
        ]
    ),
    block(
        'lettera1',
        {
            type: 'lettera1',
            message0: 'lettera1',
            output: 'String',
            colour: 15,
            tooltip: '',
            helpUrl: ''
        },
        `<block type="lettera1"></block>`,
        (block: any) => [
            Blockly.JavaScript.variableDB_.getName(
                'lettera1',
                Blockly.Variables.NAME_TYPE
            ),
            Blockly.JavaScript.ORDER_ATOMIC
        ]
    ),
    block(
        'lettera2',
        {
            type: 'lettera2',
            message0: 'lettera2',
            output: 'String',
            colour: 15,
            tooltip: '',
            helpUrl: ''
        },
        `<block type="lettera2"></block>`,
        (block: any) => [
            Blockly.JavaScript.variableDB_.getName(
                'lettera2',
                Blockly.Variables.NAME_TYPE
            ),
            Blockly.JavaScript.ORDER_ATOMIC
        ]
    ),
    block(
        'lettera3',
        {
            type: 'lettera3',
            message0: 'lettera3',
            output: 'String',
            colour: 15,
            tooltip: '',
            helpUrl: ''
        },
        `<block type="lettera3"></block>`,
        (block: any) => [
            Blockly.JavaScript.variableDB_.getName(
                'lettera3',
                Blockly.Variables.NAME_TYPE
            ),
            Blockly.JavaScript.ORDER_ATOMIC
        ]
    ),
    block(
        'lettera4',
        {
            type: 'lettera4',
            message0: 'lettera4',
            output: 'String',
            colour: 15,
            tooltip: '',
            helpUrl: ''
        },
        `<block type="lettera4"></block>`,
        (block: any) => [
            Blockly.JavaScript.variableDB_.getName(
                'lettera4',
                Blockly.Variables.NAME_TYPE
            ),
            Blockly.JavaScript.ORDER_ATOMIC
        ]
    ),
    block(
        'riddle_return',
        {
            type: 'riddle_return',
            message0: 'Dato il numero %1 %2 apri la porta con %3',
            args0: [
                {
                    type: 'input_dummy',
                    align: 'CENTRE'
                },
                {
                    type: 'input_statement',
                    name: 'RIDDLE_PARAMS'
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
        null,
        (block: any) => {
            const params = Blockly.JavaScript.statementToCode(
                block,
                'RIDDLE_PARAMS'
            )
            const ret = Blockly.JavaScript.valueToCode(
                block,
                'RETURN',
                Blockly.JavaScript.ORDER_ADDITION
            )
            const code = `
                var numero
                function main() {
                    ${params}
                    return ${ret}
                }
            `
            console.log(code)
            return code
        }
    ),
    block(
        'riddle_word',
        {
            type: 'riddle_word',
            message0: 'Data le lettere %1 %2 apri la porta con %3',
            args0: [
                {
                    type: 'input_dummy',
                    align: 'RIGHT'
                },
                {
                    type: 'input_statement',
                    name: 'RIDDLE_PARAMS'
                },
                {
                    type: 'input_value',
                    name: 'return',
                    check: 'String',
                    align: 'RIGHT'
                }
            ],
            colour: 60,
            tooltip: '',
            helpUrl: ''
        },
        null,
        (block: any) => {
            const params = Blockly.JavaScript.statementToCode(
                block,
                'RIDDLE_PARAMS'
            )
            const ret = Blockly.JavaScript.valueToCode(
                block,
                'return',
                Blockly.JavaScript.ORDER_ATOMIC
            )
            const code = `
                var lettera1, lettera2, lettera3, lettera4
                function main() {
                    ${params};
                    return ${ret};
                }
            `
            return code
        }
    )
]

export default blocks
