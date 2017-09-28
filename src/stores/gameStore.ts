import { isEqual } from 'lodash'
import { action, computed, observable, reaction, toJS } from 'mobx'

import { GameUI, UIStore } from './gameUIStore'
import { RiddleStore } from './riddleStore'
import riddleUIStore from './riddleUIStore'

import Actions, {
    addActionListener,
    removeActionListener
} from '../config/actions'
import { Chest, Chests, defaultChests } from '../config/chests'
import {
    Dialogue,
    DOOR_ROCK_REQUIRED,
    getDialogById,
    NEED_KEY
} from '../config/dialogues'
import {
    addItem,
    computer,
    COMPUTER,
    Computer,
    computerKey,
    defaultInventory,
    getItemById,
    hasItem,
    Inventory,
    Item
} from '../config/inventory'
import { Door, getGameDoor, Room, rooms } from '../config/map'
import {
    defaultProgression,
    Progression,
    reactourStartIndex
} from '../config/progression'

import PhaserGame from '../phaser'
import { Maybe } from '../utils'

export type GamePhase = 'Game' | 'Riddle'

export interface GameState {
    activeDialogue: Maybe<Dialogue>
    activeFoundItem: Maybe<Item>
    nextDialogueId: string
    firstRiddleVisited: boolean
    room: Room
    lastDoor: Door
    phase: GamePhase
    inventory: Inventory
    interaction: Interaction
    chests: Chests
    progression: Progression
}

