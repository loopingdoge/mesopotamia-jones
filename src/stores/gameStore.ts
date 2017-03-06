import { observable, action, reaction, /* computed */ } from 'mobx'

import { RiddleStore } from './riddleStore'
import { Room, rooms, getGameDoor, Door } from '../config/map'
import { Dialog, dialogs, getDialogById } from '../config/dialogs'

import PhaserGame from '../phaser'

export const GAME = 'GAME'
export const RIDDLE = 'RIDDLE'
export const DIALOG = 'DIALOG'

export class GameStore {

    game: PhaserGame
    riddleStore: RiddleStore

    @observable room: Room
    @observable lastDoor: Door
    @observable dialog: Dialog
    @observable state: string = GAME

    init(riddleStore: RiddleStore) {
        this.riddleStore = riddleStore
        this.room = rooms[0] // TODO: check if a saved game exists
        reaction(
            () => this.riddleStore.isSolved,
            (isSolved: boolean) => isSolved && this.riddleSolved()
        )
    }

    @action startGame = () => {
        this.game = new PhaserGame()
        this.game.start()
    }

    /**
     * To call when a door is touched
     * @param x: x position of the door
     * @param y: y position of the door
     */
    @action activateRiddle = (x: number, y: number) => {
        const gameDoor = getGameDoor(this.room, x, y)
        this.riddleStore.activateDoor(gameDoor)
        this.lastDoor = gameDoor.door
        this.state = RIDDLE
    }

    @action deactivateRiddle = () => {
        this.state = GAME
        this.game.loadRoom()
    }

    @action riddleSolved = () => {
        if (this.state === GAME) return
        this.room = this.riddleStore.currentGameDoor.to
        this.state = GAME
        this.game.loadRoom()
    }

    @action showDialog = (dialogId: string) => {
        this.dialog = getDialogById(dialogId)
        setTimeout(() => {
            gameStore.hideDialog()
        }, 2000)
        this.state = DIALOG
    }

    @action hideDialog = () => {
        this.state = GAME
    }

}

const gameStore = new GameStore()

export default gameStore