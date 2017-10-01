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

const colors = {
    text: 20,
    number: 160,
    root: 60,
    green: 160
}

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
            output: 'String',
            colour: colors.green,
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
        'set_letter',
        {
            type: 'set_letter',
            message0: '%1 = %2',
            args0: [
                {
                    type: 'field_input',
                    name: 'NAME',
                    text: 'set_letter'
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
            colour: colors.text,
            tooltip: '',
            helpUrl: ''
        },
        `
        <block type="set_letter">
            <field name="NAME">set_letter</field>
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
        'set_last_letter',
        {
            type: 'set_last_letter',
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
            colour: colors.text,
            tooltip: '',
            helpUrl: ''
        },
        `
        <block type="set_last_letter">
            <field name="NAME">set_last_letter</field>
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
        'get_letter',
        {
            type: 'get_letter',
            message0: '%1',
            args0: [
                {
                    type: 'field_input',
                    name: 'NAME',
                    text: 'default'
                }
            ],
            inputsInline: false,
            output: 'String',
            colour: colors.text,
            tooltip: '',
            helpUrl: ''
        },
        `<block type="get_letter"></block>`,
        (block: any) => [
            block.getFieldValue('NAME'),
            Blockly.JavaScript.ORDER_ATOMIC
        ]
    ),
    block(
        'set_number',
        {
            type: 'set_number',
            message0: '%1 = %2',
            args0: [
                {
                    type: 'field_input',
                    name: 'NAME',
                    text: 'numero'
                },
                {
                    type: 'input_value',
                    name: 'VALUE',
                    check: 'Number'
                }
            ],
            inputsInline: true,
            previousStatement: null,
            nextStatement: null,
            colour: 160,
            tooltip: '',
            helpUrl: ''
        },
        null,
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
        'set_last_number',
        {
            type: 'set_last_number',
            message0: '%1 = %2',
            args0: [
                {
                    type: 'field_input',
                    name: 'NAME',
                    text: 'numero'
                },
                {
                    type: 'input_value',
                    name: 'VALUE',
                    check: 'Number'
                }
            ],
            inputsInline: true,
            previousStatement: null,
            colour: colors.number,
            tooltip: '',
            helpUrl: ''
        },
        null,
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
        'get_number',
        {
            type: 'get_number',
            message0: '%1',
            args0: [
                {
                    type: 'field_input',
                    name: 'NAME',
                    text: 'default'
                }
            ],
            inputsInline: false,
            output: 'Number',
            colour: colors.number,
            tooltip: '',
            helpUrl: ''
        },
        `<block type="get_number"></block>`,
        (block: any) => [
            block.getFieldValue('NAME'),
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
            colour: colors.root,
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
        'riddle_somma',
        {
            type: 'riddle_sum',
            message0: 'Dati i numeri %1 %2 apri la porta con %3',
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
            colour: colors.root,
            tooltip: 'apri la porta con',
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
                Blockly.JavaScript.ORDER_ATOMIC
            )
            const code = `
                var numero1, numero2;
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
                    name: 'RETURN',
                    check: 'String',
                    align: 'RIGHT'
                }
            ],
            colour: colors.root,
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
                'RETURN',
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
    ),
    block(
        'riddle_if',
        {
            type: 'riddle_if',
            message0: 'Dati i numeri %1 %2 %3 apri la porta con %4',
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
                    type: 'input_statement',
                    name: 'USERCODE'
                },
                {
                    type: 'input_value',
                    name: 'RETURN',
                    check: 'Number',
                    align: 'RIGHT'
                }
            ],
            colour: colors.root,
            tooltip: '',
            helpUrl: ''
        },
        null,
        (block: any) => {
            const params = Blockly.JavaScript.statementToCode(
                block,
                'RIDDLE_PARAMS'
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
            const code = `
                var numero1, numero2, numero_magico;
                function main() {
                    ${params}
                    ${userCode};
                    return ${ret}
                }
            `
            return code
        }
    )
]

export default blocks
