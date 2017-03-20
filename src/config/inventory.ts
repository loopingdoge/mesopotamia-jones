export interface Item {
    id: string
    attrs?: any
}

export const COMPUTER = 'COMPUTER'
export const ROCK_SMASHER = 'ROCK_SMASHER'

const item = (id: string, attrs?: any): Item => ({id, attrs})

export const computer = item(COMPUTER, { userCode:  {} })

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