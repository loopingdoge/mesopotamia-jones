import { action, computed, observable, reaction } from 'mobx'

import { UIStore } from './gameUIStore'
import { RiddleStore } from './riddleStore'

import { Dialog, getDialogById } from '../config/dialogs'
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

export const GAME = 'GAME'
export const RIDDLE = 'RIDDLE'

export interface IGameStore {
    room: Room
    lastDoor: Door
    dialog: Dialog
    gameState: string
    inventory: Inventory
    interaction: Interaction
}

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

    @observable firstRoomVisited = false

    @observable lineId: number

    @observable state: IGameStore

    @computed
    get room(): Room {
        return this.state.room
    }

    @computed
    get lastDoor(): Door {
        return this.state.lastDoor
    }

    @computed
    get dialog(): Dialog {
        return this.state.dialog
    }

    @computed
    get gameState(): string {
        return this.state.gameState
    }

    @computed
    get inventory(): Inventory {
        return this.state.inventory
    }

    @computed
    get showDialogOrItem(): boolean {
        return this.dialog !== null //TODO: or item
    }

    constructor() {
        this.state = {
            room: null,
            lastDoor: null,
            dialog: null,
            gameState: GAME,
            inventory: defaultInventory(),
            interaction: null
        }
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
            // TODO: gestire meglio questa cosa
            this.computer = computer
        }

        // React to riddle solved by the user
        reaction(
            () => this.riddleStore.isSolved,
            (isSolved: boolean) => isSolved && this.riddleSolved()
        )

        // React to dialog opening
        reaction(
            () => this.dialog,
            (dialog: Dialog) => {
                const nextLine = () => {
                    if (this.lineId < this.dialog.lines.length - 1) {
                        this.lineId++
                    } else {
                        gameStore.hideDialog()
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
        this.state = {
            ...this.state,
            room: rooms[0],
            lastDoor: null,
            dialog: null,
            gameState: GAME,
            inventory: defaultInventory()
        }
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
            gameState: RIDDLE
        }
    }

    @action
    deactivateRiddle = () => {
        this.state = {
            ...this.state,
            gameState: GAME
        }
        this.game.loadRoom()
    }

    @action
    riddleSolved = () => {
        let newState = this.state
        if (this.gameState === RIDDLE) {
            newState = {
                ...newState,
                room: this.riddleStore.currentGameDoor.to,
                gameState: GAME
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
        //TODO: implement
    }

    @action
    showDialog = (dialogId: string) => {
        if (!this.state.dialog) {
            this.state = {
                ...this.state,
                dialog: getDialogById(dialogId)
            }
        }
    }

    @action
    hideDialog = () => {
        this.state = {
            ...this.state,
            dialog: null
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
                    this.showDialog(this.state.interaction.id)
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
}

const gameStore = new GameStore()

export default gameStore
