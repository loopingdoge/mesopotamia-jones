import { Events, Signal, Sprite } from 'phaser-ce'

export default class PlayerEvents extends Events {
    onMoveUp: Signal
    onMoveDown: Signal
    onMoveRight: Signal
    onMoveLeft: Signal
    onStopMoving: Signal
    onActionButtonDown: Signal

    constructor(sprite: Sprite) {
        super(sprite)
        this.onMoveUp = new Signal()
        this.onMoveDown = new Signal()
        this.onMoveRight = new Signal()
        this.onMoveLeft = new Signal()
        this.onStopMoving = new Signal()
        this.onActionButtonDown = new Signal()
    }
}
