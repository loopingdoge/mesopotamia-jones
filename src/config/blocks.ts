import * as Blockly from 'node-blockly/browser'

export interface Block {
    id: string
    definition: any
    toolboxEntry: string
    generator: (block: any) => string
}

const block = (
    id: string,
    definition: any,
    toolboxEntry: string,
    generator: (block: any) => any
) => ({
    id,
    definition,
    toolboxEntry,
    generator
})

const blocks: Block[] = [
    // TODO questo dovrebbe essere un blocco parametro, un solo socket di input e col nome personalizzabile
    // al momento fa schifo
    block(
        'param',
        {
            type: 'param',
            message0: 'var_name = %1',
            args0: [
                {
                    type: 'input_value',
                    name: 'value'
                }
            ],
            inputsInline: false,
            colour: 260,
            tooltip: '',
            helpUrl: ''
        },
        `<block type="param"></block>`,
        (block: any) => {
            const value = Blockly.JavaScript.valueToCode(
                block,
                'value',
                Blockly.JavaScript.ORDER_ATOMIC
            )
            const code = '...;\n'
            return code
        }
    )
]

export default blocks
