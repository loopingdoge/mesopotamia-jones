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
    wasd: CursorKeys
    keyboardEvents: KeyboardEvents

    constructor(game: Game, keyboardEvents: KeyboardEvents) {
        super(game, 0, 0, null)
        this.keyboardEvents = keyboardEvents
        this.anchor.setTo(0.5, 0.5)
        this.cursors = this.game.input.keyboard.createCursorKeys()

        this.wasd = {
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
        }

        this.game.input.keyboard.clearCaptures()
    }

    update() {
        if (gameStore.controlsEnabled) {
            if (this.cursors.left.isDown || this.wasd.left.isDown) {
                this.keyboardEvents.onMoveLeftDown.dispatch()
            } else if (this.cursors.left.justUp || this.wasd.left.justUp) {
                this.keyboardEvents.onMoveLeftUp.dispatch()
            }

            if (this.cursors.right.isDown || this.wasd.right.isDown) {
                this.keyboardEvents.onMoveRightDown.dispatch()
            } else if (this.cursors.right.justUp || this.wasd.right.justUp) {
                this.keyboardEvents.onMoveRightUp.dispatch()
            }

            if (this.cursors.up.isDown || this.wasd.up.isDown) {
                this.keyboardEvents.onMoveTopDown.dispatch()
            } else if (this.cursors.up.justUp || this.wasd.up.justUp) {
                this.keyboardEvents.onMoveTopUp.dispatch()
            }

            if (this.cursors.down.isDown || this.wasd.down.isDown) {
                this.keyboardEvents.onMoveBottomDown.dispatch()
            } else if (this.cursors.down.justUp || this.wasd.down.justUp) {
                this.keyboardEvents.onMoveBottomUp.dispatch()
            }
        }
    }
}
