import { Events, Signal, Sprite } from 'phaser-ce'

export default class PlayerEvents extends Events {
    onMoveTopDown: Signal
    onMoveBottomDown: Signal
    onMoveRightDown: Signal
    onMoveLeftDown: Signal

    onMoveTopUp: Signal
    onMoveBottomUp: Signal
    onMoveRightUp: Signal
    onMoveLeftUp: Signal

    onStopMoving: Signal

    onActionButtonDown: Signal

    constructor(sprite: Sprite) {
        super(sprite)
        this.onMoveTopDown = new Signal()
        this.onMoveBottomDown = new Signal()
        this.onMoveRightDown = new Signal()
        this.onMoveLeftDown = new Signal()

        this.onMoveTopUp = new Signal()
        this.onMoveBottomUp = new Signal()
        this.onMoveRightUp = new Signal()
        this.onMoveLeftUp = new Signal()

        this.onStopMoving = new Signal()

        this.onActionButtonDown = new Signal()
    }
}
