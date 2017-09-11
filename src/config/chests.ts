import { computer, computerKey, Item } from './inventory'

export interface Chest {
    id: string
    item: Item
    requiredItem: Item
    open: boolean
}

export interface Chests {
    [id: string]: Chest
}

const createChest: (id: string, item: Item, requiredItemId: Item) => Chest = (
    id: string,
    item: Item,
    requiredItem: Item
) => ({
    id,
    item,
    requiredItem,
    open: false
})

export const defaultChests: Chests = {
    chest1: {
        ...createChest('chest1', computer, computerKey)
    }
}
