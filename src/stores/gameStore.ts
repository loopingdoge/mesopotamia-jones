import { action, computed, observable, reaction } from 'mobx'

import { UIStore } from './gameUIStore'
import { RiddleStore } from './riddleStore'

import { Dialogue, getDialogById } from '../config/dialogues'
import {
    addItem,
    computer,
    COMPUTER,
    Computer,
    defaultInventory,
    getItemById,
    hasItem,
    Inventory,
    Item
} from '../config/inventory'
import { Door, getGameDoor, Room, rooms } from '../config/map'

import PhaserGame from '../phaser'
import { Maybe } from '../utils'

export type GamePhase = 'Game' | 'Riddle'

export interface GameState {
    activeDialogue: Maybe<Dialogue>
    activeFoundItem: Maybe<Item>
    firstRiddleVisited: boolean
    room: Room
    lastDoor: Door
    phase: GamePhase
    inventory: Inventory
    interaction: Interaction
}

const defaultGameStoreState: () => GameState = () => ({
    activeDialogue: null,
    activeFoundItem: null,
    firstRiddleVisited: false,
    room: rooms[0],
    lastDoor: null,
    phase: 'Game',
    inventory: defaultInventory(),
    interaction: null
})

export interface DoorInteraction {
    type: 'door'
    x: number
    y: number
}

export interface ObjectInteraction {
    type: 'object'
    id: string
}

export type Interaction = DoorInteraction | ObjectInteraction

export class GameStore {
    game: PhaserGame
    riddleStore: RiddleStore
    uiStore: UIStore

    computer: Computer

    @observable state: GameState

    @observable lineId: number

    @computed
    get room(): Room {
        return this.state.room
    }

    @computed
    get lastDoor(): Door {
        return this.state.lastDoor
    }

    @computed
    get gameState(): string {
        return this.state.phase
    }

    @computed
    get inventory(): Inventory {
        return this.state.inventory
    }

    @computed
    get lastItemFound(): Item {
        return this.inventory[this.inventory.length - 1]
    }

    @computed
    get firstRiddleVisited() {
        return this.state.firstRiddleVisited
    }

    @computed
    get controlsEnabled() {
        return (
            this.state.phase === 'Game' &&
            !this.state.activeDialogue &&
            !this.state.activeFoundItem
        )
    }

    constructor() {
        this.state = defaultGameStoreState()
    }

    init(riddleStore: RiddleStore, uiStore: UIStore) {
        this.riddleStore = riddleStore
        this.uiStore = uiStore

        this.state = {
            ...this.state,
            room: rooms[0],
            ...JSON.parse(localStorage.getItem('gameState'))
        }

        if (hasItem(this.inventory, computer)) {
            this.computer = computer
        }

        // React to riddle solved by the user
        reaction(
            () => this.riddleStore.isSolved,
            (isSolved: boolean) => isSolved && this.riddleSolved()
        )

        // React to dialog opening
        reaction(
            () => this.state.activeDialogue,
            (dialog: Dialogue) => {
                const nextLine = () => {
                    if (this.lineId < dialog.lines.length - 1) {
                        this.lineId++
                    } else {
                        gameStore.hideDialogue()
                        document.removeEventListener('keydown', nextLine)
                        document.removeEventListener('mousedown', nextLine)
                    }
                }
                if (dialog) {
                    this.lineId = 0
                    document.addEventListener('keydown', nextLine)
                    document.addEventListener('mousedown', nextLine)
                }
            }
        )
        reaction(() => this.state.room, () => this.saveGameState())
        reaction(() => this.uiStore.selectedRiddle, () => this.saveGameState())

        // React to interaction visibility
        reaction(
            () => this.state.interaction,
            () => {
                this.state.interaction
                    ? this.uiStore.showInteractionHint()
                    : this.uiStore.hideInteractionHint()
            }
        )
    }

    @action
    startGame = () => {
        this.game = new PhaserGame()
        this.game.start()
    }

    @action
    newGame = () => {
        localStorage.setItem('gameState', null)
        this.state = defaultGameStoreState()
    }

    saveGameState = () => {
        console.log('Saving state to local storage...')
        localStorage.setItem('gameState', JSON.stringify(this.state))
    }

    /**
     * To call when a door is touched
     * @param x: x position of the door
     * @param y: y position of the door
     */
    @action
    activateRiddle = (x: number, y: number) => {
        const gameDoor = getGameDoor(this.room, x, y)
        const workspace = this.computer.workspace[gameDoor.door.riddle.id]

        this.riddleStore.activateDoor(gameDoor, workspace)
        this.state = {
            ...this.state,
            lastDoor: gameDoor.door,
            phase: 'Riddle'
        }
    }

    @action
    deactivateRiddle = () => {
        this.state = {
            ...this.state,
            phase: 'Game'
        }
        this.game.loadRoom()
    }

    @action
    riddleSolved = () => {
        let newState = this.state
        if (this.gameState === 'Riddle') {
            newState = {
                ...newState,
                room: this.riddleStore.currentGameDoor.to,
                phase: 'Game'
            }
        }
        this.state = newState
        this.game.loadRoom()
        this.setRiddleWorkspaceXML(
            this.riddleStore.currentRiddle.id,
            this.riddleStore.workspaceXML
        )

        this.riddleStore.isSolved = false
    }

    @action
    showFoundItem = (itemId: string) => {
        if (!this.state.activeFoundItem) {
            this.state = {
                ...this.state,
                activeFoundItem: getItemById(itemId)
            }
        }
    }

    @action
    hideFoundItem = (itemId: string) => {
        this.state = {
            ...this.state,
            activeFoundItem: null
        }
    }

    @action
    showDialogue = (dialogId: string) => {
        if (!this.state.activeDialogue) {
            this.state = {
                ...this.state,
                activeDialogue: getDialogById(dialogId)
            }
        }
    }

    @action
    hideDialogue = () => {
        this.state = {
            ...this.state,
            activeDialogue: null
        }
    }

    @action
    addItem = (item: Item) => {
        this.state = {
            ...this.state,
            inventory: addItem(this.state.inventory, item)
        }
    }

    @action
    setRiddleWorkspaceXML = (riddleId: string, workspace: string) => {
        this.computer.workspace[riddleId] = workspace
    }

    interaction = (event: KeyboardEvent) => {
        if (event.key === 'f' || event.key === 'F') {
            switch (this.state.interaction.type) {
                case 'door':
                    const { x, y } = this.state.interaction
                    this.activateRiddle(x, y)
                    break
                case 'object':
                    this.showDialogue(this.state.interaction.id)
                    break
            }
        }
    }

    @action
    readyInteraction = (interaction: Interaction) => {
        document.addEventListener('keydown', this.interaction)
        this.state = {
            ...this.state,
            interaction
        }
    }

    @action
    removeInteraction = () => {
        document.removeEventListener('keydown', this.interaction)
        this.state = {
            ...this.state,
            interaction: null
        }
    }

    getRiddleWorkspaceXML = (riddleId: string) =>
        this.computer.workspace[riddleId]

    @action
    enterFirstRiddle = () => {
        this.state = {
            ...this.state,
            firstRiddleVisited: true
        }
    }
}

const gameStore = new GameStore()

export default gameStore
