import * as ComputerImage from '../../assets/images/computer.png'
import * as ComputerKeyImage from '../../assets/images/key.png'

export interface Item {
    id: string
    name: string
    image: any
}

export class Computer implements Item {
    id: string = COMPUTER
    name = 'computer'
    workspace: { [riddleId: string]: string } = {}
    image = ComputerImage
}

// Computer allows user to have the blockly editor
export const COMPUTER = 'COMPUTER'
export const ROCK_SMASHER = 'ROCK_SMASHER'
export const COMPUTER_KEY = 'COMPUTER_KEY'

export const toolboxEntries: any = [
    {
        id: 'math_number',
        xml: `<block type="math_number"></block>`
    },
    {
        id: 'variables_get',
        xml: `<block type="variables_get">
            <field name="VAR">variable</field>
        </block>`
    }
]

export const addToolboxEntry = (id: string, xml: string) =>
    toolboxEntries.push({ id, xml })

export const getToolbox = () => {
    let toolbox = '<xml id="toolbox" style="display: none">'
    // tslint:disable-next-line:curly
    for (const entry of toolboxEntries) toolbox += entry.xml
    toolbox += '</xml>'
    return toolbox
}
// <block type="controls_if"></block>
// <block type="controls_repeat_ext"></block>
// <block type="logic_compare"></block>
// <block type="math_arithmetic"></block>
// <block type="text"></block>
// <block type="text_print"></block>

const item = (id: string, name: string, image: any): Item => ({
    id,
    name,
    image
})

export const computer = new Computer()
export const rockSmasher = item(ROCK_SMASHER, 'rock smasher', '')
export const computerKey = item(COMPUTER_KEY, 'old chest key', ComputerKeyImage)

const items: Item[] = [computer, rockSmasher]

export type Inventory = Item[]

export const getItemById = (id: string) =>
    items.filter((item: Item) => item.id === id)[0]

export const defaultInventory = (): Inventory => []

export const hasItem = (inventory: Inventory, item: Item): boolean =>
    inventory.filter(i => i.id === item.id).length > 0

export const addItem = (inventory: Inventory, item: Item): Inventory => {
    if (hasItem(inventory, item)) {
        return [...inventory]
    } else {
        return [...inventory, item]
    }
}
