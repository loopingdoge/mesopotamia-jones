import { CursorKeys, Game, Point, Pointer, Signal, Sprite } from 'phaser-ce'
import gameStore from '../../stores/gameStore'
import PlayerEvents from '../classes/PlayerEvents'

export interface KeyboardEvents {
    onMoveLeftDown: Signal
    onMoveLeftUp: Signal
    onMoveRightDown: Signal
    onMoveRightUp: Signal
    onMoveTopDown: Signal
    onMoveTopUp: Signal
    onMoveBottomDown: Signal
    onMoveBottomUp: Signal
}

export default class Keyboard extends Sprite {
    cursors: CursorKeys
    keyboardEvents: KeyboardEvents

    constructor(game: Game, keyboardEvents: KeyboardEvents) {
        super(game, 0, 0, null)
        this.keyboardEvents = keyboardEvents
        this.anchor.setTo(0.5, 0.5)
        this.cursors = this.game.input.keyboard.addKeys({
            up: Phaser.KeyCode.W,
            down: Phaser.KeyCode.S,
            left: Phaser.KeyCode.A,
            right: Phaser.KeyCode.D
        })
    }

    update() {
        if (gameStore.controlsEnabled) {
            if (this.cursors.left.isDown) {
                this.keyboardEvents.onMoveLeftDown.dispatch()
            } else if (this.cursors.left.justUp) {
                this.keyboardEvents.onMoveLeftUp.dispatch()
            }

            if (this.cursors.right.isDown) {
                this.keyboardEvents.onMoveRightDown.dispatch()
            } else if (this.cursors.right.justUp) {
                this.keyboardEvents.onMoveRightUp.dispatch()
            }

            if (this.cursors.up.isDown) {
                this.keyboardEvents.onMoveTopDown.dispatch()
            } else if (this.cursors.up.justUp) {
                this.keyboardEvents.onMoveTopUp.dispatch()
            }

            if (this.cursors.down.isDown) {
                this.keyboardEvents.onMoveBottomDown.dispatch()
            } else if (this.cursors.down.justUp) {
                this.keyboardEvents.onMoveBottomUp.dispatch()
            }
        }
    }
}
