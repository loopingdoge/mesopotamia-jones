import { Game } from 'phaser-ce'

import { GameState } from '../../stores/gameStore'
import Npc from './Npc'

export default class VonDogen extends Npc {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y, 'doge')
        this.frame = 4

        this.animations.add('idle', [18, 19], 1, true)
        this.animations.play('idle')
    }

    dialogue(state: GameState): string {
        switch (state.room.id) {
            case 'room4':
                return 'dialog6'
            default:
                return ''
        }
    }
}
