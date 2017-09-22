import { computer, hasItem, Inventory } from './inventory'
import { getRoomById, Room } from './map'

export interface Progression {
    isGameStarted: boolean
    hasShownComputerTutorial: boolean
    roomsVisited: Room[]
}

export const defaultProgression: () => Progression = () => ({
    isGameStarted: false,
    hasShownComputerTutorial: false,
    roomsVisited: [getRoomById('room1')]
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
