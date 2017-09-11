import { computer, hasItem, Inventory } from './inventory'

export interface Progression {
    isGameStarted: boolean
    hasShownComputerTutorial: boolean
}

export const defaultProgression = () => ({
    isGameStarted: false,
    hasShownComputerTutorial: false
})

export const reactourStartIndex = (
    inventory: Inventory,
    progression: Progression
) => {
    if (hasItem(inventory, computer) && !progression.hasShownComputerTutorial) {
        return 2
    } else {
        return 0
    }
}
