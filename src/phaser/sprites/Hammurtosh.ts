import { Game } from 'phaser-ce'

import { GameState } from '../../stores/gameStore'
import Npc from './Npc'

export default class Hammurtosh extends Npc {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y, 'hammurtosh')

        this.game.physics.enable(this)

        this.animations.add('idle', [1, 3], 2, true)
        this.animations.add('right', [8, 9, 10, 11], 10, true)
    }

    dialogue(state: GameState): string {
        switch (state.room.id) {
            case 'room5':
                return 'dialog5'
            default:
                return ''
        }
    }

    moveTo(x: number, y: number) {
        this.animations.play('right')
        this.game.add.tween(this).to({ x, y }, 500, Phaser.Easing.Default, true)
        setTimeout(() => this.animations.play('idle'), 500)
    }
}
