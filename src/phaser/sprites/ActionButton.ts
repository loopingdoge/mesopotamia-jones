import { Game, Signal, Sprite } from 'phaser-ce'
import gameStore from '../../stores/gameStore'

export default class ActionButton extends Sprite {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y, 'actionButton')
        this.anchor.setTo(0.5, 0.5)
        this.inputEnabled = true
        this.events.onInputUp.add(() =>
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'f' }))
        )
    }
}
