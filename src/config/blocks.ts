import * as Blockly from 'node-blockly/browser'

export interface Block {
    id: string
    json: any
    generator: (block: any) => string
}

const block = (id: string, json: any, generator: (block: any) => any) => ({
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
            colour: colors.text,
            tooltip: '',
            helpUrl: ''
        },
        (block: any) => [
            Blockly.JavaScript.quote_(block.getFieldValue('TEXT')),
            Blockly.JavaScript.ORDER_ATOMIC
        ]
    ),
    block(
        'text_join',
        {
            type: 'text_join',
            message0: 'unisci %1 %2 %3 %4',
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
    block(
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
    block(
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
            const operand1 =
                Blockly.JavaScript.valueToCode(
                    block,
                    'OPERAND1',
                    Blockly.JavaScript.ORDER_ATOMIC
                ) || ''
            const operand2 =
                Blockly.JavaScript.valueToCode(
                    block,
                    'OPERAND2',
                    Blockly.JavaScript.ORDER_ATOMIC
                ) || ''
            const code = `${operand1} ${op} ${operand2}`
            return [code, Blockly.JavaScript.ORDER_NONE]
        }
    ),
    block(
        'if',
        {
            type: 'if',
            message0: 'se %1 allora %2 altrimenti %3',
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
            previousStatement: null,
            nextStatement: null,
            colour: 230,
            tooltip: '',
            helpUrl: ''
        },
        (block: any) => {
            console.log('wewe')
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
    block(
        'is_even',
        {
            type: 'block_type',
            message0: '%1 è pari',
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
            const code = `(${value} % 2 === 0)`
            return [code, Blockly.JavaScript.ORDER_EQUALITY]
        }
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
            colour: colors.text_var,
            tooltip: '',
            helpUrl: ''
        },
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
            colour: colors.number_var,
            tooltip: '',
            helpUrl: ''
        },
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
                    ${params}
                    return ${ret}
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
                var numero1, numero2, numero_magico, risultato;
                function main() {
                    ${params}
                    ${userCode};
                    return ${ret}
                }
            `
            console.log(code)
            return code
        }
    )
]

export default blocks
