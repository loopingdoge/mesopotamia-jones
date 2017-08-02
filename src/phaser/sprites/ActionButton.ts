import { Signal, Sprite } from 'phaser-ce'
import gameStore, { GAME } from '../../stores/gameStore'
import ISprite from '../classes/ISprite'

export default class ActionButton extends Sprite {
    constructor({ game, x, y, key }: ISprite) {
        super(game, x, y, key)
        this.anchor.setTo(0.5, 0.5)
        this.inputEnabled = true
        this.events.onInputDown.add(() =>
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'f' }))
        )
    }
}