export const defaultGameStoreState: () => GameState = () => ({
    activeDialogue: null,
    nextDialogueId: null,
    activeFoundItem: null,
    firstRiddleVisited: false,
    room: rooms[0],
    lastDoor: null,
    phase: 'Game',
    inventory: defaultInventory(),
    interaction: null,
    chests: defaultChests,
    progression: defaultProgression()
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

export interface NpcInteraction {
    type: 'npc'
    id: string
}

export type Interaction = DoorInteraction | ObjectInteraction | NpcInteraction

export class GameStore {
    game: PhaserGame
    riddleStore: RiddleStore
    uiStore: UIStore

    @observable state: GameState

    @observable lineId = 0

    @computed
    get room(): Room {
        return this.state.room
    }

    @computed
    get lastDoor(): Door {
        return this.state.lastDoor
    }

    @computed
    get gamePhase(): string {
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
            !this.state.activeFoundItem &&
            this.uiStore.state.ui === GameUI.Game
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
            ...JSON.parse(localStorage.getItem('gameState'))
        }

        this.state.interaction = null

        // React to riddle solved by the user
        reaction(
            () => this.riddleStore.riddleCompleted,
            (riddleCompleted: boolean) => riddleCompleted && this.riddleSolved()
        )

        reaction(
            () => this.state.activeFoundItem,
            item => {
                const hideItemScreen = () => {
                    this.hideFoundItem()
                    removeActionListener(Actions.CLOSE_ITEM_SCREEN)
                }
                setTimeout(
                    () =>
                        addActionListener(
                            Actions.CLOSE_ITEM_SCREEN,
                            hideItemScreen
                        ),
                    100
                )
            }
        )

        reaction(
            () => this.state.room,
            room => {
                if (
                    !this.state.progression.roomsVisited.find(
                        currRoom => room.id === currRoom.id
                    )
                ) {
                    this.state.progression.roomsVisited.push(room)
                }
                this.saveGameState()
            }
        )
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
        document.addEventListener('keypress', this.keyboardHandler)
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
        this.showDialogue('dialog1')
        this.state.progression.isGameStarted = true
    }

    saveGameState = () => {
        console.log('Saving state to local storage...')
        localStorage.setItem('gameState', JSON.stringify(this.state))
    }

    getComputer = () => {
        let computer = null
        const result = this.inventory.find(item => item.id === COMPUTER)
        if (result) {
            computer = result as Computer
        }
        return computer
    }

    setComputerWorkspace = (riddleId: string, workspace: string) => {
        const computer = this.getComputer()
        if (computer) {
            computer.workspace[riddleId] = workspace
        }
    }

    keyboardHandler = (event: KeyboardEvent) => {
        // tslint:disable:curly
        if (this.state.phase === 'Game') {
            switch (event.key) {
                case '1':
                    this.uiStore.ui === GameUI.Map
                        ? this.uiStore.show(GameUI.Game)
                        : this.uiStore.show(GameUI.Map)
                    break
                case '2':
                    this.uiStore.ui === GameUI.Inventory
                        ? this.uiStore.show(GameUI.Game)
                        : this.uiStore.show(GameUI.Inventory)
                    break
                case '3':
                    this.uiStore.show(GameUI.Game)
                    break
            }
        } else if (this.state.phase === 'Riddle') {
            switch (event.key) {
                case ' ':
                    if (riddleUIStore.isTutorialOpen)
                        riddleUIStore.isTutorialOpen = false
                    break
                case '1':
                    this.deactivateRiddle()
                    break
                case '2':
                    riddleUIStore.showTutorial()
                    break
            }
        }
        // tslint:enable:curly
    }
    /**
     * To call when a door is touched
     * @param x: x position of the door
     * @param y: y position of the door
     */
    @action
    activateRiddle = (x: number, y: number) => {
        const gameDoor = getGameDoor(this.room, x, y)
        const itemRequired = gameDoor.door.itemRequired
        if (itemRequired && !hasItem(this.inventory, itemRequired.item)) {
            this.showDialogue(itemRequired.dialogueId)
        } else {
            const computer = this.getComputer()
            let workspace = null

            if (computer) {
                workspace = computer.workspace[gameDoor.door.riddle.id]
            }

            this.riddleStore.activateDoor(gameDoor, workspace)
            this.state = {
                ...this.state,
                lastDoor: gameDoor.door,
                phase: 'Riddle'
            }

            if (
                reactourStartIndex(this.state.inventory, this.state.progression)
            ) {
                this.state.progression.hasShownComputerTutorial = true
                riddleUIStore.tutorialStartIndex = 2
            }
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
        if (this.gamePhase === 'Riddle') {
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
        this.riddleStore.riddleCompleted = false

        if (this.riddleStore.state.isSolvedAutomatically) {
            this.uiStore.showNotification()
            setTimeout(() => this.uiStore.hideNotification(), 2000)
        }
    }

    @action
    showFoundItem = (item: Item) => {
        if (!this.state.activeFoundItem) {
            this.state = {
                ...this.state,
                activeFoundItem: item
            }
        }
    }

    @action
    hideFoundItem = () => {
        this.state = {
            ...this.state,
            activeFoundItem: null
        }
        this.showNexDialogue()
    }

    @action
    showDialogue = (dialogId: string) => {
        if (!this.state.activeDialogue) {
            const dialogue = getDialogById(dialogId)
            this.state = {
                ...this.state,
                nextDialogueId: dialogue.nextDialogueId
            }
            // Shows the dialogue if the player has the required item
            if (
                dialogue.requiredItem === undefined ||
                hasItem(this.state.inventory, dialogue.requiredItem)
            ) {
                this.state = {
                    ...this.state,
                    activeDialogue: dialogue
                }
                // Otherwise shows the possible next dialogue
            } else {
                this.showNexDialogue()
            }
        }
    }

    @action
    hideDialogue = () => {
        // If there's a loot
        if (this.state.activeDialogue.loot.length) {
            for (const item of this.state.activeDialogue.loot) {
                this.showFoundItem(item)
                this.addItemToInventory(item)
            }
        } else {
            this.showNexDialogue()
        }
        this.state = {
            ...this.state,
            activeDialogue: null
        }
    }

    showNexDialogue = () => {
        if (this.state.nextDialogueId !== undefined) {
            // TODO: indagare o chiedere ad alby perche' senza non funzia
            setTimeout(() => this.showDialogue(this.state.nextDialogueId), 0)
        }
    }

    @action
    addItemToInventory = (item: Item) => {
        this.state = {
            ...this.state,
            inventory: addItem(this.state.inventory, item)
        }
    }

    @action
    setRiddleWorkspaceXML = (riddleId: string, workspace: string) => {
        this.setComputerWorkspace(riddleId, workspace)
    }

    interactionListener = (event: KeyboardEvent) => {
        if (
            !this.state.activeDialogue &&
            !this.state.activeFoundItem &&
            this.state.interaction
        ) {
            if (event.key === ' ') {
                switch (this.state.interaction.type) {
                    case 'door':
                        const { x, y } = this.state.interaction
                        this.activateRiddle(x, y)
                        break
                    case 'object':
                        this.openChest(this.state.interaction.id)
                        break
                    case 'npc':
                        this.showDialogue(this.state.interaction.id)
                        break
                }
                this.state.interaction = null
            }
        }
    }

    @action
    readyInteraction = (interaction: Interaction) => {
        if (!this.state.interaction) {
            document.addEventListener('keydown', this.interactionListener)
            this.state = {
                ...this.state,
                interaction
            }
        }
    }

    @action
    removeInteraction = () => {
        if (this.state.interaction) {
            document.removeEventListener('keydown', this.interactionListener)
            this.state = {
                ...this.state,
                interaction: null
            }
        }
    }

    getRiddleWorkspaceXML = (riddleId: string) => {
        const computer = this.getComputer()
        return computer && computer.workspace[riddleId]
    }

    @action
    enterFirstRiddle = () => {
        this.state = {
            ...this.state,
            firstRiddleVisited: true
        }
    }

    @action
    openChest = (id: string) => {
        const chest = this.state.chests[id]
        if (hasItem(this.state.inventory, chest.requiredItem)) {
            this.showFoundItem(chest.item)
            this.addItemToInventory(chest.item)
            this.state = {
                ...this.state,
                chests: {
                    ...this.state.chests,
                    [id]: {
                        ...this.state.chests.id,
                        open: true
                    }
                }
            }
        } else {
            this.showDialogue(NEED_KEY)
        }
    }
}

const gameStore = new GameStore()

export default gameStore
