import * as Blockly from 'node-blockly/browser'

export interface Block {
    id: string
    json: any
    toolboxEntry: string
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
        'numero1',
        {
            type: 'numero1',
            message0: 'numero1',
            output: 'Number',
            colour: 20,
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
            colour: 20,
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
    )
]

export default blocks
