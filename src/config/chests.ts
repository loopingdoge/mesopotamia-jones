import { computer, computerKey, Item } from './inventory'

export interface Chest {
    id: string
    item: Item
    requiredItem: Item
}

const chest: (id: string, item: Item, requiredItemId: Item) => Chest = (
    id: string,
    item: Item,
    requiredItem: Item
) => ({
    id,
    item,
    requiredItem
})

const chests: Chest[] = [chest('chest1', computer, computerKey)]

export const getChestById = (id: string) => chests.filter(c => c.id === id)[0]
