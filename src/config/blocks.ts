import * as Blockly from 'node-blockly/browser'

import l10n from '../l10n'

export interface Block {
    id: string
    json: any
    generator: (block: any) => string
}

const createBlock = (
    id: string,
    json: any,
    generator: (block: any) => any
) => ({
    id,
    json,
    generator
})

const colors = {
    text: 160,
    number: 210,
    root: 60,
    text_var: 20,
    number_var: 160
}

export const blocks: Block[] = [
    createBlock(
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
            colour: colors.text,
            tooltip: '',
            helpUrl: ''
        },
        (block: any) => [
            Blockly.JavaScript.quote_(block.getFieldValue('TEXT')),
            Blockly.JavaScript.ORDER_ATOMIC
        ]
    ),
    createBlock(
        'text_join',
        {
            type: 'text_join',
            message0: `${l10n.block_join} %1 %2 %3 %4`,
            args0: [
                {
                    type: 'input_value',
                    name: 'TEXT1'
                },
                {
                    type: 'input_value',
                    name: 'TEXT2'
                },
                {
                    type: 'input_value',
                    name: 'TEXT3'
                },
                {
                    type: 'input_value',
                    name: 'TEXT4'
                }
            ],
            output: 'String',
            colour: colors.text,
            tooltip: '',
            helpUrl: ''
        },
        (block: any) => {
            const text1 =
                Blockly.JavaScript.valueToCode(
                    block,
                    'TEXT1',
                    Blockly.JavaScript.ORDER_ATOMIC
                ) || ''
            const text2 =
                Blockly.JavaScript.valueToCode(
                    block,
                    'TEXT2',
                    Blockly.JavaScript.ORDER_ATOMIC
                ) || ''
            const text3 =
                Blockly.JavaScript.valueToCode(
                    block,
                    'TEXT3',
                    Blockly.JavaScript.ORDER_ATOMIC
                ) || ''
            const text4 =
                Blockly.JavaScript.valueToCode(
                    block,
                    'TEXT4',
                    Blockly.JavaScript.ORDER_ATOMIC
                ) || ''

            const code = `''.concat(${text1}, ${text2}, ${text3}, ${text4})`
            return [code, Blockly.JavaScript.ORDER_NONE]
        }
    ),
    createBlock(
        'math_number',
        {
            type: 'math_number',
            message0: '%1',
            args0: [
                {
                    type: 'field_input',
                    name: 'NUM',
                    text: '0'
                }
            ],
            output: 'Number',
            colour: colors.number,
            tooltip: '',
            helpUrl: ''
        },
        (block: any) => [
            block.getFieldValue('NUM'),
            Blockly.JavaScript.ORDER_ATOMIC
        ]
    ),
    createBlock(
        'math_operation',
        {
            type: 'math_operation',
            message0: '%1 %2 %3 %4',
            args0: [
                {
                    type: 'input_value',
                    name: 'OPERAND1',
                    check: 'Number'
                },
                {
                    type: 'field_input',
                    name: 'OPERATOR',
                    text: ''
                },
                {
                    type: 'input_dummy'
                },
                {
                    type: 'input_value',
                    name: 'OPERAND2',
                    check: 'Number'
                }
            ],
            inputsInline: true,
            colour: colors.number,
            output: null,
            tooltip: '',
            helpUrl: ''
        },
        (block: any) => {
            let op = block.getFieldValue('OPERATOR')
            // tslint:disable-next-line:curly
            if (op === 'x') op = '*'
            const operand1 = Blockly.JavaScript.valueToCode(
                block,
                'OPERAND1',
                Blockly.JavaScript.ORDER_ATOMIC
            )
            const operand2 = Blockly.JavaScript.valueToCode(
                block,
                'OPERAND2',
                Blockly.JavaScript.ORDER_ATOMIC
            )
            const code =
                operand1 !== '' && operand2 !== ''
                    ? `( ${operand1} ${op} ${operand2} )`
                    : ''
            return [code, Blockly.JavaScript.ORDER_ATOMIC]
        }
    ),
    createBlock(
        'if',
        {
            type: 'if',
            message0: `${l10n.block_if} %1 ${l10n.block_then} %2 ${l10n.block_else} %3`,
            args0: [
                {
                    type: 'input_value',
                    name: 'CONDITION',
                    check: 'Boolean',
                    align: 'LEFT'
                },
                {
                    type: 'input_statement',
                    name: 'THEN',
                    align: 'LEFT'
                },
                {
                    type: 'input_statement',
                    name: 'ELSE',
                    align: 'LEFT'
                }
            ],
            previousStatement: 'Usercode',
            nextStatement: 'Usercode',
            colour: 230,
            tooltip: '',
            helpUrl: ''
        },
        (block: any) => {
            const condition =
                Blockly.JavaScript.valueToCode(
                    block,
                    'CONDITION',
                    Blockly.JavaScript.ORDER_NONE
                ) || false
            const thenBranch = Blockly.JavaScript.statementToCode(block, 'THEN')
            const elseBranch = Blockly.JavaScript.statementToCode(block, 'ELSE')
            const code = `
                if(${condition} === true) {
                    ${thenBranch}
                } else {
                    ${elseBranch}
                }
            `
            return code
        }
    ),
    createBlock(
        'is_even',
        {
            type: 'block_type',
            message0: `%1 ${l10n.block_is_even}`,
            args0: [
                {
                    type: 'input_value',
                    name: 'VALUE'
                }
            ],
            inputsInline: true,
            output: 'Boolean',
            colour: 230,
            tooltip: '',
            helpUrl: ''
        },
        (block: any) => {
            const value = Blockly.JavaScript.valueToCode(
                block,
                'VALUE',
                Blockly.JavaScript.ORDER_ATOMIC
            )
            return [code, Blockly.JavaScript.ORDER_EQUALITY]
        }
    ),
    createBlock(
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
            previousStatement: 'Param',
            nextStatement: 'Param',
            colour: colors.text_var,
            tooltip: '',
            helpUrl: ''
        },
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
    createBlock(
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
            previousStatement: 'Param',
            colour: colors.text_var,
            tooltip: '',
            helpUrl: ''
        },
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
    createBlock(
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
            colour: colors.text_var,
            tooltip: '',
            helpUrl: ''
        },
        (block: any) => [
            block.getFieldValue('NAME'),
            Blockly.JavaScript.ORDER_ATOMIC
        ]
    ),
    createBlock(
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
            previousStatement: 'Param',
            nextStatement: 'Param',
            colour: colors.number_var,
            tooltip: '',
            helpUrl: ''
        },
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
    createBlock(
        'set_var_number',
        {
            type: 'set_var_number',
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
            previousStatement: 'Usercode',
            nextStatement: 'Usercode',
            colour: colors.number_var,
            tooltip: '',
            helpUrl: ''
        },
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
    createBlock(
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
            previousStatement: 'Param',
            colour: colors.number_var,
            tooltip: '',
            helpUrl: ''
        },
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
    createBlock(
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
            colour: colors.number_var,
            tooltip: '',
            helpUrl: ''
        },
        (block: any) => [
            block.getFieldValue('NAME'),
            Blockly.JavaScript.ORDER_ATOMIC
        ]
    ),
    createBlock(
        'riddle_return',
        {
            type: 'riddle_return',
            message0: `${l10n.block_riddle_return_given_numbers} %1 %2 ${l10n.block_riddle_return_open_with} %3`,
            args0: [
                {
                    type: 'input_dummy',
                    align: 'CENTRE'
                },
                {
                    type: 'input_statement',
                    name: 'RIDDLE_PARAMS',
                    check: 'Param'
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
            tooltip: l10n.block_riddle_return_numbers_tooltip,
            helpUrl: ''
        },
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
                var ${l10n.block_number}
                function main() {
                    ${params}
                    return ${ret}
                }
            `
            return code
        }
    ),
    createBlock(
        'riddle_somma',
        {
            type: 'riddle_sum',
            message0: `${l10n.block_riddle_return_given_numbers} %1 %2 ${l10n.block_riddle_return_open_with} %3`,
            args0: [
                {
                    type: 'input_dummy',
                    align: 'CENTRE'
                },
                {
                    type: 'input_statement',
                    name: 'RIDDLE_PARAMS',
                    check: 'Param'
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
            tooltip: l10n.block_riddle_return_open_with,
            helpUrl: ''
        },
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
                var ${l10n.block_number}1, ${l10n.block_number}2;
                function main() {
                    ${params}
                    return ${ret}
                }
            `
            return code
        }
    ),
    createBlock(
        'riddle_word',
        {
            type: 'riddle_word',
            message0: `${l10n.block_riddle_return_given_letters} %1 %2 ${l10n.block_riddle_return_open_with} %3`,
            args0: [
                {
                    type: 'input_dummy',
                    align: 'RIGHT'
                },
                {
                    type: 'input_statement',
                    name: 'RIDDLE_PARAMS',
                    check: 'Param'
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
                var ${l10n.block_letter}1, ${l10n.block_letter}2, ${l10n.block_letter}3, ${l10n.block_letter}4
                function main() {
                    ${params}
                    return ${ret}
                }
            `
            return code
        }
    ),
    createBlock(
        'riddle_if',
        {
            type: 'riddle_if',
            message0: `${l10n.block_riddle_return_given_numbers} %1 %2 %3 ${l10n.block_riddle_return_open_with} %4`,
            args0: [
                {
                    type: 'input_dummy',
                    align: 'CENTRE'
                },
                {
                    type: 'input_statement',
                    name: 'RIDDLE_PARAMS',
                    check: 'Param'
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
                var ${l10n.block_number}1, ${l10n.block_number}2, ${l10n.block_magic_number}, ${l10n.block_result};
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
