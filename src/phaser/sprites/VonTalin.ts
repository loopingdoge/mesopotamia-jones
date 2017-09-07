import { Game } from 'phaser-ce'

import { GameState } from '../../stores/gameStore'
import Npc from './Npc'

export default class VonTalin extends Npc {
    constructor(game: Game, x: number, y: number) {
        super(game, x, y, 'npc')
        this.frame = 4
        this.alpha = 0.6
    }

    dialogue(state: GameState): string {
        switch (state.room.id) {
            case 'room3':
                return 'dialog2'
            default:
                return ''
        }
    }
}
