import { computer, Item } from './inventory'

export interface Chest {
    id: string
    item: Item
}

const chest: (id: string, item: Item) => Chest = (id: string, item: Item) => ({
    id,
    item
})

const chests: Chest[] = [chest('chest1', computer)]

export const getChestById = (id: string) => chests.filter(c => c.id === id)[0]
