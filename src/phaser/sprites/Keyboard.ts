import { CursorKeys, Game, Point, Pointer, Sprite } from 'phaser-ce'
import gameStore, { GAME } from '../../stores/gameStore'
import ISprite from '../classes/ISprite'
import PlayerEvents from '../classes/PlayerEvents'

export default class Keyboard extends Sprite {
    cursors: CursorKeys
    events: PlayerEvents

    constructor(game: Game, events: PlayerEvents) {
        super(game, 0, 0, null)
        this.events = events
        this.anchor.setTo(0.5, 0.5)
        this.cursors = this.game.input.keyboard.createCursorKeys()
    }

    update() {
        let isMovingHorizontal = false
        let isMovingVertical = false
        if (gameStore.gameState === GAME && !gameStore.dialog) {
            if (this.cursors.left.isDown) {
                this.events.onMoveLeft.dispatch()
                isMovingHorizontal = true
            } else if (this.cursors.right.isDown) {
                this.events.onMoveRight.dispatch()
                isMovingHorizontal = true
            }

            if (this.cursors.up.isDown) {
                this.events.onMoveUp.dispatch()
                isMovingVertical = true
            } else if (this.cursors.down.isDown) {
                this.events.onMoveDown.dispatch()
                isMovingVertical = true
            }

            if (!isMovingVertical && !isMovingHorizontal) {
                this.events.onStopMoving.dispatch()
            }
        }
    }
}
