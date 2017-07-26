export interface Item {
    id: string
}

export class Computer implements Item {

    id: string = COMPUTER
    workspace: { [riddleId: string]: string } = {}

}

export const COMPUTER = 'COMPUTER'
export const ROCK_SMASHER = 'ROCK_SMASHER'

export const defaultToolbox =
    `<xml id="toolbox" style="display: none">
        <block type="controls_if"></block>
        <block type="controls_repeat_ext"></block>
        <block type="logic_compare"></block>
        <block type="math_number"></block>
        <block type="math_arithmetic"></block>
        <block type="text"></block>
        <block type="text_print"></block>
    </xml>`

const item = (id: string): Item => ({id})

export const computer = new Computer()

export const rockSmasher = item(ROCK_SMASHER)

export type Inventory = Item[]

export const defaultInventory = (): Inventory => [computer]

export const hasItem = (inventory: Inventory, item: Item): boolean => {
    return inventory.filter(i => i.id === item.id).length > 0
}

export const addItem = (inventory: Inventory, item: Item): Inventory => {
    if (hasItem(inventory, item)) {
        return [...inventory]
    } else {
        return [...inventory, item]
    }
}